class ErrorHandler extends Error {
        constructor(statusCode, message) {
         super();
         this.statusCode = statusCode;
         this.message = message;
 }}
 
//  function for returning a formatted error
const handleError = (err, res) => {
const { statusCode, message } = err;
     res.status(statusCode).json({
     status: "error",
     statusCode,
     message
 });};


 module.exports = {ErrorHandler,handleError}


 