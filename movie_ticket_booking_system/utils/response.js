
const errorResponse = (res, { statusCode = 404, message=null, err={} }) => {
    res.status(statusCode).json({
        success : false,
        message : message ?? err.message,
        error : err
    });
    return;
}

const successResponse = (res, { statusCode = 200, message="success", data={} }) =>{
    res.status(statusCode).json({
        success : true,
        message : message,
        data : data
    });
    return;
}

module.exports = {
    errorResponse,
    successResponse
}