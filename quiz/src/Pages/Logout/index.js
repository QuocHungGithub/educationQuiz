import { useNavigate } from "react-router-dom";
import { deleteAllCookie } from "../../helpers/cookie";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {checkLogin } from '../../Actions/login'
function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  deleteAllCookie();
  useEffect(() => {
    navigate("/login");
    dispatch(checkLogin(false));
  },[dispatch, navigate]);
  return ;
}
export default Logout;
