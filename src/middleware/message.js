const messageObj = require('../model/message')
module.exports.setMessage = function setMessage(message){
    this.message = new messageObj(message.type,message.text)
    return this
}
module.exports.getMessage =function getMessage(){
    if(!this.message){
        return new messageObj()
    }
    return this.message
}
