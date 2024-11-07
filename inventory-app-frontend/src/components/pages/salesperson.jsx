import React, {useState} from "react";
import axios from "axios";
import "../css/regForm.css";


const SalesPersonRegistration = () => {
    const [salesperson, setSalesperson] = useState({
       
            salespersonid: '',
            fname: '',
            lname: '',
            email: '',
            number: '',
            address: '',
            dob:'',
            position:'',
            notes: '',
            date: ''
        
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSalesperson({ ...salesperson, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://node-js-inventory-system.onrender.com/api/salesperson', salesperson);
            alert('Sales Person registered successfully!');
            console.log(response.data);
        } catch (error) {
            console.error('There was an error registering this Sales Person!', error);
            alert('Error registering Sales Person');
        }
    };

     // Handle Form Reset Button
     const handleReset = () => {
        window.location.href = window.location.href;
    };

    return (
        

        <div className="container mt-5">
            <h2>Sales Person Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Sales Person ID:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="salespersonid"
                        value={salesperson.salespersonid}
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
                        value={salesperson.fname}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Last Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="lname"
                        value={salesperson.lname}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={salesperson.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Contact Number:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="number"
                        value={salesperson.number}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Address:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="address"
                        value={salesperson.address}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Date of Birth:</label>
                    <input
                        type="date"
                        className="form-control"
                        name="dob"
                        value={salesperson.dob}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Position:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="position"
                        value={salesperson.position}
                        onChange={handleChange}
                    />
                </div>

                
                <div className="form-group">
                    <label>Notes:</label>
                    <input
                        type="textarea"
                        className="form-control"
                        name="notes"
                        value={salesperson.notes}
                        onChange={handleChange}
                    />
                </div>
               
                <div className="form-group">
                    <label>Date:</label>
                    <input
                        type="date"
                        className="form-control"
                        name="date"
                        value={salesperson.date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary btn-block mb-2">Register New Sales Person</button>
            {/* Reset Button */}     
            <button type="button" className="btn btn-secondary" onClick={handleReset}>Reset</button>
            </form>
        </div>

    );
};

export default SalesPersonRegistration;