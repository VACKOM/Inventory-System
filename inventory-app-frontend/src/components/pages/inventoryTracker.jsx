import React, { useState } from 'react';
import AccordionItem from "../assets/accordion/inventory"

const ParentComponent = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const items = [
        { title: 'Item 1', content: 'This is the body of Item 1.' },
        //{ title: 'Item 2', content: 'This is the body of Item 2.' },
    ];

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        
        <div className="accordion">
             <h2>Inventory Tracker</h2>
            {items.map((item, index) => (
                <AccordionItem
                    key={index}
                    content={item} // Pass the body content
                    isOpen={openIndex === index}
                    toggleAccordion={() => toggleAccordion(index)}
                />
            ))}
        </div>
    );
};

export default ParentComponent;