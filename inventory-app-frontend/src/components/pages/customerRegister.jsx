import React, {useState} from "react";
import axios from "axios";
import "../css/regForm.css";


const CustomerRegistration = () => {
    const [customer, setCustomer] = useState({
       
            customerid: '',
            fname: '',
            lname: '',
            email: '',
            number: '',
            address: '',
            dob:'',
            notes: ''
            
        
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomer({ ...customer, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://node-js-inventory-system.onrender.com/api/customer', customer);
            alert('Customer registered successfully!');
            console.log(response.data);
        } catch (error) {
            console.error('There was an error registering this Customer!', error);
            alert('Error registering Customer');
        }
    };

     // Handle Form Reset Button
     const handleReset = () => {
        window.location.href = window.location.href;
    };

    return (
        

        <div className="container mt-5">
            <h2>Customer Registration</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Customer ID:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="customerid"
                        value={customer.customerid}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>First Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="fname"
                        value={customer.fname}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Last Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="lname"
                        value={customer.lname}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={customer.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Contact Number:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="number"
                        value={customer.number}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Address:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="address"
                        value={customer.address}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Date of Birth:</label>
                    <input
                        type="date"
                        className="form-control"
                        name="dob"
                        value={customer.dob}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Notes:</label>
                    <input
                        type="textarea"
                        className="form-control"
                        name="notes"
                        value={customer.notes}
                        onChange={handleChange}
                    />
                </div>
               
                {/* Submit Button */}
                <button type="submit" className="btn btn-primary btn-block mb-2">Register New Customer</button>
                {/* Reset Button */}
                <button type="button" className="btn btn-secondary" onClick={handleReset}>Reset</button>
            </form>
        </div>

    );
};

export default CustomerRegistration;