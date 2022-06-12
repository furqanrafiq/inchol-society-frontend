import { Button, Col, Form, Input, Row } from 'antd'
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2';
import { URI } from '../helper';
import { UserDeleteOutlined } from '@ant-design/icons'

const { TextArea } = Input;

const CreateAnnouncement = () => {

    const [galleryImages, setGalleryImages] = useState([])
    const [committeeMembers, setCommitteeMembers] = useState({})
    const [allMembers, setAllMembers] = useState([])

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

    function onFinishCommitteeMember() {
        const formData = committeeMembers
        axios.post(`${URI}add-committe-member`, formData)
            .then(response => {
                if (response.data.status == 200) {
                    Swal.fire({
                        title: 'Success',
                        text: 'Successful',
                        icon: 'success'
                    })
                    getCommitteeMembers()
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
                if (response.data.status == 200) {
                    Swal.fire({
                        title: 'Success',
                        text: 'Successful',
                        icon: 'success'
                    })
                }
            })
    }

    function handleCommiteeImages(e) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
            return;
        createCommitteImage(files[0]);
    }

    function createCommitteImage(file) {
        let reader = new FileReader();
        reader.onload = (e) => {
            setCommitteeMembers({ ...committeeMembers, ['picture']: e.target.result })
        };
        reader.readAsDataURL(file);
    }

    function getCommitteeMembers() {
        axios.get(URI + 'get-committe-member')
            .then(resp => {
                setAllMembers(resp.data.response.detail)
            });
    }

    useEffect(() => {
        getCommitteeMembers()
    }, [])

    function deleteMember(id) {
        axios.post(URI + 'delete-committee-member', {
            id: id
        })
            .then(resp => {
                if (resp.data.status == 200) {
                    Swal.fire({
                        title: 'Success',
                        text: 'Deleted Successfully',
                        icon: 'success'
                    })
                    getCommitteeMembers()
                }
            });
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
                                    <img src={gallery} style={{ height: '100px', width: '100px', marginRight: '10px' }} />
                                )
                            })
                        }
                    </div>
                    <Button className='mt-2' onClick={() => addGallery()}>
                        Add
                    </Button>
                </Col>
            </Row>
            <div className='mt-3'>
                <Col lg={11}>
                    <Row className='justify-content-between gap-4'>
                        <p>Add Committee member</p>
                        <Col md={24}>
                            <Input placeholder='Name' onChange={(e) => setCommitteeMembers({ ...committeeMembers, ['name']: e.target.value })} />
                            <Input placeholder='Title' onChange={(e) => setCommitteeMembers({ ...committeeMembers, ['title']: e.target.value })} />
                            <Input placeholder='Description' onChange={(e) => setCommitteeMembers({ ...committeeMembers, ['description']: e.target.value })} />
                            <input type='file' className='mt-2' onChange={(e) => handleCommiteeImages(e)} />
                            <div>
                                <Button className="mt-2" onClick={() => onFinishCommitteeMember()} type="primary">
                                    Submit
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </div>
            <div className='mt-3'>
                <Col lg={6}>
                    <ul>
                        {
                            allMembers?.length > 0 ?
                                allMembers?.map(member => {
                                    return (
                                        <div className='d-flex Falign-items-center justify-content-between'>
                                            <li>{member.name}</li>
                                            <UserDeleteOutlined onClick={() => deleteMember(member.id)} style={{ color: 'red' }} />
                                        </div>
                                    )
                                })
                                :
                                <p>No members</p>
                        }
                    </ul>
                </Col>
            </div>
        </div>
    )
}

export default CreateAnnouncement