import "@picocss/pico"
import { Link, Outlet } from "react-router-dom";
import "../css/ContactUs.css"
import Img from ".././ICELAB.jpeg";
import Vector from ".././north_east.png";
import { CgProfile } from 'react-icons/cg';
import { HiOutlineMail } from 'react-icons/hi';
import { GrLocation } from 'react-icons/gr';
import { BiHome } from 'react-icons/bi';
function ContactUS() {

  return (
    <>
      <p className="ThankYou">Thank You For Your Interest In</p>
      <p className="ThankYou2">ICELab</p>
      <img className="ICELAB" src={Img} alt="ICELAB" />
      <img className="Vector" src={Vector} alt="Vector" />
      <p className="AboutUs2">The Ice, Climate, & Environment Laboratory (ICELab)</p>
      <p className="AboutUs"> is a glacier research group dedicated to long-term glacier monitoring and investigations into the central processes driving glacier changes. Our team uses a combination of field-based, remote sensing, and modelling approaches to identify and monitor processes impacting glacier mass balance and ice dynamics, particularly in the polar regions.

      {'\n'}<br/>Alongside individual research projects, ICELab maintains one of Canada’s oldest glacier monitoring programs at White Glacier on Axel Heiberg Island. In collaboration with the Parks Canada Nunavut Field Unit, we are working towards sustainable glacier monitoring practices in Auyuittuq National Park (Baffin Island) and Sirmilik National Park (Bylot Island).
      </p>
      <p className="Contact">Contact:</p>
      <p className="Name">Dr. Laura Thomson</p>
      <p className="Email">Email: l.thomson@queensu.ca</p>
      <p className="Location">Kingston, ON, Canada</p>
      <p className="Website">https://www.queensu.ca/geographyandplanning/icelab/</p>
      <span class="dot"></span>
      <CgProfile className='CgProfile'/>
      <span class="dot2"></span>
      <HiOutlineMail className='HiOutlineMail'/>
      <span class="dot3"></span>
      <GrLocation className='GrLocation'/>
      <span class="dot4"></span>
      <BiHome className='BiHome'/>
      <Outlet/>
      </>


    );
  }

  export default ContactUS;
