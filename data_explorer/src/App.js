import { Route, Routes } from "react-router-dom";
import Menu from "./component/Menu";
import DashBoards from "./component/DashBoards";
import DashBoards2 from "./component/DashBoards2";
import Charts from "./component/Chart";
import ExtractPage from "./component/ExtractPage";
import Login from "./component/Login";
import Station from "./component/Station";
import Admin from "./component/Admin";
import RequireAuth from './component/RequireAuth';
import Unauthorized from './component/Unauthorized';
import WindRose from "./component/WindRose";
import User from "./component/User";

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
              <Route path="DashBoards2" element={<DashBoards2 />} />
              <Route path="Graphs" element={<WindRose />} />
              <Route path="Station" element={<Station />} />
              <Route path="ExtractPage" element={<ExtractPage />} />
              <Route path="unauthorized" element={<Unauthorized />} />
              {/* we want to protect these routes */}
              {/* <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}> */}
                <Route path="Admin" element={<User/>}></Route>
              {/* </Route> */}
          </Route>
          <Route path="Login" element={<Login />} />
        </Routes>

      </main>


    </>
  );
}

export default App;
