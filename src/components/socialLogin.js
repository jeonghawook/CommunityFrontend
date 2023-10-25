import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import useAuthStore from "../api/store";
import jwt_decode from 'jwt-decode';

function SocialLogin() {
  const { login } = useAuthStore();
  const navigate = useNavigate();
  
  const allCookies = Cookies.get();
  console.log("All Cookies1:", allCookies);

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    const refreshToken = Cookies.get("refreshToken");
    localStorage.setItem('accessToken',accessToken)
    localStorage.setItem('refreshToken', refreshToken);
    
    console.log("socialLogin working")
    const allCookies = Cookies.get();
    console.log("All Cookies2:", allCookies);
    const decodedToken = jwt_decode(accessToken);
    const { nickname, email, userId } = decodedToken;

    login(email, userId, nickname);

    navigate("/member");

  }, [accessToken, login, navigate]);

  return (
    <div>
      <p>Retrieving the access token...</p>
    </div>
  );
}

export default SocialLogin;
