const jwt = require("jsonwebtoken");

const secret = "Nq3Ty0F74gF70&pWEZXGxVRdov!ftrKB"; // 서버보관용 키 (32byte)
const token = jwt.sign(
  {
    id: "ms",
    isAdmin: false,
  },
  secret,
  { expiresIn: 2 }
);

setTimeout(() => {
  jwt.verify(token, secret, (error, decoded) => {
    console.log(error, decoded);
  });
}, 3000);
