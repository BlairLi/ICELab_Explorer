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
import {useState} from "react";
import Axios from "axios";
//import useWindowSize from './windowsize.js'
const Station = () => {
    //const size = useWindowSize();
    // const url = "http://planwebapi-env.eba-khpxdqbu.us-east-1.elasticbeanstalk.com/"
    const url = "http://127.0.0.1:5000/lastest-status";
    const [generatedExcuse, setGeneratedExcuse] = useState("");
    const [temp2m, setTemp2m] = useState("");
    const [rh2m, setRH2m] = useState("");
    const [ws3m, setWS3m] = useState("");
    const [wd3m, setWD3m] = useState("");
    const [press, setPress] = useState("");

    const fetchExcuse = (dev_id) => {
        Axios.get(`${url}/${dev_id}`).then(
            (resp) => {
                setGeneratedExcuse(resp.data);
                const { result } = resp.data;
                const Temp_2m = result.Temp_2m_C !== 0 ? result.Temp_2m_C : "NaN";
                const RH_2m = result.RH_2m_perc !== 0 ? result.RH_2m_perc : "NaN";
                const WS_3m_ms = result.WS_3m_ms !== 0 ? result.WS_3m_ms : "NaN";
                const WD_3m_deg = result.WD_3m_deg !== 0 ? result.WD_3m_deg : "NaN";
                const Press = result.Press_hPa !== 0 ? result.Press_hPa : "NaN";
                setTemp2m(Temp_2m);
                setRH2m(RH_2m);
                setWS3m(WS_3m_ms);
                setWD3m(WD_3m_deg);
                setPress(Press);
            }
        );
    };

    const handleDeviceChange = (event) => {
        const selectedDevice = event.target.value;
        let dev_id;
        switch (selectedDevice) {
        case "Choose1":
            dev_id = "000003";
            break;
        case "Choose2":
            dev_id = "000004";
            break;
        case "Choose3":
            dev_id = "000002";
            break;
        case "Choose4":
            dev_id = "000001";
            break;
        default:
            dev_id = "000000";
            break;
        }
        fetchExcuse(dev_id);
    };


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

        <div className="drop-down" >
            <select onChange={handleDeviceChange}>
                    <option value="Choose1">White Glacier Nunatak</option>
                    <option value="Choose2">White Glacier Melt Zone</option>
                    <option value="Choose3">White Glacier Moraine</option>
                    <option value="Choose4">Colour Lake</option>
            </select>
        </div>

        <div className="Scrollbar">
            <p className="Device-SS">Climate Variable</p >
            <div className="blue-block"></div>
            <TbTemperature className='TbTemperature'/>
            <p className="TbTemperature_Text">Temperature</p >
            <p className="TbTemperature_Text2">{temp2m}°C</p >

            <div className="blue-block2"></div>
            <SlGraph className='SlGraph'/>
            <p className="RH_Text">RH</p >
            <p className="RH_Text2">{rh2m}%</p >

            <div className="blue-block3"></div>
            <CgPinBottom className='CgPinBottom'/>
            <p className="CgPinBottom_Text">BP</p >
            <p className="CgPinBottom_Text2">{press} hPa</p >

            <div className="blue-block4"></div>
            <FaWind className='FaWind'/>
            <p className="FaWind_Text">Wind Speed</p >
            <p className="FaWind_Text2">{ws3m} m/s</p >

            <div className="blue-block5"></div>
            <FaDirections className='FaDirections'/>
            <p className="FaDirections_Text">WindDir</p >
            <p className="FaDirections_Text2">{wd3m} Deg</p >

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