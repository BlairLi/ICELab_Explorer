import "@picocss/pico"
import '../css/DashBoards.css';
import { AiOutlineLineChart } from 'react-icons/ai';
import { GiHistogram } from 'react-icons/gi';
import { FaChartArea } from 'react-icons/fa';
import { RiWindyFill } from 'react-icons/ri';
import {useState} from "react";
import { Link } from "react-router-dom"
import DashBoards2 from "./DashBoards2";


const DashBoards = () => {
    const [station, setStation] = useState("White Glacier Nunatak");
    const [variable, setVariable] = useState("Temperature");
    const [plotType, setPlotType] = useState(null);
    const [fromTime, setFromTime] = useState("");
    const [toTime, setToTime] = useState("");
    const [boardName, setBoardName] = useState("");

    const [isOpenDash1, setIsOpenDash1] = useState(true);


    const dict = {
        station,
        variable,
        plotType,
        fromTime,
        toTime,
        boardName
    }


    const handleStation = (e) => {
        setStation(e.target.value)
    };

    const handleVariable = (e) => {
        setVariable(e.target.value)
    };

    const handlePlotType = (e) => {
        setPlotType(e.target.value)
    }

    const handleFromTime = (e) => {
        setFromTime(e.target.value)
    }
    
    const handletToTime = (e) => {
        setToTime(e.target.value)
    }

    const handleBoardName = (e) => {
        setBoardName(e.target.value)
    }


    if (!isOpenDash1) return <DashBoards2 dict={dict}/>
    return (
        <>
            <>
            {JSON.stringify(dict)}
            <p className="QustionMark">Want to create your own DashBoards?</p >
            <div className="drop-down-main">
                <p className="WhichStation">Station</p >
                <div className="drop-down2">
                    <select value={station} onChange={handleStation}>
                        <option value="White Glacier Nunatak">White Glacier Nunatak</option>
                        <option value="White Glacier Melt Zone">White Glacier Melt Zone</option>
                        <option value="White Glacier Moraine">White Glacier Moraine</option>
                        <option value="Colour Lake">Colour Lake</option>
                        <option value="Crusoe Glacier">Crusoe Glacier</option>
                        <option value="Erratics Island">Erratics Island</option>
                    </select>
                </div>
            </div>
            <div className="drop-down-main2">
                <p className="WhichVariable">Variable</p >
                <div className="drop-down3">
                    <select value={variable} onChange={handleVariable}>
                        <option value="Temperature">Temperature</option>
                        <option value="Relative humidity">Relative humidity</option>
                        <option value="Wind speed">Wind speed</option>
                        <option value="Wind direction">Wind direction</option>
                        <option value="Incoming/downward shortwave radiation">Incoming/downward shortwave radiation</option>
                        <option value="Snow depth">Snow depth</option>
                        <option value="Battery power">Battery power</option>
                    </select>
                </div>
            </div>
            <p className="WhichPlot">Select Plot Type:</p>
            <div>
                <div className="LineChart"  onClick={handlePlotType}>
                    <div className="BB1"></div>
                            <AiOutlineLineChart className='AiOutlineLineChart'/>
                        <p className="LineChart_Text">LINE CHART</p >
                        <button value="LineChart" className="transparent-button1" onClick={handlePlotType}/>
                </div>
                <div className="HISTOGRAM" onClick={handlePlotType}>
                    <div className="BB2"></div>
                        <GiHistogram className='GiHistogram'/>
                        <p className="GiHistogram_Text">HISTOGRAM</p >
                        <button value="HISTOGRAM" className="transparent-button2" onClick={handlePlotType}/>
                </div>
                <div className="WindRose" onClick={handlePlotType}>
                    <div className="BB3"></div>
                        <RiWindyFill className='RiWindyFill'/>
                        <p className="RiWindyFill_Text">WIND ROSE</p >
                        <button value="WindRose" className="transparent-button3" onClick={handlePlotType}/>
                </div>
            </div>
            <div class="TimeChoose">
                    <p class="From">From</p>
                    <input
                    type="datetime-local"
                    className="startdate1"
                    onChange={handleFromTime}
                    />
            </div>
            <div class="TimeChoose2">
                <p class="To">To</p>
                <input
                    type="datetime-local"
                    class="Enddate2"
                    onChange={handletToTime}
                />
            </div>
            <p className="WhichName">Name</p>
            <form>
                <label className="LabelInput">
                    <input type="text" className="NameInput" onChange={handleBoardName}/>
                </label>
            </form>
            {/* <Link to="/DashBoard2"> */}
                <button className="NextButton" onClick={()=>{setIsOpenDash1(false)}}>CREATE</button>
            {/* </Link> */}
            </>
            
        </>
    );
}

// export {dict};
export default DashBoards;