module.exports = class ErrorBody {
    constructor(statusCode, errorMessage) {
        this.statusCode = statusCode;
        this.errorMessage = errorMessage;
    }
};
