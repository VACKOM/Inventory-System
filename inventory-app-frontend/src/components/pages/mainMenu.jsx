// MainMenu.js

import React from 'react';

import { NavLink } from 'react-router-dom';
import '../css/mainMenu.css'; // Import the CSS file

const MainMenu = () => {
    return (
        <div className="nav-menu">
            <h2>Main Menu</h2>
            <ul>
                <li><NavLink to="/customer-register">Customer Registration</NavLink></li>
                <li><NavLink to="/product-register">Product Registration</NavLink></li>
                <li><NavLink to="/supplier-register">Supplier Registration</NavLink></li>
                <li><NavLink to="/category-register">Category Registration</NavLink></li>
                <li><NavLink to="/salesperson">Sales Person Registration</NavLink></li>
                <li><NavLink to="/sku-lookup">Point of Sales</NavLink></li>
                <li><NavLink to="/inventory-tracker">Inventory Tracker</NavLink></li>
            </ul>
        </div>
    );
};

export default MainMenu;

