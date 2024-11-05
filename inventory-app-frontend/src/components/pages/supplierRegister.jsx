import React, {useState} from "react";
import axios from "axios";
import "../css/regForm.css"


const SupplierRegistration = () => {
    const [supplier, setSupplier] = useState({
        name: '',
        contactPerson: '',
        contactNumber: '',
        email: '',
        productSupplied: ''
       
        
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSupplier({ ...supplier, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/supplier', supplier);
            alert('Supplier registered successfully!');
            console.log(response.data);
        } catch (error) {
            console.error('There was an error registering this Supplier!', error);
            alert('Error registering Supplier');
        }
    };

     // Handle Form Reset Button
     const handleReset = () => {
        window.location.href = window.location.href;
    };

    return (
        

        <div className="container mt-5">
            <h2>Supplier Registration</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={supplier.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Contact Person:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="contactPerson"
                        value={supplier.contactPerson}
                        onChange={handleChange}
                    />
                </div>
               
                <div className="form-group">
                    <label>Contact Number:</label>
                    <input
                        type="number"
                        className="form-control"
                        name="contactNumber"
                        value={supplier.contactNumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={supplier.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Product Supplied:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="productSupplied"
                        value={supplier.productSupplied}
                        onChange={handleChange}
                        required
                    />
                </div>
               
                {/* Submit Button */}
                <button type="submit" className="btn btn-primary btn-block mb-2">Register Supplier</button>
                {/* Reset Button */}
                <button type="button" className="btn btn-secondary" onClick={handleReset}>Reset</button>
            </form>
        </div>

    );
};

export default SupplierRegistration;