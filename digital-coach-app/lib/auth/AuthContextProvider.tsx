import { PropsWithChildren, useEffect, useMemo, useState } from "react";
import AuthService from "./AuthService";
import { AuthContext } from "./AuthContext";
import UserService from "../user/UserService";
import { User } from "../user/models";

export function AuthContextProvider({ children }: PropsWithChildren<{}>) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    AuthService.onAuthStateChanged(async (user) => {
      if (user) {
        const userDetails = await UserService.getUser(user?.uid);
        console.log(userDetails);
        setCurrentUser(userDetails);
      }
    });
  }, []);

  const providerValue = useMemo(() => {
    const login = async (email: string, password: string) => {
      try {
        const { user } = await AuthService.login(email, password);
        const userDetails = await UserService.getUser(user.uid);

        setCurrentUser(userDetails);
      } catch (error: any) {
        setError(error.message);
      }
    };

    const loginWithGoogle = async () => {
      try {
        const { user } = await AuthService.loginWithGoogle();
        const userDetails = await UserService.getUser(user.uid);

        setCurrentUser(userDetails);
      } catch (error: any) {
        setError(error.message);
      }
    };

    const signup = async (email: string, password: string) => {
      try {
        const { user } = await AuthService.signup(email, password);

        await UserService.createNewUser(user);

        const userDetails = await UserService.getUser(user.uid);

        setCurrentUser(userDetails);
      } catch (error: any) {
        setError(error.message);
      }
    };

    const logout = async () => {
      setCurrentUser(null);

      await AuthService.logout();
    };

    const fetchUser = async (userId: string = currentUser!.id) => {
      const userDetails = await UserService.getUser(userId);
      setCurrentUser(userDetails);
    };

    return {
      currentUser,
      setCurrentUser,
      error,
      login,
      signup,
      loginWithGoogle,
      logout,
      fetchUser,
    };
  }, [currentUser, setCurrentUser, error]);

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
}
