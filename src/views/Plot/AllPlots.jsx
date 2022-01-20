import React, { useEffect, useState } from 'react'
import { Table, Tag, Space, Input, Row } from 'antd';
import {
    EditOutlined,
    LoadingOutlined,
    DeleteOutlined,
    PlusOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { URI } from '../../helper';
import { Spin } from 'antd';
import debounce from "lodash.debounce";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const { Search } = Input;

const AllPlots = () => {
    const [plots, setPlots] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filteredPlots, setFilteredPlots] = useState([]);

    useEffect(() => {
        getAllPlots()
    }, [])

    function getAllPlots() {
        setLoading(true)
        axios.get(URI + `get-all-plots`)
            .then(resp => {
                setPlots(resp.data.response.detail);
                setLoading(false)
            });
    }


    const columns = [
        {
            title: '#',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Name/Allottee',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Membership No.',
            dataIndex: 'member_no',
            key: 'member_no',
        },
        {
            title: 'Plot No.',
            dataIndex: 'plot_no',
            key: 'plot_no',
        },
        {
            title: 'Owner No.',
            dataIndex: 'owner_no',
            key: 'owner_no',
        },
        {
            title: 'Volume No.',
            dataIndex: 'file_no',
            key: 'file_no',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    {/* <Link to="/update-plot" style={{ color: 'blue' }}><EditOutlined /></Link> */}
                    <Link to={`/add-plot-member/${record.plot_no}`} style={{ color: 'blue' }}><PlusOutlined /></Link>
                    {/* <a style={{ color: 'red' }}><DeleteOutlined /></a> */}
                </Space>
            ),
        },
    ];

    const data = plots?.map((plot, index) => {
        return (
            {
                id: index + 1,
                name: plot.name,
                address: plot.address != '' ? plot.address : '-',
                member_no: plot.member_no,
                plot_no: plot.plot_no,
                owner_no: plot.OWNER_NO != '' ? plot.OWNER_NO : '-',
                file_no: plot.file_no
            }
        )
    })

    // const onSearchByName = value => {
    //     let filteredPlots = plots.filter(plot => {
    //         return (plot.name.toLowerCase().indexOf(value.toLowerCase()) !== -1)
    //     })
    //     setFilteredPlots(filteredPlots)
    // }

    const onSearchByName = debounce((e) => {
        if (e != '') {
            axios.get(URI + `get-by-member-name`, {
                params: {
                    name: e
                }
            })
                .then(resp => {
                    setPlots(resp.data.response.detail);
                });
        } else {
            getAllPlots()
        }
    }, 500);

    const onSearchByMembershipNumber = debounce((e) => {
        if (e != '') {
            axios.get(URI + `get-by-member-no`, {
                params: {
                    member_no: e
                }
            })
                .then(resp => {
                    setPlots(resp.data.response.detail);
                });
        } else {
            getAllPlots()
        }
    }, 500);

    const onSearchByPlotNumber = debounce((e) => {
        if (e != '') {
            axios.get(URI + `get-by-plot-no`, {
                params: {
                    plot_no: e
                }
            })
                .then(resp => {
                    setPlots(resp.data.response.detail);
                });
        } else {
            getAllPlots()
        }
    }, 500);

    const onSearchByFileNumber = debounce((e) => {
        if (e != '') {
            axios.get(URI + `get-by-file-no`, {
                params: {
                    file_no: e
                }
            })
                .then(resp => {
                    setPlots(resp.data.response.detail);
                });
        } else {
            getAllPlots()
        }
    }, 500);

    return (
        <div>
            <h5>All plots</h5>
            <div className='d-flex' style={{ gridGap: '30px' }}>
                <Search
                    placeholder="Search by name"
                    // onSearch={onSearch}
                    onChange={(e) => onSearchByName(e.target.value)}
                    style={{ width: 200 }}
                />
                <Search
                    placeholder="Search by membership number"
                    // onSearch={onSearch}
                    className='w-25'
                    onChange={(e) => onSearchByMembershipNumber(e.target.value)}
                    style={{ width: 200 }}
                />
                <Search
                    placeholder="Search by plot number"
                    // onSearch={onSearch}
                    onChange={(e) => onSearchByPlotNumber(e.target.value)}
                    style={{ width: 200 }}
                />
                <Search
                    placeholder="Search by file number"
                    // onSearch={onSearch}
                    onChange={(e) => onSearchByFileNumber(e.target.value)}
                    style={{ width: 200 }}
                />
            </div>
            {
                loading == true ?
                    <Spin indicator={antIcon} /> :
                    <Table className='mt-3' columns={columns} dataSource={data} />
            }
        </div>
    )
}

export default AllPlots
