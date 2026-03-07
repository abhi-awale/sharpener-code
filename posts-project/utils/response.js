module.exports = {
    success(res, {statusCode = 200, message='Success', data={}}) {
        return res.status(statusCode).json({
            success:true,
            message,
            data
        });
    },

    error(res,{statusCode = 500, message='Error', err={}}){
        return res.status(statusCode).json({
            success: false,
            message,
            err
        });
    }
}