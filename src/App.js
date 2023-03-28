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
import PersistLogin from "./component/PersistLogin";
import EditAdmin from "./component/EditAdmin";
import Register from "./component/Register";
import Map from "./component/Map";
import DownAdmin from "./component/DownAdmin";
import ContactUS from "./component/ContactUS";
import DashHistory from "./component/DashHistory";
import UpAdmin from "./component/UpAdmin";

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
            {/* 用户关联dashboard登出后的处理 ？ */}
            <Route path="DashBoards" element={<DashBoards />} />
            <Route path="DashBoards2" element={<DashBoards2 />} />
            <Route path="Graphs" element={<WindRose />} />
            <Route path="Station" element={<Station />} />
            <Route path="ExtractPage" element={<ExtractPage />} />
            <Route path="ContactUS" element={<ContactUS />} />
            <Route path="DashHistory" element={<DashHistory />} />
            <Route path="Map" element={<Map />} />
            <Route path="unauthorized" element={<Unauthorized />} />
            {/* we want to protect these routes */}
            <Route element={<PersistLogin />}>
              <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                <Route path="Admin" element={<Admin/>}></Route>
                <Route path="DownAdmin" element={<DownAdmin/>}></Route>
                <Route path="EditAdmin" element={<EditAdmin/>}></Route>
                <Route path="UpAdmin" element={<UpAdmin/>}></Route>
              </Route>
            </Route>
          </Route>
          <Route path="Login" element={<Login />} />
          <Route path="Register" element={<Register />} />
        </Routes>

      </main>


    </>
  );
}

export default App;
