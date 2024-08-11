import { NavLink, Outlet, Link } from "react-router-dom";
import "../LayoutDefau/LayoutDefau.scss";
import { getCookie } from "../../helpers/cookie";
import { useSelector } from "react-redux";
function LayoutDefau() {
  const token = getCookie("token");
  const isLogin = useSelector((state) => state.loginReducer);

  return (
    <>
      <div className="layout__defau">
        <header className="layout__defau--header">
          <div className="layout__defau--logo">
            <Link to="/">NQH</Link>
          </div>
          <div className="layout__defau--menu">
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              {token && (
                <>
                  <li>
                    <NavLink to="/topic">Topic</NavLink>
                  </li>
                  <li>
                    <NavLink to="/answer">Answer</NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
          <div className="layout__defau--account">
            {token ? (
              <>
                <NavLink to="/logout" className="account--register">
                  Đăng Xuất
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/login" className="account--login">
                  Đăng Nhập
                </NavLink>
                <NavLink to="/register" className="account--register">
                  Đăng Ký
                </NavLink>
              </>
            )}
          </div>
        </header>
        <main className="layout__defau--main">
          <Outlet />
        </main>
        <footer className="layout__defau--footer">Nguyễn Quốc Hùng</footer>
      </div>
    </>
  );
}
export default LayoutDefau;
