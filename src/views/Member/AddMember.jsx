import { Button, Form, Input } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { URI } from '../../helper'
import debounce from "lodash.debounce";

const AddMember = () => {
    const params = useParams();
    const location = useLocation();
    const [addMember, setAddMember] = useState(Boolean);
    const [memberError, setMemberError] = useState(Boolean);

    useEffect(() => {
        if (location.pathname == '/add-member') {
            setAddMember(true)
        } else {
            setAddMember(false)
        }
    }, [location, addMember])

    function onFinish(values) {
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


    return (
        <div>
            {
                addMember == true ?
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
                            rules={[{ required: true, message: 'Please input Plot No.' }]}
                            initialValue={addMember == false && params.plotId}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Volume Number"
                            name="file_no"
                            rules={[{ required: true, message: 'Please input Volume No.' }]}
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
                            rules={[{ required: true, message: 'Please input Volume No.' }]}
                        // initialValue={addMember == true && ''}
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
                    label="CNIC"
                    name="cnic"
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
                <Button htmlType='submit' type="primary" disabled={memberError == true}>
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default AddMember
