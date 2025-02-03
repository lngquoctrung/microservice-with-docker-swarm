class ResponseHelper {
    success(
        status=200,
        statusText="OK",
        message="Request successful with status 200",
        data=null)
    {
        const response = {
            success: true,
            status: status,
            statusText: statusText,
            message: message,
            timestamp: new Date(),
        }
        if(data) response.data = data;
        return response;
    }

    error(
        status=500,
        statusText="Internal server error",
        message="Request failed with status 500",
        code="INTERNAL_SERVER_ERROR",
        errorDetails=null)
    {
        return {
            success: false,
            status: status,
            statusText: statusText,
            message: message,
            code: code,
            timestamp: new Date(),
            errorDetails: errorDetails,
        }
    }
}

module.exports = new ResponseHelper();