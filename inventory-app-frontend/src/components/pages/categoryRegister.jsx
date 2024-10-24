import React, {useState} from "react";
import axios from "axios";
import "../productRegister.css"


const CategoryRegistration = () => {
    const [category, setSupplier] = useState({
        name: '',
        description: '',
        date:''
        
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSupplier({ ...category, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/category', category);
            alert('Product Category registered successfully!');
            console.log(response.data);
        } catch (error) {
            console.error('There was an error registering this Product Category!', error);
            alert('Error registering Product Category');
        }
    };

    return (
        

        <div className="container mt-5">
            <h2>New Category Registration</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={category.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="description"
                        value={category.description}
                        onChange={handleChange}
                    />
                </div>
               
                <div className="form-group">
                    <label>Date:</label>
                    <input
                        type="date"
                        className="form-control"
                        name="date"
                        value={category.date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Register Product Category</button>
            </form>
        </div>

    );
};

export default CategoryRegistration;