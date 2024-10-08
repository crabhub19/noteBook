const jwt = require('jsonwebtoken');
const JWT_SECRET = "ben10";

const fetchuser = (req,res,next)=>{
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).json({ errors: "use your correct token" });
    }
    try {
        const data = jwt.verify(token,JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        return res.status(401).json({ errors: "use your correct token" });
    }

}

module.exports = fetchuser;