

import React from 'react';

interface PageSelectorProps {
    onChange: (value: number) => void;
    value: number;
}

const Pageselector: React.FC<PageSelectorProps> = ({ onChange, value }) => {
    const options = Array.from({ length: 4062 }, (_, index) => index + 1);

    const handleNumberChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedSol = parseInt(event.target.value);
        onChange(selectedSol);
    };

    return (
        <div className='flex items-center mx-3'>

            <label className='mr-2'>Page</label>
            <select onChange={handleNumberChange} value={value} className='px-6 py-2 w-28 my-1 text-sm font-normal leading-5  text-dark shadow-sm rounded-md cursor-pointer'>
                {options.map((number) => (
                    <option key={number} value={number}>
                        {number}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Pageselector;
