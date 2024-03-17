import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { StoreContext } from '../../store/StoreProvider';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import LogIn from '../../components/LogIn/LogIn';
import './MainPage.scss'
import { Button, Space, Table } from 'antd';
import type { GetProp, TableColumnsType, TableProps } from 'antd';

type ColumnsType<T> = TableProps<T>['columns'];
type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;


// ====================================================================================
// ====================================================================================
// ====================================================================================
// Весь закомментированные код предназначен для извлечения и обновлений данных с бэка
// ====================================================================================
// ====================================================================================
// ====================================================================================



interface DataType {
  key: number;
  title: string;
  description: string;
  deadlineDate: string;
  createdAt: string;
  engineerComment: string | null;
  name: string; 
  firstName: string; 
  lastName: string; 
  priority: {
    name: string,
    colorHex: string,
  },
  status: {
    readableName: string,
    colorHex: string,
}
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}

const columns: TableColumnsType<DataType> = [
  { title: 'Title', dataIndex: 'title', key: 'title', fixed: 'left', width: 100, },
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
    fixed: 'right',
    width: 150,
    render: () => <Space direction="vertical"><Button>Удалить</Button><Button>Редактировать</Button></Space> ,
  },
];

const dataBek: DataType[] = [
  {
    key: 1,
    title: "Test title1",
    description: "test description 1",
    deadlineDate: "2024-03-22T00:00:00.000+00:00",
    createdAt: "2024-03-13T22:41:26.000+00:00",
    engineerComment: null,
    name: "Печать дневников практики 1",
    firstName: "test",
    lastName: "test",
    priority: {
      name: "CRITICAL",
      colorHex: "FF6600",
    },
    status: {
      readableName: "Ожидает рассмотрения",
      colorHex: "BCBCBC",
    }
  },
  {
    key: 2,
    title: "Test title2",
    description: "test description 2",
    deadlineDate: "2024-03-22T00:00:00.000+00:00",
    createdAt: "2024-03-13T22:41:26.000+00:00",
    engineerComment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    name: "Печать дневников практики 2",
    firstName: "test",
    lastName: "test",
    priority: {
      name: "NORMAL",
      colorHex: "D3FFCE",
    },
    status: {
      readableName: "Принята в работу",
      colorHex: "6AA84F",
    }
  },
  {
    key: 3,
    title: "Test title3",
    description: "test description 3",
    deadlineDate: "2024-03-23T00:00:00.000+00:00",
    createdAt: "2024-03-14T10:15:30.000+00:00",
    engineerComment: "Another engineer comment",
    name: "Another Request Type",
    firstName: "another",
    lastName: "user",
    priority: {
      name: "HIGH",
      colorHex: "FF0000",
    },
    status: {
      readableName: "In Progress",
      colorHex: "FFFF00",
    }
  },
  {
    key: 4,
    title: "Test title4",
    description: "test description 4",
    deadlineDate: "2024-03-24T00:00:00.000+00:00",
    createdAt: "2024-03-15T12:30:45.000+00:00",
    engineerComment: "Yet another engineer comment",
    name: "Yet Another Request Type",
    firstName: "yet",
    lastName: "another",
    priority: {
      name: "LOW",
      colorHex: "00FF00",
    },
    status: {
      readableName: "Completed",
      colorHex: "0000FF",
    }
  },
  {
    key: 5,
    title: "Test title5",
    description: "test description 5",
    deadlineDate: "2024-03-25T00:00:00.000+00:00",
    createdAt: "2024-03-16T08:45:00.000+00:00",
    engineerComment: "Additional engineer comment",
    name: "Additional Request Type",
    firstName: "additional",
    lastName: "user",
    priority: {
      name: "MEDIUM",
      colorHex: "FFFF00",
    },
    status: {
      readableName: "Pending Approval",
      colorHex: "FF00FF",
    }
  },
  {
    key: 6,
    title: "Test title6",
    description: "test description 6",
    deadlineDate: "2024-03-26T00:00:00.000+00:00",
    createdAt: "2024-03-17T15:20:10.000+00:00",
    engineerComment: "Extra engineer comment",
    name: "Extra Request Type",
    firstName: "extra",
    lastName: "user",
    priority: {
      name: "URGENT",
      colorHex: "000000",
    },
    status: {
      readableName: "Under Review",
      colorHex: "FFFFFF",
    }
  },
  {
    key: 7,
    title: "Test title7",
    description: "test description 7",
    deadlineDate: "2024-03-27T00:00:00.000+00:00",
    createdAt: "2024-03-18T18:00:20.000+00:00",
    engineerComment: "Yet more engineer comment",
    name: "Yet More Request Type",
    firstName: "yetmore",
    lastName: "user",
    priority: {
      name: "CRITICAL",
      colorHex: "FF6600",
    },
    status: {
      readableName: "Approved",
      colorHex: "00FFFF",
    }
  },
  {
    key: 8,
    title: "Test title8",
    description: "test description 8",
    deadlineDate: "2024-03-28T00:00:00.000+00:00",
    createdAt: "2024-03-19T09:30:45.000+00:00",
    engineerComment: "And another engineer comment",
    name: "Another Request Type",
    firstName: "another",
    lastName: "user",
    priority: {
      name: "NORMAL",
      colorHex: "D3FFCE",
    },
    status: {
      readableName: "In Progress",
      colorHex: "6AA84F",
    }
  },
  {
    key: 9,
    title: "Test title9",
    description: "test description 9",
    deadlineDate: "2024-03-29T00:00:00.000+00:00",
    createdAt: "2024-03-20T11:15:30.000+00:00",
    engineerComment: "Some engineer comment",
    name: "Some Request Type",
    firstName: "some",
    lastName: "user",
    priority: {
      name: "LOW",
      colorHex: "00FF00",
    },
    status: {
      readableName: "Completed",
      colorHex: "0000FF",
    }
  },
  {
    key: 10,
    title: "Test title10",
    description: "test description 10",
    deadlineDate: "2024-03-30T00:00:00.000+00:00",
    createdAt: "2024-03-21T14:20:15.000+00:00",
    engineerComment: "Yet another engineer comment",
    name: "Yet Another Request Type",
    firstName: "yet",
    lastName: "another",
    priority: {
      name: "HIGH",
      colorHex: "FF0000",
    },
    status: {
      readableName: "In Progress",
      colorHex: "FFFF00",
    }
  },
  {
    key: 11,
    title: "Test title11",
    description: "test description 11",
    deadlineDate: "2024-03-31T00:00:00.000+00:00",
    createdAt: "2024-03-22T16:25:50.000+00:00",
    engineerComment: "Extra engineer comment",
    name: "Extra Request Type",
    firstName: "extra",
    lastName: "user",
    priority: {
      name: "NORMAL",
      colorHex: "D3FFCE",
    },
    status: {
      readableName: "Pending Approval",
      colorHex: "FF00FF",
    }
  },
  {
    key: 12,
    title: "Test title12",
    description: "test description 12",
    deadlineDate: "2024-04-01T00:00:00.000+00:00",
    createdAt: "2024-03-23T20:10:30.000+00:00",
    engineerComment: "Additional engineer comment",
    name: "Additional Request Type",
    firstName: "additional",
    lastName: "user",
    priority: {
      name: "MEDIUM",
      colorHex: "FFFF00",
    },
    status: {
      readableName: "Under Review",
      colorHex: "FFFFFF",
    }
  }
];


