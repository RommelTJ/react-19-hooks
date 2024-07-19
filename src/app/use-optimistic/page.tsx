"use client";
import { useOptimistic, useState } from "react";


const submitTitle = async (formData: FormData) => {
    console.log("Submitting title: ", formData);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // Decide randomly whether to throw an error or return a string
    if (Math.random() < 0.5) {
      throw new Error("Boom roasted!");
    } else {
      return "Hey, I'm the real title!";
    }
};

/*
 * useOptimistic
 * - Lets you optimistically update the UI.
 * - Inputs:
 *   - actualState, the value of the state when no action is pending.
 *   - updateFunction, an optional function that takes the actual state and the value passed to setOptimisticState
 *     to calculate the optimistic state. If not specified, the optimistic state is equal to the new value.
 * - Outputs:
 *   - optimisticState, the temporary value shown while the action is pending.
 *   - setOptimisticState, a function that updates the optimistic state to a new value.
 * https://react.dev/reference/react/useOptimistic
 */
const UseOptimistic = () => {
  const [title, setTitle] = useState("Title");
  const [optimisticTitle, setOptimisticTitle] = useOptimistic(title);
  const [error, setError] = useState<Error | null>(null);
  const pending = title !== optimisticTitle;

  const handleSubmit = async (formData: FormData) => {
    setError(null);
    setOptimisticTitle(String(formData.get("title")));
    try {
      const updatedTitle = await submitTitle(formData);
      setTitle(updatedTitle);
    } catch (e) {
      setError(e as Error);
    }
  };

    return (
      <div>
        <div>Use Optimistic Title: {optimisticTitle}</div>
        <p> {pending && "Updating..."} </p>
        <form action={handleSubmit}>
          <input type="text" name="title" placeholder="Change Title"/>
          <button type="submit" disabled={pending}>
            Submit
          </button>
        </form>
        <div className="error">{error && error.message}</div>
      </div>
    );
};

export default UseOptimistic;
