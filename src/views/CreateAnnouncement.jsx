import { Button, Col, Form, Input, Row } from 'antd'
import axios from 'axios';
import React, { useState } from 'react'
import Swal from 'sweetalert2';
import { URI } from '../helper';

const { TextArea } = Input;

const CreateAnnouncement = () => {

    const [galleryImages, setGalleryImages] = useState([])

    function onFinish(values) {
        axios.post(URI + 'create-announcement', values)
            .then(resp => {
                if (resp.data.status == 200) {
                    Swal.fire({
                        title: 'Success',
                        text: 'New announcement created successfully',
                        icon: 'success'
                    })
                }
            })
    }

    function handleImages(e) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
            return;
        createImage(files[0]);
    }

    function createImage(file) {
        let reader = new FileReader();
        reader.onload = (e) => {
            setGalleryImages([...galleryImages, e.target.result])
        };
        reader.readAsDataURL(file);
    }

    function addGallery() {
        const formData = { file: galleryImages }
        axios.post(`${URI}add-gallery`, formData)
            .then(response => {
                if (response.data.status_code == 200) {
                    Swal.fire({
                        title: 'Success',
                        text: 'Gantt Chart submitted Successfully',
                        icon: 'success'
                    })
                }
            })
    }

    return (
        <div>
            <p>Create announcement</p>
            <Row>
                <Col lg={11}>
                    <Form
                        name="add-description-form"
                        layout='vertical'
                        className='w-100'
                        onFinish={onFinish}
                    >
                        <Row className='justify-content-between gap-4'>
                            <Col md={24}>
                                <Form.Item
                                    label="Title"
                                    name="title"
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Description"
                                    name="description"
                                >
                                    <TextArea rows={4} />
                                </Form.Item>
                                <Button htmlType='submit' type="primary">
                                    Submit
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
                <Col lg={11} className="ml-3">
                    <input type='file' onChange={(e) => handleImages(e)} />
                    <div className='mt-2'>
                        {
                            galleryImages.length > 0 &&
                            galleryImages.map(gallery => {
                                return (
                                    <img src={gallery} style={{ height: '100px', width: '100px',marginRight:'10px' }}  />
                                )
                            })
                        }
                    </div>
                    <Button className='mt-2' onClick={() => addGallery()}>
                        Add
                    </Button>
                </Col>
            </Row>
        </div>
    )
}

export default CreateAnnouncement