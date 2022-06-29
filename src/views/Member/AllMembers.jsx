import React, { useState,useEffect } from 'react'
import { Spin, Input, Table, Space, Button, Popover, Collapse, Checkbox } from 'antd';
import {
    EditOutlined,
    LoadingOutlined,
    DeleteOutlined,
    PlusOutlined,
    DollarOutlined
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { URI } from '../../helper';
import debounce from "lodash.debounce";
import moment from 'moment'
import { CSVLink } from 'react-csv';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const { Search } = Input;
const { Panel } = Collapse;

const AllMembers = () => {

    const [plots, setPlots] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filteredPlots, setFilteredPlots] = useState([]);

    function getAllPlots() {
        setLoading(true)
        axios.get(URI + `get-all-plots`)
            .then(resp => {
                setPlots(resp.data.response.detail);
                setLoading(false)
            });
    }

    useEffect(() => {
        getAllPlots()
    }, [])


    const columns = [
        {
            title: '#',
            dataIndex: 'index',
            key: 'index'
        },
        {
            title: 'M/S No.',
            dataIndex: 'member_no',
            key: 'member_no',
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
            title: 'Cnic',
            dataIndex: 'cnic',
            key: 'cnic',
        },
        {
            title: 'Mobile Number',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Cell',
            dataIndex: 'cell',
            key: 'cell',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                // record.owner_no == 'Current' ?
                <Space size="middle">
                    <Link to={`/update-member/${record.member_no}`} style={{ color: 'blue' }}><EditOutlined /></Link>
                    {/* <a style={{ color: 'red' }}><DeleteOutlined /></a> */}
                </Space>
                // :
                // '-'
            ),
        },
    ];

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

    const data = plots?.map((plot, index) => {
        return (
            {
                index: index + 1,
                name: plot.name,
                address: (plot.address != '' || plot.address != null) ? plot.address : '-',
                cnic: plot.cnic,
                cell: (plot.cell != '' || plot.cell != null) ? plot.cell : '-',
                phone: (plot.phone != '' || plot.phone != null) ? plot.phone : '-',
                email: plot.email,
                member_no: plot.member_no,
            }
        )
    })

    const [memberHeaders, setMemberHeaders] = useState([
        { label: "S.No", key: "index" },
        { key: 'member_no', label: 'M/S No.' },
        { key: 'name', label: 'Name' },
        { key: 'address', label: 'Address' },
        { key: 'cnic', label: 'Cnic' },
        { key: 'phoneNumber', label: 'Phone Number' },
        { key: 'email', label: 'Email' },
    ]);

    const memberOptions = [
        { label: 'M/S No.', value: 'member_no' },
        { label: 'Name', value: 'name' },
        { label: 'Address', value: 'address' },
        { label: 'Cnic', value: 'cnic' },
        { label: 'Phone Number', value: 'phoneNumber' },
        { label: 'Email', value: 'email' },
    ]

    const [filterCheckboxes, setFilterCheckboxes] = useState({
        member_no: true,
        name: true,
        address: true,
        cnic: true,
        phoneNumber: true,
        email: true
    })

    function handleCheckboxes(name, value, key) {
        setFilterCheckboxes({ ...filterCheckboxes, [key]: value })
        if (value == true) {
            setMemberHeaders([...memberHeaders, { label: name, key: key }])
        } else {
            var filtered = memberHeaders.filter((value => {
                return value.key != key;
            }));
            setMemberHeaders(filtered)
        }
        // setFilterCheckboxes({ ...filterCheckboxes, [name]: value })
    }

    return (
        <div>
            <div className='d-flex align-items-center justify-content-between'>
                <h5>All members</h5>
                <CSVLink
                    headers={memberHeaders}
                    data={data != undefined ? data : ''}
                    filename={'Ledger Data' + moment.now()} title="Inchauli Society"
                >
                    <Button className="mr-3" style={{ color: 'white', background: '#28a745', borderColor: '#28a745' }}>Export CSV</Button>
                </CSVLink>
            </div>
            <div className='d-flex' style={{ gridGap: '30px' }}>
                <Search
                    placeholder="Search by name"
                    // onSearch={onSearch}
                    onChange={(e) => onSearchByName(e.target.value)}
                    style={{ width: 200 }}
                />
                <Search
                    placeholder="Search by M/S No."
                    // onSearch={onSearch}
                    className='w-25'
                    onChange={(e) => onSearchByMembershipNumber(e.target.value)}
                    style={{ width: 200 }}
                />
            </div>

            <Collapse className='mt-3'>
                <Panel header="Filter" key="1">
                    <p style={{ fontWeight: '500' }}>Member Checkboxes:</p>
                    {
                        memberOptions.map(option => {
                            return (
                                <Checkbox defaultChecked onChange={(e) => handleCheckboxes(option.label, e.target.checked, option.value)} value={option.value}>{option.label}</Checkbox>
                            )
                        })
                    }
                </Panel>
            </Collapse>
            {
                loading == true ?
                    <Spin indicator={antIcon} /> :
                    <table class="table mt-2 table-striped" style={{ background: 'white' }}>
                        <thead style={{ background: '#001529', color: 'white' }}>
                            <tr style={{ textAlign: 'center' }}>
                                <th scope="col">#</th>
                                {
                                    filterCheckboxes.member_no == true &&
                                    <th scope="col">M/S No.</th>
                                }
                                {
                                    filterCheckboxes.name == true &&
                                    <th scope="col">Name</th>
                                }
                                {
                                    filterCheckboxes.address == true &&
                                    <th scope="col">Address</th>
                                }
                                {
                                    filterCheckboxes.cnic == true &&
                                    <th scope="col">CNIC</th>
                                }
                                {
                                    filterCheckboxes.phoneNumber == true &&
                                    <th scope="col">Phone Number</th>
                                }
                                {
                                    filterCheckboxes.email == true &&
                                    <th scope="col">Email</th>
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                plots?.map((plot, index) => {
                                    return (
                                        <tr style={{ textAlign: 'center' }}>
                                            <td scope="row">{index + 1}</td>
                                            {
                                                filterCheckboxes.member_no == true &&
                                                <td scope="col">{plot.member_no}</td>
                                            }
                                            {
                                                filterCheckboxes.name == true &&
                                                <td scope="col">{plot.name}</td>
                                            }
                                            {
                                                filterCheckboxes.address == true &&
                                                <td scope="col">{plot.address}</td>
                                            }
                                            {
                                                filterCheckboxes.cnic == true &&
                                                <td scope="col">{plot.cnic}</td>
                                            }
                                            {
                                                filterCheckboxes.phoneNumber == true &&
                                                <td scope="col">{plot.phone}</td>
                                            }
                                            {
                                                filterCheckboxes.email == true &&
                                                <td scope="col">{plot.email}</td>
                                            }
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
            }
        </div>
    )
}

export default AllMembers