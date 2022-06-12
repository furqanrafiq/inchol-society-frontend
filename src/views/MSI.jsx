import React, { useEffect, useState } from 'react'
import { Input, Table, Spin, Button, Collapse, Checkbox } from 'antd'
import {
    LoadingOutlined
} from '@ant-design/icons';
import axios from 'axios';
import { URI } from '../helper';
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const { Search } = Input;
const { Panel } = Collapse;

const MSI = () => {
    const [searchValue, setSearchValue] = useState({});
    const [memberDetails, setMemberDetails] = useState({});
    const [financeDetails, setFinanceDetails] = useState({});
    const [loading, setLoading] = useState(false)
    const [pdfHeading, setPdfHeading] = useState();
    const [filterCheckboxes, setFilterCheckboxes] = useState({
        member_no: true,
        file_no: true,
        plot_no: true,
        Name: true,
        Address: true,
        Cnic: true,
        PhoneNumber: true,
        Email: true
    })

    const [filterLedgerCheckboxes, setFilterLedgerCheckboxes] = useState({
        ledgerDetails: true,
        date: true,
        receipt: true,
        account_title: true,
        amount: true
    })

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

    const memberOptions = [
        { label: 'member_no', value: 'M/S No.' },
        { label: 'file_no', value: 'Volume No.' },
        { label: 'plot_no', value: 'Plot No.' },
        { label: 'Name', value: 'Name' },
        { label: 'Address', value: 'Address' },
        { label: 'Cnic', value: 'Cnic' },
        { label: 'PhoneNumber', value: 'Phone Number' },
        { label: 'Email', value: 'Email' },
    ]

    const ledgerOptions = [
        { label: 'date', value: 'Date' },
        { label: 'receipt', value: 'Receipt' },
        { label: 'account_title', value: 'Account Title' },
        { label: 'amount', value: 'Amount' }
    ]

    function handleCheckboxes(name, value) {
        setFilterCheckboxes({ ...filterCheckboxes, [name]: value })
    }

    function handleLedgerCheckboxes(name, value) {
        setFilterLedgerCheckboxes({ ...filterLedgerCheckboxes, [name]: value })
    }

    // const excelDataSet = [
    //     {
    //         columns: Object.keys(filterCheckboxes).map(option => {
    //             option == true
    //         })
    //     }
    // ]

    const printDocument = () => {
        window.html2canvas = html2canvas;
        var doc = new jsPDF({
            orientation: "landscape",
            unit: "pt",
            putOnlyUsedFonts: true,
            format: 'a3',
        });

        var content = document.getElementById("div-to-print");
        doc.html(content, {
            callback: function (doc) {
                doc.save('Member-Ledger-Details.pdf');
            }
        });
    };

    return (
        <div>
            <div className='d-flex align-items-center justify-content-between'>
                <h5>MIS</h5>
                <Button style={{ color: 'white', backgroundColor: 'red', borderColor: 'red' }} onClick={() => printDocument()}>Print PDF</Button>
            </div>
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
                        <Collapse className='mt-3'>
                            <Panel header="Filter" key="1">
                                <p style={{ fontWeight: '500' }}>Member Checkboxes:</p>
                                {
                                    memberOptions.map(option => {
                                        return (
                                            <Checkbox defaultChecked onChange={(e) => handleCheckboxes(option.label, e.target.checked)} value={option.value}>{option.value}</Checkbox>
                                        )
                                    })
                                }
                                <p style={{ fontWeight: '500', marginTop: '10px' }}>Ledger Checkboxes:</p>
                                <Checkbox defaultChecked onChange={(e) => handleLedgerCheckboxes('ledgerDetails', e.target.checked)}>Ledger Details</Checkbox>
                                {
                                    ledgerOptions.map(option => {
                                        return (
                                            <Checkbox defaultChecked onChange={(e) => handleLedgerCheckboxes(option.label, e.target.checked)} value={option.value}>{option.value}</Checkbox>
                                        )
                                    })
                                }
                            </Panel>
                        </Collapse>
                        <Input onChange={(e) => setPdfHeading(e.target.value)} className="mt-2 w-50" placeholder='Enter report title'/>
                        <div id="div-to-print">
                            <div style={{ textAlign: 'center',marginTop:'10px'}}>
                                <h2>Inchauli Cooperative Housing Society</h2>
                                <h2>{pdfHeading}</h2>
                            </div>
                            <h4 className='mt-3'>Member Details:</h4>
                            <table class="table mt-2 table-striped" style={{ background: 'white', overflowY: 'scroll' }}>
                                <thead style={{ background: '#001529', color: 'white' }}>
                                    <tr style={{ textAlign: 'center' }}>
                                        {
                                            filterCheckboxes.member_no == true &&
                                            <th scope="col">M/S No.</th>
                                        }
                                        {
                                            filterCheckboxes.file_no == true &&
                                            <th scope="col">Volume No.</th>
                                        }
                                        {
                                            filterCheckboxes.plot_no == true &&
                                            <th scope="col">Plot No.</th>
                                        }
                                        {
                                            filterCheckboxes.Name == true &&
                                            <th scope="col">Name</th>
                                        }
                                        {
                                            filterCheckboxes.Address == true &&
                                            <th scope="col">Address</th>
                                        }
                                        {
                                            filterCheckboxes.Cnic == true &&
                                            <th scope="col">Cnic</th>
                                        }
                                        {
                                            filterCheckboxes.PhoneNumber == true &&
                                            <th scope="col">Phone Number</th>
                                        }
                                        {
                                            filterCheckboxes.Email == true &&
                                            <th scope="col">Email</th>
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr style={{ textAlign: 'center' }}>
                                        {
                                            filterCheckboxes.member_no == true &&
                                            <td>{memberDetails.member_no}</td>
                                        }

                                        {
                                            filterCheckboxes.file_no == true &&
                                            <td>{(memberDetails.file_no != '' || memberDetails.file_no != null) ? memberDetails.file_no : '-'}</td>
                                        }
                                        {
                                            filterCheckboxes.plot_no == true &&
                                            <td>{memberDetails.plot_no}</td>
                                        }
                                        {
                                            filterCheckboxes.Name == true &&
                                            <td>{memberDetails.name}</td>
                                        }
                                        {
                                            filterCheckboxes.Address == true &&
                                            <td>{memberDetails.address}</td>
                                        }
                                        {
                                            filterCheckboxes.Cnic == true &&
                                            <td>{memberDetails.cnic}</td>
                                        }
                                        {
                                            filterCheckboxes.PhoneNumber == true &&
                                            <td>{memberDetails.phone}</td>
                                        }
                                        {
                                            filterCheckboxes.Email == true &&
                                            <td>{memberDetails.email}</td>
                                        }
                                    </tr>
                                </tbody>
                            </table>
                            {
                                filterLedgerCheckboxes.ledgerDetails == true &&
                                <>
                                    <h4 className='mt-3'>Ledger Details:</h4>
                                    <div>
                                        <p>Plot Number : {memberDetails?.plot_no}</p>
                                        <p>Volume Number : {memberDetails?.file_no}</p>
                                    </div>
                                    <table class="table mt-2 table-striped" style={{ background: 'white' }}>
                                        <thead style={{ background: '#001529', color: 'white' }}>
                                            <tr style={{ textAlign: 'center' }}>
                                                <th scope="col">#</th>
                                                {
                                                    filterLedgerCheckboxes.date == true &&
                                                    <th scope="col">Date</th>
                                                }
                                                {
                                                    filterLedgerCheckboxes.receipt == true &&
                                                    <th scope="col">Receipt</th>
                                                }
                                                {
                                                    filterLedgerCheckboxes.account_title == true &&
                                                    <th scope="col">Account Title</th>
                                                }
                                                {
                                                    filterLedgerCheckboxes.amount == true &&
                                                    <th scope="col">Amount</th>
                                                }
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                financeDetails?.length > 0 &&
                                                financeDetails?.map((plot, index) => {
                                                    return (
                                                        <tr style={{ textAlign: 'center' }}>
                                                            <th scope="row">{index + 1}</th>

                                                            {
                                                                filterLedgerCheckboxes.date == true &&
                                                                <td>{plot.Date}</td>
                                                            }
                                                            {
                                                                filterLedgerCheckboxes.receipt == true &&
                                                                <td>{plot.Receipt}</td>
                                                            }
                                                            {
                                                                filterLedgerCheckboxes.account_title == true &&
                                                                <td>{plot.Description}</td>
                                                            }
                                                            {
                                                                filterLedgerCheckboxes.amount == true &&
                                                                <td>{plot.Amount}</td>
                                                            }
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </>
                            }
                        </div>
                    </>
            }
        </div>
    )
}

export default MSI