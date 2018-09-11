import React from 'react';

export default function CalculatorOperator(props) {
    return (
        <div className='btn operator'
            onClick={props.handleKey}
        >
            {props.operation}
        </div>
    );
}