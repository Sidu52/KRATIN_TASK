import React, { useState } from 'react';
import axios from 'axios';
import './style.scss';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const LoginUser = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:9000/signin",
                form
            );
            if (response.data) {
                toast.success(response.data.message);
                localStorage.setItem('jwtToken', response.data.token);
                localStorage.setItem('localuser', response.data.user);
                navigate('/routine');
            } else {
                toast.warn(response.data.message)
            }

            setForm({
                email: '',
                password: ''
            })
        } catch (error) {
            console.error("Error resiter user:", error);
        }

    };

    return (
        <div className="login-form">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />
                </div>
                <button type="submit">Login</button>
                <div>Create new account: <Link to="/user/register">Click here..</Link></div>
            </form>
        </div>
    );
};

export default LoginUser;
