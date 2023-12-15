import { FormEvent } from "react";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";

const Register = () => {
    const [errors, setErrors] = useState([]); // State variable to store errors]
    const navigate = useNavigate();

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault(); // Prevents the default form submission behavior
        await register();
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Email" />
                </div>
                <div className="form-group mt-2">
                    <input type="password" className="form-control" id="password" placeholder="Password" />
                    <div className="mt-3">
                        {
                            errors?.map(error => {
                                return (
                                    <div className="alert alert-danger" role="alert">
                                        {error}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <button type="submit" className="btn btn-primary w-100 mt-2">Register</button>
            </form>
        </div>
    );

    async function register() {
        const response = await fetch(
            'accounts',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to indicate JSON format
                },
                body: '{"email": "' + (document.getElementById("email") as HTMLInputElement).value + '", "password": "' + (document.getElementById("password") as HTMLInputElement).value + '"}'
            });
        const data = await response.json();
        if (data.errors) {
            setErrors(data.errors);
        }
        if (response.ok) {
            navigate("/login");
        }
    }
};

export default Register;