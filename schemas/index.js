const mongoose = require("mongoose");
//mongdb 연결 및 errormessage
const connect = () => {
    mongoose.connect("mongodb://localhost/border", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).catch((err)=> {
        console.error(err);
    });

};

module.exports= connect;