import { Button, Form, Input } from 'antd'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { URI } from '../../helper';
import {
    LoadingOutlined
} from '@ant-design/icons';
import { Spin } from 'antd';
import Swal from 'sweetalert2';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const UpdateMember = () => {
    const params = useParams();
    const [member, setMember] = useState({})
    const [loading, setLoading] = useState(false)

    function onFinish(values) {
        values.id = params.memberNo;
        axios.post(URI + 'update-member', values).then(resp => {
            if (resp.data.status == 200) {
                Swal.fire({
                    title: 'Success',
                    text: 'Member updated successfully',
                    icon: 'success'
                })
            }
        })
    }

    useEffect(() => {
        setLoading(true)
        axios.get(URI + 'get-member-details', {
            params: {
                member_no: params.memberNo
            }
        }).then(resp => {
            setMember(resp.data.response.detail[0])
            setLoading(false)
        })
    }, [])

    return (
        <div>
            <h5>Update Member</h5>
            {
                loading == true ?
                    <Spin indicator={antIcon} /> :
                    <Form
                        name="add-member-form"
                        layout='vertical'
                        className='w-25'
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label="Member No"
                            name="member_no"
                            initialValue={member?.member_no}
                            rules={[{ required: true, message: 'Please input Member number' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Name/Allottee"
                            name="name"
                            initialValue={member?.name}
                            rules={[{ required: true, message: 'Please input Name' }]}
                        >
                            <Input />
                        </Form.Item>
                        {/* <Form.Item
                    label="Mobile Number"
                    name="mobile"
                >
                    <Input />
                </Form.Item> */}
                        <Form.Item
                            label="Plot Number"
                            name="plot_no"
                            initialValue={member?.plot_no}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Volume Number"
                            name="file_no"
                            initialValue={member?.file_no}
                            rules={[{ required: true, message: 'Please input Volume No.' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Address"
                            name="address"
                            initialValue={member?.address}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Cell"
                            name="cell"
                            initialValue={member?.cell}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Phone"
                            name="phone"
                            initialValue={member?.phone}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="Email"
                            initialValue={member?.email}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Plot size"
                            name="plot_size"
                            initialValue={member?.plot_size}
                        >
                            <Input />
                        </Form.Item>
                        {/* <Form.Item
                            label="Plot type"
                            name="Email"
                            initialValue={member?.member_no}
                        >
                            <Input />
                        </Form.Item> */}
                        <Button htmlType='submit' type="primary">
                            Submit
                        </Button>
                    </Form>
            }
        </div>
    )
}

export default UpdateMember