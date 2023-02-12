// function ExtractPage() {

  
//     return (
//       <>
//         <h1>Export Setting</h1>

//         <p className="Cname">
//             <strong>Name:</strong>
//             <label className="custom-field one">
//                 <input type="text" placeholder=" "/>
//                 <span className="placeholder">Name</span>
//             </label>
//         </p>

//         <p className="Fileformat">
//             File Format:
//         </p>

//         <div className="dropdown" >
//             <input type="text" className="textBox" placeholder="Select Format" readonly/>
//             <div className="option">
//                 <div onclick="show('CSV')">CSV</div>
//                 <div onclick="show('EXCEL')">EXCEL</div>
//             </div>
//         </div>

//         <script>
//             function show(anything) {
//                 document.querySelector('.textBox').value = anything
//             }

//             let dropdown = document.querySelector('.dropdown')
//             dropdown.onclick = function() {
//                 dropdown.classList.toggle('active')
//             }
//         </script>

//         <p className="From">
//             From
//         </p>

//         <input type="date" className="startdate"/>

//         <p className="To">
//             To
//         </p>

//         <input type="date" className="Enddate"/>

//         <p className="Deviceset">
//             Device Setting
//         </p>
      
//       </>
//     );
//   }
  
//   export default ExtractPage;
  