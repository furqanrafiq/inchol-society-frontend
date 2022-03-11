import React, { useEffect, useState } from 'react'
import { Button, DatePicker, Form, Input, InputNumber, Radio, Select } from 'antd'
import Swal from 'sweetalert2';
import axios from 'axios';
import { URI } from '../helper';
import { useParams } from 'react-router-dom';
import {
    DeleteOutlined,
} from '@ant-design/icons';
import debounce from "lodash.debounce";
const { Option } = Select;

const AddLedger = () => {
    const [ledger, setLedger] = useState();
    const params = useParams()
    const [descriptions, setDescriptions] = useState([]);
    const [description, setDescription] = useState('');
    const [descriptionArray, setDescriptionArray] = useState([
        { id: 1, amount: '' }
    ]);
    const [totalAmount, setTotalAmount] = useState();
    const [amountError, setAmountError] = useState(false)
    const [memberError, setMemberError] = useState(Boolean);

    useEffect(() => {
        axios.get(URI + 'all-descriptions')
            .then(resp => {
                if (resp.data.status == 200) {
                    setDescriptions(resp.data.response.detail)
                }
            })
    }, [])

    function onFinish(values) {
        // values.plot_no = params.plotNo;
        // values.file_no = params.fileNo;
        values.descriptionArray = descriptionArray;
        axios.post(URI + 'add-ledger', values)
            .then(resp => {
                if (resp.data.status == 200) {
                    Swal.fire({
                        title: 'Success',
                        text: 'New ledger created successfully',
                        icon: 'success'
                    })
                }
            })
    }

    function handleLedger(name, value) {
        setLedger({ ...ledger, [name]: value })
    }

    function handleDate(date, dateString) {
        setLedger({ ...ledger, 'Date': dateString })
    }

    function addDescription() {
        setDescriptionArray([...descriptionArray, { id: descriptionArray.length + 1, amount: '' }])
    }

    function deleteDescription(id) {
        const updatedArray = descriptionArray.filter((item) => id !== item.id);
        setDescriptionArray(updatedArray);
    }

    function handleDescription(name, value, index) {
        const insList = [...descriptionArray];
        insList[index][name] = value;
        setDescriptionArray(insList);
    };

    useEffect(() => {
        var sum = descriptionArray?.map(item => item.amount)
        var total = sum.reduce(function (a, b) {
            return a + b;
        }, 0);
        console.log(total)
        if (total == totalAmount) {
            setAmountError(false)
        } else {
            setAmountError(true)
        }
    }, [descriptionArray])

    const searchMemberNumber = debounce((e) => {
        axios.get(URI + `search-member-number`, {
            params: {
                member_no: e
            }
        })
            .then(resp => {
                if (resp.status == 200) {
                    setMemberError(true)
                } else {
                    setMemberError(false)
                }
            });
    }, 500);

    return (
        <div>
            <h5>Add Ledger</h5>
            <Form
                name="add-member-form"
                layout='vertical'
                onFinish={onFinish}
                className='w-25'
            >
                <Form.Item
                    label="Plot Number"
                    name="plot_no"
                    rules={[{ required: true, message: 'Please input Plot number' }]}
                // initialValue={params.plotNo}
                >
                    <Input onChange={(e) => handleLedger('plot_no', e.target.value)} />
                </Form.Item>
                <Form.Item
                    label="Volume Number"
                    name="file_no"
                    rules={[{ required: true, message: 'Please input Volume Number' }]}
                // initialValue={params.fileNo}
                >
                    <Input onChange={(e) => handleLedger('volume_no', e.target.value)} />
                </Form.Item>
                <Form.Item
                    label="Member number"
                    name="member_no"
                    rules={[{ required: true, message: 'Please input Member number' }]}
                    onChange={(e) => searchMemberNumber(e.target.value)}
                >
                    <Input onChange={(e) => handleLedger('member_no', e.target.value)} />
                </Form.Item>
                {
                    memberError == true &&
                    <p style={{ color: 'red' }}>Member Number does not exist!</p>
                }
                <Form.Item
                    label="Receipt"
                    name="Receipt"
                    rules={[{ required: true, message: 'Please input Receipt' }]}
                >
                    <Input onChange={(e) => handleLedger('Receipt', e.target.value)} />
                </Form.Item>
                <Form.Item
                    label="Date"
                    name="Date"
                    rules={[{ required: true, message: 'Please input Date' }]}
                >
                    <DatePicker format={'DD-MM-YYYY'} className="w-100" onChange={handleDate} />
                </Form.Item>
                <Form.Item
                    label="Total Amount"
                    name="Amount"
                    rules={[{ required: true, message: 'Please input Amount' }]}
                >
                    <Input onChange={(e) => { handleLedger('Amount', e.target.value); setTotalAmount(e.target.value) }} />
                </Form.Item>
                {
                    descriptionArray?.map((item, index) => {
                        return (
                            <div className='mb-3'>
                                <div>
                                    <p>Description</p>
                                    <Select onChange={(e) => handleDescription('description', e, index)} value={item.description} className="w-100">
                                        {
                                            descriptions?.map(description => {
                                                return (
                                                    <Option key={description.id} value={description.head_of_account}>{description.head_of_account}</Option>
                                                )
                                            })
                                        }
                                    </Select>
                                </div>
                                <div className='gap-4 d-flex align-items-end'>
                                    <div>
                                        <p>Amount</p>
                                        <InputNumber value={item.amount} onChange={(e) => handleDescription('amount', e, index)} />
                                    </div>
                                    <div>
                                        <DeleteOutlined style={{ color: 'red', fontSize: '18px' }} onClick={() => deleteDescription(item.id)} />
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                {/* </Form.Item> */}
                <Button className='primary' onClick={() => addDescription()}>Add description</Button>
                {
                    amountError == true &&
                    <p style={{ color: 'red' }}>Amount of descriptions should be equal to total amount</p>
                }
                <Button htmlType='submit' type="primary" disabled={amountError == true || memberError == true}>
                    Submit
                </Button>
            </Form>
        </div>
    )
};

export default AddLedger;
