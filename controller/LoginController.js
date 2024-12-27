import jwt from "jsonwebtoken";
import Login from "../model/Login.js";

const adminEmail = "admin@example.com";
const adminPassword = "securepassword";

export const LoginUser = async (req, res) => {
  // const { email, password } = req.body;
  const { email, password } = req.body;
  // console.log(req.body);
  try {
    if (!email) {
      res.json(message, "please give email");
    }

    // const user = adminEmail;
    if (email != adminEmail)
      return res.status(404).json({ message: "User not found" });
    if (password != adminPassword)
      return res.status(400).json({ message: "Invalid credentials" });

    // const token = jwt.sign("JWT_SECRET");
    const token = jwt.sign({ email: email }, "JWT_SECRET", {
      expiresIn: "1d",
    });
    res.json({ token, name: email, message: "successfully Logged in" });

    // const existing = await Login.findOne({ email: email });
    // if (existing) {
    //   return res.status(500).json({ message: "user already exist" });
    // }
    // const hashpass = await bcrypt.hash(password, 10);
    // const LoginUserintodb = new Login({
    //   email: email,
    //   password: hashpass,
    // });
    // await LoginUserintodb.save();
  } catch (error) {
    res.status(234).json(error.message);
  }
};
