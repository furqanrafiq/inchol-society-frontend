import React, { useState } from 'react'
import { Button, Form, Input,Radio } from 'antd'

const UpdatePlot = () => {
    const [value, setValue] = useState(1);

    const onChange = e => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };
    return (
        <div>
            <h5>Update Plot</h5>
            <Form
                name="add-member-form"
                layout='vertical'
                className='w-25'
            >
                <Form.Item
                    label="Plot Number"
                    name="plot_number"
                    rules={[{ required: true, message: 'Please input Plot number' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Volume Number"
                    name="volume_number"
                    rules={[{ required: true, message: 'Please input Volume Number' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Member number"
                    name="member_number"
                    rules={[{ required: true, message: 'Please input Member number' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Plot size"
                    name="plot_size"
                    rules={[{ required: true, message: 'Please input Plot size' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Plot type"
                    name="plot_type"
                    rules={[{ required: true, message: 'Please select Plot type' }]}
                >
                    <Radio.Group onChange={onChange} value={value}>
                        <Radio value={1}>Residential</Radio>
                        <Radio value={2}>Commercial</Radio>
                    </Radio.Group>
                </Form.Item>
                <Button htmlType='submit' type="primary">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default UpdatePlot
