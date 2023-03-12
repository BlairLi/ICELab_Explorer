import { Route, Routes } from "react-router-dom";
import Menu from "./component/Menu";
import DashBoards from "./component/DashBoards";
import Charts from "./component/Chart";
import ExtractPage from "./component/ExtractPage";
import Login from "./component/Login";
import Devices from "./component/Devices";
import Admin from "./component/Admin";
import RequireAuth from './component/RequireAuth';
import Unauthorized from './component/Unauthorized';
import WindRose from "./WindRose";

const ROLES = {
  'User': 2001,
  'Admin': 5150
}

function App() {

  return (
    <>

      <main>
        <Routes>
          <Route path="/" element={<Menu />}>
            <Route path="DashBoards" element={<DashBoards />} />
            <Route path="Graphs" element={<Charts />} />
            <Route path="Devices" element={<Devices />} />
            <Route path="ExtractPage" element={<ExtractPage />} />
            <Route path="unauthorized" element={<Unauthorized />} />
          </Route>

          {/* we want to protect these routes */}
          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="Admin" element={<Admin/>}></Route>
          </Route>

          <Route path="Login" element={<Login />} />
        </Routes>


        {/* <Charts></Charts> */}
        {/* <WindRose></WindRose> */}
      </main>


    </>
  );
}

export default App;
