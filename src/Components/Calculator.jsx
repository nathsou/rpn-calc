import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../Redux/actions';
import '../Calculator.css';
import { format } from '../utils';
import CalculatorButton from './CalculatorButton';
import CalculatorDisplay from './CalculatorDisplay';
import CalculatorOperator from './CalculatorOperator';
import attachCalculatorToKeyboard from '../keyboardController';

class Calculator extends Component {

  componentDidMount() {
    attachCalculatorToKeyboard(this.props.dispatch);
  }

  render() {

    const { dispatch, current, should_push, stack } = this.props;
    return (
      <div className="calculator" >
        <CalculatorDisplay
          current={format(current)}
          stack={stack.map(x => format(x))}
          push={`${should_push}`}
        />

        <CalculatorButton numeric={false} handleKey={() => dispatch(actions.pop())} key='C' text='C' />
        <CalculatorButton numeric={false} handleKey={() => dispatch(actions.toggleSign())} key='±' text='±' />
        <CalculatorButton numeric={false} handleKey={() => dispatch(actions.copyDown())} key='↓' text='↓' />
        <CalculatorOperator handleKey={() => dispatch(actions.operate('pow'))} key='⋀' text='⋀' />

        <CalculatorButton numeric={false} handleKey={() => dispatch(actions.swap())} key='↕' text='↕' />
        <CalculatorButton numeric={false} handleKey={() => dispatch(actions.operate('mod'))} key='≡' text='≡' />
        <CalculatorButton numeric={false} handleKey={() => dispatch(actions.operate('log'))} key='ln' text='ln' />
        <CalculatorOperator handleKey={() => dispatch(actions.operate('div'))} key='÷' text='÷' />

        <CalculatorButton numeric={true} handleKey={() => dispatch(actions.append('7'))} key='7' text='7' />
        <CalculatorButton numeric={true} handleKey={() => dispatch(actions.append('8'))} key='8' text='8' />
        <CalculatorButton numeric={true} handleKey={() => dispatch(actions.append('9'))} key='9' text='9' />
        <CalculatorOperator handleKey={() => dispatch(actions.operate('mul'))} key='⨉' text='⨉' />

        <CalculatorButton numeric={true} handleKey={() => dispatch(actions.append('4'))} key='4' text='4' />
        <CalculatorButton numeric={true} handleKey={() => dispatch(actions.append('5'))} key='5' text='5' />
        <CalculatorButton numeric={true} handleKey={() => dispatch(actions.append('6'))} key='6' text='6' />
        <CalculatorOperator handleKey={() => dispatch(actions.operate('sub'))} key='−' text='−' />

        <CalculatorButton numeric={true} handleKey={() => dispatch(actions.append('1'))} key='1' text='1' />
        <CalculatorButton numeric={true} handleKey={() => dispatch(actions.append('2'))} key='2' text='2' />
        <CalculatorButton numeric={true} handleKey={() => dispatch(actions.append('3'))} key='3' text='3' />
        <CalculatorOperator handleKey={() => dispatch(actions.operate('add'))} key='+' text='+' />

        <CalculatorButton numeric={true} handleKey={() => dispatch(actions.append('0'))} key='0' text='0' />
        <CalculatorButton numeric={true} handleKey={() => dispatch(actions.append('.'))} key='.' text='.' />
        <CalculatorOperator numeric={true} handleKey={() => dispatch(actions.push())} key='↵' text='↵' />
      </div>
    );
  }
}

const mapStateToProps = ({ stack, current, should_push }) => ({
  stack,
  current,
  should_push
});

export default connect(mapStateToProps)(Calculator);