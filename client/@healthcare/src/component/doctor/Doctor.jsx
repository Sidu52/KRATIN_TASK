import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Doctor.scss';
import sdoctor from '../../assets/doctor.jpg';

export default function Doctor() {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:9000/doctor');
                setData(response.data.data);
            } catch (error) {
                console.error('Error fetching doctor data:', error);
            }
        }
        fetchData();
    }, []);

    // Slice the data array to display only the first 4 doctors
    const displayedDoctors = data.slice(0, 4);

    return (
        <div className="doctor_component">
            <h3>Specialist</h3>
            <div className='cart_contianer'>
                {displayedDoctors.map((doctor, index) => (
                    <div key={index} className="doctor_cart">
                        <div className="img">
                            <img src={doctor.imgURL} alt={`Doctor ${doctor.name}`} />
                        </div>
                        <div className="doctor_data">
                            <h4 className="name">{doctor.name}</h4>
                            <p>{doctor.speclist}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
