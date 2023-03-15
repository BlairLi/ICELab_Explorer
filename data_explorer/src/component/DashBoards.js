// import React, { useState } from "react";
// import '../css/DashBoards.css';
// import '../dist/accordion.min.css';
// import { BsTextParagraph, BsWind } from 'react-icons/bs';
// import { SlGraph } from 'react-icons/sl';
// import {VscGraph} from 'react-icons/vsc';
// import {CiTempHigh} from 'react-icons/ci';
// import {ImBin} from 'react-icons/im';



// function DashBoards () {
//     const [val,setVal]=useState([]);

//     const handleAdd=()=>{
//         const abc=[...val,[]]
//         setVal(abc)
//     }
//     const handleChange=(onChangeValue,i)=>{
//         const inputdata=[...val]    
//         inputdata[i]=onChangeValue.target.value;
//         setVal(inputdata)
//     }
//     const handleDelete=(i)=>{
//         const deletVal=[...val]
//         deletVal.splice(i,1)
//         setVal(deletVal)
//     }

//     return (
//         <>
//         <div className='DataBoard'>
//             {/* <div className="stationbar">
//                 <div className="stationbarheader">Station</div>
//                 <details open>
//                     <summary className="stationbarul">RX3000</summary>
//                     <ul className="stationbaraccordian">
//                         <li>
//                             <BsTextParagraph/>
//                             PAR</li>
//                         <li>
//                             <BsWind/>
//                             Wind Speed</li>
//                         <li>
//                             <SlGraph/>
//                             RH</li>
//                         <li>
//                             <VscGraph/>
//                             Dew Point</li>
//                         <li>
//                             <CiTempHigh/>
//                             Temperature</li>
//                     </ul>
//                 </details>

//                 <details>
//                     <summary className="stationbarul">RX2100</summary>
//                     <ul className="stationbaraccordian">
//                         <li className="stationbaraccordiantext">PAR</li>
//                         <li className="stationbaraccordiantext">Wind Speed</li>
//                         <li className="stationbaraccordiantext">RH</li>
//                         <li className="stationbaraccordiantext">Dew Point</li>
//                         <li className="stationbaraccordiantext">Temperature</li>
//                     </ul>
//                 </details>

//                 <div className="stationbarheader">Calculated Channels</div>
//             </div> */}

//             <div className='DashBoardContent'>
//                 <div>
//                     <h1>DashBoards #1</h1>
//                     <button className="CreateMoreButton" onClick={()=>handleAdd()}>CREATE MORE</button>
//                 </div>

//                 <div className='DigarmBoard'>
//                     <div className="diagramList">
//                     {val.map((data,i)=>{
//                         return(
//                         <div className='card'>
//                             <div className='actions'>
//                                 {i}
//                                 <input value={data} onChange={e=>handleChange(e,i)} />
//                             </div>
//                             {/* directly deleted */}
//                             <button className='cardBin' onClick={()=>handleDelete(i)}><ImBin/></button> 
                            
//                         </div>

//                         )
//                     })}
//                     </div>
//                     <div className="SaveButtonDad">
//                         <button className="SaveButton">SAVE</button>  
//                     </div>
//                 </div>
//             </div>


//         </div>
//         <p className="Select_Data">Select Data Type:</p>
//         <div className="BB1"></div>
//             <AiOutlineLineChart className='AiOutlineLineChart'/>
//             <p className="LineChart_Text">LINE CHART</p>
//         <div className="BB2"></div>
//             <BsFillBarChartFill className='BsFillBarChartFill'/>
//             <p className="FaWind_Text">BAR CHART</p>
//         <div className="BB3"></div>
//             <FaChartArea className='FaChartArea'/>
//             <p className="FaWind_Text">AREA CHART</p>
//         </>
//     );
// }

// export default DashBoards;


import "@picocss/pico"
import '../css/DashBoards.css';
import { AiOutlineLineChart } from 'react-icons/ai';
import { BsFillBarChartFill } from 'react-icons/bs';
import { FaChartArea } from 'react-icons/fa';
function DashBoards () {
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
                    <option value="Choose1.1">temperature</option>
                    <option value="Choose2.1">relative humidity</option>
                    <option value="Choose3.1">wind speed</option>
                    <option value="Choose4.1">wind direction</option>
                    <option value="Choose5.1">incoming/downward shortwave radiation</option>
                    <option value="Choose6.1">snow depth</option>
                    <option value="Choose7.1">battery power</option>
                </select>
            </div>
        </div>
        <div className="BB1"></div>
            <AiOutlineLineChart className='AiOutlineLineChart'/>
            <p className="LineChart_Text">LINE CHART</p >
        <div className="BB2"></div>
            <BsFillBarChartFill className='BsFillBarChartFill'/>
            <p className="FaWind_Text">BAR CHART</p >
        <div className="BB3"></div>
            <FaChartArea className='FaChartArea'/>
            <p className="FaWind_Text">AREA CHART</p >
        </>
    );
}

export default DashBoards;