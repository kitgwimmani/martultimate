import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';

import Dashboard from './Dashboard';

import Business from './Business';
import CreateBusiness from './business/CreateBusiness';
import UpdateBusiness from './business/UpdateBusiness';

import Category from './Category';
import CreateCategory from './category/CreateCategory';
import UpdateCategory from './category/UpdateCategory';

import Subcategory from './Subcategory';
import CreateSubcategory from './subcategory/CreateSubcategory';
import UpdateSubcategory from './subcategory/UpdateSubcategory';

import Location from './Location';
import CreateLocation from './location/CreateLocation';
import UpdateLocation from './location/UpdateLocation';

import Customer from './Customer';
import CreateCustomer from './customer/CreateCustomer';
import UpdateCustomer from './customer/UpdateCustomer';

import Product from './Product';
import CreateProduct from './product/CreateProduct';
import UpdateProduct from './product/UpdateProduct';


function App() {
  return (
    <div className="App">
    <div className="app-container">
    
    <BrowserRouter>
    <div className="sidebar" id="non-printable-content">
    <Sidebar/>
    </div>
      <div className='main-content'>
      <Routes>
      <Route path='/' element={<Dashboard />}></Route>
      
        <Route path='/business' element={<Business />}></Route>
        <Route path='business/createBusiness' element={<CreateBusiness/>}></Route>
        <Route path='business/updateBusiness/:id' element={<UpdateBusiness />}></Route>
        
        <Route path='/category' element={<Category />}></Route>
        <Route path='category/createCategory' element={<CreateCategory />}></Route>
        <Route path='category/updateCategory/:id' element={<UpdateCategory />}></Route>

        <Route path='/subcategory' element={<Subcategory />}></Route>
        <Route path='subcategory/createSubcategory' element={<CreateSubcategory />}></Route>
        <Route path='subcategory/updateSubcategory/:id' element={<UpdateSubcategory />}></Route>

        <Route path='/location' element={<Location />}></Route>
        <Route path='location/createLocation' element={<CreateLocation />}></Route>
        <Route path='location/updateLocation/:id' element={<UpdateLocation />}></Route>

        <Route path='/customer' element={<Customer />}></Route>
        <Route path='customer/createCustomer' element={<CreateCustomer />}></Route>
        <Route path='customer/updateCustomer/:id' element={<UpdateCustomer />}></Route>

        <Route path='/product' element={<Product />}></Route>
        <Route path='product/createProduct' element={<CreateProduct />}></Route>
        <Route path='product/updateProduct/:id' element={<UpdateProduct />}></Route>

      </Routes>
      </div>
    </BrowserRouter>
    
    </div>
    </div>
  );
}

export default App;
