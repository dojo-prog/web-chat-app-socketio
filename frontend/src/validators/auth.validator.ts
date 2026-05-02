import type { SigninInputs, SignupInputs } from "../stores/auth.store";
import { returnMissing } from "../utils/returnMissing";

const validateSignup = (inputs: SignupInputs) => {
  const { fname, lname, email, password, cPassword } = inputs;

  const missing = returnMissing({ fname, lname, email, password, cPassword });
  if (missing.length > 0) {
    return { error: `${missing[0]} is required` };
  }

  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const emailValid = emailRegex.test(email.toLowerCase().trim());
  if (!emailValid) {
    return { error: "Invalid email format" };
  }

  if (password.length < 8) {
    return { error: "Password must be at least 8 characters long" };
  }

  if (password !== cPassword) {
    return { error: "Passwords don\'t match" };
  }

  return { error: null };
};

const validateSignin = (inputs: SigninInputs) => {
  const { email, password } = inputs;

  const missing = returnMissing({ email, password });
  if (missing.length > 0) {
    return { error: `${missing[0]} is required` };
  }

  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const emailValid = emailRegex.test(email.toLowerCase().trim());
  if (!emailValid) {
    return { error: "Invalid email format" };
  }

  return { error: null };
};

export { validateSignup, validateSignin };
