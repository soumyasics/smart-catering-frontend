import React from "react";
import Footerlog from "./Footerlog";
import Footernolog from "./Footernolog";
import FooterCat from "./FooterCat";
import FooterAdmin from "./FooterAdmin";

function Footer({ auth }) {
  if (auth == 0) {
    return <Footernolog />;
  } else if (auth == 1) {
    return <Footerlog />;
  } else if (auth == 2) {
    return <FooterCat/>
  } else if(auth==4){
    return <FooterAdmin/>
  }
}

export default Footer;
