import React from "react";
import Navlog from "./Navlog";
import Navnolog from "./Navnolog";
import NavCat from "./NavCat";
import NavChar from "./NavChar";
import Navadmin from "./NavAdmin";

function Navbar({ auth }) {
  if (auth == 0) {
    return <Navnolog /> ; // no login 
  }
   else if (auth == 1) {
    return <Navlog />; // customer
  } 
  else if (auth == 2) {
    return <NavCat/> // catering
  }
  else if (auth == 3) {
    return <NavChar/> // catering
  }
  else if (auth == 4) {
    return <Navadmin/> // Admin
  }
}

export default Navbar;
