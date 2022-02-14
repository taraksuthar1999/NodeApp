export const ReE = function(res, message, code = 400) {
    // Error Web Response
    const error = [];
    error.push(message);
    if (typeof code !== 'undefined') res.statusCode = code;
    // return res.json({ success: 0, error, data: {} });
  
    return res.status(200).json({
      success: 0,
      error,
      data: {},
    });
};
