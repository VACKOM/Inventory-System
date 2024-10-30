// SelectComponent.js
import React, {useState, useEffect} from 'react';
import axios from 'axios';


const selectSelectSupplier = ({ onSelectChange }) => {
    const [suppliers, setSuppliers] = useState([]);
    const [selectedSupplier, setSelectedSupplier] = useState("");

    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/supplier");
                setSuppliers(response.data); // Adjust according to your API response
            } catch (error) {
                console.error("Error fetching suppliers:", error);
            }
        };

        fetchSuppliers();
    }, []);


  const handleChange = (e) => {
    onSelectChange(e.target.value);
    setSelectedSupplier(e.target.value)
  };

  return (
    <div>
    <select id="suppliers" value={selectedSupplier} onChange={handleChange}>
    <option value="" disabled>Select a supplier</option>

    {suppliers.map((supplier) => (
                    <option key={supplier._id} value={supplier.name}> {/* Use unique id */}
                        {supplier.name} {/* Display the supplier name */}
                    </option>
                ))}
    </select>
    </div>
   
  );
};

export default selectSelectSupplier;
