import {Routes, Route} from 'react-router-dom'


import { Layout, Home, Auth } from '.'
import Error from '../../_utils/Eror';


const PublicRouter = () => {

    return (
        <div>
        <Routes>
          <Route element={<Layout/>}>

            <Route index element={<Home/>}/>

            <Route path="/home" element={<Home/>}/>
            <Route path="/auth" element={<Auth/>}/>

           <Route path="*" element={<Error/>}/>

          </Route>
        </Routes>
        </div>
    );
};

export default PublicRouter;