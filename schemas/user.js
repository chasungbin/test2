const mongoose = require("mongoose");
//mongodb 데어터 타입 지정
const userSchema = new mongoose.Schema({
  nickname: {
    type: String,
    //  required: true,
  },
  email: {
    type: String,
    //  required: true,
  },
  password: {
    type: String,
    //  required: true,
  },
});
//기존에 저장되는 id값을 borderId로이용
 userSchema.virtual("userId").get(function () {
   return this._id.toHexString();
 });
 userSchema.set("toJSON", {
   virtuals: true,
 });

module.exports = mongoose.model("User", userSchema);