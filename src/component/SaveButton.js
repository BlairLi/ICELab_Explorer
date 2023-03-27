import '../css/DashBoard2.css';


export default function SaveButton({openSave, setSave}) {

    if (!openSave) return null
      return (
          <div className="SaveButtonDad">
              <button className="SaveButton" onClick={setSave}>SAVE</button>
          </div>
      )
  }
  