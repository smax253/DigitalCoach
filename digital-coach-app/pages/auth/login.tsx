import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../../components/Button";
import useAuthContext from "../../lib/auth/AuthContext";
import styles from "../../styles/login.module.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField } from "../../components/TextField";
import Link from "next/link";
import UnAuthGuard from "../../lib/auth/UnAuthGuard";

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
  const { error: authError, user, loginWithGoogle, login } = useAuthContext();
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
      <h1>Login</h1>
      {authError && <p>{authError}</p>}

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
      <h1>{user?.id}</h1>
      <Link href="/auth/signup">
        <a>New user? sign up</a>
      </Link>
    </UnAuthGuard>
  );
}
