"use client";
import { useState } from "react";


const submitAction = async ({ name }: { name: string }) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return { name };
};

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
