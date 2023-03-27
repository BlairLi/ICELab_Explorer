import "@picocss/pico"
import '../css/Devices.css';
import { Route, Routes, Link } from "react-router-dom"
import React, { Component, useState, useEffect}  from 'react';
import { CiViewBoard } from 'react-icons/ci';
import { BsGraphUp } from 'react-icons/bs';
import { FaRegSnowflake } from 'react-icons/fa';
import { WiHumidity } from 'react-icons/wi';
import { GiRadiations } from 'react-icons/gi';
import { TbTemperature } from 'react-icons/tb';
import { CgPinBottom } from 'react-icons/cg';
import { GiBattery75 } from 'react-icons/gi';
import { FaWind } from 'react-icons/fa';
import { FaDirections } from 'react-icons/fa';
import { FaRadiation } from 'react-icons/fa';
import Axios from "axios";
//import useWindowSize from './windowsize.js'
const Station = () => {
    const [selectedValue, setSelectedValue] = useState('Choose1');
    const url = "http://127.0.0.1:7000/lastest-status";
    const [generatedExcuse, setGeneratedExcuse] = useState("");
    const [temp2m, setTemp2m] = useState("");
    const [rh2m, setRH2m] = useState("");
    const [ws3m, setWS3m] = useState("");
    const [wd3m, setWD3m] = useState("");
    //const [press, setPress] = useState("");
    const [devvid, setDevId] = useState("000003");
    const [timerr, setTimer] = useState(202207231530);
    const [snowdepth, setSnowdepth] = useState("");
    const [snowdepthm, setSnowdepthm] = useState("");
    const [icedis, setIcedis] = useState("");
    const [shortwin, setShortwin] = useState("");
    const [shortwout, setShortwout] = useState("");
    const [longwin, setLongwin] = useState("");
    const [longwout, setLongwout] = useState("");

    useEffect(() => {
      fetchExcuse('000003');
      }, []);

    useEffect(() => {
      const event = new CustomEvent('devvidChanged', { detail: devvid });
      window.dispatchEvent(event);
      localStorage.setItem('selectedDeviceId', devvid);
      }, [devvid]);
      
    function formatDate(numericDate) {
      // Convert the numeric value to a string
      const dateString = String(numericDate);
    
      // Extract the year, month, and day parts from the string
      const year = dateString.slice(0, 4);
      const month = dateString.slice(4, 6);
      const day = dateString.slice(6, 8);
    
      // Return the formatted date
      return `${year}-${month}-${day}`;
    }
    
    const fetchExcuse = async (dev_id) => {
        Axios.get(`${url}/${dev_id}`).then(
            (resp) => {
                setGeneratedExcuse(resp.data);
                const { result } = resp.data;
                //alert(JSON.stringify(resp.data));
                const Temp_2m = result.Temp_2m_C !== 0 ? result.Temp_2m_C : "NaN";
                const RH_2m = result.RH_2m_perc !== 0 ? result.RH_2m_perc : "NaN";
                const WS_3m = result.WS_3m_ms !== 0 ? result.WS_3m_ms : "NaN";
                const WD_3m = result.WD_3m_deg !== 0 ? result.WD_3m_deg : "NaN";
                //const Press = result.Press_hPa !== 0 ? result.Press_hPa : "NaN";
                const Timenow = result.TIMESTAMP;
                const Depth_snow = result.Depth_snow_m_avg !== 0 ? result.Depth_snow_m_avg : "NaN";
                const Depth_snow_m = result.Depth_snow_m !== 0 ? result.Depth_snow_m : "NaN";
                const Dist_2_Ice = result.Dist_2_Ice_m !== 0 ? result.Dist_2_Ice_m : "NaN";
                const SW_in = result.SW_in_wm2 !== 0 ? result.SW_in_wm2 : "NaN";
                const SW_out = result.SW_out_wm2 !== 0 ? result.SW_out_wm2 : "NaN";
                const LW_in = result.LW_in_wm2 !== 0 ? result.LW_in_wm2 : "NaN";
                const LW_out = result.LW_out_wm2 !== 0 ? result.LW_out_wm2 : "NaN";
                setTemp2m(Temp_2m);
                setRH2m(RH_2m);
                setWS3m(WS_3m);
                setWD3m(WD_3m);
                //setPress(Press);
                setSnowdepth(Depth_snow);
                setSnowdepthm(Depth_snow_m);
                setIcedis(Dist_2_Ice);
                setShortwin(SW_in);
                setShortwout(SW_out);
                setLongwin(LW_in);
                setLongwout(LW_out);
                setTimer(Timenow);
            }
        );
    };

    const handleDeviceChange = (event) => {
      const selectedDevice = event.target.value;
      setSelectedValue(selectedDevice);
      let newDevId;
      switch (selectedDevice) {
      case "Choose1":
          newDevId = "000003";
          break;
      case "Choose2":
          newDevId = "000004";
          break;
      case "Choose3":
          newDevId = "000002";
          break;
      case "Choose4":
          newDevId = "000001";
          break;
      default:
          newDevId = "000000";
          break;
      }
      fetchExcuse(newDevId);
      setDevId(newDevId); // Update the dev_id state
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

        <div className="drop-down">
            <select id="mySelect" onChange={handleDeviceChange}>
                    <option value="Choose1">White Glacier Nunatak</option>
                    <option value="Choose2">White Glacier Melt Zone</option>
                    <option value="Choose3">White Glacier Moraine</option>
                    <option value="Choose4">Colour Lake</option>
            </select>
        </div>
        <p className="Device-SS">Climate Variable</p >
        <div className="Scrollbar">
        {selectedValue === 'Choose2' ? (
          <>
            <div className="blue-block"></div>
            <TbTemperature className='TbTemperature'/>
            <p className="TbTemperature_Text">Temperature</p >
            <p className="TbTemperature_Text2">{temp2m}°C</p >

            <div className="blue-block2"></div>
            <WiHumidity className='WiHumidity'/>
            <p className="RH_Text">RH</p >
            <p className="RH_Text2">{rh2m}%</p >

            <div className="blue-block3"></div>
            <FaRegSnowflake className='FaRegSnowflake'/>
            <p className="CgPinBottom_Text">Snow Depth</p >
            <p className="CgPinBottom_Text2">{icedis} m</p >

            <div className="blue-block4"></div>
            <FaWind className='FaWind'/>
            <p className="FaWind_Text">Wind Speed</p >
            <p className="FaWind_Text2">{ws3m} m/s</p >

            <div className="blue-block5"></div>
            <FaDirections className='FaDirections'/>
            <p className="FaDirections_Text">WindDir</p >
            <p className="FaDirections_Text2">{wd3m} Deg</p >

            <div className="blue-block6"></div>
            <FaRadiation className='FaRadiation'/>
            <p className="GiRadiations_Text">Incoming SW</p >
            <p className="GiRadiations_Text2">{shortwin} W/m^2</p >

            <div className="blue-block7"></div>
            <GiBattery75 className='GiBattery75'/>
            <p className="GiBattery75_Text">Battery Power</p >
            <p className="GiBattery75_Text2">delete V</p >

            <div className="blue-block8"></div>
            <FaRadiation className='FaRadiation2'/>
            <p className="GiRadiations_Text3">Outgoing SW</p >
            <p className="GiRadiations_Text4">{shortwout} W/m^2</p >

            <div className="blue-block9"></div>
            <FaRadiation className='FaRadiation3'/>
            <p className="GiRadiations_Text5">Incoming LW</p >
            <p className="GiRadiations_Text6">{longwin} W/m^2</p >

            <div className="blue-block10"></div>
            <FaRadiation className='FaRadiation4'/>
            <p className="GiRadiations_Text7">Outgoing LW</p >
            <p className="GiRadiations_Text8">{longwout} W/m^2</p >

          </>
        ) : (
          <>
            <div className="blue-block"></div>
            <TbTemperature className='TbTemperature'/>
            <p className="TbTemperature_Text">Temperature</p >
            <p className="TbTemperature_Text2">{temp2m}°C</p >

            <div className="blue-block2"></div>
            <WiHumidity className='WiHumidity'/>
            <p className="RH_Text">RH</p >
            <p className="RH_Text2">{rh2m}%</p >

            <div className="blue-block3"></div>
            <FaRegSnowflake className='FaRegSnowflake'/>
            <p className="CgPinBottom_Text">Snow Depth</p >
            <p className="CgPinBottom_Text2">{snowdepth !== undefined ? snowdepth : snowdepthm} m</p >

            <div className="blue-block4"></div>
            <FaWind className='FaWind'/>
            <p className="FaWind_Text">Wind Speed</p >
            <p className="FaWind_Text2">{ws3m} m/s</p >

            <div className="blue-block5"></div>
            <FaDirections className='FaDirections'/>
            <p className="FaDirections_Text">WindDir</p >
            <p className="FaDirections_Text2">{wd3m} Deg</p >

            <div className="blue-block6"></div>
            <FaRadiation className='FaRadiation'/>
            <p className="GiRadiations_Text">SW</p >
            <p className="GiRadiations_Text2">{shortwin} W/m^2</p >

            <div className="blue-block7"></div>
            <GiBattery75 className='GiBattery75'/>
            <p className="GiBattery75_Text">Battery Power</p >
            <p className="GiBattery75_Text2">delete V</p >
        </>
        )}
        </div>

        <p className="Explanation">
        {selectedValue === 'Choose2' ? (
          <>
            *** RH is Relative Humidity, WindDir is Wind Direction, Incoming SW is Incoming Shortwave Radiation, Outgoing SW is Outgoing Shortwave Radiation, Incoming LW is Incoming Longwave Radiation
        </>

        ) : (
          <>
            *** RH is Relative Humidity, WindDir is Wind Direction, SW is Shortwave Radiation
           </>
        )}
        </p>

        <p className="Device-Info">Device Information</p >
        <div className="grey-block2"></div>
        <p className="Status">Status: Logging</p >
        <div className="grey-block3"></div>
        <p className="Memory">Memory: Wrapping</p >
        <div className="grey-block4"></div>
        {selectedValue === 'Choose4' ? (
            <>
        <p className="Serial_Number">Deployment Date: 2007-04-25</p>
        </>
        ) : selectedValue === 'Choose3' ? (
            <>
              <p className="Serial_Number">Deployment Date: 2003-08-08</p>
            </>
          ) : selectedValue === 'Choose2' ? (
            <>
              <p className="Serial_Number">Deployment Date: 2022-04-23</p>
            </>
          ) : selectedValue === 'Choose1' ? (
            <>
              <p className="Serial_Number">Deployment Date: 2007-04-25</p>
            </>
          ) : (
            <>
              *** Information for Choose6
            </>
          )}

        <div className="grey-block8"></div>
        {selectedValue === 'Choose4' ? (
            <>
            <p className="LocationStation">Location: 79.41635, -90.76</p>
        </>
        ) : selectedValue === 'Choose3' ? (
            <>
            <p className="LocationStation">Location: 79.424857, -90.69726</p>
            </>
          ) : selectedValue === 'Choose2' ? (
            <>
              <p className="LocationStation">Location: 79.45004, -90.65</p>
            </>
          ) : selectedValue === 'Choose1' ? (
            <>
            <p className="LocationStation">Location: 79.53086962, -90.96460382</p>
            </>
          ) : (
            <>
              *** Information for Choose6
            </>
          )}

        <p className="Communcation">Communication</p >
        <div className="grey-block6"></div>
        <p className="Plan_Number">Live-data: On</p >
        <div className="grey-block7"></div>
        <p className="Plan_Start">
          Last Transmission: {timerr ? formatDate(timerr) : "Loading..."}
        </p>
        <div className="grey-block9"></div>
        <p className="Frenquency">Communication Frequency: 15 Min</p>

        </>
    );
}

export default Station;
