import React, { useState } from "react";
import '../css/DashBoards.css';
import '../dist/accordion.min.css';
import Todo from '../component/Todo.js';
import Modal from '../component/Modal.js';
import Backdrop from '../component/Backdrop.js';
import { BsTextParagraph, BsWind } from 'react-icons/bs';
import { SlGraph } from 'react-icons/sl';
import {VscGraph} from 'react-icons/vsc';
import {CiTempHigh} from 'react-icons/ci';
import {ImBin} from 'react-icons/im';



function DashBoards () {
    const [val,setVal]=useState([]);

    const [modalIsOpen, setModalIsOpen] = useState(false);

    function deleteHandler() {
        setModalIsOpen(true);
    }
    function closeModalHandler() {
        setModalIsOpen(false);
    }

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
        closeModalHandler()
    }

    return (
        <>
        <div className='DataBoard'>
            <div className="stationbar">
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
            </div>

            <div className='DashBoardContent'>
                <div>
                    <h1>DashBoards #1</h1>
                    <button className="CreateMoreButton" onClick={()=>handleAdd()}>CREATE MORE</button>
                </div>

                <div className='DigarmBoard'>
                    <div className="diagramList">
                    {/* <Todo text='Learn React' /> */}
                    {val.map((data,i)=>{
                        return(
                        // <div>
                            // <input value={data} onChange={e=>handleChange(e,i)} />
                            // <button onClick={()=>handleDelete(i)}><ImBin/></button>
                        // </div>

                        <div className='card'>
                            {/* <h2>{props.text}</h2> */}
                            <div className='actions'>
                                {i}
                                <input value={data} onChange={e=>handleChange(e,i)} />

                                {/* <button className = 'btn btnbin' onClick={deleteHandler}><ImBin/></button> */}
                            </div>

                            {modalIsOpen && (
                                <Modal onCancel={closeModalHandler} onConfirm={()=>handleDelete(i)} />
                            )}
                            {modalIsOpen && <Backdrop onClick={closeModalHandler} />}

                            {/* directly deleted */}
                            <button onClick={()=>handleDelete(i)}><ImBin/></button> 
                        </div>

                        )
                    })}
                    </div>
                    <button className="CreateMoreButton">SAVE</button> 
                </div>
            </div>


        </div>
        </>
    );
}

export default DashBoards;
