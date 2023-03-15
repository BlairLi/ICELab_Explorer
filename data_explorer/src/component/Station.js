import "@picocss/pico"
import '../css/Devices.css';
import { Route, Routes, Link } from "react-router-dom"
import React, { Component }  from 'react';
import { CiViewBoard } from 'react-icons/ci';
import { BsGraphUp } from 'react-icons/bs';
import { BsFillJournalBookmarkFill } from 'react-icons/bs';
import { TbTemperature } from 'react-icons/tb';
import { SlGraph } from 'react-icons/sl';
import { CgPinBottom } from 'react-icons/cg';
import { FaWind } from 'react-icons/fa';
import { FaDirections } from 'react-icons/fa';

//import useWindowSize from './windowsize.js'
const Station = () => {
    //const size = useWindowSize();
    return (
        <>
        {/* {size.width > 600} */}
        <div className="grey-block">
            <p className="Device-device">Devices</p >
            <CiViewBoard className='CiViewBoard'/>
            <Link to="/Station">
                <p className="Device-Overview">Overview</p >
            </Link>
            <Link to="/Graphs">
                <BsGraphUp className='iconBsGraphUp'/>
                <p className="Device-Graphs">Graphs</p >
            </Link>
            {/* <BsFillJournalBookmarkFill className='iconGrCatalog'/> */}
            {/* <p className="Device-Logs">Logs</p > */}
        </div>

        <div className="drop-down">
            <select>
                <option value="RA3000">RA3000</option>
                <option value="RA4000">RA4000</option>
                <option value="RA5000">RA5000</option>
            </select>
        </div>

        <div className="Scrollbar">
            <p className="Device-SS">Climate Variable</p >
            <div className="blue-block"></div>
            <TbTemperature className='TbTemperature'/>
            <p className="TbTemperature_Text">AirTC</p >
            <p className="TbTemperature_Text2">-8.7°C</p >

            <div className="blue-block2"></div>
            <SlGraph className='SlGraph'/>
            <p className="RH_Text">RH</p >
            <p className="RH_Text2">84.2%</p >

            <div className="blue-block3"></div>
            <CgPinBottom className='CgPinBottom'/>
            <p className="CgPinBottom_Text">BP</p >
            <p className="CgPinBottom_Text2">959.3 hPa</p >

            <div className="blue-block4"></div>
            <FaWind className='FaWind'/>
            <p className="FaWind_Text">Wind Speed</p >
            <p className="FaWind_Text2">12.3 m/s</p >

            <div className="blue-block5"></div>
            <FaDirections className='FaDirections'/>
            <p className="FaDirections_Text">WindDir</p >
            <p className="FaDirections_Text2">167.5 Deg</p >

        </div>

        <p className="Device-Info">Device Information</p >
        <div className="grey-block2"></div>
        <p className="Status">Status: Logging</p >
        <div className="grey-block3"></div>
        <p className="Memory">Memory: Wrapping</p >
        <div className="grey-block4"></div>
        <p className="NickName">Nickname: d1</p >
        <div className="grey-block5"></div>
        <p className="Serial_Number">Serial Number: 20181345</p >

        <p className="Communcation">Communication</p >
        <div className="grey-block6"></div>
        <p className="Plan_Number">Plan Number: 001</p >
        <div className="grey-block7"></div>
        <p className="Plan_Start">Plan Start Date: 2020-09-01</p >

        </>
    );
}

export default Station;