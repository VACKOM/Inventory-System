
import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Routes, Route } from "react-router-dom";
import Sidebar from './scenes/global/SideBar';
import Dashboard from "./scenes/dashboard";
import Assets from './scenes/assets';
import AddAsset from './scenes/assets/addAsset';
import ClaimAsset from './scenes/assets/claimAsset';

import StockMovement from './scenes/assets';
import Alerts from './scenes/alerts';
import Suppliers from './scenes/suppliers';
import AddSupplier from './scenes/suppliers/addSupplier';
import Departments from './scenes/departments';
import AddDepartment from './scenes/departments/addDepartment';
import Staff from './scenes/staff';
import AddStaff from './scenes/staff/addStaff';

import Categories from './scenes/categories';
import AddCategory from './scenes/categories/addCategory';
import PurchaseOrders from './scenes/purchase';
import SalesOrder from './scenes/sales';
import Users from './scenes/users';
import Reports from './scenes/reports';
import Settings from './scenes/settings';
import QRCodeGenerator from './components/assets/QRCodes/QRCodeGenerator';


const App = () => {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main className='content'>
            <Routes>
              <Route path='/' element={<Dashboard />} />
              <Route path='/assets' element={<Assets />} />
              <Route path='/add-asset' element={<AddAsset />} />
              <Route path='/claim-asset' element={<ClaimAsset />} />
              <Route path='/categories' element={<Categories />} />
              <Route path='/add-category' element={<AddCategory />} />
              <Route path='/suppliers' element={<Suppliers />} />
              <Route path='/add-supplier' element={<AddSupplier />} />
              <Route path='/departments' element={<Departments />} />
              <Route path='/add-department' element={<AddDepartment />} />  
              <Route path='/staff' element={<Staff />} />
              <Route path='/add-staff' element={<AddStaff />} />  


              <Route path='/stock-movement' element={<StockMovement />} />
              <Route path='/alerts' element={<Alerts />} />
              <Route path='/suppliers' element={<Suppliers />} />
              <Route path='/purchase-orders' element={<PurchaseOrders />} />
              <Route path='/sales-order' element={<SalesOrder />} />
              <Route path='/users' element={<Users />} />
              <Route path='/reports' element={<Reports />} />
              <Route path='/settings' element={<Settings />} />
              <Route path='/qrcode-generator' element={<QRCodeGenerator />} />
              {/* <Route path='/inventory' element={<InventoryList />} /> */}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
