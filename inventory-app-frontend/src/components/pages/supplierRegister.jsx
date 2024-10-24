import React, {useState} from "react";
import axios from "axios";
import "../productRegister.css"


const SupplierRegistration = () => {
    const [supplier, setSupplier] = useState({
        name: '',
        contactPerson: '',
        contactNumber: '',
        email: '',
        productSupplied: '',
        date:''
        
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSupplier({ ...supplier, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/supplier', supplier);
            alert('Supplier registered successfully!');
            console.log(response.data);
        } catch (error) {
            console.error('There was an error registering this Supplier!', error);
            alert('Error registering Supplier');
        }
    };

    return (
        

        <div className="container mt-5">
            <h2>New Supplier Registration</h2>
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
                <div className="form-group">
                    <label>Date:</label>
                    <input
                        type="date"
                        className="form-control"
                        name="date"
                        value={supplier.date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Register Supplier</button>
            </form>
        </div>

    );
};

export default SupplierRegistration;