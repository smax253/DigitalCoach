import { PropsWithChildren, useMemo, useState } from "react";
import AuthService from "./AuthService";
import { AuthContext } from "./AuthContext";
import UserService, { User } from "../user/UserService";

export function AuthContextProvider({ children }: PropsWithChildren<{}>) {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string>("");

  const providerValue = useMemo(() => {
    const login = async (email: string, password: string) => {
      try {
        const { user } = await AuthService.login(email, password);
        const userDetails = await UserService.getUser(user.uid);

        setUser(userDetails);
      } catch (error: any) {
        setError(error.message);
      }
    };

    const loginWithGoogle = async () => {
      try {
        const { user } = await AuthService.loginWithGoogle();
        const userDetails = await UserService.getUser(user.uid);

        setUser(userDetails);
      } catch (error: any) {
        setError(error.message);
      }
    };

    const signup = async (email: string, password: string) => {
      try {
        const { user } = await AuthService.signup(email, password);

        await UserService.createNewUser(user);

        const userDetails = await UserService.getUser(user.uid);

        setUser(userDetails);
      } catch (error: any) {
        setError(error.message);
      }
    };

    const logout = async () => {
      await AuthService.logout();
      setUser(null);
    };

    const fetchUser = async () => {
      const userDetails = await UserService.getUser(user!.id);
      setUser(userDetails);
    };

    return {
      user,
      setUser,
      error,
      login,
      signup,
      loginWithGoogle,
      logout,
      fetchUser,
    };
  }, [user, setUser, error]);

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
}
