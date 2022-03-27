import React, { useEffect, useState } from 'react';
import { Spin, Input, Table, Space, Button, Popover } from 'antd';
import debounce from "lodash.debounce";
import {
    LoadingOutlined,
    EditOutlined
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { URI } from '../helper';
import moment from 'moment'
import { CSVLink } from 'react-csv';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const { Search } = Input;

const Ledgers = () => {
    const query = new URLSearchParams(useLocation().search);
    // const volume_no = useState(query.get('volume_no') ? query.get('volume_no') : '');
    const [plotNo, setPlotNo] = useState();
    const [volumeNo, setVolumeNo] = useState();
    const membership_no = query.get('membership_no') ? query.get('membership_no') : '';
    const [memberDetails, setMemberDetails] = useState()
    const [financeDetails, setFinanceDetails] = useState()
    const [totalAmount, setTotalAmount] = useState()
    const [lastItem, setLastItem] = useState();
    const [ledgerTotal, setLedgerTotal] = useState();
    const [member, setMember] = useState({})

    useEffect(() => {
        if (query.get('plot_no')) {
            setPlotNo(query.get('plot_no'))
        } else {
            setPlotNo()
        }
    }, [])

    useEffect(() => {
        if (query.get('volume_no')) {
            setVolumeNo(query.get('volume_no'))
        } else {
            setVolumeNo()
        }
    }, [])

    function getMemberDetails() {
        axios.get(URI + `get-by-member-no`, {
            params: {
                member_no: membership_no
            }
        })
            .then(resp => {
                setMemberDetails(resp.data.response.detail);
            });
    }

    function getFinanceDetails() {
        axios.get(URI + `get-finance-details`, {
            params: {
                volume_no: volumeNo
            }
        })
            .then(resp => {
                setFinanceDetails(resp.data.response.detail);
            });
    }

    useEffect(() => {
        if (financeDetails?.length > 0) {
            var sum = financeDetails?.map(fin => fin.Amount)
            var total = sum.reduce(function (a, b) {
                return a + b;
            }, 0);
            setLedgerTotal(total)
        }
    }, [financeDetails])

    useEffect(() => {
        getMemberDetails()
        getFinanceDetails()
    }, [])

    const columns = [
        {
            title: '#',
            dataIndex: 'index',
            key: 'index'
        },
        {
            title: 'Volume No.',
            dataIndex: 'file_no',
            key: 'file_no',
        },
        {
            title: 'Plot No.',
            dataIndex: 'plot_no',
            key: 'plot_no',
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
            title: 'Owner No.',
            dataIndex: 'owner_no',
            key: 'owner_no',
        },
    ];


    const data = memberDetails?.map((plot, index) => {
        return (
            {
                index: index + 1,
                id: plot.id,
                name: plot.name,
                address: (plot.address != '' || plot.address != null) ? plot.address : '-',
                member_no: plot.member_no,
                plot_no: (plot.plot_no != '' || plot.plot_no != null) ? plot.plot_no : '-',
                owner_no: (plot.owner_no != '' || plot.owner_no != null) ? plot.owner_no : '-',
                file_no: plot.file_no
            }
        )
    })

    function getMemberName(member_no) {
        axios.get(URI + 'get-member-details', {
            params: {
                member_no
            }
        }).then(resp => {
            setMember(resp.data.response.detail[0])
        })
    }

    const onChangeDescription = e => {
        if (e != '') {
            let filteredFinanceDetails = financeDetails.filter(item => {
                if (item.Description != null) {
                    return (item.Description.toLowerCase().indexOf(e.toLowerCase()) !== -1)
                }
            })
            setFinanceDetails(filteredFinanceDetails);
        } else {
            getFinanceDetails()
        }
    }

    function handleFilter(name, value) {
        if (name == 'plot_no') {
            setPlotNo(value)
        }
        else {
            setVolumeNo(value)
        }
    }

    const onSearchByPlotNumber = debounce((name, value) => {
        if (name == 'plot_no') {
            axios.get(URI + `get-current-owner-details`, {
                params: {
                    plot_no: value
                }
            })
                .then(resp => {
                    let tempArray = [];
                    tempArray.push(resp.data.response.detail.memberDetails)
                    setMemberDetails(tempArray)
                    setFinanceDetails(resp.data.response.detail.financeDetails)
                });
        } else {
            axios.get(URI + `get-current-owner-details`, {
                params: {
                    file_no: value
                }
            })
                .then(resp => {
                    let tempArray = [];
                    tempArray.push(resp.data.response.detail.memberDetails)
                    setMemberDetails(tempArray)
                    setFinanceDetails(resp.data.response.detail.financeDetails)
                    // setLastItem(resp.data.response.detail.financeDetails.pop())
                });
        }
    }, 500);

    const csvHeaders = [
        { label: "S.No", key: "index" },
        // { label: "Volume No.", key: "file_no" },
        { label: "Plot No.", key: "plot_no" },
        { label: "M/S No.", key: "member_no" },
        { label: "Date", key: "Date" },
        { label: "Receipt", key: "Receipt" },
        { label: "Account Title", key: "Description" },
        { label: "Amount", key: "Amount" }
    ];

    return (
        <div>
            <h5>Ledger</h5>
            <div className='d-flex' style={{ gridGap: '30px' }}>
                <Search
                    placeholder="Search by plot number"
                    // onSearch={onSearch}
                    onChange={(e) => { onSearchByPlotNumber('plot_no', e.target.value); handleFilter('plot_no', e.target.value) }}
                    style={{ width: 250 }}
                    value={plotNo}
                />
                <Search
                    placeholder="Search by volume number"
                    // onSearch={onSearch}
                    onChange={(e) => { onSearchByPlotNumber('file_no', e.target.value); handleFilter('file_no', e.target.value) }}
                    style={{ width: 250 }}
                    value={volumeNo}
                />
            </div>
            <Table className='mt-3' columns={columns} dataSource={data} />
            <div className='d-flex align-items-center justify-content-between'>
                <div>
                    <h5 className='mt-3' style={{ fontWeight: 'bold' }}>Ledger Details</h5>
                    <Search
                        placeholder="Search by account title"
                        onChange={(e) => { onChangeDescription(e.target.value) }}
                        style={{ width: 250 }}
                    />
                </div>
                <div>
                    <CSVLink headers={csvHeaders} data={financeDetails != undefined ? financeDetails : ''} filename={'Ledger Data' + moment.now()} title="Inchauli Society">
                        <Button className="mr-3" style={{ color: 'white', background: '#28a745', borderColor: '#28a745' }}>Export CSV</Button>
                    </CSVLink>

                    <Link to="/add-ledger">
                        <Button>
                            Add New
                        </Button>
                    </Link>
                </div>
            </div>
            {
                financeDetails?.length > 0 &&
                <p style={{ fontSize: '18px', fontWeight: '500' }}>Total Amount: {ledgerTotal}</p>
            }

            <table class="table mt-3" style={{ background: 'white' }}>
                <thead>
                    <tr style={{ textAlign: 'center' }}>
                        <th scope="col">#</th>
                        <th scope="col">Volume No.</th>
                        <th scope="col">Plot No.</th>
                        <th scope="col">M/S No.</th>
                        <th scope="col">Date</th>
                        <th scope="col">Receipt</th>
                        <th scope="col">Account Title</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        financeDetails?.map((plot, index) => {
                            return (
                                <tr style={{ textAlign: 'center' }}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{plot.file_no}</td>
                                    <td>{(plot.plot_no != '' || plot.plot_no != null) ? plot.plot_no : '-'}</td>
                                    <Popover content={
                                        <p>{member?.name}</p>
                                    }>
                                        <td onMouseOver={() => getMemberName(plot.member_no)}>{plot.member_no}</td>
                                    </Popover>
                                    <td>{plot.Date}</td>
                                    <td>{plot.Receipt}</td>
                                    <td>{plot.Description}</td>
                                    <td>{plot.Amount}</td>
                                    <td> <Space size="middle">
                                        <Link to={`/update-ledger/${plot.id}`} style={{ color: 'blue' }}><EditOutlined /></Link>
                                    </Space></td>
                                </tr>
                            )
                        })
                    }
                    {/* <tr>
                        <th scope="row">-</th>
                        <td>{lastItem?.file_no}</td>
                        <td>{(lastItem?.plot_no != '' || lastItem?.plot_no != null) ? lastItem?.plot_no : '-'}</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>
                            <Space size="middle">
                                <Link to={`/add-ledger/${lastItem?.file_no}/${lastItem?.plot_no}`} style={{ color: 'blue' }}>Add new</Link>
                            </Space>
                        </td>
                    </tr> */}
                </tbody>
            </table>
            {/* <Table className='mt-3' columns={ledger_columns} dataSource={ledger_data} /> */}
        </div>
    )
};

export default Ledgers;
