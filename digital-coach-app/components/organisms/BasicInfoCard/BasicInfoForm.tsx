import CheckboxInput from "@App/components/molecules/CheckboxInput";
import { TextField } from "@App/components/molecules/TextField";
import { useForm } from "react-hook-form";

interface FormAttributes {}

export default function BasicInfoForm() {
  const {} = useForm();

  return (
    <form>
      <TextField type="text" title="Interview Name" placeholder=' Interview Name' required/><br/>
      <TextField type="number" title="Minutes Given to Answer" placeholder=' Minutes Given to Answer' min='0' defaultValue=''/>
      <CheckboxInput>No Time Limit</CheckboxInput><br/>
      <TextField type="number" title='Number of Retries Per Question' placeholder=' Number of Retries Per Question' min='0' defaultValue=''/>
    </form>
  );
}
