import React, { useState } from 'react';
import loginImage from '../../assets/images/login.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../store/authSlice';


import "./Auth.scss"

const Login: React.FC = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submitForm = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        await dispatch<any>(login({email, password}));
        navigate("/");
    }

    return (
        <div id="auth-container">
            <article id="auth-card">
                <div className="card-shadow">
                    <section id="image-section">
                        <img src={loginImage} alt="Login" />
                    </section>
                    <section id="form-section">
                        <h2>Welcome back</h2>
                        <form action="" onSubmit={submitForm}>
                            <div className="input-field mb-1">
                                <input onChange={event => setEmail(event.target.value)} type="email" placeholder="Email" value={email} required />
                            </div>
                            <div className="input-field mb-2">
                                <input onChange={event => setPassword(event.target.value)} type="password" placeholder="Password" value={password} required />
                            </div>
                            <button>Login</button>
                        </form>
                        <p>Don&apos;t have an account? <Link to="/register">Register here</Link>!</p>
                    </section>
                </div>
            </article>
        </div>
    );
}

export default Login;