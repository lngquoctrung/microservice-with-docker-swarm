const axios = require("axios");

const MS_USER_SERVICE_URL = process.env.MS_USER_SERVICE_URL;

const checkAuth = (req, res) => {
    const email = req.cookies.email;
    if(!email)
        return res.json({
            status: 401,
            message: "Unauthorized",
        });
    return res.json({
        status: 200,
        message: "Authorized successfully",
        data: {
            email: email
        }
    });
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Check the input submitted from client
        if(!email || !password) {
            return res.json({
                status: 400,
                message: "Thông tin đăng nhập không hợp lệ"
            })
        }

        // Send a request to user service to check user existed or not
        const response = await axios.get(
            `${MS_USER_SERVICE_URL}/auth`,
            {
                    params: {
                        email: email,
                    }
                }
            );
        const dataResponse = response.data;
        // User account does not exist
        if(dataResponse.status === 404)
            return res.json({
                status: 404,
                message: "Không tìm thấy thông tin người dùng"
            });

        // Check password
        if(dataResponse.data.password !== password)
            return res.json({
                status: 400,
                message: "Mật khẩu không chính xác"
            });

        // Set cookie when verification is successful
        res.cookie("email", dataResponse.data.email, {
            maxAge: 1000 * 60 * 5,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production"
        });
        return res.json({
            status: 200,
            message: "Đăng nhập thành công",
        });
    } catch(error) {
        return res.status(500).json({
            status: 500,
            message: "Interal server error",
            error: error.message
        })
    }
}

const register = async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body;
        // Check the input is valid or not
        if(!email || !password || !confirmPassword) {
            return res.json({
                status: 400,
                message: "Thông tin đăng nhập không hợp lệ"
            });
        }
        // Check the password and confirmation password
        if(password !== confirmPassword)
            return res.json({
                status: 400,
                message: "Mật khẩu không trùng khớp"
            });

        // Check the account exist or not
        const checkUserResponse = await axios.get(
            `${MS_USER_SERVICE_URL}/auth`,
            {
                params: {
                    email: email
                }
            }
        );
        const datacheckUserResponse = checkUserResponse.data;
        // The account exist
        if(datacheckUserResponse.status === 200) {
            return res.json({
                status: 400,
                message: "Tài khoản đã tồn tại"
            });
        }

        // Send request to user service to create new user account
        const createUserResponse = await axios.post(
            `${MS_USER_SERVICE_URL}/`,
            {
                email: email,
                password: password,
            }
        );
        const dataCreateUserResponse = createUserResponse.data;
        if(dataCreateUserResponse.status === 201) {
            res.cookie("email", email, { maxAge: 1000 * 60 * 5 });
            return res.json({
                status: 201,
                message: "Đăng ký thành công",
            });
        }
    } catch(error) {
        return res.status(500).json({
            status: 500,
            message: "Internal server error",
            error: error.message
        })
    }
}

module.exports = {
    checkAuth,
    login,
    register
}