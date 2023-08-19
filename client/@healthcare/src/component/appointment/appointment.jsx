import React from 'react'
import './appointment.scss';
import { Link } from 'react-router-dom';
import Background from '../../assets/background.jpg';

export default function appointment() {
    return (
        <div className='appoinment'>
            <div className="appointment_container">
                <div className="heading">
                    <h3>Book an appoinment </h3>
                    <p>Gain immediate access to meal plans.</p>
                    <button><Link to="/doctor">Book now</Link></button>
                </div>
                <div className='emptydiv'>
                    <div >
                        <img src={Background} />
                    </div>
                </div>

            </div>

        </div>
    )
}
