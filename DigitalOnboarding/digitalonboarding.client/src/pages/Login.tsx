import { FormEvent } from "react";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { useAuth } from '../services/AuthProvider.tsx';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [errors, setErrors] = useState(); // State variable to store errors]

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        await logins();
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Email" />
                </div>
                <div className="form-group mt-2">
                    <input type="password" className="form-control" id="password" placeholder="Password" />
                    <small id="passwordHelp" className="form-text text-muted">Forgot Password?</small>
                </div>
                <button type="submit" className="btn btn-primary w-100 mt-2">Login</button>
                <a className="text-decoration-none" href="/register">
                    <small id="registerHelp" className="form-text text-muted">Don't have an Account?</small>
                </a>
                <div className="mt-3">
                    {
                        errors ? (
                            <div className="alert alert-danger" role="alert">
                                {errors}
                            </div>
                        ) : ('')
                    }
                </div>
            </form>
        </div>
    );

    async function logins() {
        const response = await fetch(
            'accounts/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to indicate JSON format
                },
                body: '{"email": "' + (document.getElementById("email") as HTMLInputElement).value + '", "password": "' + (document.getElementById("password") as HTMLInputElement).value + '"}'
            });
        const data = await response.json();
        console.log(data);
        if (data.errors) {
            setErrors(data.errors);
        }
        if (response.ok) {
            
            login();
            navigate('/');
        }
    }
};

export default Login;