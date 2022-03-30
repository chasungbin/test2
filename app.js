const express = require("express");
const connect = require("./schemas");
const app = express();
const port = 3000;
//mongdb 경로지정 
connect();

//미들웨어 경로 지정
const blogsRouter = require("./routes/blogs");
const usersRouter = require("./routes/users");
const commentRouter =require("./routes/comment");
 const authmiddleware = require("./middle/auth-middlewares");
//미들웨어 요청표시 
const requestMiddleware = (req, res, next) => {
    console.log('Request URL:', req.originalUrl, ' - ', new Date());
    next();
};
// json형태로 정보전달
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//미들웨어 요청시각표시
app.use(requestMiddleware);
//express에 정적페이지 지정
app.use(express.static("./static"));
//미들웨어 지정, 수정,삭제,작성등
app.use("/api", [blogsRouter]);
//로그인,회원가입미들웨어
app.use("/api", [usersRouter]);
//댓글: 작성,수정, 삭제
app.use("/api", [commentRouter]);

app.get("/users/me", authmiddleware, async (req, res) => {
     const { user } = res.locals;

     res.send({
        user,
     });
 });


app.listen(port, () => {
    console.log(port, '포트로 서버가 열렸어요!');
});
