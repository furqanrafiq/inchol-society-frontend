import { Button, Col, DatePicker, Form, Input, InputNumber, Row, Select } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { URI } from '../../helper'
import debounce from "lodash.debounce";
import ReactInputMask from 'react-input-mask'
import moment from 'moment'
import {
    DeleteOutlined,
} from '@ant-design/icons';
const { Option } = Select;

const AddMember = () => {
    const params = useParams();
    const location = useLocation();
    const [addMember, setAddMember] = useState(Boolean);
    const [memberError, setMemberError] = useState(Boolean);
    const [cnic, setCnic] = useState('');
    const [descriptions, setDescriptions] = useState([]);
    const [description, setDescription] = useState('');
    const [descriptionArray, setDescriptionArray] = useState([
        { id: 1, amount: '' }
    ]);
    const [totalAmount, setTotalAmount] = useState();
    const [amountError, setAmountError] = useState(false)
    const [latestMemberNo, setLatestMemberNo] = useState(0);

    useEffect(() => {
        axios.get(URI + 'all-descriptions')
            .then(resp => {
                if (resp.data.status == 200) {
                    setDescriptions(resp.data.response.detail)
                }
            })
    }, [])

    useEffect(() => {
        axios.get(URI + 'get-all-members')
            .then(resp => {
                if (resp.data.status == 200) {
                    setLatestMemberNo(resp.data.response.detail)
                }
            })
    })

    useEffect(() => {
        if (location.pathname == '/add-member') {
            setAddMember(true)
        } else {
            setAddMember(false)
        }
    }, [location, addMember])

    function onFinish(values) {
        values.descriptionArray = descriptionArray
        values.relation = values.relation + ' ' + values.relationship
        values.Date = moment(values.Date).format('DD-MM-YYYY')
        if (location.pathname == '/add-member') {
            axios.post(URI + 'add-new-member', values)
                .then(resp => {
                    if (resp.data.status == 200) {
                        Swal.fire({
                            title: 'Success',
                            text: 'New member created successfully',
                            icon: 'success'
                        })
                    }
                })
        } else {
            values.plot_no = params.plotId;
            values.file_no = params.fileNo;
            axios.post(URI + 'add-new-plot-member', values)
                .then(resp => {
                    if (resp.data.status == 200) {
                        Swal.fire({
                            title: 'Success',
                            text: 'New member added successfully',
                            icon: 'success'
                        })
                    }
                })
        }
    }

    const searchMemberNumber = debounce((e) => {
        axios.get(URI + `search-member-number`, {
            params: {
                member_no: e
            }
        })
            .then(resp => {
                if (resp.status == 200) {
                    setMemberError(false)
                } else {
                    setMemberError(true)
                }
            });
    }, 500);


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
        if (total == totalAmount) {
            setAmountError(false)
        } else {
            setAmountError(true)
        }
    }, [descriptionArray])

    return (
        <div>
            {
                addMember == true ?
                    <h5>Add Member</h5> :
                    <h5>Add Plot Member</h5>
            }
            <p className='mb-3'>Latest Member Number : {latestMemberNo}</p>
            <Form
                name="add-member-form"
                layout='vertical'
                className='w-50'
                onFinish={onFinish}
            >
                <Row className='justify-content-between gap-4'>
                    <Col md={11}>
                        <Form.Item
                            label="Member No"
                            name="member_no"
                            rules={[{ required: true, message: 'Please enter Member No.' }]}
                            onChange={(e) => searchMemberNumber(e.target.value)}
                        >
                            <Input />
                        </Form.Item>
                        {
                            memberError == true &&
                            <p style={{ color: 'red' }}>Member Number already exists!</p>
                        }
                        {
                            addMember == false &&
                            <>
                                <Form.Item
                                    label="Plot Number"
                                    name="plot_no"
                                    rules={[{ required: true, message: 'Please enter Plot No.' }]}
                                    initialValue={addMember == false && params.plotId}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Volume Number"
                                    name="file_no"
                                    rules={[{ required: true, message: 'Please enter Volume No.' }]}
                                    initialValue={addMember == false && params.fileNo}
                                >
                                    <Input />
                                </Form.Item>
                            </>
                        }
                        {
                            addMember == true &&
                            <>
                                <Form.Item
                                    label="Plot Number"
                                    name="plot_number"
                                // initialValue={addMember == true && ''}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Volume No"
                                    name="file_number"
                                    rules={[{ required: true, message: 'Please enter Volume No.' }]}
                                // initialValue={addMember == true && ''}
                                >
                                    <Input />
                                </Form.Item>
                            </>
                        }
                        <Form.Item
                            label="Name/Allottee"
                            name="name"
                            rules={[{ required: true, message: 'Please enter Name' }]}
                        >
                            <Input />
                        </Form.Item>
                        <div className='d-flex align-items-end gap-4'>
                            <Form.Item
                                label="Relationship"
                                name="relation"
                                rules={[{ required: true, message: 'Please select relation' }]}
                            >
                                <Select>
                                    <Option value="S/0">S/O</Option>
                                    <Option value="F/0">F/O</Option>
                                    <Option value="W/0">W/O</Option>
                                    <Option value="D/0">D/O</Option>
                                    <Option value="M/0">M/O</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label=""
                                name="relationship"
                            >
                                <Input />
                            </Form.Item>
                        </div>
                        <Form.Item
                            label="Address"
                            name="address"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="CNIC"
                            name="cnic"
                            rules={[{ required: true, message: 'Please enter CNIC' }]}
                        >
                            <Input maxLength={13} minLength={13} />
                            {/* <ReactInputMask mask={/[1-9]/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/} /> */}

                            {/* <ReactInputMask mask="XXXXX XXXXXXX X" alwaysShowMask
                            onChange={(e) => console.log(e.target.value)} value={cnic} 
                            /> */}
                        </Form.Item>
                        <Form.Item
                            label="Mobile Number"
                            name="mobile"
                        >
                            <Input maxLength={11} minLength={11} />
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"
                        // rules={[{ required: true, message: 'Please enter email' }]}
                        >
                            <Input type="email" />
                        </Form.Item>
                        <Form.Item
                            label="Cell"
                            name="cell"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Plot Size"
                            name="plot_size"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Plot Type"
                            name="plot_type"
                        >
                            <Input />
                        </Form.Item>
                        <Button htmlType='submit' type="primary" disabled={memberError == true || amountError == true}>
                            Submit
                        </Button>
                    </Col>
                    <Col md={11}>
                        <Form.Item
                            label="Receipt"
                            name="Receipt"
                            rules={[{ required: true, message: 'Please enter Receipt' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Date"
                            name="Date"
                            rules={[{ required: true, message: 'Please enter Date' }]}
                        >
                            <DatePicker format={'DD-MM-YYYY'} className="w-100" />
                        </Form.Item>

                        <Form.Item
                            label="Total Amount"
                            name="Amount"
                            rules={[{ required: true, message: 'Please enter Amount' }]}
                        >
                            <InputNumber onChange={(e) => setTotalAmount(e)} />
                        </Form.Item>

                        {/* <Form.Item
                            label="Description"
                            name="Description"
                            rules={[{ required: true, message: 'Please enter Description' }]}
                        > */}
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
                    </Col>
                </Row>
            </Form>
        </div >
    )
}

export default AddMember
