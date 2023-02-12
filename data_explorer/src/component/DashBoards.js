import "@picocss/pico"
import '../css/DashBoards.css';

function DashBoards () {
    return (
        <>
        <div className="stationbar">
            <div>Station</div>
            <details>
                <summary>RX3000</summary>
                <ul>
                    <li>PAR</li>
                    <li>Wind Speed</li>
                    <li>PAR</li>
                    <li>PAR</li>
                </ul>
            </details>

            <details open>
                <summary>Accordion 2</summary>
                <ul>
                    <li>…</li>
                    <li>…</li>
                </ul>
            </details>
        </div>
        </>
    );
}

export default DashBoards;
