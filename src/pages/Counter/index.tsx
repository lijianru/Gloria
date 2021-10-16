import { Button } from 'antd';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import React from 'react';
import { decrement, increment, incrementByAmount } from 'state-container/slices/counter';

export function Counter() {
  const count = useAppSelector(state => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div>
      <h2>{count}</h2>
      <Button onClick={() => dispatch(increment())}>Increment</Button>
      <Button onClick={() => dispatch(decrement())}>Decrement</Button>
      <Button onClick={() => dispatch(incrementByAmount(10))}>Increment By Amount</Button>
    </div>
  );
}
