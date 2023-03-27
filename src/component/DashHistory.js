import "@picocss/pico"
import { Link, Outlet } from "react-router-dom";
import "../css/DashHistory.css"
import Img from ".././ICELAB.jpeg";
import Vector from ".././north_east.png";
import { CgProfile } from 'react-icons/cg';
import { HiOutlineMail } from 'react-icons/hi';
import { GrLocation } from 'react-icons/gr';
import { BiHome } from 'react-icons/bi';
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import DashBoards2 from "./DashBoards2";

function ContactUS() {
  const { auth } = useAuth();
  const User = auth.user
  const axiosPrivate = useAxiosPrivate();
  const [createList, setcreateList] = useState([]);
  const [showDashBoards2, setshowDashBoards2] = useState(false)
  
  useEffect( ()=>{
    let isMounted = true;
    const controller = new AbortController();
        
    const getDashboard = async () => {
      try {
        // alert("User: "+ User)
        const response = await axiosPrivate.get(`/dashboards/${User}`, {
          signal: controller.signal
        });
        const newList = createList.concat(response.data);
        isMounted && !((response.data).length === 0) && setcreateList(newList)
        if (!((response.data).length === 0)) return setshowDashBoards2(true)
      } catch (err) {
        console.error(err);
      }
    }

    getDashboard()

    return () => {
      isMounted = false;
      controller.abort();
    }

  }, [])

  if (!showDashBoards2){
    return (
      <>
        <p className="Opps">Oops, Seems Like You Don't Have A DashBoard Yet <br/> Start Your Journey Now!</p>
        <Link to="/DashBoards" className="nav-link">
          <button className="Button101">CREATE</button>
        </Link>
        <Outlet/>
      </>

      );
  }
  else {
    return (
      <DashBoards2 dict={createList}/>
    );
  }
  }

  export default ContactUS;
