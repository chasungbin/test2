const mongoose = require("mongoose");
//mongodb 데어터 타입 지정
const comenSchema = new mongoose.Schema({
    commentId: {
        type: Number,
        required: true,
        unique: true,
      },
      postId: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      nickname: {
        type: String,
        required: true,
      },
      date: {
        type: String,
        required: true,
      },
    });


module.exports = mongoose.model("Comment", comenSchema);