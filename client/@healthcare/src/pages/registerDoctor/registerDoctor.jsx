import React, { useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import "./registerDoctor.scss";

const registerDoctor = () => {

    const [form, setForm] = useState({
        name: "",
        email: "",
        mobile: "",
        password: "",
        speclist: "",
        imgURL: "",
    })

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:9000/doctor/register",
                form
            );
            if (response.data) {
                toast.success(response.data.message);
            } else {
                toast.warn(response.data.message);

            }

            setForm({
                name: "",
                email: "",
                mobile: "",
                password: "",
                speclist: "",
                imgURL: "",
            })
        } catch (error) {
            console.error("Error creating doctor:", error);
        }
    };

    return (
        <div className="create-doctor">
            <h2>Create Doctor</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Mobile"
                    value={form.mobile}
                    onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="speclist"
                    value={form.speclist}
                    onChange={(e) => setForm({ ...form, speclist: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Image URL"
                    value={form.imgURL}
                    onChange={(e) => setForm({ ...form, imgURL: e.target.value })}
                    required
                />
                <button type="submit">Create Doctor</button>
            </form>
        </div>
    );
};

export default registerDoctor;
