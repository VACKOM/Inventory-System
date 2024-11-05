import React, { useState } from 'react';
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../css/regForm.css";

const ProductReorder = () => {
    const location = useLocation();
    const navigate = useNavigate(); // Add useNavigate hook
    const sku = location.state?.sku; 
    const name = location.state?.name; 
    const supplier = location.state?.supplier; 

    if (!sku) {
        return <Navigate to="/" />;
    }

    const [reorder, setReorder] = useState({
        productid: sku,
        productname: name,
        supplier: supplier,
        quantity: '',
        price: '',
        total: '',
        batchno: '',
        expiringdate: '',
        notes: ''
        
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        let newReorder = { ...reorder, [name]: value };

        // Calculate total if quantity and price are available
        if (newReorder.quantity && newReorder.price) {
            newReorder.total = parseFloat(newReorder.quantity) * parseFloat(newReorder.price);
            newReorder.price = parseFloat(newReorder.price);
            newReorder.quantity = parseFloat(newReorder.quantity);
        } else {
            newReorder.total = ''; // or 0 if you prefer
        }

        setReorder(newReorder);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Insert into the reorder collection
            const reorderResponse = await axios.post('http://localhost:3000/api/reorder', reorder);
            alert('Product successfully reordered!');

            // Try to get the current stock quantity
            try {
                const stockResponse = await axios.get(`http://localhost:3000/api/stock/sku/${sku}`);
                const currentStock = stockResponse.data.quantity;

                // Calculate new quantity
                const newQuantity = parseInt(currentStock) + parseInt(reorder.quantity);
                
                console.log("Updating stock with new quantity:", newQuantity);

                // Update existing stock
                await axios.put(`http://localhost:3000/api/stock/sku/${sku}`, {
                    quantity: newQuantity,
                    price: reorder.price,
                    date: reorder.date
                });
            } catch (stockError) {
                if (stockError.response && stockError.response.status === 404) {
                    // SKU doesn't exist, create a new stock record
                    await axios.post('http://localhost:3000/api/stock', {
                        sku: sku,
                        quantity: reorder.quantity,
                        price: reorder.price,
                        lastupdate: reorder.date, // Assuming you want to set the last update date
                    });
                    alert('New stock record created!');
                } else {
                    console.error('Error fetching stock data:', stockError);
                    alert('Error fetching stock data');
                }
            }

            console.log(reorderResponse.data);
            navigate('/inventoryTracker');
        } catch (error) {
            console.error('There was an error reordering this Product!', error);
            alert('Error reordering Product');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Product Reorder</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <p>Product SKU: {sku}</p>
                    <p>Product Name: {name}</p>
                    <p>Product Supplier: {supplier}</p>
                </div>
                <div className="form-group">
                    <label>Quantity:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="quantity"
                        value={reorder.quantity}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Unit Price:</label>
                    <input
                        type="number"
                        className="form-control"
                        name="price"
                        value={reorder.price}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Total Cost:</label>
                    <input
                        type="number"
                        className="form-control"
                        name="total"
                        value={reorder.total || 0} // Prevent storing empty string
                        readOnly
                    />
                </div>
                <div className="form-group">
                    <label>Batch Number:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="batchno"
                        value={reorder.batchno}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Expiring Date:</label>
                    <input
                        type="date"
                        className="form-control"
                        name="expiringdate"
                        value={reorder.expiringdate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Notes:</label>
                    <textarea
                        className="form-control"
                        name="notes"
                        value={reorder.notes}
                        onChange={handleChange}
                    />
                </div>
               
                <button type="submit" className="btn btn-primary btn-block">Reorder</button>
            </form>
        </div>
    );
};

export default ProductReorder;
