import React, { useState } from 'react';
import axios from 'axios';
import "../css/regForm.css";

const SKULookup = () => { // Component name should start with an uppercase letter
    const [sku, setSku] = useState('');
    const [productData, setProductData] = useState(null);
    const [error, setError] = useState('');
    
    const [sales, setSales] = useState({
        productid: '',
        productname: '',
        quantity: '',
        price: '',
        total: '',
        customerid: '',
        paymentmethod: '',
        salesperson: '',
        discount: '',
        tax: '',
        notes: '',
        date: ''
    });

    // Handle changes in sales inputs
    const handleChangeText = (e) => {
        const { name, value } = e.target;
        let newSales = { ...sales, [name]: value };

         // Calculate total if quantity and price are available
         if (newSales.quantity && newSales.price) {
            newSales.total = parseFloat(newSales.quantity) * parseFloat(newSales.price);
            newSales.price = parseFloat(newSales.price);
            newSales.quantity = parseFloat(newSales.quantity);
        } else {
            newSales.total = ''; // or 0 if you prefer
        }

        setSales(newSales);
    };

    // Handle SKU input change and fetch product data
    const handleChange = async (e) => {
        const inputSku = e.target.value;
        setSku(inputSku);

        if (inputSku) {
            try {
                const response = await axios.get(`https://node-js-inventory-system.onrender.com/stockRouter/sku/${inputSku}`);
                setProductData(response.data);
                setError('');

                // Update sales state with product data
                setSales({
                    ...sales,
                    productid: response.data.sku,
                    productname: response.data.productname,
                    price: response.data.price
                });
            } catch (err) {
                setProductData(null);
                setError(err.response?.data?.message || 'Error fetching product data');
            }
        } else {
            setProductData(null);
            setError('');
        }
    };

    // Handle form submission
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // Step 1: Record the sale
        const response = await axios.post('https://node-js-inventory-system.onrender.com/api/sales', sales);
        alert('Sales recorded successfully!');
        console.log(response.data);

        // Step 2: Update stock quantity
        const updatedQuantity = productData.quantity - sales.quantity; // Assuming `stock` is available in productData

        await axios.put(`https://node-js-inventory-system.onrender.com/api/stock/sku/${sales.productid}`, {
            quantity: updatedQuantity,
            price: sales.price,
            date: sales.date
        });

        // Optionally reset the form
        setSales({
            productid: '',
            productname: '',
            quantity: '',
            price: '',
            total: '',
            customerid: '',
            paymentmethod: '',
            salesperson: '',
            discount: '',
            tax: '',
            notes: ''
           
        });
        setSku('');
        setProductData(null);
    } catch (error) {
        console.error('There was an error recording this sale!', error);
        alert('Error recording sale');
    }
};

    return (
        <div>
            <h2>Point Of Sales</h2>
            <input
                type="text"
                value={sku}
                onChange={handleChange}
                placeholder="Enter SKU number"
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {productData && (
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <h3>Product Details:</h3>
                        <p>SKU: {productData.sku}</p>
                        <p>Product Name: {productData.productname}</p>
                        <p>Price: ${productData.price}</p>
                    </div>
                    <div className="form-group">
                        <label>Quantity:</label>
                        <input
                            type="number"
                            className="form-control"
                            name="quantity"
                            value={sales.quantity}
                            onChange={handleChangeText}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Total Amount:</label>
                        <input
                            type="number"
                            className="form-control"
                            name="total"
                            value={sales.total} // This should be calculated based on quantity and price
                            onChange={handleChangeText}
                            readOnly
                        />
                    </div>
                    <div className="form-group">
                        <label>Customer Number:</label>
                        <input
                            type="number"
                            className="form-control"
                            name="customerid"
                            value={sales.customerid}
                            onChange={handleChangeText}
                        />
                    </div>
                    <div className="form-group">
                        <label>Payment Method:</label>
                        <select
                            className="form-control"
                            name="paymentmethod"
                            value={sales.paymentmethod}
                            onChange={handleChangeText}
                            required
                        >
                            <option value="" disabled>Select Payment Method</option>
                            <option value='Cash'>Cash</option>
                            <option value='Mobile Money'>Mobile Money</option>
                            <option value='Visa Card'>Visa Card</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Sales Person ID:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="salesperson"
                            value={sales.salesperson}
                            onChange={handleChangeText}
                        />
                    </div>
                    <div className="form-group">
                        <label>Discount:</label>
                        <input
                            type="number"
                            className="form-control"
                            name="discount"
                            value={sales.discount}
                            onChange={handleChangeText}
                        />
                    </div>
                    <div className="form-group">
                        <label>Tax Amount:</label>
                        <input
                            type="number"
                            className="form-control"
                            name="tax"
                            value={sales.tax}
                            onChange={handleChangeText}
                        />
                    </div>
                    <div className="form-group">
                        <label>Notes:</label>
                        <textarea
                            className="form-control"
                            name="notes"
                            value={sales.notes}
                            onChange={handleChangeText}
                        />
                    </div>
                  
                    <button type="submit" className="btn btn-primary btn-block">Record Sales</button>
                </form>
            )}
        </div>
    );
};

export default SKULookup;

