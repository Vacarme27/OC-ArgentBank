import argentBankLogo from '../../assets/img/argentBankLogo.png';
import './header.scss';
import { Link, useLocation } from 'react-router-dom';
import { authOut } from "../../redux/Slices/authSlice";
import { useDispatch, useSelector } from "react-redux";

function Header() {
    const dispatch = useDispatch();        
    const connectedOrNot = useSelector((state) => state.auth.isAuth);
    const handleLogOut = () => {
        dispatch(authOut());
    };
    const location = useLocation();
    const userSpace = location => {        
        if( location.pathname === "/user"){
            return
        } else {
            return <Link to="/user">User Space</Link>
        }
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
                <div>
                    {  connectedOrNot ? 
                        <>                        
                        {userSpace(location)}
                            <Link to="/sign" className="link_SignOut" onClick={handleLogOut}>
                                <i className="fa-solid fa-right-from-bracket"></i>
                                Sign Out
                            </Link>
                        </>
                        :
                        <Link className="main-nav-item" to="/sign">
                            <i className="fa fa-user-circle"></i>
                            Sign In
                        </Link>
                    }
                </div>        
        </nav>
    )
}

export default Header;