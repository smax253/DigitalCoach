import { useForm } from "react-hook-form";
import { TextField } from "../../components/TextField";
import useAuthContext from "../../lib/auth/AuthContext";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import RegistrationGuard from "../../lib/user/RegistrationGuard";
import Button from "../../components/Button";
import { Select } from "../../components/Select";
import UserService, { UserDetails } from "../../lib/user/UserService";

enum UserConcentrations {
  Technology = "Technology",
  Marketing = "Marketing",
  Finance = "Finance",
  Sales = "Sales",
  HR = "HR",
  Legal = "Legal",
  Operations = "Operations",
  Engineering = "Engineering",
  Product = "Product",
  Design = "Design",
}

enum UserProficiencies {
  Student = "Student",
  NewGrad = "New Grad",
  Entry = "Entry Level",
  Mid = "Mid Level",
  Late = "Late Career",
}

const inputValidationSchema = yup
  .object({
    name: yup.string().max(255).required("Name is required"),
    concentration: yup.string().max(255).required("Concentration is required"),
    proficiency: yup.string().max(255).required("Proficiency is required"),
  })
  .required();

export default function RegisterPage() {
  const { user, setUser } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors: formError },
  } = useForm<UserDetails>({
    mode: "onSubmit",
    resolver: yupResolver(inputValidationSchema),
  });

  const onSubmit = async (data: UserDetails) => {
    await UserService.registerUser(user!.id, data);
    const regUser = await UserService.getUser(user!.id);
    setUser(regUser);
  };

  return (
    <RegistrationGuard>
      <h1>Registration</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField placeholder="Full Name" {...register("name")} />
        {formError.name && <span>{formError.name.message}</span>}

        <Select {...register("concentration")}>
          {Object.values(UserConcentrations).map((concentration) => (
            <option value={concentration} key={concentration}>
              {concentration}
            </option>
          ))}
        </Select>
        {formError.concentration && (
          <span>{formError.concentration.message}</span>
        )}

        <select {...register("proficiency")}>
          {Object.values(UserProficiencies).map((proficiency) => (
            <option value={proficiency} key={proficiency}>
              {proficiency}
            </option>
          ))}
        </select>
        {formError.proficiency && <span>{formError.proficiency.message}</span>}

        <Button type="submit">sign up</Button>
      </form>
    </RegistrationGuard>
  );
}
