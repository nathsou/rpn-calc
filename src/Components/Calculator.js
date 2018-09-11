import React, { Component } from 'react';
import '../Calculator.css';
import CalculatorButton from './CalculatorButton';
import CalculatorDisplay from './CalculatorDisplay';
import CalculatorOperator from './CalculatorOperator';

export default class Calculator extends Component {

  constructor() {
    super();
    this.state = {
      current: '0',
      stack: [],
      should_push: false
    };

    this.initKeys();
  }

  initKeys() {
    this.keys = [
      { key: 'C', handler: () => this.clear() },
      { key: '±', handler: () => this.toggleSign() },
      { key: 'P', handler: () => this.pop() },
      { key: '⋀', handler: () => this.operate((a, b) => a ** b) },

      { key: '↕', handler: () => this.swap() },
      { key: '↓', handler: () => this.copyDown() },
      { key: 'ln', handler: () => this.handleLog() },
      { key: '÷', handler: () => this.operate((a, b) => a / b) },

      { key: '7', handler: () => this.handleKey('7') },
      { key: '8', handler: () => this.handleKey('8') },
      { key: '9', handler: () => this.handleKey('9') },
      { key: '⨉', handler: () => this.operate((a, b) => a * b) },

      { key: '4', handler: () => this.handleKey('4') },
      { key: '5', handler: () => this.handleKey('5') },
      { key: '6', handler: () => this.handleKey('6') },
      { key: '−', handler: () => this.operate((a, b) => a - b) },

      { key: '1', handler: () => this.handleKey('1') },
      { key: '2', handler: () => this.handleKey('2') },
      { key: '3', handler: () => this.handleKey('3') },
      { key: '+', handler: () => this.operate((a, b) => a + b) },

      { key: '0', handler: () => this.handleZero() },
      { key: '.', handler: () => this.handleDot() },
      { key: '↵', handler: () => this.handleEnter() }
    ];

    this.ops = ['⋀', '÷', '⨉', '−', '+', '↵'];
  }

  push(x) {
    this.setState({
      stack: [...this.state.stack, x]
    });
  }

  pop() {
    if (this.len() > 0) {
      this.setState({
        stack: this.state.stack.slice(0, this.len() - 1)
      });

      return this.state.stack[this.len() - 1];
    }


    this.clear();
    return 0;
  }

  peek() {
    return this.state.stack[this.len() - 1] || 0;
  }

  len() {
    return this.state.stack.length;
  }

  parse(str) {
    return parseFloat(str);
  }

  value() {
    return this.parse(this.state.current);
  }

  clear() {
    this.setCurrent('0');
    this.shouldPush(false);
  }

  toggleSign() {
    this.setCurrent(-this.value());
  }

  handleLog() {
    this.setCurrent(Math.log(this.value()));
    this.shouldPush();
  }

  setCurrent(str) {
    this.setState({
      current: `${str}`
    });
  }

  swap() {
    if (this.len() !== 0) {
      const [a, b] = [this.value(), this.peek()];
      this.setCurrent(b);
      this.setState({
        stack: [...this.state.stack.slice(0, this.len() - 1), a]
      });
    }
  }

  copyDown() {
    this.setCurrent(this.peek());
    this.shouldPush();
  }

  append(text) {
    this.setCurrent(`${this.state.current !== '0' ? this.state.current : ''}${text}`);
  }

  prepend(text) {
    this.setCurrent(`${text}${this.state.current}`);
  }

  shouldPush(b = true) {
    this.setState({
      should_push: b
    });
  }

  operate(operator) {
    if (this.len() + 1 < 2) return;
    const val = operator(this.pop(), this.value());
    this.setCurrent(val);
    this.shouldPush();
  }

  handleEnter() {
    this.push(this.value());
    this.clear();
  }

  handleZero() {
    this.handleKey('0');
  }

  handleDot() {
    if (!this.state.current.includes('.')) {
      this.append('.');
    }
  }

  format(x) {
    const str = `${x}`;
    return (str.length < 10 ? str : Number(x).toFixed(10)).replace('Infinity', '∞')
      .replace('NaN', 'math error');
  }

  handleKey(key) {
    if ('0123456789'.includes(key)) {
      if (this.state.should_push) {
        this.push(this.value());
        this.clear();
        this.setState({
          should_push: false
        }, () => {
          this.append(key);
        });
      } else {
        this.append(key);
      }
    }
  }

  render() {

    return (
      <div className="calculator">
        <CalculatorDisplay
          current={this.format(this.state.current)}
          stack={this.state.stack.map(x => this.format(x))}
        />
        {this.keys.map(v => {
          const { key, handler } = v;
          if (this.ops.includes(key)) {
            return <CalculatorOperator handleKey={handler} key={key} operation={key} />
          }

          return <CalculatorButton handleKey={handler} key={key} text={key} />
        })}
      </div>
    );
  }
}
