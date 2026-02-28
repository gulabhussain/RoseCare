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
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000,
    })
    .json({
      success: true,
      message,
    });
};
