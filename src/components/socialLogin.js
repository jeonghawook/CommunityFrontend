import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import useAuthStore from "../api/store";
import jwt_decode from 'jwt-decode';

function SocialLogin() {
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const accessToken = Cookies.get("accessToken");
  const refreshToken = Cookies.get("refreshToken");
  localStorage.setItem('accessToken',accessToken)
  localStorage.setItem('refreshToken', refreshToken);

  useEffect(() => {
    const decodedToken = jwt_decode(accessToken);
    const { nickname, email, userId } = decodedToken;

    // Call the `login` function within the `useEffect` to ensure it doesn't conflict with rendering
    login(email, userId, nickname);

    // After setting the state, navigate to the desired route
    navigate("/member");

  }, [accessToken, login, navigate]);

  return (
    <div>
      <p>Retrieving the access token...</p>
    </div>
  );
}

export default SocialLogin;
