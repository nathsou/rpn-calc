import React from 'react';

export default function CalculatorButton({ text, numeric, handleKey }) {

    let className = `btn ${text === '0' ? 'zero ' : ''}`;
    className += numeric ? 'numeric' : '';
    return (
        <div className={className} onClick={handleKey}>
            {text}
        </div>
    );
}