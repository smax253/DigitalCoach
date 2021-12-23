import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../../components/Button";
import useAuthContext from "../../lib/auth/AuthContext";
import styles from "../../styles/login.module.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField } from "../../components/TextField";
import Link from "next/link";

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
  const { error, user, loginWithGoogle, login } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    mode: "onSubmit",
    resolver: yupResolver(inputValidationSchema),
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = (data: LoginFormInputs) => {
    console.log(data);
    const { email, password } = data;
    login(email, password);
  };

  return (
    <div>
      <h1>Login</h1>
      {error && <p>{error}</p>}

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <TextField type="email" placeholder="Email" {...register("email")} />
        {errors.email && <span>This field is required</span>}

        <TextField
          type="password"
          autoComplete="on"
          placeholder="Password"
          {...register("password")}
        />
        {errors.password && <span>This field is required</span>}

        <Button type="submit">Login</Button>
      </form>

      <Button onClick={loginWithGoogle}>Login with Google</Button>
      <h1>{user?.uid}</h1>
      <Link href="/auth/signup">
        <a>New user? sign up</a>
      </Link>
    </div>
  );
}
