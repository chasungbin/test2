const express = require("express");
const User = require("../schemas/user")
const jwt = require("jsonwebtoken");
const router = express.Router();


const authmiddleware = require("../middle/auth-middlewares");

//회원가입 api
router.post("/users", async (req, res) => {
    const { email, password, nickname, confirmPassword } = req.body;
    if (password !== confirmPassword) {
        res.status(400).send({
            errorMessage: "패스워드가 확인란과 동일하지 않음",
        });
        return;
    }

    const exisUsers = await User.find({
        $or: [{ email }, { nickname }],
    });
    if (exisUsers.length) {
        res.status(400).send({
            errorMessage: "중독된 아이디또는 닉네임이 존재함",
        });
        return;
    }
    const user = new User({ nickname, email, password });
    await user.save();
    res.status(201).send({});
});

//로그인 api
router.post("/auth", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password }).exec();
    if (!user) {
        res.status(401).send({
            errorMessage: "이메일또는 비밀번호가 다릅니다."
        });
        return;
    }
    const token = jwt.sign({ userId: user.userId }, "my-s-key");
    res.send({
        token,
    })
})



 router.get("/users/me", authmiddleware, async (req, res) => {
     const { user } = res.locals;

     res.send({
         user
     });
 });

module.exports = router;
