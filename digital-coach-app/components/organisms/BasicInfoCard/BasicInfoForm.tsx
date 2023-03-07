import CheckboxInput from "@App/components/molecules/CheckboxInput";
import { TextField } from "@App/components/molecules/TextField";
import { useForm } from "react-hook-form";

interface FormAttributes {}

export default function BasicInfoForm() {
  const {} = useForm();

  return (
    <form>
      <TextField title="Interview Name" placeholder=' Interview Name'/><br></br>
      <TextField title="Minutes Given to Answer" placeholder=' Minutes Given to Answer'/>
      <CheckboxInput>No Time Limit</CheckboxInput><br></br>
      <TextField title='Number of Retries Per Question' placeholder=' Number of Retries Per Question'/>
    </form>
  );
}
