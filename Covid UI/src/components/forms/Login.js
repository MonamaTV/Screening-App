import React, { useState } from 'react';
import './Forms.css';
import axios from '../../api/axios';
import { useHistory } from 'react-router-dom';
const Login = () => {

    //State
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        
        e.preventDefault();

        const screener = {
            email, 
            password
        }

        const token = await axios.post("/screeners/login", screener);
        const { data: User } = token;

        if(!User) return;

        history.push("/home");

    };

    return (
        <div className="forms">
            <form className="form__container">
                <h1>Login</h1>
                <small>You should be registered to use this login</small>

                <div className="input__group">
                    <label>Email</label>
                    <input 
                        autoComplete="off"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        type="text" 
                    />
                </div>

                <div className="input__group">
                    <label>Password</label>
                    <input 
                        autoComplete="off"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password" 
                    />
                </div>

                <div className="input__group">
                    <button onClick={handleLogin}>
                        Login
                    </button>
                </div>
                <small><a href="/changepassword">Forgot Password?</a></small>
            </form>
        </div>
    );
}

export default Login;
