import { Button, Drawer, Input, Radio, RadioChangeEvent, Table } from 'antd';
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
  const [visiable, setVisiable] = useState(false);

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

  const handleClickDrawer = () => {
    setVisiable(true);
  };

  const handleCloseDrawer = () => {
    setVisiable(false);
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
      dataIndex: 'id',
      render: id => <Button onClick={() => handleDeleteInfo(id)}>删除</Button>,
    },
  ];

  return (
    <div className="container mx-auto py-10">
      <p className="text-2xl pb-4">
        格洛丽亚单人三排ID记录工具
        <a className="text-blue-600 text-xl" onClick={handleClickDrawer}>
          [使用说明]
        </a>
      </p>
      <div className="container flex flex-row">
        <Input placeholder="请输入ID" size="large" value={newId} onChange={handleInputChange} />
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
      <Drawer
        title="使用说明"
        onClose={handleCloseDrawer}
        maskClosable={true}
        width={500}
        visible={visiable}
      >
        <h2>使用方法：</h2>
        <ul>
          <li>1. 选择CD（默认七天）</li>
          <li>2. 在输入框填入ID（保证ID正确，别粘日期😭）</li>
          <li>3. 点击添加按钮（无需搜索）</li>
          <li className="pl-2">
            3.1. 没打过会直接添加账号并提示"<i className="font-bold">恭喜这个B</i>"；
          </li>
          <li className="pl-2">
            3.2. 打过但CD结束则更新记录并依然提示"<i className="font-bold">恭喜这个B</i>"；
          </li>
          <li className="pl-2">
            3.3. 打过但还在CD中不会更新记录但会提示"
            <i className="font-bold">账号还在CD中，几天内登录过该账号</i>
            "。
          </li>
        </ul>
        <p>注：CD根据添加新ID或者成功更新ID的时间计算！</p>
        <p>
          重要提示：由于我考虑到ID的隐私性且未了避嫌且自己没有云服务所以我采用了GitHub pages
          加本地存储的静态页面方式实现。
          <i className="font-bold text-xl">所以切记不要清空浏览器缓存</i>。
        </p>
      </Drawer>
    </div>
  );
}
