import React from 'react';

export default function CalculatorOperator({ text, handleKey }) {
    return (
        <div className='btn operator' onClick={handleKey}>
            {text}
        </div>
    );
}