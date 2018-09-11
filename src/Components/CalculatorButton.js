import React from 'react';

export default function CalculatorButton(props) {
    let className = `btn ${props.text === '0' ? 'zero' : ''}`;
    className = `${className} ${props.numeric ? 'numeric' : ''}`;
    return (
        <div className={className} onClick={props.handleKey}>
            {props.text}
        </div>
    );
}