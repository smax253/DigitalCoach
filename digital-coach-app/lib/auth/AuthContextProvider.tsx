import { PropsWithChildren, useMemo, useState } from "react";
import { User } from "firebase/auth";
import AuthService from "./AuthService";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }: PropsWithChildren<{}>) {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string>("");

  const providerValue = useMemo(() => {
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
        setError(error.message);
      }
    };

    const logout = async () => {
      await AuthService.logout();
      setUser(null);
    };

    return {
      user,
      setUser,
      error,
      login,
      loginWithGoogle,
      logout,
    };
  }, [user, setUser, error]);

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
}
