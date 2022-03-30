const User= require("../schemas/user");
const jwt =  require("jsonwebtoken");
module.exports = (req,res,next) => {
    const { authorization } = req.headers;
    const [tokenType, tokenValue] = authorization.split(' ');
    if(tokenType !== 'Bearer'){
        res.status(401).send({
            errorMessage:"로그인이 되지않았습니다",
        });
        return;
    }

try{
    const{userId} = jwt.verify(tokenValue, "my-s-key");
    User.findById(userId).exec().then((user) =>{
        res.locals.user = user;
        next();
    });
   
}catch(err){
    res.status(401).send({
        errorMessage:"로그인이 되지않았습니다",
    });
    return;
}
   
};