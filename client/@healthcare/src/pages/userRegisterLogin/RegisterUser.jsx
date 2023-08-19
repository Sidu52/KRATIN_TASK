import React, { useState } from 'react';
import axios from 'axios';
import './style.scss';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const RegisterUser = () => {
    const [form, setForm] = useState({
        name: '',
        age: '',
        email: '',
        password: ''
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:9000/register",
                form
            );
            if (response.data) {
                toast.success(response.data.message);
            } else {
                toast.warn(response.data.message);
            }
            console.log("User Register:", response.data);

            setForm({
                name: '',
                age: '',
                email: '',
                password: ''
            })
        } catch (error) {
            console.error("Error resiter user:", error);
        }
    };

    return (
        <div className="register-form">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="age">Age:</label>
                    <input
                        type="number"
                        id="age"
                        name="age"
                        value={form.age}
                        onChange={(e) => setForm({ ...form, age: e.target.value })}
                    />
                </div>
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
                <button type="submit">Register</button>
                <div>Already have a account: <Link to="/user/login">Click here..</Link></div>
            </form>
        </div>
    );
};

export default RegisterUser;
