import React, { useState } from "react";
import '../css/DashBoard2.css';
import '../dist/accordion.min.css';
import { BsTextParagraph, BsWind } from 'react-icons/bs';
import { SlGraph } from 'react-icons/sl';
import {VscGraph} from 'react-icons/vsc';
import {CiTempHigh} from 'react-icons/ci';
import {ImBin} from 'react-icons/im';



function DashBoards () {
    const [val,setVal]=useState([]);

    const handleAdd=()=>{
        const abc=[...val,[]]
        setVal(abc)
    }
    const handleChange=(onChangeValue,i)=>{
        const inputdata=[...val]
        inputdata[i]=onChangeValue.target.value;
        setVal(inputdata)
    }
    const handleDelete=(i)=>{
        const deletVal=[...val]
        deletVal.splice(i,1)
        setVal(deletVal)
    }

    return (
        <>
        <div className='DataBoard'>
            {/* <div className="stationbar">
                <div className="stationbarheader">Station</div>
                <details open>
                    <summary className="stationbarul">RX3000</summary>
                    <ul className="stationbaraccordian">
                        <li>
                            <BsTextParagraph/>
                            PAR</li>
                        <li>
                            <BsWind/>
                            Wind Speed</li>
                        <li>
                            <SlGraph/>
                            RH</li>
                        <li>
                            <VscGraph/>
                            Dew Point</li>
                        <li>
                            <CiTempHigh/>
                            Temperature</li>
                    </ul>
                </details>

                <details>
                    <summary className="stationbarul">RX2100</summary>
                    <ul className="stationbaraccordian">
                        <li className="stationbaraccordiantext">PAR</li>
                        <li className="stationbaraccordiantext">Wind Speed</li>
                        <li className="stationbaraccordiantext">RH</li>
                        <li className="stationbaraccordiantext">Dew Point</li>
                        <li className="stationbaraccordiantext">Temperature</li>
                    </ul>
                </details>

                <div className="stationbarheader">Calculated Channels</div>
            </div> */}

            <div className='DashBoardContent'>
                <div>
                    <h1>DashBoards #1</h1>
                    <button className="CreateMoreButton" onClick={()=>handleAdd()}>CREATE MORE</button>
                </div>

                <div className='DigarmBoard'>
                    <div className="diagramList">
                    {val.map((data,i)=>{
                        return(
                        <div className='card'>
                            <div className='actions'>
                                {i}
                                <input value={data} onChange={e=>handleChange(e,i)} />
                            </div>
                            {/* directly deleted */}
                            <button className='cardBin' onClick={()=>handleDelete(i)}><ImBin/></button>

                        </div>

                        )
                    })}
                    </div>
                    <div className="SaveButtonDad">
                        <button className="SaveButton">SAVE</button>
                    </div>
                </div>
            </div>


        </div>
        </>
    );
}

export default DashBoards;
