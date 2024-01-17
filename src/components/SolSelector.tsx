

import React from 'react';

interface SolSelectorProps {
    onChange: (value: number) => void;
    value: number;
}

const SolSelector: React.FC<SolSelectorProps> = ({ onChange, value }) => {
    const options = Array.from({ length: 20 }, (_, index) => index + 1);

    const handleNumberChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedPage = parseInt(event.target.value, 10);
        onChange(selectedPage);
    };

    return (
        <div className='flex items-center'>

            <label className='mr-2'>Sol</label>
            <select onChange={handleNumberChange} value={value} className='px-6 py-2 my-1 w-28  text-sm font-normal leading-5  text-dark shadow-sm rounded-md cursor-pointer'>
                {options.map((number) => (
                    <option key={number} value={number}>
                        {number}
                    </option>
                ))}
            </select>
        </div>

    );
};

export default SolSelector;
