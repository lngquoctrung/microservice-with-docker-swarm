const ERROR_CODES = {
    INVALID_INPUT: "INVALID_INPUT",
    INVALID_REQUEST: "INVALID_REQUEST",
    UNAUTHORIZED: "UNAUTHORIZED",
    FORBIDDEN: "FORBIDDEN",
    NOT_FOUND: "NOT_FOUND",
    INVALID_METHOD: "INVALID_METHOD",
    REQUEST_TIMEOUT: "REQUEST_TIMEOUT",
    UNKNOWN_ERROR: "UNKNOWN_ERROR",
    BAD_GATEWAY: "BAD_GATEWAY",
    SERVICE_UNAVAILABLE: "SERVICE_UNAVAILABLE",
    GATEWAY_TIMEOUT: "GATEWAY_TIMEOUT",
}

const HOST = process.env.HOST;
const PORT = process.env.PORT;
if(!HOST || !PORT) {
    console.error("Missing configuration to run the server");
    process.exit(1);
}

const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_NAME = process.env.DB_NAME;
if(!DB_HOST || !DB_PORT || !DB_NAME) {
    console.error("Missing the database configuration");
    process.exit(1);
}
const MONGO_URI = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

module.exports = {
    HOST,
    PORT,
    MONGO_URI,
    ERROR_CODES,
}