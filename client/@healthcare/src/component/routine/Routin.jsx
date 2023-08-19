import React from 'react'
import './Routine.scss';
import womenimg from '../../assets/women.jpg';

export default function Routin() {
    return (
        <div className='routine'>
            <div className="routine_container">
                <div className="img_box">
                    <img src={womenimg} />
                </div>
                <div className="heading">
                    <h1>A Day in the Life </h1>
                    <p>Balance in daily habits nourishes a thriving life.</p>
                    <div className="heaing_data">
                        <div className="box">
                            <h3>Morning</h3>
                            <p>Start your day with a glass of warm water and lemon to kickstart metabolism.</p>
                            <p>Have a well-rounded breakfast with lean protein, whole grains, and fresh fruits.</p>
                        </div>
                        <div className="box">
                            <h3>Noon</h3>
                            <p>Opt for a nutrient-rich lunch that includes vegetables, lean protein, and healthy fats.</p>
                            <p>Stay hydrated with water or herbal teas to maintain energy levels throughout the day.</p>
                        </div>
                        <div className="box">
                            <h3>Evening</h3>
                            <p>Choose a light dinner with lean protein, leafy greens, and a small portion of complex carbohydrates.</p>
                            <p>Avoid heavy meals close to bedtime to promote better digestion and sleep.</p>
                        </div>
                        <div className="box">
                            <h3>Night</h3>
                            <p>Prioritize a light snack, such as Greek yogurt or a handful of nuts, if needed.</p>
                            <p>Stay hydrated, but reduce fluid intake closer to bedtime to avoid disrupting sleep with nighttime bathroom trips.</p>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}
