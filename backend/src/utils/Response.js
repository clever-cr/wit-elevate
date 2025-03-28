export default class Response {
  static succesMessage(res, message, data = null, status, total = null) {

    const result = Array.isArray(data) ? data.length : 1;  
    const totalCount = total || result;
  
    return res.status(status || 200).json(
      data
        ? {
            status: status || 200,
            result: result,
            total: totalCount,
            message,
            data,
          }
        : { status: status ?? 200, message }
    );
  }
  

  static errorMessage(res, error, status) {
    return res.status(status || 500).json({
      status: status || 500,
      error,
    });
  }
}

