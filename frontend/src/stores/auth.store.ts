import { create } from "zustand";

interface User {
  id: string;
  fname: string;
  lname: string;
  email: string;
  avatar_url?: string;
  avatar_path?: string;
  created_at: string;
}

interface UserWithImage extends User {
  image: File;
}

interface SigninInputs {
  email: string;
  password: string;
}

interface SignupInputs extends SigninInputs {
  fname: string;
  lname: string;
  cPassword: string;
}

interface AuthState {
  user: User | null;

  checkingAuth: boolean;
  loading: boolean;

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

  checkAuth: async () => {},
  signup: async () => {},
  login: async () => {},
  logout: async () => {},
  updateUserProfile: async () => {},
}));

export default useAuthStore;
