import React, { useState } from "react";

interface UserInputFormProps {
    onSubmit: (userSelection: string) => void;
}

const UserInputForm = ({ onSubmit }: UserInputFormProps) => {

    const [userSelection, setUserSelection] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(userSelection);
    }

    return (
        <form 
            onSubmit={handleSubmit}
            className="form-container"
        >
            <label>
                <input 
                    type="text"
                    value={userSelection}
                    onChange={(e) => setUserSelection(e.target.value)}
                    className="form-input"
                />
            </label>
            <button 
                type="submit"
                className="form-btn"
            >
                Submit
            </button>
        </form>
    )
}

export default UserInputForm;
