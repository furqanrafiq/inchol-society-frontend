import { Button, Form, Input } from 'antd'
import axios from 'axios'
import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { URI } from '../../helper'

const AddMember = () => {
    const params = useParams();
    const location = useLocation();

    function onFinish(values) {
        if (location.pathname == '/add-member') {
            axios.post(URI + 'add-new-member', values)
                .then(resp => {
                    Swal.fire({
                        title: 'Success',
                        text: 'New member created successfully',
                        icon: 'success'
                    })
                })
        } else {
            values.plot_no = params.plotId;
            values.file_no = params.fileNo;
            axios.post(URI + 'add-new-plot-member', values)
                .then(resp => {
                    Swal.fire({
                        title: 'Success',
                        text: 'New member added successfully',
                        icon: 'success'
                    })
                })
        }
    }

    return (
        <div>
            {
                location.pathname == '/add-member' ?
                    <h5>Add Member</h5> :
                    <h5>Add Plot Member</h5>
            }
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
                {
                    location.pathname.includes('/add-plot-member') &&
                    <>
                        <Form.Item
                            label="Plot Number"
                            name="plot_no"
                            rules={[{ required: true, message: 'Please input Plot No.' }]}
                            initialValue={params.plotId}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Volume Number"
                            name="file_no"
                            rules={[{ required: true, message: 'Please input Volume No.' }]}
                            initialValue={params.fileNo}
                        >
                            <Input />
                        </Form.Item>
                    </>
                }
                {
                    location.pathname == '/add-member' &&
                    <>
                        <Form.Item
                            label="Volume No"
                            name="file_no"
                            rules={[{ required: true, message: 'Please input Volume No.' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Plot Number"
                            name="plot_no"
                        >
                            <Input />
                        </Form.Item>
                    </>
                }
                <Form.Item
                    label="Name/Allottee"
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
