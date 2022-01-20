import { Button, Form, Input } from 'antd'
import axios from 'axios'
import React from 'react'
import { useParams } from 'react-router-dom'
import { URI } from '../../helper'

const AddMember = () => {
    const params = useParams();

    function onFinish(values) {
        values.plot_no = params.plotId;
        axios.post(URI + 'add-new-plot-member', values)
            .then(resp => {
                console.log(resp)
            })
    }

    return (
        <div>
            <h5>Add Plot Member</h5>
            <Form
                name="add-member-form"
                layout='vertical'
                className='w-25'
                onFinish={onFinish}
            >
                <Form.Item
                    label="Member No"
                    name="member_no"
                    rules={[{ required: true, message: 'Please input Member No.' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input Name' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Relation"
                    name="relation"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="File No."
                    name="file_no"
                    rules={[{ required: true, message: 'Please input Name' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Address"
                    name="address"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Mobile Number"
                    name="mobile"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Cell"
                    name="cell"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Plot Number"
                    name="plot_no"
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
                <Button htmlType='submit' type="primary">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default AddMember
