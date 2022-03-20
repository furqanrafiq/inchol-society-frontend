import { Button, Form, Input, Spin, Select } from 'antd';
import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react/cjs/react.development';
import { URI } from '../helper';
import {
    LoadingOutlined,
} from '@ant-design/icons';
import Swal from 'sweetalert2';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const { Option } = Select;

const UpdateLedger = () => {
    const params = useParams();
    const [ledgerDetails, setLedgerDetails] = useState()
    const [loading, setLoading] = useState();
    const [descriptions, setDescriptions] = useState([])

    function handleDetails(name, value) {
        setLedgerDetails({ ...ledgerDetails, [name]: value })
    }

    useEffect(() => {
        axios.get(URI + 'all-descriptions')
            .then(resp => {
                if (resp.data.status == 200) {
                    setDescriptions(resp.data.response.detail)
                }
            })
    }, [])

    useEffect(() => {
        setLoading(true)
        axios.get(URI + `get-ledger-details`, {
            params: {
                id: params.ledgerId
            }
        })
            .then(resp => {
                setLedgerDetails(resp.data.response.detail[0]);
                setLoading(false)
            });
    }, [])

    function onFinish(values) {
        values.id = params.ledgerId;
        axios.post(URI + `update-ledger-details`, values)
            .then(resp => {
                if (resp.data.status == 200) {
                    Swal.fire({
                        title: 'Success',
                        text: 'Details updated successfully',
                        icon: 'success'
                    })
                }
            });
    }

    return (
        <div>
            {
                loading == true ?
                    <Spin indicator={antIcon} /> :
                    <>
                        <h5>Update Ledger</h5>
                        <Form
                            name="add-member-form"
                            layout='vertical'
                            className='w-25'
                            onFinish={onFinish}
                        >
                            <Form.Item
                                label="Amount"
                                name="Amount"
                                initialValue={ledgerDetails?.Amount}
                            >
                                <Input onChange={(e) => handleDetails('Amount', e.target.value)} />
                            </Form.Item>
                            <Form.Item
                                label="Description"
                                name="Description"
                                initialValue={ledgerDetails?.Description}
                            >
                                <Select onChange={(e) => handleDetails('Description', e)} className="w-100">
                                    {
                                        descriptions?.map(description => {
                                            return (
                                                <Option key={description.id} value={description.head_of_account}>{description.head_of_account}</Option>
                                            )
                                        })
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="Receipt"
                                name="Receipt"
                                initialValue={ledgerDetails?.Receipt}
                            >
                                <Input onChange={(e) => handleDetails('Receipt', e.target.value)} />
                            </Form.Item>
                            <Form.Item
                                label="Volume No."
                                name="file_no"
                                initialValue={ledgerDetails?.file_no}
                            >
                                <Input onChange={(e) => handleDetails('file_no', e.target.value)} />
                            </Form.Item>
                            <Form.Item
                                label="Member No."
                                name="member_no"
                                initialValue={ledgerDetails?.member_no}
                            >
                                <Input onChange={(e) => handleDetails('member_no', e.target.value)} />
                            </Form.Item>
                            <Button htmlType='submit' type="primary">
                                Submit
                            </Button>
                        </Form>
                    </>
            }
        </div>
    );
};

export default UpdateLedger;
