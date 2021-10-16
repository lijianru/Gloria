import { Button, Input, Radio, RadioChangeEvent, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { format } from 'date-fns';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import React, { ChangeEvent, useState } from 'react';

import { COOL_DOWN_TIME } from './constants';
import { addNewInfo, coolDownTimeChange, deleteInfo } from './slice';

export type Info = {
  id: string;
  time: number;
  count: number;
};

export function App() {
  const dispatch = useAppDispatch();
  const infoList = useAppSelector(state => state.info.infoList);
  const coolDownTime = useAppSelector(state => state.info.coolDownTime);

  const [newId, setNewId] = useState<string>();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewId(e.target.value);
  };

  const handleAddInfo = () => {
    newId && dispatch(addNewInfo(newId));
    setNewId('');
  };

  const handleCoolDownTimeChange = (e: RadioChangeEvent) => {
    dispatch(coolDownTimeChange(e.target.value));
  };

  const handleDeleteInfo = (id: string) => {
    dispatch(deleteInfo(id));
  };

  const columns: ColumnsType<Info> = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (id, info, index) => (
        <span>
          <b>{id}</b>
          {index === 0 && (
            <span className="text-purple-600 text-opacity-60 ml-1 transition-colors">new!</span>
          )}
        </span>
      ),
    },
    {
      title: '次数',
      dataIndex: 'count',
      render: count => <b>{count}</b>,
    },
    {
      title: '时间',
      dataIndex: 'time',
      render: time => <b>{format(time, 'yyyy/MM/dd HH:mm:ss')}</b>,
    },
    {
      title: '',
      render: id => <Button onClick={() => handleDeleteInfo(id)}>删除</Button>,
    },
  ];

  return (
    <div className="container mx-auto py-10">
      <div className="container flex flex-row">
        <Input size="large" value={newId} onChange={handleInputChange} />
        <Button
          size="large"
          className="ml-4"
          type="primary"
          onClick={handleAddInfo}
          disabled={!newId}
        >
          添加
        </Button>
      </div>
      <div className="container flex flex-row py-6">
        <h3 className="mr-2">CD:</h3>
        <Radio.Group
          onChange={handleCoolDownTimeChange}
          value={coolDownTime}
          defaultValue={coolDownTime}
        >
          {COOL_DOWN_TIME.map(({ label, value }) => (
            <Radio key={value} value={value}>
              {label}
            </Radio>
          ))}
        </Radio.Group>
      </div>
      <Table
        rowClassName={(record, index) => (index === 0 ? 'bg-purple-600 bg-opacity-10' : '')}
        columns={columns}
        dataSource={infoList}
        rowKey={({ id }) => id}
        className="py-10"
      />
    </div>
  );
}
