import argentBankLogo from '../../assets/img/argentBankLogo.webp';
import './header.scss';
import { Link } from 'react-router-dom';
import { authOut } from "../../redux/Slices/authSlice";
import { useDispatch, useSelector } from "react-redux";

function Header() {
  const dispatch = useDispatch();
  const connectedOrNot = useSelector((state) => state.auth.token);
  const userName = useSelector((state) => state.user.userName);
  const handleLogOut = () => {
    dispatch(authOut());
  }
  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={argentBankLogo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div className='menuLinks'>
        {connectedOrNot ? 
          <>
            <Link to="/profile">
              <i className="fa fa-user-circle"></i>
              {userName}
            </Link>
            <Link to="/" className="link_SignOut" onClick={handleLogOut}>
              <i className="fa-solid fa-right-from-bracket"></i>
              Sign Out
            </Link>
          </>
          :
          <Link className="main-nav-item" to="/login">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        }
      </div>
    </nav>
  );
}

export default Header;