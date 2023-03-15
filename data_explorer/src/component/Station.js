import "@picocss/pico"
import '../css/Devices.css';
import { Route, Routes, Link } from "react-router-dom"
import { GrOverview } from 'react-icons/gr';
import { BsGraphUp } from 'react-icons/bs';
import { GrCatalog } from 'react-icons/gr';
import { TbTemperature } from 'react-icons/tb';
import { SlGraph } from 'react-icons/sl';
import { CgPinBottom } from 'react-icons/cg';
import { FaWind } from 'react-icons/fa';

//import useWindowSize from './windowsize.js'
const Station = () => {
    //const size = useWindowSize();
    return (
        <>
        {/* {size.width > 600} */}
        <div className="grey-block">
            <p className="Text">Devices</p>
            <GrOverview className='icon'/>
            <p className="Text1">Overview</p>
            <Link to="/Graphs">
                <BsGraphUp className='icon1'/>
                <p className="Text2">Graphs</p>
            </Link>
            <GrCatalog className='icon2'/>
            <p className="Text3">Logs</p>
        </div>

        <div className="drop-down">
            <select>
                <option value="RA3000">RA3000</option>
                <option value="RA4000">RA4000</option>
                <option value="RA5000">RA5000</option>
            </select> 
        </div>
        
        <p className="Text4">Smart Sensor</p>
        <div className="blue-block"></div>
        <TbTemperature className='TbTemperature'/>
        <p className="TbTemperature_Text">Temperature</p>
        <p className="TbTemperature_Text2">12.5°C</p>

        <div className="blue-block2"></div>
        <SlGraph className='SlGraph'/>
        <p className="RH_Text">RH</p>
        <p className="RH_Text2">84.2%</p>

        <div className="blue-block3"></div>
        <CgPinBottom className='CgPinBottom'/>
        <p className="CgPinBottom_Text">Dew Point</p>
        <p className="CgPinBottom_Text2">12.5°C</p>

        <div className="blue-block4"></div>
        <FaWind className='FaWind'/>
        <p className="FaWind_Text">Wind Speed</p>
        <p className="FaWind_Text2">12.3 m/s</p>

        <p className="Text5">Device Information</p>
        <div className="grey-block2"></div>
        <p className="Status">Status: Logging</p>
        <div className="grey-block3"></div>
        <p className="Memory">Memory: Wrapping</p>
        <div className="grey-block4"></div>
        <p className="NickName">Nickname: d1</p>
        <div className="grey-block5"></div>
        <p className="Serial_Number">Serial Number: 20181345</p>

        <p className="Communcation">Communication</p>
        <div className="grey-block6"></div>
        <p className="Plan_Number">Plan Number: 001</p>
        <div className="grey-block7"></div>
        <p className="Plan_Start">Plan Start Date: 2020-09-01</p>

        </>
    );
}

export default Station;