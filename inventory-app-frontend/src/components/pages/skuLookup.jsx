import React, { useState } from 'react';
import axios from 'axios';
import QRCodeScanner from '../assets/CodeScanner/QRCodeScanner';
import "../css/regForm.css";

const SKULookup = () => { 
    const [sku, setSku] = useState('');
    const [productData, setProductData] = useState(null);
    const [error, setError] = useState('');
    const [scannedItem, setScannedItem] = useState(null);
    const [showScanner, setShowScanner] = useState(true); // State to control scanner visibility

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

    const handleChangeText = (e) => {
        const { name, value } = e.target;
        let newSales = { ...sales, [name]: value };

        if (newSales.quantity && newSales.price) {
            newSales.total = parseFloat(newSales.quantity) * parseFloat(newSales.price);
        } else {
            newSales.total = ''; 
        }

        setSales(newSales);
    };

    // Handle SKU input change and fetch product data
    const handleScan = async (qrData) => {
        setSku(qrData);

        try {
            const response = await axios.get(`https://node-js-inventory-system.onrender.com/api/stockRouter/sku/${qrData}`);
            setProductData(response.data);
            setScannedItem(response.data);
            setError('');
            setShowScanner(false); // Hide the scanner after a successful scan
            setSales({
                ...sales,
                productid: response.data.sku,
                productname: response.data.productname,
                price: response.data.price
            });
        } catch (err) {
            setProductData(null);
            setScannedItem(null);
            setError(err.response?.data?.message || 'Error fetching product data');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://node-js-inventory-system.onrender.com/api/sales', sales);
            alert('Sales recorded successfully!');
            console.log(response.data);

            const updatedQuantity = productData.quantity - sales.quantity;

            await axios.put(`https://node-js-inventory-system.onrender.com/api/stock/sku/${sales.productid}`, {
                quantity: updatedQuantity,
                price: sales.price,
                date: sales.date
            });

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
                notes: '',
                date: ''
            });
            setSku('');
            setProductData(null);
            setScannedItem(null);
            setShowScanner(true); // Re-show the scanner if you want to scan another item
        } catch (error) {
            console.error('There was an error recording this sale!', error);
            alert('Error recording sale');
        }
    };

    return (
        <div>
            {/* <h2>Point Of Sales</h2> */}

            {showScanner && <QRCodeScanner onScan={handleScan} />} {/* Only show scanner if showScanner is true */}

            {scannedItem ? (
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <h3>Product Details:</h3>
                        <p>SKU: {scannedItem.sku}</p>
                        <p>Product Name: {scannedItem.productname}</p>
                        <p>Price: ${scannedItem.price}</p>
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
                            value={sales.total}
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
                            <option value="Cash">Cash</option>
                            <option value="Mobile Money">Mobile Money</option>
                            <option value="Visa Card">Visa Card</option>
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
            ) : (
                <p>Scan a QR code to display item details.</p>
            )}
        </div>
    );
};

export default SKULookup;

