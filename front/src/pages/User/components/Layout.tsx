import { Outlet,Navigate } from 'react-router-dom';
import { accountService } from '../../../services';
import SideMenu from '../../../components/PublicComponents/SideMenu';
import { RootState } from '../../../redux/store';
import { useSelector } from 'react-redux';
import Header from '../../../components/PublicComponents/Header';


const Layout = () => {

    if(accountService.isLogged()){
        return <Navigate to="/admin/"/>
    }

    const username = useSelector((state: RootState) => state.auth.user?.first_name)
    const role = useSelector((state: RootState) => state.auth.user?.role.id)
    const user = {username, role}

    return (
        <div className='Layout'>
            <Header />
            <SideMenu username={username? username:''} role={role? role: 0}/>  
            <Outlet/>
        </div>
    );
};

export default Layout;