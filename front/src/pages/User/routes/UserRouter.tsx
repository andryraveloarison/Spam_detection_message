import {Routes, Route} from 'react-router-dom'


import { Spam, Layout, Send } from '../components'
import Error from '../../../_utils/Eror';
import Reception from '../components/Reception';
import Discussion from '../components/Discussion';


const UserRouter = () => {

    return (
        <div>
        <Routes>
          <Route element={<Layout/>}>

            <Route index element={<Reception/>}/>

            <Route path="/send" element={<Send/>}/>

            <Route path="/reception" element={<Reception/>}/>

            <Route path="/spam" element={<Spam/>}/>

            <Route path="/discussion" element={<Discussion/>}/>


           <Route path="*" element={<Error/>}/>

          </Route>
        </Routes>
        </div>
    );
};

export default UserRouter;