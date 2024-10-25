import React, {useState} from "react";
import axios from "axios";
import SelectSupplier from "../assets/SelectBoxes/SelectSupplier"// Assuming SelectSupplier is imported
import SelectCategory from "../assets/SelectBoxes/SelectCategory";
import "../css/regForm.css"


const ProductRegistration = () => {
    // State to hold the selected supplier value
    const [selectedValue, setSelectedValue] = useState('');

    // State to hold product details
    const [product, setProduct] = useState({
        name: '',
        sku: '',
        quantity: '',
        price: '',
        description: '',
        supplier: '',
        category: '',
        date: '',
    });

    // Handle changes in input fields
    const handleChange = (e) => {
        const { name, value } = e.target; // Destructure name and value from the event target
        setProduct({ ...product, [name]: value }); // Update the product state with the new value
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        try {
            // Send a POST request to register the product
            const response = await axios.post('http://localhost:3000/product', product);
            alert('Product registered successfully!'); // Show success message
            console.log(response.data); // Log the response data
        } catch (error) {
            console.error('There was an error registering the product!', error); // Log the error
            alert('Error registering product'); // Show error message
        }
    };

    // Handle changes in the supplier select box
    const handleSelectSupplierChange = (value) => {
        setSelectedValue(value); // Update the selected value
        setProduct({ ...product, ["supplier"]: value }); // Update the product state with the selected supplier
    };


    // Handle changes in the category select box
    const handleSelectCategoryChange = (value) => {
        setSelectedValue(value); // Update the selected value
        setProduct({ ...product, ["category"]: value }); // Update the product state with the selected supplier
    };

    return (
        <div className="container mt-5">
            <h2>New Stock Registration</h2>
            <form onSubmit={handleSubmit}>
                {/* Product Name Input */}
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                {/* Product Description Textarea */}
                <div className="form-group">
                    <label>Description:</label>
                    <textarea
                        className="form-control"
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                    ></textarea>
                </div>
                {/* Product Quantity Input */}
                <div className="form-group">
                    <label>Quantity:</label>
                    <input
                        type="number"
                        className="form-control"
                        name="quantity"
                        value={product.quantity}
                        onChange={handleChange}
                        required
                    />
                </div>
                {/* Product Price Input */}
                <div className="form-group">
                    <label>Price:</label>
                    <input
                        type="number"
                        className="form-control"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                {/* Category Select Box */}
                <div className="form-group">
                    <label>Product Category:</label>
                    <SelectCategory
                        onSelectChange={handleSelectCategoryChange} // Pass the handler to the SelectSupplier component
                        required
                    />
                </div>
                {/* <div className="form-group">
                    <label>Category:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                        required
                    />
                </div> */}

                {/* Supplier Select Box */}
                <div className="form-group">
                    <label>Supplier:</label>
                    <SelectSupplier
                        onSelectChange={handleSelectSupplierChange} // Pass the handler to the SelectSupplier component
                        required
                    />
                </div>

                {/* SKU Input */}
                <div className="form-group">
                    <label>SKU:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="sku"
                        value={product.sku}
                        onChange={handleChange}
                        required
                    />
                </div>
                {/* Product Date Input */}
                <div className="form-group">
                    <label>Date:</label>
                    <input
                        type="date"
                        className="form-control"
                        name="date"
                        value={product.date}
                        onChange={handleChange}
                        required
                    />
                </div>
                {/* Submit Button */}
                <button type="submit" className="btn btn-primary btn-block">Register Product</button>
            </form>
        </div>
    );
};

export default ProductRegistration;