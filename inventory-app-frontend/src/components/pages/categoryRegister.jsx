import React, {useState} from "react";
import axios from "axios";
import "../css/regForm.css"


const CategoryRegistration = () => {
    const [category, setCategory] = useState({
        name: '',
        description: ''
        
        
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategory({ ...category, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/category', category);
            alert('Product Category registered successfully!');
            console.log(response.data);
            window.location.reload();
        } catch (error) {
            console.error('There was an error registering this Product Category!', error);
            alert('Error registering Product Category');
        }
    };

    // Handle Form Reset Button
    const handleReset = () => {
        window.location.href = window.location.href;
    };

    return (
        

        <div className="container mt-5">
            <h2>Category Registration</h2>
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
               
             {/* Submit Button */}
                <button type="submit" className="btn btn-primary btn-block mb-2">Register Product Category</button>
                {/* Reset Button */}     
                <button type="button" className="btn btn-secondary" onClick={handleReset}>Reset</button>
            </form>
        </div>

    );
};

export default CategoryRegistration;