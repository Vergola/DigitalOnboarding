import { FormEvent } from "react";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault(); // Prevents the default form submission behavior

        navigate('/dashboard');
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Email" />
                </div>
                <div className="form-group mt-2">
                    <input type="password" className="form-control" id="password" placeholder="Password" />
                    <small id="passwordHelp" class="form-text text-muted">Forgot Password?</small>
                </div>
                <button type="submit" className="btn btn-primary w-100 mt-2">Login</button>
            </form>
        </div>
    );
};

export default Login;