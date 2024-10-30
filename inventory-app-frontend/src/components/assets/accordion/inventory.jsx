import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const AccordionItem = ({ id, name, products, isOpen, toggleAccordion }) => {
    return (
        <div className="card">
            <div className="card-header" onClick={toggleAccordion} style={{ cursor: 'pointer' }}>
                <h5 className="mb-0">
                    <button className="btn btn-link" style={{ textDecoration: 'none' }} id={id}>
                        {name}
                    </button>
                </h5>
            </div>
            {isOpen && (
                <div className="collapse show">
                    <div className="card-body">
                        {products.length > 0 ? (
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Price</th>
                                        <th>Stock Level</th>
                                        <th>Reorder</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(product => (
                                        <tr key={product._id}>
                                            <td>{product.name}</td>
                                            <td>{product.description}</td>
                                            <td>${product.price}</td>
                                            <td>${product.stock}</td>
                                            <td>
                                                <button>Reorder</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>No products available for this category.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

const Accordion = () => {
    const [items, setItems] = useState([]); // State to store fetched categories
    const [products, setProducts] = useState([]); // State to store fetched products
    const [catPro, setCatPro] = useState([]); // State to store filtered products
    const [openIndex, setOpenIndex] = useState(null); // State to track which accordion is open

    // Fetch categories when component mounts
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/category');
                setItems(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchItems();
    }, []);

    // Fetch products when component mounts
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/product');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const toggleAccordion = (id) => {
        console.log(`Toggled ID: ${id}`);
        const index = items.findIndex(item => item.name === id);
        setOpenIndex(openIndex === index ? null : index);

        // Filter products that match the clicked category
        const filteredProducts = products.filter(product => product.category === id);
        setCatPro(filteredProducts);
        console.log(filteredProducts);
    };

    return (
        <div className="accordion" id="accordionExample">
            {items.length > 0 ? (
                items.map((item, index) => (
                    <AccordionItem
                        key={item.name} // Assuming each item has a unique ID
                        id={`accordion-toggle-${item.name}`} // Unique ID for the toggle button
                        name={item.name} // Accordion header
                        products={catPro.filter(product => product.category === item.name)} // Pass filtered products for the specific category
                        isOpen={openIndex === index}
                        toggleAccordion={() => toggleAccordion(item.name)} // Pass the ID to the toggle function
                    />
                ))
            ) : (
                <div>No items available</div>
            )}
        </div>
    );
};

export default Accordion;