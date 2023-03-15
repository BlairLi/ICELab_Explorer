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