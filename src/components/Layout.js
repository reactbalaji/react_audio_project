import React, { useEffect } from "react";
import AudioUpload from "./AudioUpload";
import { useNavigate } from "react-router-dom";


const Layout = () => {
    const navigate = useNavigate();
    useEffect(()=>{
      const login = !sessionStorage.getItem("token");
      if(login) {
        navigate('/');
      }
    },[])
    return(
        <>
        <AudioUpload/>
        </>
    )
}
 export default Layout;