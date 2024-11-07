import React, {useState} from "react";
import axios from "axios";
import SelectSupplier from "../assets/SelectBoxes/SelectSupplier"// Assuming SelectSupplier is imported
import SelectCategory from "../assets/SelectBoxes/SelectCategory";
import "../css/regForm.css"


const ProductRegistration = () => {
    // State to hold the selected supplier value
    const [selectedValue, setSelectedValue] = useState('');
    const [newSKU, setnewSKU] = useState('');

    // State to hold product details
    const [product, setProduct] = useState({
        name: '',
        sku: '',
       // quantity: '',
        //price: '',
        description: '',
        supplier: '',
        category: '',
        stock:''
        
    });


    //Inserting to SKU Number
    function replaceAtIndex(originalString, index, textToReplace) {
        if (index < 0 || index >= originalString.length) {
            console.error("Index out of bounds");
            return originalString; // Return original if index is invalid
        }
    
        // Use slice to replace text
        return originalString.slice(0, index) + textToReplace + originalString.slice(index + textToReplace.length);
    }

    //state to hold SKU Number
    // let addSku = "SKU/CAT/SUP/###";
    // const [skuTextBox, setskuTextBox] = useState('SKU/CAT/SUP/###');

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
            const response = await axios.post('https://node-js-inventory-system.onrender.com/api/product', product);
            alert('Product registered successfully!'); // Show success message
            console.log(response.data); // Log the response data
        } catch (error) {
            console.error('There was an error registering the product!', error); // Log the error
            alert('Error registering product'); // Show error message
        }
    };

    const [addSku, setAddSku] = useState("SKU/CA/SU/"); // Initializing Sku Number
    const [skuTextBox, setSkuTextBox] = useState("");

    // Handle changes in the supplier select box
    const handleSelectSupplierChange = (value) => {
        setSelectedValue(value); // Update the selected value
       // setProduct({ ...product, ["supplier"]: value }); // Update the product state with the selected supplier
        const supplierName = value.substring(0, 2);
        const selectedSKU = supplierName.toUpperCase();
        const newText = replaceAtIndex(addSku, 7, selectedSKU); // Replace at index 6
        const randomNum = Math.floor(Math.random() * 1000);
        setAddSku(newText); // Step 2: Update the state with the new SKU
        setSkuTextBox(newText+randomNum); // Update textbox state
        setProduct({ ...product, ["sku"]: newText+randomNum, ["supplier"]: value });
        
    };


    // Handle changes in the category select box
    const handleSelectCategoryChange = (value) => {
        setProduct({ ...product, category: value }); // Update the product state with the selected category
        const categoryName = value.substring(0, 2);
        const selectedSKU = categoryName.toUpperCase();
        const newText = replaceAtIndex(addSku, 4, selectedSKU); // Replace at index 4
        
        setAddSku(newText); // Step 2: Update the state with the new SKU 
        setSkuTextBox(newText); // Update textbox state
        
        
    };



// Handle Form Reset Button
    const handleReset = () => {
       
        window.location.href = window.location.href;
    };



    return (
        <div className="container mt-5">
            <h2>Product Registration</h2>
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
                
                {/* Category Select Box */}
                <div className="form-group">
                    <label>Product Category:</label>

                    <SelectCategory
                        name="category"
                        onSelectChange={handleSelectCategoryChange} // Pass the handler to the SelectSupplier component
                        required
                    />
                </div>

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
                         disabled = "true"
                        id= "SKU"
                        className="form-control"
                        name="sku"
                        value={skuTextBox}
                        onChange={handleChange}
                        required
                    />
                </div>
            
                
                {/* Submit Button */}
                <button type="submit" className="btn btn-primary btn-block mb-2">Register Product</button>
                {/* Reset Button */}
                
                <button type="button" className="btn btn-secondary" onClick={handleReset}>Reset</button>
            </form>
        </div>
    );
};

export default ProductRegistration;