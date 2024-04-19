import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import './Assets/styles/main.css'
import './Assets/styles/register.css'
import './Assets/styles/style.css'
import "./Assets/styles/Style2.css";
import "./Assets/styles/variables.css";

import Navbar from "./Components/Navbar/Navbar";
import Main from "./Components/Main";
import Footer from "./Components/Footer/Footer";
import About from "./Components/About";
import Service from "./Components/Service";
import CustomerReg from "./Components/Register/CustomerReg";
import CatererReg from "./Components/Register/CatererReg";
import Logcus from "./Components/Login/Logcus";
import Logcat from "./Components/Login/LogCat";
import Caterer from "./Components/Caterer";
import Menu from "./Components/Menu";
import ViewCatMenu from "./Components/ViewCatMenu";
import EditMenu from "./Components/EditMenu";
import Buyitem from "./Components/Buyitem";
import ViewOrders from "./Components/ViewOrders";
import Vieworder from "./Components/ViewCatorder";
import AdminLog from "./Components/Admin";
import Adminpage from "./Components/Adminpage";
import CusProfile from "./Components/CusProfile";
import CatProfile from "./Components/CatProfile";
import CharityReg from "./Components/Register/CharityReg";
import Chatlog from "./Components/Login/Chatlog";
import Donation from "./Components/Donation";
import ViewDonation from "./Components/ViewDonation";
import ViewCatorder from "./Components/ViewCatorder";
import CusComplaints from "./Components/CusComplaints";
import CatComplaints from "./Components/CatComplaints";
import AdminCat from "./Components/Admin/AdminCat";
import AdminCust from "./Components/Admin/AdminCust";
import AdminCharity from "./Components/Admin/AdminCharity";
import AdminOrder from "./Components/Admin/AdminOrder";
import AdminComplaints from "./Components/Admin/AdminComplaints";
import CharProfile from "./Components/CharProfile";
import ChatForgotPass from "./Components/Login/ChatForgotPass";
import CatForgotPass from "./Components/Login/CatForgotPass";
import CusFotgotPass from "./Components/Login/CusFotgotPass";

