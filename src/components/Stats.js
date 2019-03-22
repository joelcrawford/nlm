import React from 'react'
import img from '../assets/images/UB-woodblock-closeup.jpg'
import '../assets/css/stats.css'


const Stats = ({ stats, t }) => {
    return (
        <section className="wrapper special style3">
            <div className="inner">
                <section className="spotlights">
                    <section>
                        <h2>{t('stats.Title')}</h2>
                        <ul className="list-stats">
                            <li className="stat-item">
                                <p>{t('stats.LastUpdate')}: <em>{stats.LastUpdate}</em></p>
                            </li>
                            <li className="stat-item">
                            <p>{t('stats.PagesDigitized')}: <em>{stats.PagesDigitized}</em></p>
                            </li>
                            <li className="stat-item">
                            <p>{t('stats.VolumesDigitized')}: <em>{stats.VolumesDigitized}</em></p>
                            </li>
                            <li className="stat-item">
                            <p>{t('stats.VolumesCataloged')}: <em>{stats["VolumesCataloged(normalized)"]}</em></p>
                            </li>
                            <li className="stat-item">
                            <p>{t('stats.TitlesCataloged')}: <em>{stats["TitlesCataloged(ACIP)"]}</em></p>
                            </li>
                        </ul>
                    </section>
                    <section>
                        <span className="image"><img src={img} alt="" /></span>
                    </section>
                </section>
            </div>
        </section>
    )
    
}

export default Stats