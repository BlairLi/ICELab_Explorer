import React, { useState } from "react";
import '../css/DashBoard2.css';
import '../dist/accordion.min.css';
import {ImBin} from 'react-icons/im';
import Modal from "./Modal";
import { BsReverseLayoutSidebarInsetReverse } from "react-icons/bs";
import DashBoards from "./DashBoards";
import {dict} from "./DashBoards";
import DashBoardCharts from "./DashBoardCharts";


function DashBoards2 (props) {
    const [val,setVal] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenChart, setIsOpenChart] = useState(false);
    var index = 0;
    const [isOpenDash2, setIsOpenDash2] = useState(true);

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
        console.log("deletVal is: "+deletVal)
        console.log("val is: "+val)
        console.log("i is: "+i)
        deletVal.splice(i,1)
        setVal(deletVal)
    }

    const handleDeletePlus = (i) => {
        handleDelete(i);
        setIsOpen(false);
    }

    const handleCloseDash2 = (i) => {
        setIsOpenDash2(false);
    }

    if (!isOpenDash2) return <DashBoards/>
    return (
        <>
        <div className='DataBoard'>
            <div className='DashBoardContent'>
                <div>
                    <h1>DashBoards #1</h1>
                    {/* <button className="CreateMoreButton" onClick={()=>handleCloseDash2()}>RETURN</button> */}
                    <button className="CreateMoreButton" onClick={()=>handleAdd()}>CREATE</button>
                </div>

                <div className='DigarmBoard'>
                    <div className="diagramList">
                        {val.map((data,i)=>{
                            return(
                                <>
                                <div key={i} className='card'>
                                    <div className='actions'>
                                        {i}
                                        {/* <input value={data} onChange={e=>handleChange(e,i)} /> */}
                                        <button onClick={()=>{setIsOpenChart(true)}}>Open Created Charts</button>
                                    </div>
                                    {/* directly deleted */}
                                    {/* <button className='cardBin' onClick={()=>handleDelete(i)}><ImBin/></button> */}
                                    <button className='cardBin' onClick={(i)=>{setIsOpen(true); index=i;}}><ImBin/></button>
                                </div>
                                </>
                            
                            )
                        })}
                        <DashBoardCharts openChart={isOpenChart} onCancel={ ()=> {setIsOpenChart(false)}}>{JSON.stringify(props.dict)}</DashBoardCharts>
                        <Modal open={isOpen} onCancel={ ()=> {setIsOpen(false)}} onClose={ () => { handleDeletePlus(index)}}>Are you sure to Delete?</Modal>
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

export default DashBoards2;
