import React from 'react';

export default function CalculatorButton(props) {
    return (
        <div
            className={`btn ${props.text === '0' ? 'zero' : ''}`}
            onClick={props.handleKey}
        >
            {props.text}
        </div>
    );
}