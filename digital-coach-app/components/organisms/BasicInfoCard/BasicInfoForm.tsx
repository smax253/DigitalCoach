import { TextField } from "@App/components/atoms/TextField";
import { useForm } from "react-hook-form";

interface FormAttributes {}

export default function BasicInfoForm() {
  const {} = useForm();

  return (
    <form>
      <TextField title="Interview Name" />
      <TextField title="Minutes Given to Answer" />
      <TextField title="Number of Retries Per Question" />
    </form>
  );
}
