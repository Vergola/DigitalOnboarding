import { FormEvent } from "react";
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault(); // Prevents the default form submission behavior
        await register();
        navigate('/login');
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Email" />
                </div>
                <div className="form-group mt-2">
                    <input type="password" className="form-control" id="password" placeholder="Password" />
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
        console.log(data);
    }
};

export default Register;