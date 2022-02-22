import CheckboxInput from "@App/components/molecules/CheckboxInput";
import { TextField } from "@App/components/molecules/TextField";
import { useForm } from "react-hook-form";

interface FormAttributes {}

export default function BasicInfoForm() {
  const {} = useForm();

  return (
    <form>
      <TextField title="Interview Name" />
      <TextField title="Minutes Given to Answer" />
      <span>Number of Retries Per Question</span>

      <CheckboxInput>No Time Limit</CheckboxInput>
      <TextField />
    </form>
  );
}
