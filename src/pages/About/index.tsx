import { InputNumber } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import useAsyncFunction from '../../hooks/useAsyncFunction';

export function About() {
  const [value, setValue] = useState<number>();

  // 1. 将请求接口的参数作为useAsyncFunction内函数的参数传入，在输入值的时候调用即可。
  const [state, callback] = useAsyncFunction(async (val: number) => {
    const result = await axios.get(`api/todos/${val}`);

    console.log('fetch', val);
    return result;
  }, []);

  // 2. 将请求接口的参数作为useAsyncFunction的依赖项，每次输入值变化的时候返回一个新的函数，当新函数变化的时候调用
  // const [state, callback] = useAsyncFunction(async () => {
  //   const result = await axios.get(`api/todos/${value}`);

  //   console.log('fetch', value);
  //   return result;
  // }, [value]);

  // useEffect(() => {
  //   console.log('useEffect', value);
  //   value && callback();
  // }, [callback]);

  console.log('render', value);

  return (
    <div style={{ margin: '100px' }}>
      <InputNumber
        value={value}
        onChange={val => {
          setValue(val);
          callback(val);
        }}
      />
      {/* <InputNumber value={value} onChange={val => setValue(val)} /> */}
      <a>{Math.random()}</a>
      <p>{`${state.loading}`}</p>
    </div>
  );
}
