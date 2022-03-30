const mongoose = require("mongoose");
//mongodb 데어터 타입 지정
const bordersSchema = new mongoose.Schema({
    bord: {
     type: Number,
    },
  nickname: {
    type: String,
    //  required: true,
  },
  title: {
    type: String,
  },
  email: {
    type: String,
    //  required: true,
  },
  password: {
    type: String,
    //  required: true,
  },
  comment: {
    type: String
  },
  borderDate: {
    type: Date
  }

});
//기존에 저장되는 id값을 borderId로이용
// bordersSchema.virtual("borderId").get(function () {
//   return this._id.toHexString();
// });
// bordersSchema.set("toJSON", {
//   virtuals: true,
// });

module.exports = mongoose.model("Borders", bordersSchema);