import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Appointment.scss';
import { toast } from 'react-toastify';

const Appointment = () => {
    const { doctorId } = useParams();
    const [form, setForm] = useState({
        name: '',
        age: '',
        disease: '',
        mobile: '',
        doctor_id: doctorId,
        appointmentTime: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:9000/appointment", form);
            toast.warn(response.data.message)
        } catch (error) {
            console.error("Error Appointment Booking:", error);
        }
    };
    return (
        <div className="patient-form">
            <h2>Patient Information</h2>
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
                    <label htmlFor="disease">Disease:</label>
                    <input
                        type="text"
                        id="disease"
                        name="disease"
                        value={form.disease}
                        onChange={(e) => setForm({ ...form, disease: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="mobile">Mobile:</label>
                    <input
                        type="text"
                        id="mobile"
                        name="mobile"
                        value={form.mobile}
                        onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                    />
                </div>
                <select
                    value={form.appointmentTime}
                    onChange={(e) => setForm({ ...form, appointmentTime: e.target.value })}
                    required
                >
                    <option value="">Select Appointment Time</option>
                    <option value="9-10">9-10</option>
                    <option value="10-11">10-11</option>
                    <option value="11-12">11-12</option>
                    <option value="12-13">12-13</option>
                    <option value="13-14">13-14</option>
                    <option value="14-15">14-15</option>
                    <option value="15-16">15-16</option>
                    <option value="16-17">16-17</option>

                </select>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Appointment;
