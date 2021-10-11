
function message(type,text){
    this.type = type || null;
    this.text = text || null;
}
message.prototype.setType = function(type){
    this.type = type
    return this
}
message.prototype.setText = function(text){
    this.text = text
    return this
}

module.exports = message;
