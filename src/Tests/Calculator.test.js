import {
  reducer
} from "../Redux/reducers";

test('reducers', () => {
  const state = reducer({
    current: '21',
    stack: [2],
    should_push: false
  }, {
    type: 'CALC_OPERATE',
    operation: 'mul'
  });

  expect(state).toEqual({
    current: '42',
    stack: [],
    should_push: true
  });
});