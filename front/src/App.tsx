
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotAuthGuard from './_helpers/NotAuthGuard';
import PublicRouter from './pages/Public/PublicRouter';
import UserGuard from './_helpers/UserGuard';
import UserRouter from './pages/User/routes/UserRouter';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import AdminGuard from './_helpers/AdminGuard';



function App() {


  return (
    <Provider store={store}>   

    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={
          <NotAuthGuard>
              <PublicRouter/>
          </NotAuthGuard>    
          }/>  

        <Route path="/user/*" element={
            <UserGuard>
                <UserRouter/>
            </UserGuard> 
          }/>


      </Routes>
              
    </BrowserRouter>
  </div>

  </Provider>   

  )
}


export default App;