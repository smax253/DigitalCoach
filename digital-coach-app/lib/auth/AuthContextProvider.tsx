import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";
import { User } from "firebase/auth";
import { getApp } from "firebase/app";
import AuthService from "./AuthService";

interface AuthContextState {
  setUser: Dispatch<SetStateAction<User | null>>;
  user: User | null;
  error: string;
  login: (email: string, password: string) => {};
  loginWithGoogle: () => {};
  logout: () => {};
}

const AuthContext = createContext<AuthContextState | null>(null);

export default function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) throw Error("AuthContext must be provided");
  return context;
}

export function AuthProvider({ children }: PropsWithChildren<{}>) {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string>("");

  const login = async (email: string, password: string) => {
    try {
      const { user } = await AuthService.login(email, password);

      setUser(user);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const loginWithGoogle = async () => {
    console.log("loginWithGoogle");
    try {
      const { user } = await AuthService.loginWithGoogle();
      setUser(user);
    } catch (error: any) {
      console.log(error);
      setError(error.message);
    }
  };

  const logout = async () => {
    await AuthService.logout();
    setUser(null);
  };

  const providerValue = {
    user,
    setUser,
    error,
    login,
    loginWithGoogle,
    logout,
  };

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
}
