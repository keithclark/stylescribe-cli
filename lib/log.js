function logError(error) {
    var message;
    
    if (error instanceof Error) {
        message = error.name + ': ' + error.message;
        
        if (error.lineNumber) {
            message += ' at line ' + error.lineNumber;
        }
        if (error.fileName) {
            message += ' in file "' + error.fileName + '"';
        }
    } else {
        message = error.toString();
    }

    message += '\u0007';
    
    logNotice(message);
}


function logNotice(message) {
    logRaw('> ' + new Date().toLocaleTimeString() + ' - ' + message);
}


function logRaw(text) {
    console.log(text);
}


module.exports = {
    error: logError,
    notice: logNotice,
    write: logRaw
};
