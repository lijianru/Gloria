import { message } from 'antd';
import { differenceInDays, differenceInHours, differenceInMinutes } from 'date-fns';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Info } from './App';
import { COOL_DOWN_TIME } from './constants';

export type State = {
  coolDownTime: number;
  infoList: Info[];
};

const initialState: State = {
  coolDownTime: COOL_DOWN_TIME[0].value,
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
      const findedInfo = state.infoList.find(({ id }) => id === action.payload);
      const currentTime = new Date().getTime();

      if (!findedInfo) {
        state.infoList.unshift({
          id: action.payload,
          count: 1,
          time: currentTime,
        });

        message.success('恭喜这个B！🎉🎉🎉🎉🎉🎉', 5000);
      } else if (currentTime - findedInfo.time > state.coolDownTime) {
        state.infoList = [...state.infoList.filter(({ id }) => id !== action.payload)];

        state.infoList.unshift({
          id: action.payload,
          count: findedInfo.count + 1,
          time: currentTime,
        });

        message.success('恭喜这个B！🎉🎉🎉🎉🎉🎉', 5000);
      } else {
        message.error(
          `此账号还在CD中（${differenceInDays(currentTime, findedInfo.time)}天${differenceInHours(
            currentTime,
            findedInfo.time
          )}小时${differenceInMinutes(currentTime, findedInfo.time)}分钟）!`
        );
      }
    },
    deleteInfo: (state, action: PayloadAction<string>) => {
      state.infoList = [...state.infoList.filter(({ id }) => id !== action.payload)];

      message.success('删除成功！🎉🎉🎉🎉🎉🎉', 5000);
    },
  },
});

export const { coolDownTimeChange, addNewInfo, deleteInfo } = infoSlice.actions;

export const infoReducer = infoSlice.reducer;
