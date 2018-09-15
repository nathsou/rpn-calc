import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class CalculatorDisplay extends Component {

    componentDidUpdate() {
        const node = ReactDOM.findDOMNode(this);
        node.scrollTop = node.scrollHeight;
    }

    render() {
        const { stack, push, current } = this.props;

        return (
            <div className='display' >
                <ul>
                    {stack.map((x, i) => <li key={i}>{x}</li>)}
                    <li id='current' push={push} text={current} key='current'>
                        {current}
                    </li>
                </ul>
            </div>
        );
    }
}