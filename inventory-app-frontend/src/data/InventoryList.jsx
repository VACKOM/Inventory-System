// useInventoryData.js (Custom Hook)
import { useState, useEffect } from 'react';
import axios from 'axios';

const useInventoryData = () => {
    const [products, setProducts] = useState([]);
    const [stock, setStock] = useState([]);
    const [inventoryList, setInventoryList] = useState([]);

    // Fetch products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://node-js-inventory-system.onrender.com/api/product');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    // Fetch stock data
    useEffect(() => {
        const fetchStock = async () => {
            try {
                const response = await axios.get('https://node-js-inventory-system.onrender.com/api/stock');
                setStock(response.data);
            } catch (error) {
                console.error('Error fetching stock:', error);
            }
        };
        fetchStock();
    }, []);

    // Combine products and stock data
    useEffect(() => {
        if (products.length > 0 && stock.length > 0) {
            const combinedData = products.map(product => {
                const stockItem = stock.find(s => s.sku === product.sku);
                return {
                    sku: product.sku,
                    name: product.name,
                    description: product.description,
                    price: stockItem ? stockItem.price : 0,
                    quantity: stockItem ? stockItem.quantity : 0,
                    category: product.category,
                };
            });

            setInventoryList(combinedData);
        }
    }, [products, stock]);

    return inventoryList;
};

export default useInventoryData;

