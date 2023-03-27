import '../css/DashBoard2.css';


export default function RetrunButton({openReturn,setBack}) {

    if (!openReturn) return null
      return (
        <button className="CreateMoreButton" onClick={setBack}>RETURN</button>
    )
  }
  