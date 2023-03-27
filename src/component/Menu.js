import "@picocss/pico"
import { Link, Outlet } from "react-router-dom";
import { RiDashboard2Line } from 'react-icons/ri';
import { AiFillDatabase } from 'react-icons/ai';
import { RiBaseStationFill } from 'react-icons/ri';
import { FaMapMarkedAlt } from 'react-icons/fa';
import { TbFileExport } from 'react-icons/tb';
import { MdContactSupport } from 'react-icons/md';
import { BiLogIn } from 'react-icons/bi';
import { RiLogoutBoxRFill } from 'react-icons/ri';
import { RiAdminFill } from 'react-icons/ri';
import Modal from "./Modal";
import "../css/Menu.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import Map from "./Map";

function Menu() {
  const navigate = useNavigate();
  const logout = useLogout();
  const signOut = async () => {
    await logout();
    navigate('/');
    setIsOpen(false)
}

const [isOpen, setIsOpen] = useState(false);

  return (
    <>
    <div className="greyline">
      <div className="menu">
        <ul className="navbar-nav">
          <li className="logo">
            <Link to="/DashHistory" className="nav-link-logo">
              <label className="bluePart2">ICELab </label>
              <label className="blackPart2">Queen's</label>
            </Link>
          </li>
        </ul>

          {/* Home */}
          {/* <div className="HomeTopic">Research focus
            <div>Under enhanced Arctic warming the glaciers of the Canadian Arctic have become 
              a significant contributor to global sea-level rise. The ICELab research program 
              aims to improve our understanding of glacier-climate processes and ice dynamics 
              in the high Arctic as a means to enhance our capacity to detect and project 
              future glacier response.

              The ICELab team uses a combination of remote sensing and modelling approaches   
              that are enhanced by field-based measurements on Canadian Arctic glaciers.</div>
          </div>
          <div>Background</div> */}

          {/* DashBoards */}
          <li className="nav-item">
          <Link to="/DashBoards" className="nav-link">
            <span className="link-text">DashBoards</span>
            <RiDashboard2Line className='RiDashboard2Line'/>
          </Link>
          </li>

          {/* Device*/}
          <li className="nav-item">
            <Link to="/Station" className="nav-link">
              <span className="link-text">Station</span>
              <RiBaseStationFill className='RiBaseStationFill'/>
            </Link>
          </li>

          {/* Map */}
          <li className="nav-item">
            <Link to="/Map" className="nav-link">
              <span className="link-text">Map</span>
              <FaMapMarkedAlt className='FaMapMarkedAlt'/>
            </Link>
          </li>

          {/* Download Page */}
          <li className="nav-item">
            <Link to="/ExtractPage" className="nav-link">
              <span className="link-text">Download Page</span>
              <TbFileExport className='FaHistory'/>
            </Link>
          </li>

          {/* Support */}
          <li className="nav-item">
            <Link to="/ContactUS" className="nav-link">
              <span className="link-text">Contact</span>
              <MdContactSupport className='MdContactSupport'/>
            </Link>
          </li>

          {/* Login */}
          <li className="nav-item">
            <Link to="/Login" className="nav-link">
              <span className="link-text">Login</span>
              <BiLogIn className='BiLogIn'/>
            </Link>
          </li>


          {/* Admin */}
          <li className="nav-item">
            <Link to="/Admin" className="nav-link">
              <span className="link-text">Admin</span>
              <RiAdminFill className='RiAdminFill'/>
            </Link>
          </li>

          {/* LogOut */}
          <li className="nav-item LogOut" onClick={()=>setIsOpen(true)}>
            {/* <Link to="/LogOut" class="nav-link"> */}
            <div className="nav-link">
              <span className="link-text">LogOut</span>
              <RiLogoutBoxRFill className='RiLogoutBoxRFill'/>
            </div>
            {/* </Link> */}
          </li>
          <Modal open={isOpen} onCancel={() => {setIsOpen(false)}} onClose={signOut} action="Yes">Are you sure to Logout?</Modal>
          </div>
      </div>
      <Outlet/>
      </>


    );
  }

  export default Menu;
