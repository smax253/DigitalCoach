import { useForm } from "react-hook-form";
import Button from "@App/components/atoms/Button";
import useAuthContext from "@App/lib/auth/AuthContext";
import styles from "@App/styles/login.module.scss";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField } from "@App/components/TextField";
import Link from "next/link";
import UnAuthGuard from "@App/lib/auth/UnAuthGuard";

interface LoginFormInputs {
  email: string;
  password: string;
  passwordConfirm: string;
}

const inputValidationSchema = yup
  .object({
    email: yup
      .string()
      .email("Must be a valid email")
      .max(255)
      .required("Email is required"),
    password: yup.string().min(7).max(255).required("Password is required"),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  })
  .required();

export default function SignUpPage() {
  const { error: authError, currentUser, signup } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors: formError },
  } = useForm<LoginFormInputs>({
    mode: "onSubmit",
    resolver: yupResolver(inputValidationSchema),
  });

  const onSubmit = (data: LoginFormInputs) => {
    const { email, password } = data;
    signup(email, password);
  };

  return (
    <UnAuthGuard>
      <h1>Sign up</h1>
      <h1>{currentUser?.id}</h1>

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

        <TextField
          type="password"
          autoComplete="on"
          placeholder="Confirm Password"
          {...register("passwordConfirm")}
        />
        {formError.passwordConfirm && (
          <span>{formError.passwordConfirm.message}</span>
        )}

        <Button type="submit">sign up</Button>
      </form>

      <Link href="/auth/login">
        <a>Have an account? log in</a>
      </Link>
    </UnAuthGuard>
  );
}
