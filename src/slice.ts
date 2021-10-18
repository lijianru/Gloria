import { message } from 'antd';
import { differenceInDays } from 'date-fns';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Info } from './App';
import { COOL_DOWN_TIME } from './constants';

export type State = {
  coolDownTime: number;
  infoList: Info[];
};

const initialState: State = {
  coolDownTime: COOL_DOWN_TIME[2].value,
  infoList: [],
};

export const infoSlice = createSlice({
  name: 'info',
  initialState,
  reducers: {
    coolDownTimeChange: (state, action: PayloadAction<number>) => {
      state.coolDownTime = action.payload;
    },
    addNewInfo: (state, action: PayloadAction<string>) => {
      const currentId = action.payload.trim();
      const findedInfo = state.infoList.find(({ id }) => id === currentId);
      const currentTime = new Date().getTime();

      if (!findedInfo) {
        state.infoList.unshift({
          id: currentId,
          count: 1,
          time: currentTime,
        });

        message.success('恭喜这个B！🎉🎉🎉🎉🎉🎉');
      } else if (currentTime - findedInfo.time > state.coolDownTime) {
        state.infoList = [...state.infoList.filter(({ id }) => id !== currentId)];

        state.infoList.unshift({
          id: findedInfo.id,
          count: findedInfo.count + 1,
          time: currentTime,
        });

        message.success('恭喜这个B！🎉🎉🎉🎉🎉🎉');
      } else {
        const cd = differenceInDays(currentTime, findedInfo.time) + 1;
        message.error(`此账号还在CD中，${cd}天内登陆过此账号!😭😭😭😭😭😭😭`);
      }
    },
    deleteInfo: (state, action: PayloadAction<string>) => {
      state.infoList = [...state.infoList.filter(({ id }) => id !== action.payload)];

      message.success('删除成功！');
    },
  },
});

export const { coolDownTimeChange, addNewInfo, deleteInfo } = infoSlice.actions;

export const infoReducer = infoSlice.reducer;
