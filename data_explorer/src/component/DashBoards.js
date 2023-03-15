import "@picocss/pico"
import '../css/DashBoards.css';
import { AiOutlineLineChart } from 'react-icons/ai';
import { GiHistogram } from 'react-icons/gi';
import { FaChartArea } from 'react-icons/fa';
import { RiWindyFill } from 'react-icons/ri';
import {useState} from "react";
import { Link } from "react-router-dom"


const DashBoards = () => {

    return (
        <>

        <p className="QustionMark">Want to create your own DashBoards?</p >
        <div className="drop-down-main">
            <p className="WhichStation">Station</p >
            <div className="drop-down2">
                <select>
                    <option value="Choose1">White Glacier Nunatak</option>
                    <option value="Choose2">White Glacier Melt Zone</option>
                    <option value="Choose3">White Glacier Moraine</option>
                    <option value="Choose4">Colour Lake</option>
                    <option value="Choose5">Crusoe Glacier</option>
                    <option value="Choose6">Erratics Island</option>
                </select>
            </div>
        </div>
        <div className="drop-down-main2">
            <p className="WhichVariable">Variable</p >
            <div className="drop-down3">
                <select>
                    <option value="Choose1.1">Temperature</option>
                    <option value="Choose2.1">Relative humidity</option>
                    <option value="Choose3.1">Wind speed</option>
                    <option value="Choose4.1">Wind direction</option>
                    <option value="Choose5.1">Incoming/downward shortwave radiation</option>
                    <option value="Choose6.1">Snow depth</option>
                    <option value="Choose7.1">Battery power</option>
                </select>
            </div>
        </div>
        <p className="WhichPlot">Select Plot Type:</p>
        <div className="LineChart">
            <div className="BB1"></div>
                <AiOutlineLineChart className='AiOutlineLineChart'/>
                <p className="LineChart_Text">LINE CHART</p >
        </div>
        <div className="HISTOGRAM">
            <div className="BB2"></div>
                <GiHistogram className='GiHistogram'/>
                <p className="GiHistogram_Text">HISTOGRAM</p >
        </div>
        <div className="WindRose">
            <div className="BB3"></div>
                <RiWindyFill className='RiWindyFill'/>
                <p className="RiWindyFill_Text">WIND ROSE</p >
        </div>
            <div class="TimeChoose">
                  <p class="From">From</p>
                  <input
                    type="datetime-local"
                    className="startdate1"
                  />
            </div>
            <div class="TimeChoose2">
                <p class="To">To</p>
                <input
                  type="datetime-local"
                  class="Enddate2"
                />
            </div>
            <p className="WhichName">Name</p>
            <form>
                <label className="LabelInput">
                    <input type="text" className="NameInput" value="DashBoard#1"/>
                </label>
            </form>
            <Link to="/DashBoard2">
                <button className="NextButton">NEXT</button>
            </Link>
        </>
    );
}


export default DashBoards;