export const validateSignup = (req, res, next) => {
  const { fname, lname, email, password, cPassword } = req.body;

  if (!fname || !lname || !email || !password || !cPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const emailValid = emailRegex.test(email.toLowerCase().trim());

  if (!emailValid) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  if (password.length < 8) {
    return res
      .status(400)
      .json({ message: "Password must be at least 8 characters long" });
  }

  if (password !== cPassword) {
    return res.status(400).json({ message: "Passwords don't match" });
  }

  next();
};

export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const emailValid = emailRegex.test(email.toLowerCase().trim());

  if (!emailValid) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  next();
};
