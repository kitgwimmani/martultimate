import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';


import Home from './Home';
import SignUpBusiness from './SignUpBusiness';
import SignUpCustomer from './SignUpCustomer';
import SuccessPage from './SuccessPage';
import Business from './Business';
import Product from './Product';
import UploadProduct from './UploadProduct';
import BusinessProfile from './BusinessProfile';


function App() {
  return (
    <div className="App">
    <div className="app-container">
    
    <BrowserRouter>
    <div>
    </div>
      <div className='main-content'>
      <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/signup_business' element={<SignUpBusiness />}></Route>
      <Route path='/signup_user' element={<SignUpCustomer />}></Route>
      <Route path='/success' element={<SuccessPage />}></Route>
      <Route path='/business' element={<Business />}></Route>
      <Route path='/product' element={<Product />}></Route>
      <Route path='/upload_product' element={<UploadProduct />}></Route>
      <Route path='/business_profile/:id' element={<BusinessProfile />}></Route>
    
      </Routes>
      </div>
    </BrowserRouter>
    
    </div>
    </div>
  );
}

export default App;
