import React from 'react'
import { Table, Tag, Space,Input} from 'antd';
import {
    EditOutlined,
    LoadingOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
const { Search } = Input;

const AllMembers = () => {

    const columns = [
        {
            title: '#',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Member Id',
            dataIndex: 'member_id',
            key: 'member_id',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Link to="/update-member" style={{ color: 'blue' }}><EditOutlined /></Link>
                    <a style={{ color: 'red' }}><DeleteOutlined /></a>
                </Space>
            ),
        },
    ];

    const data = [
        {
            id: '1',
            name: 'John Brown',
            address: 'New York No. 1 Lake Park',
            member_id: '123',
            tags: ['nice', 'developer'],
        },
        {
            id: '2',
            name: 'Jim Green',
            address: 'London No. 1 Lake Park',
            member_id: '123',
            tags: ['loser'],
        },
        {
            id: '3',
            name: 'Joe Black',
            address: 'Sidney No. 1 Lake Park',
            member_id: '123',
            tags: ['cool', 'teacher'],
        },
    ];
    return (
        <div>
            <h5>All Members</h5>
            <Search
                placeholder="Search"
                // onSearch={onSearch}
                style={{ width: 200 }} />
            <Table className='mt-3' columns={columns} dataSource={data} />
        </div>
    )
}

export default AllMembers