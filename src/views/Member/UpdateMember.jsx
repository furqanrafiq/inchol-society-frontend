import { Button, Form, Input } from 'antd'
import React from 'react'

const UpdateMember = () => {
    return (
        <div>
        <h5>Update Member</h5>
            <Form
                name="add-member-form"
                layout='vertical'
                className='w-25'
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input member name' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Mobile Number"
                    name="mobile"
                    rules={[{ required: true, message: 'Please input member mobile number' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Address"
                    name="address"
                    rules={[{ required: true, message: 'Please input member address' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Member Id"
                    name="member_id"
                    rules={[{ required: true, message: 'Please input member Id' }]}
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

export default UpdateMember