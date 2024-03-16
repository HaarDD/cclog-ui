import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { StoreContext } from '../../store/StoreProvider';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import LogIn from '../../components/LogIn/LogIn';
// import SignUp from '../../components/SignUp/SignUp';
// import config from '../../../config.json';
import './MainPage.scss'
import { Button, Space, Table } from 'antd';
import type { TableColumnsType } from 'antd';

interface DataType {
  key: number;
  title: string;
  description: string;
  deadlineDate: string;
  createdAt: string;
  engineerComment: any; // Замените any на тип, который соответствует вашему полю engineerComment
  name: string; // измененное поле
  firstName: string; // измененное поле
  lastName: string; // измененное поле
  priority: {
    name: string,
    colorHex: string,
  },
  status: {
    readableName: string,
    colorHex: string,
}
  // priorityName: string; // измененное поле
  // priorityColor: string; // измененное поле
  // statusName: string; // измененное поле
  // statusColor: string; // измененное поле
}

const columns: TableColumnsType<DataType> = [
  { title: 'Title', dataIndex: 'title', key: 'title' },
  { title: 'Deadline Date', dataIndex: 'deadlineDate', key: 'deadlineDate' },
  { title: 'Created At', dataIndex: 'createdAt', key: 'createdAt' },
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Created By', dataIndex: 'firstName', key: 'firstName' },
  { title: 'Last Name', dataIndex: 'lastName', key: 'lastName' },
  { title: 'Priority Name', dataIndex: 'priority', key: 'priority', render: (priority) => <p style={{ color: `#${priority.colorHex}` }}>{priority.name}</p>, },
  { title: 'Status Name', dataIndex: 'status', key: 'status', render: (status) => <p style={{ color: `#${status.colorHex}` }}>{status.readableName}</p>, },
  {
    title: 'Action',
    dataIndex: '',
    key: 'x',
    render: () => <><p>Удалить</p><p>Редактировать</p></> ,
  },
];


const data: DataType[] = [
  {
    key: 13,
    title: "Test title3",
    description: "test description",
    deadlineDate: "2024-03-22T00:00:00.000+00:00",
    createdAt: "2024-03-13T22:41:26.000+00:00",
    engineerComment: null,
    name: "Печать дневников практики", // requestType.readableName
    firstName: "test", // createdByUser.firstName
    lastName: "test", // createdByUser.lastName
    priority: {
      name: "CRITICAL",
      colorHex: "FF6600",
    },
    status: {
      readableName: "Ожидает рассмотрения",
      colorHex: "BCBCBC"
    }
  },
  {
    key: 14,
    title: "Test title3",
    description: "test description",
    deadlineDate: "2024-03-22T00:00:00.000+00:00",
    createdAt: "2024-03-13T22:41:26.000+00:00",
    engineerComment: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas accusamus ipsum tenetur eum fugit nostrum illo assumenda ad quo nesciunt! Facere ducimus aut quibusdam deleniti, repellat iure voluptate aliquam ad!",
    name: "Печать дневников практики", // requestType.readableName
    firstName: "test", // createdByUser.firstName
    lastName: "test", // createdByUser.lastName
    priority: {
      name: "NORMAL",
      colorHex: "D3FFCE",
    },
    status: {
      readableName: "Принята в работу",
      colorHex: "6AA84F"
    }
  },
  
];



const MainPage = () => {

  const sortedList = (x: any) => {
    console.log('x :>> ', x);
  }

  return (
    <>
      <div className='main-page'>

      <Space style={{ marginBottom: 16 }}>
          <Button onClick={sortedList}>Дата создания</Button> 
          <Button onClick={sortedList}>Дата окончания</Button> 
          <Button onClick={sortedList}>Приоритет</Button>  
          <Button onClick={sortedList}>Статус</Button>  
        </Space>

        <Table
        pagination={{ position: ['bottomCenter'] }}
        columns={columns}
        expandable={{
          expandedRowRender: (record) => <div style={{ margin: "5px" }}><p><b>Описание: </b>{record.description}</p> {record.engineerComment !== null && (<><p><b>Комментарий администратора: </b>{record.engineerComment}</p></>)}</div>,
          rowExpandable: (record) => record.name !== 'Not Expandable',
        }}
        dataSource={data}
      />
      </div>
    </>
  );
};

export default observer(MainPage);
