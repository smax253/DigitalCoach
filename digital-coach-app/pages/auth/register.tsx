import { useForm } from "react-hook-form";
import { TextField } from "../../components/TextField";
import useAuthContext from "../../lib/auth/AuthContext";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import RegistrationGuard from "../../lib/user/RegistrationGuard";
import Button from "../../components/Button";
import { Select } from "../../components/Select";
import UserService from "../../lib/user/UserService";
import StorageService, {
  StorageFolders,
} from "../../lib/storage/StorageService";
import {
  UserDetails,
  UserConcentrations,
  UserProficiencies,
} from "../../lib/user/types";

interface RegFormInputs extends UserDetails {
  avatar: FileList;
}

const inputValidationSchema = yup
  .object({
    name: yup.string().max(255).required("Name is required"),
    concentration: yup.string().max(255).required("Concentration is required"),
    proficiency: yup.string().max(255).required("Proficiency is required"),
  })
  .required();

export default function RegisterPage() {
  const { user, fetchUser } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors: formError },
  } = useForm<RegFormInputs>({
    mode: "onSubmit",
    resolver: yupResolver(inputValidationSchema),
  });

  const onSubmit = async (data: RegFormInputs) => {
    const { name, concentration, proficiency } = data;

    const avatarUrl = await StorageService.upload(
      data.avatar[0],
      StorageFolders.profilePic,
      user!.id
    );

    await UserService.registerUser(user!.id, {
      name,
      concentration,
      proficiency,
      avatarUrl,
    });
    await fetchUser();
  };

  return (
    <RegistrationGuard>
      <h1>Registration</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="file" accept="image/*" {...register("avatar")} />

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
