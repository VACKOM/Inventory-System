import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const AccordionItem = ({ id, name, products, stockData, isOpen, toggleAccordion }) => {
    const navigate = useNavigate(); // Call useNavigate at the top level

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
                                    {products.map(product => {
                                        // Find the corresponding stock data
                                        const stockItem = stockData.find(stock => stock.sku === product.sku);

                                        return (
                                            <tr key={product.sku}>
                                                <td>{product.name}</td>
                                                <td>{product.description}</td>
                                                <td>{stockItem ? stockItem.price : 'N/A'}</td>
                                                <td>{stockItem ? stockItem.quantity : 'N/A'}</td>
                                                <td>
                                                    <button onClick={() => {
                                                        navigate("/productReorder", { state: { sku: product.sku, name: product.name, supplier: product.supplier } });
                                                    }}>
                                                        Reorder
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
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
    const [stock, setStock] = useState([]); // State to store stock data

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

    // Fetch stock data when component mounts
    useEffect(() => {
        const fetchStock = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/stock');
                setStock(response.data);
            } catch (error) {
                console.error('Error fetching stock:', error);
            }
        };

        fetchStock();
    }, []);

    const toggleAccordion = (id) => {
        const index = items.findIndex(item => item.name === id);
        setOpenIndex(openIndex === index ? null : index);

        // Filter products that match the clicked category
        const filteredProducts = products.filter(product => product.category === id);
        setCatPro(filteredProducts);
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
                        stockData={stock} // Pass stock data to AccordionItem
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