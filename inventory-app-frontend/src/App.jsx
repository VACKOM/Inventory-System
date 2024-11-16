
import { ColorModeContext, useMode} from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import {Routes, Route} from "react-router-dom";
import Topbar from './scenes/global/Topbar';
import Sidebar from './scenes/global/SideBar';
import Dashboard from "./scenes/dashboard";
import Inventory from './scenes/inventory';
import StockMovement from './scenes/stock';
 import Alerts from './scenes/alerts';
import Suppliers from './scenes/suppliers';
import PurchaseOrders from './scenes/purchase';
import SalesOrder from './scenes/sales';
import Users from './scenes/users';
import Reports from './scenes/reports';
import Settings from './scenes/settings';
import InventoryList from './scenes/inventory';

const App = () => {
    const [theme, colorMode] = useMode();
    return ( 
    <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider  theme={theme}>
            <CssBaseline />
             <div className="app">
                <Sidebar/>
                <main className='content'>
                    <Topbar/>
                    <Routes>
                        <Route path='/' element={<Dashboard/>} />
                        <Route path='/inventory' element={<Inventory/>} />
                        <Route path='/stock-movement' element={<StockMovement/>} />
                        <Route path='/alerts' element={<Alerts/>} />
                        <Route path='/suppliers' element={<Suppliers/>} />
                        <Route path='/purchase-orders' element={<PurchaseOrders/>} />
                        <Route path='/sales-order' element={<SalesOrder/>} />
                        <Route path='/users' element={<Users/>} />
                        <Route path='/reports' element={<Reports/>} />
                        <Route path='/settings' element={<Settings/>} />
                        <Route path='/inventory' element={<InventoryList/>} />

                    </Routes>
                </main>
                </div>;
        </ThemeProvider>
       
    </ColorModeContext.Provider>

    )
     
   
};

export default App;




// <Router>
        //     <Routes>
        //         <Route path="/" element={<Navigate to="/inventoryTracker" />} /> {/* Redirect */}
        //         <Route path="/inventoryTracker" element={<InventoryTracker />} />
        //         <Route path="/productReorder" element={<ProductReorder />} />
        //         {/* Other routes */}
        //     </Routes>
        // </Router>