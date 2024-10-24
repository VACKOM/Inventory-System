import React, {useState} from "react";
import axios from "axios";
import "../productRegister.css"


const ProductRegistration = () => {
    const [product, setProduct] = useState({
        name: '',
        sku: '',
        quantity: '',
        price: '',
        description: '',
        supplier: '',
        category:'',
        date:'',
        
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/product', product);
            alert('Product registered successfully!');
            console.log(response.data);
        } catch (error) {
            console.error('There was an error registering the product!', error);
            alert('Error registering product');
        }
    };

    return (
        

        <div className="container mt-5">
            <h2>New Stock Registration</h2>
            <form onSubmit={handleSubmit}>
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
                <div className="form-group">
                    <label>Description:</label>
                    <textarea
                        className="form-control"
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                    ></textarea>
                </div>
               
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
                <div className="form-group">
                    <label>Category:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Supplier:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="supplier"
                        value={product.supplier}
                        onChange={handleChange}
                        required
                    />
                </div>
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
                <button type="submit" className="btn btn-primary btn-block">Register Product</button>
            </form>
        </div>

    );
};

export default ProductRegistration;