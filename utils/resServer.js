const resServer = (res,code=200,status="",message="",data=null)=>{
    res.status(code).json({
        status,
        message,
        data,
    })
}

module.exports = resServer