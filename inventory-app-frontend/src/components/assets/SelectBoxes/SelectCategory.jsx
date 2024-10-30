// SelectComponent.js
import React, {useState, useEffect} from 'react';
import axios from 'axios';


const selectSelectCategory = ({ onSelectChange }) => {
    const [category, setCategory] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/category");
                setCategory(response.data); // Adjust according to your API response
            } catch (error) {
                console.error("Error fetching category:", error);
            }
        };

        fetchCategory();
    }, []);


  const handleChange = (e) => {
    onSelectChange(e.target.value);
    setSelectedCategory(e.target.value)
  };

  return (
    <div>
    <select id="categories" value={selectedCategory} onChange={handleChange}>
    <option value="" disabled>Select a Product Category</option>

    {category.map((category) => (
                    <option key={category._id} value={category.name}> {/* Use unique id */}
                        {category.name} {/* Display the category name */}
                    </option>
                ))}
    </select>
    </div>
   
  );
};

export default selectSelectCategory;