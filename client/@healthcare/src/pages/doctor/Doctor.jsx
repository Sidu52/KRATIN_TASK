import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Doctor.scss';

function Doctor() {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchdata() {
            const response = await axios.get('https://kratin-task-backend.onrender.com/doctor')
            if (!response.data) {
                console.log(response.data.message)
            } else {
                setData(response.data.data);
            }
        }
        fetchdata();
    }, []);



    return (
        <div className="doctor">
            <h3>Doctors</h3>
            <div className='cart_contianer'>
                {data.map((doctor, index) => (
                    <Link to={`/user/appointment/${doctor.id}`} key={index} className="doctor_cart">
                        <div className="img">
                            <img src={doctor.imgURL} />
                        </div>
                        <div className="doctor_data">
                            <h4 className="name">{doctor.name}</h4>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <p>{doctor.speclist}</p>
                                <p>{doctor.mobile}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Doctor;
