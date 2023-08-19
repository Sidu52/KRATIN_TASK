import React, { useState, useEffect } from 'react';
import './Home.scss';
import Header from '../../component/header/Header';
import Footer from '../../component/footer/Footer';
import Routin from '../../component/routine/Routin';
import Dappointment from '../../component/appointment/appointment';
import Doctor from '../../component/doctor/Doctor';
import Background1 from '../../assets/background1.jpg';

function Home() {
    const [headerOpacity, setHeaderOpacity] = useState(1);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            if (scrollY > 250) {
                setHeaderOpacity(0);
            } else {
                setHeaderOpacity(1);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <main>
            <div className="background">
                <div className="img">
                    <img src={Background1} alt="img" />
                </div>
            </div>
            <div className='home'>
                <div style={{ opacity: headerOpacity, transition: "opacity 0.3s linear" }}>
                    <Header />
                </div>
                <div className="main">
                    <div className='emptydiv'></div>
                    <div className='heading'>
                        <h3>Taste The Transformation </h3>
                        <p>Use our online meal plans and session to transform and energize your life.</p>
                        <button>Submit</button>
                    </div>
                </div>
            </div>
            <div className="service">
                <p>Lifestyle</p>
                <p>Doctor</p>
                <p>Live Healthy</p>
                <p>Healthy Diet</p>
            </div>
            <Routin />
            <Dappointment />
            <div style={{ width: "100%", height: "50vh" }}></div>
            <Doctor />
        </main>
    );
}

export default Home;