function App() {


  const [basename,setbaseurl] = useState('http://hybrid.srishticampus.in/smart_catering:4009')
  // const [basename,setbaseurl] = useState('http://localhost:4008')

  
  const [auth, setauth] = useState(0);
  useEffect(() => {
    if (localStorage.getItem("cuslogid") != null) {
      setauth(1);
    } 
    else if (localStorage.getItem('catlogid')!=null){
      setauth(2)
    }
    else if (localStorage.getItem('charlogid')!=null){
      setauth(3)
    }
    else if(localStorage.getItem('adminlog')!=null){
      setauth(4)
    }
    else{
      setauth(0)
    }
  })
  
  return (

    <BrowserRouter basename="smart_catering">
      <div className="App">
        {/* <button onClick={()=>{setauth(0)}}> No Log</button>
        <button onClick={()=>{setauth(1)}}> Customer</button>
        <button onClick={()=>{setauth(2)}}> Catering</button>
        <button onClick={()=>{setauth(3)}}> Charity</button> */}


        <Navbar auth={auth} />
        
        <Routes>
          <Route exact path="/" element={<Main auth={auth}/>} />
          <Route path="/Register/cusreg" element={<CustomerReg  basename={basename}/>} />
          <Route path="/Admin" element={<AdminLog  basename={basename}/>} /> 
          <Route path="/Admin/Caterer" element={<AdminCat  basename={basename}/>} />
          <Route path="/Login/cuslog" element={<Logcus basename={basename} />} />
          <Route path="/Login/catlog" element={<Logcat  basename={basename}/>} />
          <Route path="/Register/catreg" element={<CatererReg  basename={basename}/>} />
          <Route path="/Register/cusreg" element={<CustomerReg  basename={basename}/>} />
          <Route path="/Register/charreg" element={<CharityReg  basename={basename}/>} />
          <Route path="/CusProfile" element={<CusProfile  basename={basename}/>} />
          <Route path="/CatProfile" element={<CatProfile  basename={basename}/>} />
          <Route path="/CharProfile" element={<CharProfile  basename={basename}/>} />
          <Route path="/Caterer/:id" element={<Caterer basename={basename}/>} />
          <Route path="/AddMenu" element={<Menu basename={basename}/>} />
          <Route path="/EditMenu/:id" element={<EditMenu basename={basename}/>} />
          <Route path="/ViewMenu" element={<ViewCatMenu basename={basename}/>} />
          <Route path="/Home" element={<Main basename={basename} auth={auth} />} />
          <Route path="/About" element={<About  basename={basename}/>} />
          <Route path="/CatComplaints" element={<CatComplaints  basename={basename}/>} />
          <Route path="/ViewCatorder" element={<ViewCatorder basename={basename}/>} />
          <Route path="/Service" element={<Service basename={basename} />} />
          <Route path="/buyitem/:id" element={<Buyitem basename={basename}/>} />
          <Route path="/CusComplaints" element={<CusComplaints basename={basename} />} />
          <Route path="/ViewOrders" element={<ViewOrders basename={basename}/>} />

          <Route path="/Login/charlog" element={<Chatlog  basename={basename}/>} />
          <Route path="/Login/catlog" element={<Logcat  basename={basename}/>} />
          <Route path="/ChatForgotPass" element={<ChatForgotPass  basename={basename}/>} />
          <Route path="/CatForgotPass" element={<CatForgotPass  basename={basename}/>} />
          <Route path="/CusForgotPass" element={<CusFotgotPass  basename={basename}/>} />


          <Route path="/Admin/Adminpage" element={<Adminpage  basename={basename}/>} />
          <Route path="/Admin/Customer" element={<AdminCust  basename={basename}/>} />
          <Route path="/Admin/Charity" element={<AdminCharity basename={basename} />} />
          <Route path="/Admin/Orders" element={<AdminOrder  basename={basename}/>} />
          <Route path="/Admin/Complaints" element={<AdminComplaints  basename={basename}/>} />
          {/* */}
           {/*  <Route path="/Admin/Adminpage" element={<Adminpage  basename={basename}/>} />
          <Route path="/Admin/Customer" element={<AdminCust  basename={basename}/>} />
          <Route path="/Admin/Charity" element={<AdminCharity basename={basename} />} />
          <Route path="/Admin/Orders" element={<AdminOrder  basename={basename}/>} />
          <Route path="/Admin/Complaints" element={<AdminComplaints  basename={basename}/>} />

          <Route path="/Home" element={<Main basename={basename} auth={auth} />} />
         
          

          <Route path="/Login/charlog" element={<Chatlog  basename={basename}/>} />
          <Route path="/Login/catlog" element={<Logcat  basename={basename}/>} />
          <Route path="/ChatForgotPass" element={<ChatForgotPass  basename={basename}/>} />
          <Route path="/CatForgotPass" element={<CatForgotPass  basename={basename}/>} />
          <Route path="/CusForgotPass" element={<CusFotgotPass  basename={basename}/>} />


          
          
          <Route path="/CusProfile" element={<CusProfile  basename={basename}/>} />
          <Route path="/CatProfile" element={<CatProfile  basename={basename}/>} />
          <Route path="/CharProfile" element={<CharProfile  basename={basename}/>} />

          
          <Route path="/About" element={<About  basename={basename}/>} />
          <Route path="/Service" element={<Service basename={basename} />} />
          <Route path="/ViewOrders" element={<ViewOrders basename={basename}/>} />
          <Route path="/CusComplaints" element={<CusComplaints basename={basename} />} />
          <Route path="/CatComplaints" element={<CatComplaints  basename={basename}/>} />

          
          <Route path="/ViewCatorder" element={<ViewCatorder basename={basename}/>} />
          <Route path="/Donation/:catid/:foodid/:id" element={<Donation basename={basename}/>}/>
          <Route path="/Caterer/:id" element={<Caterer basename={basename}/>} />
          <Route path="/AddMenu" element={<Menu basename={basename}/>} />
          <Route path="/EditMenu/:id" element={<EditMenu basename={basename}/>} />
          <Route path="/ViewMenu" element={<ViewCatMenu basename={basename}/>} />
          <Route path="/buyitem/:id" element={<Buyitem basename={basename}/>} />
          <Route path="/ViewDonation" element={<ViewDonation basename={basename}/>} />

          */}

        </Routes>
        <Footer auth={auth} />
      </div>
    </BrowserRouter>
  );
}

export default App;
