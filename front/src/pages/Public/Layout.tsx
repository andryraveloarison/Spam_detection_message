import { Outlet,Navigate } from 'react-router-dom';
import { accountService } from '../../services';


const Layout = () => {

    if(accountService.isLogged()){
        return <Navigate to="/admin/"/>
    }


    return (            
            
            <Outlet/>
    );
};

export default Layout;