const MainPage = () => {

  const [data, setData] = useState<DataType[]>(dataBek);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  // const fetchData = () => {
  //   setLoading(true);
  //   fetch(`https://randomuser.me/api?${qs.stringify(getRandomuserParams(tableParams))}`)
  //     .then((res) => res.json())
  //     .then(({ results }) => {
  //       setData(results);
  //       setLoading(false);
  //       setTableParams({
  //         ...tableParams,
  //         pagination: {
  //           ...tableParams.pagination,
  //           total: 200,
  //           // 200 is mock data, you should read it from server
  //           // total: data.totalCount,
  //         },
  //       });
  //     });
  // };

  // useEffect(() => {
  //   fetchData();
  // }, [JSON.stringify(tableParams)]);

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
          scroll={{ x: 1300 }}
          pagination={{ position: ['bottomCenter'], hideOnSinglePage: false, pageSize: 5 }}
          columns={columns}
          expandable={{
            expandedRowRender: (record) => <div style={{ margin: "5px" }}><p><b>Описание: </b>{record.description}</p> {record.engineerComment !== null && (<><p><b>Комментарий администратора: </b>{record.engineerComment}</p></>)}</div>,
            rowExpandable: (record) => record.name !== 'Not Expandable',
          }}
          dataSource={data}

          // rowKey={(record) => record.login.uuid}
          // pagination={tableParams.pagination}
          // loading={loading}
          // onChange={handleTableChange}
        />
      </div>
    </>
  );
};

export default observer(MainPage);
