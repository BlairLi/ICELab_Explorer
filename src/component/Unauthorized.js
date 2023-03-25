import { useNavigate } from "react-router-dom"

const UnauthorizedStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFF',
    padding: '50px',
    zIndex: 1000
  }

const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <section>
            <div style={UnauthorizedStyle}>
                <h1>Unauthorized</h1>
                <br />
                <p>You do not have access to the requested page.</p>
                <div className="flexGrow">
                    <button onClick={goBack}>Go Back</button>
                </div>
            </div>
        </section>
    )
}

export default Unauthorized