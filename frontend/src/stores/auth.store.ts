import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-toastify";
import { returnMissing } from "../utils/returnMissing";
import { validateSignin, validateSignup } from "../validators/auth.validator";
import { capitalize } from "../utils/capitalize";

export interface User {
  id: string;
  fname: string;
  lname: string;
  email: string;
  avatar_url?: string;
  avatar_path?: string;
  created_at: string;
}

export interface UserWithImage extends User {
  image: File;
}

export interface SigninInputs {
  email: string;
  password: string;
}

export interface SignupInputs extends SigninInputs {
  fname: string;
  lname: string;
  cPassword: string;
}

interface AuthState {
  user: User | null;

  checkingAuth: boolean;
  loading: boolean;

  socket: Record<any, any> | null;
  onlineUsers: string[];

  checkAuth: () => Promise<void>;
  signup: (signupInputs: SignupInputs) => Promise<void>;
  login: (signinInputs: SigninInputs) => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (original: User, modified: UserWithImage) => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,

  checkingAuth: false,
  loading: false,

  socket: null,
  onlineUsers: [],

  checkAuth: async () => {
    set({ checkingAuth: true });

    try {
      const res = await axios.get("/auth/profile");
      set({ user: res.data.user ?? null });
    } catch (error) {
      console.error("checkAuth error:", error);
    } finally {
      set({ checkingAuth: false });
    }
  },

  signup: async (inputs) => {
    const { fname, lname, email, password, cPassword } = inputs;
    const { error } = validateSignup(inputs);

    if (error) {
      toast.error(error);
      return;
    }

    const n = {
      fname: capitalize(fname),
      lname: capitalize(lname),
      email: email.toLowerCase().trim(),
    };

    set({ loading: true });
    try {
      const res = await axios.post("/auth/signup", {
        password,
        cPassword,
        ...n,
      });
      set({ user: res.data.user ?? null });
      toast.success(res.data.message || "Signup successful");
    } catch (error: any) {
      console.error("signup error:", error);
      toast.error(
        error.response.data.message || "Error signing you up. Please try again",
      );
    } finally {
      set({ loading: false });
    }
  },

  login: async (inputs) => {
    const { email, password } = inputs;
    const { error } = validateSignin(inputs);

    if (error) {
      toast.error(error);
      return;
    }

    set({ loading: true });
    try {
      const res = await axios.post("/auth/login", {
        email: email.toLowerCase().trim(),
        password,
      });
      set({ user: res.data.user ?? null });
      toast.success(res.data.message || "Login successful");
    } catch (error: any) {
      console.error("login error:", error);
      toast.error(
        error.response.data.message || "Error logging you in. Please try again",
      );
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      await axios.post("auth/logout");
      toast.success("Logout successful");
    } catch (error: any) {
      console.error("logout error:", error);
      toast.error(
        error.response.data.message ||
          "Error while logging you out. Please try again",
      );
    }
  },

  updateUserProfile: async (original, modified) => {
    if (!original) {
      console.error("Failed to pass in user details");
      return;
    }

    if (!modified) {
      console.error("Failed to pass in changes");
      return;
    }

    const changes: Partial<User> = {};

    (["fname", "lname"] as (keyof User)[]).forEach((key) => {
      if (modified[key]?.toLowerCase() !== original[key]?.toLowerCase()) {
        changes[key] = capitalize(modified[key]!);
      }
    });

    if (Object.keys(changes).length === 0 && !modified.image) {
      toast.error("No changes has been made");
      return;
    }

    const nModified = {
      fname: capitalize(modified.fname),
      lname: capitalize(modified.lname),
    };

    set({ loading: true });
    try {
      const res = await axios.put("/auth/update-profile", {
        original,
        modified: { ...modified, ...nModified },
      });
      set({ user: res.data.user ?? null });
      toast.success(res.data.message ?? "Profile updated");
    } catch (error: any) {
      console.error("updateUserProfile error:", error);
      toast.error(
        error.response.data.message ??
          "Error while updating your profile. Please try again",
      );
    } finally {
      set({ loading: false });
    }
  },
}));

export default useAuthStore;
