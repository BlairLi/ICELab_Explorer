import "@picocss/pico"
import '../css/CreateNewDash.css';
import { Route, Routes, Link } from "react-router-dom"
import React, { Component }  from 'react';

//import useWindowSize from './windowsize.js'
function CreateNew () {
    //const size = useWindowSize();
    return (
        <>
        {/* {size.width > 600} */}
        <div className="stationbar">
            <div>Station</div>
            <details>
                <summary>RX3000</summary>
                <ul>
                    <li>PAR</li>
                    <li>Wind Speed</li>
                    <li>PAR</li>
                    <li>PAR</li>
                </ul>
            </details>

            <details open>
                <summary>Accordion 2</summary>
                <ul>
                    <li>…</li>
                    <li>…</li>
                </ul>
            </details>
        </div>
        <p className="Select_Data">Select Data Type:</p>
        <div className="BB1"></div>
            <FaWind className='FaWind'/>
            <p className="FaWind_Text">LINE CHART</p>
        <div className="BB2"></div>
            <FaWind className='FaWind'/>
            <p className="FaWind_Text">BAR CHART</p>
        <div className="BB3"></div>
            <FaWind className='FaWind'/>
            <p className="FaWind_Text">AREA CHART</p>
        </>
    );
}

export default CreateNew;