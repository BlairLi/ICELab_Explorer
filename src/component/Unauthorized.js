import { useNavigate } from "react-router-dom"
import '../css/Unauthrized.css';



const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <section>
            <div>
                <h className="TextUnauthrozied">Unauthorized</h>
                <br />
                <p className="NoAccess">You do not have access to the requested page.</p>
                <div className="flexGrow">
                    <button className="GoBackButton" onClick={goBack}>Go Back</button>
                </div>
            </div>
        </section>
    )
}

export default Unauthorized