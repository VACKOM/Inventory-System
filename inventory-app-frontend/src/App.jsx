// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainMenu from './components/pages/mainMenu';
import ProductRegistration from './components/pages/productRegister';
import SupplierRegistration from './components/pages/supplierRegister';
import CategoryRegistration from './components/pages/categoryRegister';
import CustomerRegistration from './components/pages/customerRegister';
import SalesPersonRegistration from './components/pages/salesperson';
import InventoryTracker from './components/pages/inventoryTracker';
import SkuLookup from './components/pages/skuLookup';
import './App.css'; // Import any global styles

const App = () => {
    return (
        <Router>
            <div style={{ display: 'flex' }}>
                <MainMenu />
                <div className="content-area">
                    <Routes>
                        <Route path="/customer-register" element={<CustomerRegistration />} />
                        <Route path="/product-register" element={<ProductRegistration />} />
                        <Route path="/supplier-register" element={<SupplierRegistration />} />
                        <Route path="/category-register" element={<CategoryRegistration />} />
                        <Route path="/salesperson" element={<SalesPersonRegistration />} />
                        <Route path="/sku-lookup" element={<SkuLookup />} />
                        <Route path="/inventory-tracker" element={<InventoryTracker />} />
                        <Route path="/" element={<h2>Welcome to the Dashboard</h2>} /> {/* Default route */}
                    </Routes>
                </div>
            </div>
        </Router>
    );
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