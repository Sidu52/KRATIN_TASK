import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './dailyRoutine.scss';
import { toast } from 'react-toastify';

import { MdOutlinePending, MdCloudDone, MdOutlineCancel } from 'react-icons/md';

export default function dailyRoutine() {
    //Get data from localStorge
    const token = localStorage.getItem('jwtToken');
    const user = localStorage.getItem('localuser');
    const storedUser = JSON.parse(user);

    const [data, setData] = useState([]);
    const [form, setForm] = useState({
        date: '',
        time: '',
        task: '',
        status: ''
    });

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(
                    `https://kratin-task-backend.onrender.com/tasks/${storedUser.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                setData(response.data.data);

            } catch (error) {
                toast.warn("plz Login first")
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, [token, user.id]);

    const changeStatus = async (e, id, status) => {
        e.preventDefault();
        // Update the local state with the new status
        const updatedData = data.map(task => {
            if (task.id === id) {
                return { ...task, status: status };
            }
            return task;
        });
        setData(updatedData);
        //Change State in Database
        try {
            const response = await axios.post(
                "https://kratin-task-backend.onrender.com/updateTask",

                {
                    id: id,
                    status: status
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log("Task Added:", response.data);
        } catch (error) {
            console.error("Error:", error);
        }

    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(
                "https://kratin-task-backend.onrender.com/addtask",
                {
                    ...form,
                    id: storedUser.id // Include the user ID in the request payload
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            // Update the auto task
            setData([...data, response.data.data[0]]);
            setForm({
                date: '',
                time: '',
                task: '',
                status: ''
            });
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="Task_form">
            <h2>Track Daily Task</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="date">Date:</label>
                    <input
                        type="Date"
                        id="date"
                        name="date"
                        value={form.date}
                        onChange={(e) => setForm({ ...form, date: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="time">Time:</label>
                    <input
                        type="text"
                        id="time"
                        name="time"
                        value={form.time}
                        onChange={(e) => setForm({ ...form, time: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="task">Task:</label>
                    <input
                        type="task"
                        id="task"
                        name="task"
                        value={form.task}
                        onChange={(e) => setForm({ ...form, task: e.target.value })}
                    />
                </div>
                <button type="submit">Register</button>
            </form>
            {data.map((task, index) => (
                <div key={index} className="Task_container">
                    <p>{task.task_time}</p>
                    <div>
                        <p
                            style={{ background: task.status == "Done" ? "#d0ebd0" : task.status == "NotComplete" ? "#fba3a3c9" : "rgb(248 249 205)" }}
                            className='Task_name'>{task.task_name}</p>
                        {task.status === "Done" ?
                            <MdCloudDone
                                style={{ color: "#35a9c1" }}
                                onClick={((e) => changeStatus(e, task.id, "NotComplete"))} /> :
                            task.status === "NotComplete" ?
                                <MdOutlineCancel
                                    style={{ color: "#cb2424" }}
                                    onClick={((e) => changeStatus(e, task.id, "Pending"))} /> :
                                <MdOutlinePending
                                    style={{ color: "#edc333" }}
                                    onClick={((e) => changeStatus(e, task.id, "Done"))} />}
                    </div>
                </div>
            ))}

        </div>
    )
}
