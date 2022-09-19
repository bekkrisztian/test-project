import React, { useState } from 'react';
import registerImage from '../../assets/images/register.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from '../../store/registerSlice';

const Register: React.FC = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("male");
    const [password, setPassword] = useState("");

    const submitForm = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        await dispatch<any>(register({email, password, firstName, lastName, gender}));
        navigate("/");
    }

    return (
        <div id="auth-container">
            <article id="auth-card">
                <div className="card-shadow">
                    <section id="image-section">
                        <img src={registerImage} alt="Register" />
                    </section>
                    <section id="form-section">
                        <h2>Create an account</h2>
                        <form onSubmit={submitForm}>
                            <div className="input-field mb-1">
                                <input onChange={event => setFirstName(event.target.value)} value={firstName} type="text" placeholder="First Name" required />
                            </div>
                            <div className="input-field mb-1">
                                <input onChange={event => setLastName(event.target.value)} value={lastName} type="text" placeholder="Last Name" required />
                            </div>
                            <div className="input-field mb-1">
                                <select onChange={event => setGender(event.target.value)} value={gender} required>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                            <div className="input-field mb-1">
                                <input onChange={event => setEmail(event.target.value)} value={email} type="email" placeholder="Email" required />
                            </div>
                            <div className="input-field  mb-2">
                                <input onChange={event => setPassword(event.target.value)} value={password} type="password" placeholder="Password" required minLength={8}/>
                            </div>
                            <button>Register</button>
                        </form>
                        <p>Already have an account? <Link to="/login">Login here</Link>!</p>
                    </section>
                </div>
            </article>
        </div>
    );
}

export default Register;