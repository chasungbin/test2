const express = require("express");
const Borders = require("../schemas/borders")
const router = express.Router();

const authmiddleware = require("../middle/auth-middlewares");

// 전체 조회 날짜 오름차순으로 정렬
router.get("/blogs", async (req, res, next) => {
   try {
      const borders = await Borders.find({ }).sort("-borderDate");
      res.json({ borders });
   } catch (err) {
      console.error(err);
      next(err);
   }
});
//상세조회
router.get("/blogs/:_id", async (req, res) => {
   const { _id } = req.params;
   const bords = await Borders.findOne({ _id }).exec();
  
   res.json({ bords })

})
//삭제api
router.delete("/blogs/:_id",authmiddleware, async (req, res) => {
   const { _id } = req.params;
   const bords = await Borders.findOne({ _id }).exec();
   const { user } = res.locals;
   const Nicnema1 = user["nickname"]
   const Nicnema2 = bords["nickname"]
   if(Nicnema1 !== Nicnema2){
      res.send({ result: "당신에게는 권한이 없습니다!서버" });
   } else {
     await bords.delete({});
     res.send({ result: "success" });
   }
})


//작성 api 
router.post("/blogs", async (req, res) => {

   const { title, comment, borderDate, nickname } = req.body;

   const maxBoderNumber = await Borders.findOne({}).sort("-bord").exec();
   //borderNumber 값을 넣어서 배열의 순서 정렬
   let bord = 1;

   if (maxBoderNumber) {
      bord = maxBoderNumber.bord + 1;
   }
   
   // //post로 온 데이터 저장
   const borders = new Borders({ title, comment, borderDate, bord, nickname });
   await borders.save();
   // //응답
   res.send({ result: "success" });
});
//수정api
router.patch("/blogs/:_id",authmiddleware, async (req, res) => {
   const { _id } = req.params;
   const { user } = res.locals;
   const Nicnema1 = user['nickname'];
   const { title, comment, borderDate,  } = req.body;
   console.log(req.body)
   const borders = await Borders.findOne({ _id }).exec();
   const Nicnema2 = borders['nickname'];
   console.log(Nicnema2)
   if (Nicnema1 !== Nicnema2) {
      res.send({result : "권한이 없음"})
   } else {
      await Borders.updateOne({ _id }, { $set: { title, comment, borderDate } });
      res.send({ result: "success" });
   }
});

module.exports = router;