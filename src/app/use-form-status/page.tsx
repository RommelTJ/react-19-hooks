"use client";
import { useFormStatus } from 'react-dom';


const submitAction = async (data: FormData) => {
  console.log("in submit action...", data);
    return await new Promise((resolve) => setTimeout(resolve, 2000));
};

const Form = () => {
  const { pending, data } = useFormStatus();
  
  return (
    <div>
      <div>UseFormStatus example</div>
      <input type="text" name="name" placeholder="Enter your name" />
      <button disabled={pending} type="submit">
        Submit
      </button>
      {pending && <p>Submitting {data.get("name") ? String(data.get("name")) : ""}...</p>}
    </div>
  );
};

/*
 * Notes:
 * - This is the old form, rewritten to use the new useFormStatus hook.
 * - useFormStatus automatically gives information about the status of the form.
 * - It does not take any arguments and returns:
 *   - pending, a boolean value indicating if the form is pending.
 *   - data, an object of type FormData containing the values of the form fields.
 *   - and other fields. See https://react.dev/reference/react-dom/hooks/useFormStatus
 * - Caveats:
 *   - Must be called from a component that is rendered inside a <form>
 *   - Will only return status information for a parent <form>.
 *     It will not return status information for any <form> rendered in that same component or children components.
 *
 * - Instead of onSubmit, we use the action prop. The field value is accessed via the data object.
 */
const UseFormStatus = () => {
  return (
    <form
      action={submitAction}
    >
      <Form />
    </form>
  );
};

export default UseFormStatus;
