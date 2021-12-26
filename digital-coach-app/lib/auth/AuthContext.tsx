import { createContext, Dispatch, SetStateAction, useContext } from "react";

import { User } from "@App/lib/user/models";

interface AuthContextState {
  setCurrentUser: Dispatch<SetStateAction<User | null>>;
  currentUser: User | null;
  error: string;
  fetchUser: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextState | null>(null);

export default function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) throw Error("AuthContext must be provided");
  return context;
}
