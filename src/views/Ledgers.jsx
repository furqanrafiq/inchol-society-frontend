import React, { useEffect, useState } from 'react';
import { Spin, Input, Table } from 'antd';
import debounce from "lodash.debounce";
import {
    LoadingOutlined,
} from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { URI } from '../helper';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const { Search } = Input;

const Ledgers = () => {
    const query = new URLSearchParams(useLocation().search);
    const [plot_no, setPlotNo] = useState(query.get('plot_no') ? query.get('plot_no') : '');
    const [volume_no, setVolumeNo] = useState(query.get('volume_no') ? query.get('volume_no') : '');
    const membership_no = query.get('membership_no') ? query.get('membership_no') : '';
    const [memberDetails, setMemberDetails] = useState()
    const [financeDetails, setFinanceDetails] = useState()
    const [totalAmount, setTotalAmount] = useState()

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
                volume_no: volume_no
            }
        })
            .then(resp => {
                setFinanceDetails(resp.data.response.detail);
            });
    }

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
            title: 'Membership No.',
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

    const ledger_columns = [
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
            title: 'Membership No.',
            dataIndex: 'member_no',
            key: 'member_no',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Receipt',
            dataIndex: 'receipt',
            key: 'receipt',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
        },
    ];

    const ledger_data = financeDetails?.map((plot, index) => {
        return (
            {
                index: index + 1,
                file_no: plot.file_no,
                member_no: plot.member_no,
                plot_no: (plot.plot_no != '' || plot.plot_no != null) ? plot.plot_no : '-',
                date: plot.Date,
                receipt: plot.Receipt,
                description: plot.Description,
                amount: plot.Amount,
            }
        )
    })

    // useEffect(() => {
    //     if (financeDetails?.length > 0) {
    //         let total;
    //         for (var i = 0; i < financeDetails?.length; i++) {
    //             total += financeDetails[i].Amount
    //         }
    //         console.log(total)
    //     }
    // }, [financeDetails])

    const onSearchByPlotNumber = debounce((name, value) => {
        if (name == 'plot_no') {
            setPlotNo(value)
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
            setVolumeNo(value)
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
                });
        }
    }, 500);

    return (
        <div>
            <h5>Ledger</h5>
            <div className='d-flex' style={{ gridGap: '30px' }}>
                <Search
                    placeholder="Search by plot number"
                    // onSearch={onSearch}
                    onChange={(e) => onSearchByPlotNumber('plot_no', e.target.value)}
                    style={{ width: 200 }}
                    value={plot_no}
                />
                <Search
                    placeholder="Search by volume number"
                    // onSearch={onSearch}
                    onChange={(e) => onSearchByPlotNumber('file_no', e.target.value)}
                    style={{ width: 200 }}
                    value={volume_no}
                />
            </div>
            <Table className='mt-3' columns={columns} dataSource={data} />
            <h5>Ledger Details</h5>
            <Table className='mt-3' columns={ledger_columns} dataSource={ledger_data} />
        </div>
    )
};

export default Ledgers;
