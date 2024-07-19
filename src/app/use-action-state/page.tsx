"use client";
// import { useActionState } from "react";
import { useFormState } from 'react-dom'; // Workaround for nextJS. See notes below.


async function submitAction(currentState: { name: string; processed: boolean }, formData: FormData) {
    console.log("in submit action with state", currentState, formData);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return { name: currentState.name, processed: !currentState.processed };
}

/*
 * Notes:
 * - useActionState params:
 *   - submitData, function called when form is submitted.
 *     The first time it's called, it receives the initialState as its input.
 *     Subsequent calls receive the state of the last time the action was called.
 *   - initialState, initial value of the state for the form.
 * - useActionState returns:
 *   - state, the current state of the component.
 *   - formAction, a new action that you can pass to the action prop to your component.
 *     It executes the action that you pass with the current state, and returns a new updated state.
 * - https://react.dev/reference/react/useActionState for more information.
 * - Caveat: Required me to use a canary version of NextJS:
 *   TypeError: (0 , react__WEBPACK_IMPORTED_MODULE_1__.useActionState) is not a function or its return value is not iterable
 *   https://stackoverflow.com/questions/78445719/error-0-react-webpack-imported-module-1-useactionstate-is-not-a-function
 */
const UseActionState = () => {
    const [state, formAction] = useFormState(submitAction, {
      name: "",
      processed: false
    });
    console.log("state: ", state);

    return (
      <div>
          <div>Use Action State</div>
          <form action={formAction}>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
              />
              <button type="submit">Submit</button>
              <p>Processed: {String(state.processed)}</p>
          </form>
      </div>
    );
};

export default UseActionState;
