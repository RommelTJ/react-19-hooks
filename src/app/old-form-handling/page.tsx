"use client";
import { useState } from "react";


const submitAction = async ({ name }: { name: string }) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return { name };
};

/*
 * Notes:
 * - Standard React form.
 * - Internal state
 *   - name, stores the current value of the name.
 *   - pending, stores the pending state of the form.
 * - onSubmit of the form, we call submitAction and we simulate a pending state by adding a delay of 2 seconds.
 * - This is intending to simulate a form that is interacting with some backend API.
 */
const OldFormHandling = () => {
    const [name, setName] = useState("");
    const [pending, setPending] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setPending(true);
        await submitAction({ name });
        setPending(false);
        setName("");
    };

    return (
        <div>
            <div>Old Form</div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    placeholder="Enter your name"
                    onChange={(e) => setName(e.target.value)}
                />
                <button type="submit">Submit</button>
                {pending && <p>Submitting {name}...</p>}
            </form>
        </div>
    );
};

export default OldFormHandling;
