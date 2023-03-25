import React, { useState, useEffect } from "react";
import '../css/DashBoard2.css';
import { ImBin } from 'react-icons/im';
import Modal from "./Modal";
import DashBoards from "./DashBoards";
import DashBoardCharts from "./DashBoardCharts";
import { graph_line_DashBoard, graph_wr, data1, data2 } from "./WindRose";
import Axios from 'axios';

 
function DashBoards2(props) {
    const [val, setVal] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenChart, setIsOpenChart] = useState(false);
    const [isOpenDash2, setIsOpenDash2] = useState(true);
    const [showJsondata,setshowJsondata] = useState({});
    const [curIndex,setCurIndex] = useState(null)
    const [Linexy, setLinexy] = useState(data1); // line chart data
    const [generatedExcuse, setGeneratedExcuse] = useState(data2); // wind rose data
    var index = 0;

    const handleAdd = () => {
        props.create(true);
        // const abc = [...val, []]
        // console.log(abc);
        // setVal(abc)
    }

    const handleChange = (onChangeValue, i) => {
        const inputdata = [...val]
        inputdata[i] = onChangeValue.target.value;
        setVal(inputdata)
    }
 
    const handleDelete = () => {
        props.datelete(curIndex)
        setIsOpen(false);
    }

    const url = "http://planwebapi-env.eba-khpxdqbu.us-east-1.elasticbeanstalk.com/"

    // fetch value for linechart
    const fetchLinechart = (dev_id, ftime, var_t) => {
        var dat_t = {
        "TIMESTAMP_F": ftime,//202204230746,
        "TIMESTAMP_T": 202207280645,
        "Varible": var_t//"RH_Avg"
        }
        alert(JSON.stringify(dat_t))
        Axios.post(`${url}dashboard_line_xy/${dev_id}`, dat_t).then(
            (resp) => {
                setLinexy(resp.data);
                alert(JSON.stringify(resp.data))
            }
    )
    };
    // fetch value for windrose
    const fetchExcuse = (excuse, ftime, ttime) => {
        var dat_t = {
          "TIMESTAMP_F": ftime,
          "TIMESTAMP_T": ttime
        }
        Axios.post(`${url}dashboard_wr/${excuse}`, dat_t).then(
          (resp) => {
            setGeneratedExcuse(resp.data.res);
          }
        );
    };
    useEffect(() => {
        setshowJsondata(JSON.stringify(props.dict[0]))
    }, []);

    // 点击两次才能抓取variable的问题
    async function handleVariables(data) {
        setshowJsondata(JSON.stringify(data))
        // alert("showJsondata: "+showJsondata)
        const alldata = showJsondata
        const alldataObj = JSON.parse(alldata)
        const plotType = alldataObj.plotType
        const fromValue = parseInt(alldataObj.fromTime.replace("T", "").replace(/[-:]/g, ""));
        const toValue = parseInt(alldataObj.toTime.replace("T", "").replace(/[-:]/g, ""));
        const station = alldataObj.station
        const variable = alldataObj.variable
        if (plotType=="LineChart") {
            fetchLinechart(station,fromValue,variable)
            graph_line_DashBoard(Linexy)
        }
        else if (plotType=="Histogram") {
            console.log("TBD")
        } 
        else if (plotType=="WindRose") {
            fetchExcuse(station,fromValue,toValue)
            graph_wr(generatedExcuse)
        }
        else console.log("GraphType select ERROR")

    }

    // inputData.fromTime
    // console.log("Inputdata: "+inputData)
    // const fromValue = parseInt(inputData.fromTime.replace("T", "").replace(/[-:]/g, "") + "00");
 
    if (!isOpenDash2) return <DashBoards />
    return (
        <>
            <div className='DataBoard'>
                <div className='DashBoardContent'>
                    <div>
                        <h1>DashBoards</h1>
                        {/* <button className="CreateMoreButton" onClick={()=>handleCloseDash2()}>RETURN</button> */}
                        <button className="CreateMoreButton" onClick={() => handleAdd()}>RETURN</button>
                    </div>
 
                    <div className='DigarmBoard'>
                        <div className="diagramList">
                            {props.dict.map((data, index) => {
                                return (
                                    <>
                                        <div key={index} className='card'>
                                            <div className='actions'>
                                                {data.boardName}
                                                {/* <input value={data} onChange={e=>handleChange(e,i)} /> */}
                                                <button onClick={() => { handleVariables(data); setIsOpenChart(true) }}>Open Created Charts</button>
                                            </div>
                                            <button className='cardBin' onClick={() => { setIsOpen(true); setCurIndex(index) }}><ImBin /></button>
                                        </div>
                                    </>
 
                                )
                            })}
                            <DashBoardCharts openChart={isOpenChart} onCancel={() => { setIsOpenChart(false) }}>{showJsondata}{graph_line_DashBoard(Linexy)}</DashBoardCharts>
                            <Modal open={isOpen} onCancel={() => { setIsOpen(false); }} onClose={() => { handleDelete() }} action="Delete">Are you sure to Delete?</Modal>
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