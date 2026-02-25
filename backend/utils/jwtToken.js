/* export const generateToken = (user, message, statusCode, res) => {
    const token = user.generateJsonWebToken();
    const cookieName = user.role === "Admin" ? "adminToken" : "patientToken";
    res.status(statusCode).cookie(cookieName, token, {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000 
        ),
        httpOnly: true,
   })
   .json({
        success: true,
        message,
        user,
        token,
    });

}
*/
import jwt from "jsonwebtoken";

export const generateToken = (user, message, statusCode, res) => {
  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET_KEY,
    { expiresIn: process.env.JWT_EXPIRES }
  );

  const cookieName =
    user.role === "admin"
      ? "adminToken"
      : user.role === "patient"
      ? "patientToken"
      : "token";

  res
    .status(statusCode)
    .cookie(cookieName, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false, // localhost
      maxAge: process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000,
    })
    .json({
      success: true,
      message,
      token,
    });
};
