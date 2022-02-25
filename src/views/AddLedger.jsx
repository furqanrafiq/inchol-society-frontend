import React, { useState } from 'react'
import { Button, DatePicker, Form, Input, Radio } from 'antd'
import Swal from 'sweetalert2';
import axios from 'axios';
import { URI } from '../helper';
import { useParams } from 'react-router-dom';

const AddLedger = () => {
    const [ledger, setLedger] = useState();
    const params = useParams()

    function onFinish(values) {
        // values.plot_no = params.plotNo;
        // values.file_no = params.fileNo;
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
                >
                    <Input onChange={(e) => handleLedger('member_no', e.target.value)} />
                </Form.Item>
                <Form.Item
                    label="Date"
                    name="Date"
                    rules={[{ required: true, message: 'Please input Date' }]}
                >
                    <DatePicker format={'DD-MM-YYYY'} className="w-100" onChange={handleDate} />
                </Form.Item>
                <Form.Item
                    label="Description"
                    name="Description"
                    rules={[{ required: true, message: 'Please input Description' }]}
                >
                    <Input onChange={(e) => handleLedger('Description', e.target.value)} />
                </Form.Item>
                <Form.Item
                    label="Receipt"
                    name="Receipt"
                    rules={[{ required: true, message: 'Please input Receipt' }]}
                >
                    <Input onChange={(e) => handleLedger('Receipt', e.target.value)} />
                </Form.Item>
                <Form.Item
                    label="Amount"
                    name="Amount"
                    rules={[{ required: true, message: 'Please input Amount' }]}
                >
                    <Input onChange={(e) => handleLedger('Amount', e.target.value)} />
                </Form.Item>
                <Button htmlType='submit' type="primary">
                    Submit
                </Button>
            </Form>
        </div>
    )
};

export default AddLedger;
