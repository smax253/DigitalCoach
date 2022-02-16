import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../../components/Button";
import useAuthContext from "../../lib/auth/AuthContext";
import styles from "../../styles/login.module.scss";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField } from "../../components/TextField";
import Link from "next/link";
import UnAuthGuard from "../../lib/auth/UnAuthGuard";
import Card from 'react-bootstrap/Card';

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
      <Card className={styles.loginCard}>
      {authError && <p>{authError}</p>}
      <Card.Title className={styles.title}>Digital <br />Coach</Card.Title>
      <Card.Subtitle className={styles.login}>Login</Card.Subtitle>
      <form onSubmit={handleSubmit(onSubmit)}>
      <Card.Text className={styles.subhead}>Username/Email</Card.Text>
        <TextField type="email" placeholder="Email" {...register("email")} />
        {formError.email && <span>{formError.email.message}</span>}
        <Card.Text className={styles.subhead}>Password</Card.Text>
        <TextField
          type="password"
          autoComplete="on"
          placeholder="Password"
          {...register("password")}
        />
        {formError.password && <span>{formError.password.message}</span>}
        <br/>
        <Button type="submit" className={styles.basicb}>Login</Button>
      </form>

      <Button onClick={loginWithGoogle} className={styles.basicb}>Login with Google</Button>
      <h1>{currentUser?.id}</h1>
      <Link href="/auth/signup">
        <a>New user? sign up</a>
      </Link>
      </Card>
    </UnAuthGuard>
  );
}
