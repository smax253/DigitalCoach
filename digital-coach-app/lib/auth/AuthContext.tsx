import { User } from "firebase/auth";
import { createContext, Dispatch, SetStateAction, useContext } from "react";

interface AuthContextState {
  setUser: Dispatch<SetStateAction<User | null>>;
  user: User | null;
  error: string;
  login: (email: string, password: string) => {};
  loginWithGoogle: () => {};
  logout: () => {};
}

export const AuthContext = createContext<AuthContextState | null>(null);

export default function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) throw Error("AuthContext must be provided");
  return context;
}
