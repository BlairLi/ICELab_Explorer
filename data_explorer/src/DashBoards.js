import "@picocss/pico"

function DashBoards () {
    return (
        <>
        <div className="stationbar">
            <div>Station</div>
            <details>
                <summary>Accordion 1</summary>
                <p>…</p>
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
