import React, { useEffect, useState } from 'react'
import { Input, Table, Spin } from 'antd'
import {
    LoadingOutlined
} from '@ant-design/icons';
import axios from 'axios';
import { URI } from '../helper';
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const { Search } = Input;

const MSI = () => {
    const [searchValue, setSearchValue] = useState({});
    const [memberDetails, setMemberDetails] = useState({});
    const [financeDetails, setFinanceDetails] = useState({});
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (searchValue != {}) {
            setLoading(true)
            axios.post(URI + `msi`, searchValue)
                .then(resp => {
                    setLoading(false)
                    setMemberDetails(resp.data.response.detail);
                    setFinanceDetails(resp.data.response.detail.financeDetails)
                });
        }
    }, [searchValue])

    function handleSearch(name, value) {
        setSearchValue({ ...searchValue, [name]: value })
    }

    return (
        <div>
            <h5>MSI</h5>
            <div className='d-flex gap-4'>
                <Search
                    placeholder="Search by Volume No."
                    // onSearch={onSearch}
                    onChange={(e) => handleSearch('file_no', e.target.value)}
                    style={{ width: 250, marginRight: '10px' }}
                />
                <Search
                    placeholder="Search by M/S No."
                    // onSearch={onSearch}
                    onChange={(e) => handleSearch('member_no', e.target.value)}
                    style={{ width: 250, marginRight: '10px' }}
                />
                <Search
                    placeholder="Search by Plot No."
                    // onSearch={onSearch}
                    className='w-25'
                    onChange={(e) => handleSearch('plot_no', e.target.value)}
                    style={{ width: 250 }}
                />
            </div>
            {
                loading == true ?
                    <Spin indicator={antIcon} /> :
                    <>
                        <h4 className='mt-3'>Member Details:</h4>
                        <table class="table mt-2" style={{ background: 'white', overflowY: 'scroll' }}>
                            <thead>
                                <tr style={{ textAlign: 'center' }}>
                                    <th scope="col">M/S No.</th>
                                    <th scope="col">Volume No.</th>
                                    <th scope="col">Plot No.</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">Cnic</th>
                                    <th scope="col">Phone Number</th>
                                    <th scope="col">Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style={{ textAlign: 'center' }}>
                                    <td>{memberDetails.member_no}</td>
                                    <td>{(memberDetails.file_no != '' || memberDetails.file_no != null) ? memberDetails.file_no : '-'}</td>
                                    <td>{memberDetails.plot_no}</td>
                                    <td>{memberDetails.name}</td>
                                    <td>{memberDetails.address}</td>
                                    <td>{memberDetails.cnic}</td>
                                    <td>{memberDetails.phone}</td>
                                    <td>{memberDetails.email}</td>
                                </tr>
                            </tbody>
                        </table>
                        <h4 className='mt-3'>Ledger Details:</h4>
                        <div>
                            <p>Plot Number : {memberDetails?.plot_no}</p>
                            <p>Volume Number : {memberDetails?.file_no}</p>
                        </div>
                        <table class="table mt-2" style={{ background: 'white' }}>
                            <thead>
                                <tr style={{ textAlign: 'center' }}>
                                    <th scope="col">#</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Receipt</th>
                                    <th scope="col">Account Title</th>
                                    <th scope="col">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    financeDetails?.length > 0 &&
                                    financeDetails?.map((plot, index) => {
                                        return (
                                            <tr style={{ textAlign: 'center' }}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{plot.Date}</td>
                                                <td>{plot.Receipt}</td>
                                                <td>{plot.Description}</td>
                                                <td>{plot.Amount}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </>
            }
        </div>
    )
}

export default MSI