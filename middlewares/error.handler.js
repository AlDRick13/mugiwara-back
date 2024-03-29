const { ValidationError, DatabaseError, BaseError,
    ConnectionError, ConnectionAcquireTimeoutError, ConnectionRefusedError, ConnectionTimedOutError, InvalidConnectionError
} = require('sequelize');

function logErrors(err, req, res, next) {
    console.error(err);
    next(err);
}

function errorHandler(err, req, res, next) {
    let { status } = err;

    return res.status(status || 500).json({
        message: err.message,
        errorName: err.name,
        // stack: err.stack,
    });
}

function handlerAuthError(err, req, res, next) {
    if (err.status === 401 || err.status === 403) {
        return res.status(err.status).json({
            errorName: err.name,
            message: err.message,
            errors: err.errors,
            code: err.code,
            // stack: err.stack,
        });
    }

    //   if (err.name === "CustomName")
    if (err.name === "UnauthorizedError") {
        return res.status(401).json({
            errorName: err.name,
            message: err.message,
            errors: err.errors,
            code: err.code,
            // stack: err.stack,
        });
    }

    if (err.name === "Error Testing") {
        return res.status(401).json({
            errorName: err.name,
            message: err.message,
            errors: err.errors,
            code: err.code,
            // stack: err.stack,
        });
    }

    next(err);
}

function ormErrorHandler(err, req, res, next) {
    if (
        err instanceof ConnectionError ||
        err instanceof ConnectionAcquireTimeoutError ||
        err instanceof ConnectionRefusedError ||
        err instanceof ConnectionTimedOutError ||
        err instanceof InvalidConnectionError
    ) {
        return res.status(409).json({
            statusCode: 409,
            name: err.name,
            message: 'Database Connection Error'
        });
    }

    if (err instanceof ValidationError) {
        return res.status(409).json({
            statusCode: 409,
            name: err.name,
            message: err.message,
            errors: err.errors
        });
    }

    if (err instanceof DatabaseError) {
        return res.status(409).json({
            statusCode: err.status,
            name: err.name,
            message: err.message,
            parametros: err['parameters'],
            errors: err.errors,
            // errorOriginal: err['original'],
            // sql: err['sql'],
            // stack: err.stack,
        });
    }

    if (err instanceof BaseError) {
        return res.status(409).json({
            statusCode: err.status,
            name: err.name,
            message: err.message,
            parametros: err['parameters'],
            errors: err.errors,
            // errorOriginal: err['original'],
            // sql: err['sql'],
            //stack: err.stack,
        });
    }

    next(err);
}



module.exports = { logErrors, handlerAuthError, errorHandler, ormErrorHandler };