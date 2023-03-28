import "@picocss/pico"
import '../css/DashBoards.css';
import { AiOutlineLineChart } from 'react-icons/ai';
import { GiHistogram } from 'react-icons/gi';
import { RiWindyFill } from 'react-icons/ri';
import { useState, useEffect } from "react";
import DashBoards2 from "./DashBoards2";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const DashBoards = () => {
    const { auth } = useAuth();
    const User = auth.user
    const axiosPrivate = useAxiosPrivate();

    const [station, setStation] = useState("000003");
    const [variable, setVariable] = useState("Temp_2m_C");
    const [plotType, setPlotType] = useState("LineChart");
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const [fromTime, setFromTime] = useState("1970-01-01T00:00");
    const [toTime, setToTime] = useState(`${now.toISOString().slice(0, 11)}${hours}:${minutes}`);
    const [boardName, setBoardName] = useState("Dashboard1");

    const [isOpenDash1, setIsOpenDash1] = useState(true);
    const [createList, setcreateList] = useState([]);

    const dict = {
        station,
        variable,
        plotType,
        fromTime,
        toTime,
        boardName
    }
    
    const handlegetDashboard = () => {
        let isMounted = true;
        const controller = new AbortController();
        
        const getDashboard = async () => {
            try {
                // alert("User: "+ User)
                const response = await axiosPrivate.get(`/dashboards/${User}`, {
                    signal: controller.signal
                });
                const newList = createList.concat(response.data);
                isMounted && !((response.data).length === 0) && setcreateList(newList)
            } catch (err) {
                console.error(err);
            }
        }

        getDashboard()
        
        return () => {
            isMounted = false;
            controller.abort();
        }
    }
    useEffect( handlegetDashboard , []) // 此处填什么？应该根据什么变
    
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

    const DashBoards2Create = (e) => {
        setIsOpenDash1(e)
    }

    const createDate = () => {
        // console.log(newList);
        const newList = [...createList, dict];
        setcreateList(newList)
        setIsOpenDash1(false)
    }

    const deleteDate = (index) => {
        const newList = createList.filter((item,i)=>i !== index);
        setcreateList(newList);
    }


    if (!isOpenDash1) return <DashBoards2 create={DashBoards2Create} delete={deleteDate} dict={createList} showSave={true} showReturn={true} />
    return (
        <>
            <>
                <p className="QustionMark">Want to create your own DashBoards?</p >
                <div className="drop-down-main">
                    <p className="WhichStation">Station</p >
                    <div className="drop-down2">
                        <select value={station} onChange={handleStation}>
                            <option value="000003">White Glacier Nunatak</option>
                            <option value="000004">White Glacier Melt Zone</option>
                            <option value="000002">White Glacier Moraine</option>
                            <option value="000001">Colour Lake</option>
                            {/* <option value="Crusoe Glacier">Crusoe Glacier</option>
                            <option value="Erratics Island">Erratics Island</option> */}
                        </select>
                    </div>
                </div>
                <div className="drop-down-main2">
                    <p className="WhichVariable">Variable</p >
                    <div className="drop-down3">
                        <select value={variable} onChange={handleVariable}>
                            <option value="Temp_2m_C">Temperature</option>
                            <option value="RH_2m_perc">Relative humidity</option>
                            <option value="WS_3m_ms">Wind speed</option>
                            <option value="WD_3m_deg">Wind direction</option>
                            <option value="SW_in_wm2">Incoming/downward shortwave radiation</option>
                        </select>
                    </div>
                </div>
                <p className="WhichPlot">Select Plot Type: {plotType}</p >
                <div>
                    <div className="LineChart" onClick={handlePlotType}>
                        <div className="BB1"></div>
                        <AiOutlineLineChart className='AiOutlineLineChart' />
                        <p className="LineChart_Text">LINE CHART</p >
                        <button value="LineChart" className="transparent-button1" onClick={handlePlotType} />
                    </div>
                    <div className="HISTOGRAM" onClick={handlePlotType}>
                        <div className="BB2"></div>
                        <GiHistogram className='GiHistogram' />
                        <p className="GiHistogram_Text">Histogram</p >
                        <button value="Histogram" className="transparent-button2" onClick={handlePlotType} />
                    </div>
                    <div className="WindRose" onClick={handlePlotType}>
                        <div className="BB3"></div>
                        <RiWindyFill className='RiWindyFill' />
                        <p className="RiWindyFill_Text">WIND ROSE</p >
                        <button value="WindRose" className="transparent-button3" onClick={handlePlotType} />
                    </div>
                </div>
                <div className="TimeChoose">
                    <p className="From">From</p >
                    <input
                        value={fromTime}
                        type="datetime-local"
                        className="startdate1"
                        onChange={handleFromTime}
                    />
                </div>
                <div className="TimeChoose2">
                    <p className="To">To</p >
                    <input
                        value={toTime}
                        type="datetime-local"
                        class="Enddate2"
                        onChange={handletToTime}
                    />
                </div>
                <p className="WhichName">Name</p >
                <form>
                    <label className="LabelInput">
                        <input type="text" className="NameInput" value={boardName} onChange={handleBoardName} />
                    </label>
                </form>
                <button className="NextButton" onClick={createDate}>CREATE</button>
            </>

        </>
    );
}

// export {dict};
export default DashBoards;