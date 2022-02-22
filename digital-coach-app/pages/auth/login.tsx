import { SubmitHandler, useForm } from "react-hook-form";
import Button from "@App/components/atoms/Button";
import useAuthContext from "@App/lib/auth/AuthContext";
import styles from "@App/styles/LoginPage.module.scss";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import UnAuthGuard from "@App/lib/auth/UnAuthGuard";
import { TextField } from "@App/components/molecules/TextField";

interface LoginFormInputs {
  email: string;
  password: string;
}

const inputValidationSchema = yup
  .object({
    email: yup
      .string()
      .email("Must be a valid email")
      .max(255)
      .required("Email is required"),
    password: yup.string().min(7).max(255).required("Password is required"),
  })
  .required();

export default function LoginPage() {
  const {
    error: authError,
    currentUser,
    loginWithGoogle,
    login,
  } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors: formError },
  } = useForm<LoginFormInputs>({
    mode: "onSubmit",
    resolver: yupResolver(inputValidationSchema),
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = (data: LoginFormInputs) => {
    const { email, password } = data;
    login(email, password);
  };

  return (
    <UnAuthGuard>
      <h1>Digital Coach</h1>
      {authError && <p>{authError}</p>}
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2>Login</h2>
        <TextField type="email" placeholder="Email" {...register("email")} />
        {formError.email && <span>{formError.email.message}</span>}

        <TextField
          type="password"
          autoComplete="on"
          placeholder="Password"
          {...register("password")}
        />
        {formError.password && <span>{formError.password.message}</span>}

        <Button type="submit">Login</Button>
      </form>

      <Button onClick={loginWithGoogle}>Login with Google</Button>
      <h1>{currentUser?.id}</h1>
      <Link href="/auth/signup">
        <a>New user? sign up</a>
      </Link>
    </UnAuthGuard>
  );
}
