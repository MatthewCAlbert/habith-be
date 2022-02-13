import { getReasonPhrase } from 'http-status-codes';

class ApiError extends Error {
    statusCode: number;
    isOperational: boolean;
    stack: any;

    constructor(statusCode: number, message: string | null = null, isOperational: boolean = true, stack: any = {}) {
        super(message || getReasonPhrase(statusCode));
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export default ApiError;