import useAuthContext from "../../lib/auth/AuthContextProvider";

export default function Login() {
  const { error, user, loginWithGoogle } = useAuthContext();

  return (
    <div>
      <h1>Login</h1>
      {error && <p>{error}</p>}
      <button onClick={loginWithGoogle}>Google</button>
      <h1>{user?.uid}</h1>
    </div>
  );
}
