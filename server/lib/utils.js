// import jwt from "jsonwebtoken";

// //function to genarate a token for a user
// export const generateToken =(uesrId)=>{
//   const token =jwt.sign({userId}, process.env.JWT_SECRET);
//   return token;
// }


import jwt from "jsonwebtoken";

// function to generate a token for a user
export const generateToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);
  return token;
};
