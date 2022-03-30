const express = require("express");
const Comment = require("../schemas/comment")
const jwt = require("jsonwebtoken");
const router = express.Router();

const authmiddleware = require("../middle/auth-middlewares");

//댓글 작성
router.post("/comment",authmiddleware, async(req,res) => {
    const { user }= res.locals;
    const { postId, description } =req.body
    const nickname = user['nickname']
    const recentComment = await Comment.find().sort("-commentId").limit(1);
  let commentId = 1;
  if (recentComment.length != 0) {
    commentId = recentComment[0]["commentId"] + 1;
  }
  const date = new Date();
  await Comment.create({ commentId, postId, description, date, nickname });
  res.send({ result: "success" });
});

//조회
router.get("/comment/:postId",async(req,res)=>{
    try {
        const {postId}= req.params;
        const comment = await Comment.find({postId}).sort("-commentId");
        res.json({ comment });
     } catch (err) {
        console.error(err);
        next(err);
     }
});

//삭제
router.delete("/comment", authmiddleware,async(req,res)=>{
    const{user}= res.locals;
    const {commentId}=req.body;
    const comment = await Comment.findOne({commentId});
    const Nickname1= user["nickname"];
    const Nicknema2 = comment['nickname'];
    if(Nickname1 !== Nicknema2){
        res.send({ result: "당신에게는 권한이 없습니다!서버" });
     } else {
       await Comment.deleteOne({commentId});
       res.send({ result: "success" });
     }
});


//수정
router.patch("/comment",authmiddleware,async(req,res)=>{
    const { user } = res.locals;
    const { commentId, description } = req.body;
  
    const tokenNickname = user["nickname"];
    const p = await Comment.findOne({ commentId });
    const dbNickname = p["nickname"];
  
    if (tokenNickname === dbNickname) {
      await Comment.updateOne({ commentId }, { $set: { description } });
      res.send({ result: "success" });
    } else {
      res.send({ result: "혼날래?" });
    }
  });











module.exports = router;