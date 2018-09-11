import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class CalculatorDisplay extends Component {

    componentDidUpdate()  {
        const node = ReactDOM.findDOMNode(this);
        node.scrollTop = node.scrollHeight;
    }

    render() {
        return (
            <div className='display' >
                <ul>
                    {this.props.stack.map((x, i) => <li key={i}>{x}</li>)}
                    <li id='current' key='current'>{this.props.current}</li>
                </ul>
            </div>
        );
    }
}