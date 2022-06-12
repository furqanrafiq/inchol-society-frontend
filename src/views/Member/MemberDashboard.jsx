import React, { useState, useEffect } from 'react'
import { HomeOutlined, AreaChartOutlined, ExpandAltOutlined } from '@ant-design/icons';
import { Card, Col, Row, Carousel } from 'antd'
import axios from 'axios';
import { link, URI } from '../../helper';
import { Link } from 'react-router-dom';
const MemberDashboard = () => {

    const [announcements, setAnnouncements] = useState([])
    const [galleryImages, setGalleryImages] = useState([])
    const [committeeMembers, setCommitteeMembers] = useState([])

    function getAnnouncements() {
        axios.get(URI + 'getAllAnnouncements')
            .then(resp => {
                setAnnouncements(resp.data.response.detail)
            });
    }

    function getGalleryImages() {
        axios.get(URI + 'show-gallery')
            .then(resp => {
                setGalleryImages(resp.data.response.detail)
            });
    }

    function getCommitteeMembers() {
        axios.get(URI + 'get-committe-member')
            .then(resp => {
                setCommitteeMembers(resp.data.response.detail)
            });
    }

    useEffect(() => {
        getAnnouncements()
        getGalleryImages()
        getCommitteeMembers()
    }, [])

    return (
        <div>
            <Row gutter={16}>
                <Col span={18}>
                    <Card bordered={false} hoverable style={{ background: 'rgb(175 237 172)', borderRadius: '10px' }}>
                        <div className='row align-items-center'>
                            <div className='col-md-9'>
                                <p style={{ fontSize: '18px', margin: '0px' }}>Society Total Area</p>
                            </div>
                            <div className='col-md-3'>
                                <AreaChartOutlined style={{ fontSize: "40px" }} />
                            </div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <h2 style={{ fontWeight: 'bold' }}>25 acre</h2>
                        </div>
                        <Row gutter={16}>
                            <Col span={8}>
                                <Card bordered={false} hoverable style={{ background: 'rgb(164 238 243)', borderRadius: '10px' }}>
                                    <div className='row align-items-center'>
                                        <div className='col-md-9'>
                                            <p style={{ fontSize: '16px', margin: '0px' }}>Residential Plots</p>
                                        </div>
                                        <div className='col-md-3'>
                                            <HomeOutlined style={{ fontSize: "40px" }} />
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <h2 style={{ fontWeight: 'bold' }}>505</h2>
                                    </div>
                                </Card>
                            </Col>
                            <Col span={8}>
                                <Card bordered={false} hoverable style={{ background: 'rgb(247 186 184) ', borderRadius: '10px' }}>
                                    <div className='row align-items-center'>
                                        <div className='col-md-9'>
                                            <p style={{ fontSize: '16px', margin: '0px', whiteSpace: "nowrap" }}>Commercial Plots</p>
                                        </div>
                                        <div className='col-md-3'>
                                            <HomeOutlined style={{ fontSize: "40px" }} />
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <h2 style={{ fontWeight: 'bold' }}>17</h2>
                                    </div>
                                </Card>
                            </Col>
                            <Col span={8}>
                                <Card bordered={false} hoverable style={{ background: 'rgb(245 242 170)', borderRadius: '10px' }}>
                                    <div className='row align-items-center'>
                                        <div className='col-md-9'>
                                            <p style={{ fontSize: '16px', margin: '0px' }}>Flats</p>
                                        </div>
                                        <div className='col-md-3'>
                                            <HomeOutlined style={{ fontSize: "40px" }} />
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <h2 style={{ fontWeight: 'bold' }}>2</h2>
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col md={6}>
                    <Carousel autoplay arrows={true}>
                        {
                            galleryImages?.map(gallery => {
                                return (
                                    <img className='gallery-image' src={link + gallery.filename} style={{ height: '300px', width: '300px', borderRadius: '10px' }} />
                                )
                            })
                        }
                    </Carousel>
                </Col>
            </Row>
            <Row gutter={16} className='mt-4'>
                <Col span={4}>
                    <Card bordered={false} className='small-cards' hoverable style={{ borderRadius: '10px', borderBottom: '3px solid green' }}>
                        <div style={{ textAlign: 'center' }}>
                            <h6>Mosque</h6>
                            <h5>2</h5>
                        </div>
                    </Card>
                </Col>
                <Col span={4}>
                    <Card bordered={false} className='small-cards' hoverable style={{ borderRadius: '10px', borderBottom: '3px solid #260077' }}>
                        <div style={{ textAlign: 'center' }}>
                            <h6>Parks</h6>
                            <h5>2</h5>
                        </div>
                    </Card>
                </Col>
                <Col span={4}>
                    <Card bordered={false} className='small-cards' hoverable style={{ borderRadius: '10px', borderBottom: '3px solid #3bcf98' }}>
                        <div style={{ textAlign: 'center' }}>
                            <h6>Library</h6>
                            <h5>1</h5>
                        </div>
                    </Card>
                </Col>
                <Col span={4}>
                    <Card bordered={false} className='small-cards' hoverable style={{ borderRadius: '10px', borderBottom: '3px solid #4799ff' }}>
                        <div style={{ textAlign: 'center' }}>
                            <h6>School</h6>
                            <h5>1</h5>
                        </div>
                    </Card>
                </Col>
                {/* </Row> */}
                {/* <Row gutter={16} className='mt-4'> */}
                <Col span={4}>
                    <Card bordered={false} className='small-cards' hoverable style={{ borderRadius: '10px', borderBottom: '3px solid rgb(0 255 184)' }}>
                        <div style={{ textAlign: 'center' }}>
                            <h6>Parking Area</h6>
                            <h5>4</h5>
                        </div>
                    </Card>
                </Col>
                <Col span={4}>
                    <Card bordered={false} className='small-cards' hoverable style={{ borderRadius: '10px', borderBottom: '3px solid #4799ff' }}>
                        <div style={{ textAlign: 'center' }}>
                            <h6>Community Hall</h6>
                            <h5>1</h5>
                        </div>
                    </Card>
                </Col>
            </Row>
            <Row gutter={16} className='mt-4'>
                <Col span={7} className="mr-3" style={{ border: '1px solid lightgray', borderRadius: '10px', padding: '10px', background: 'white' }}>
                    <div className='d-flex align-items-center justify-content-between'>
                        <p style={{ fontWeight: 'bold' }}>Committee Members:</p>
                        <Link to="/committee-members"><ExpandAltOutlined /></Link>
                    </div>
                    <ul className='mt-2'>
                        {
                            committeeMembers?.map(committee => {
                                return (
                                    <li>{committee.name}</li>
                                )
                            })
                        }
                        {/* <li>Mr. Arif Mansoor S/O Shams-ul-Hassan (General Secretary)</li>
                        <li>Mr. Nasiruddin Mehmood S/O Naziruddin Mehmood (Chairman)</li>
                        <li>Mr. Sohail Iftikhar S/O Iftikhar Hussain (Finance Secretary)</li>
                        <li>Mr. Muhammad Zubair S/O Ruknuddin</li>
                        <li>Mr. Aamir Nadeem S/O Wajhat Ali</li>
                        <li>Mr. Salman Siddiqui S/O Dilshad Ali</li>
                        <li>Mr. Shaikh Athar Nawab S/O Nawab ul Hassan</li>
                        <li>Dr. Fahim Uddin S/O Muhammad Shamsuddin</li>
                        <li>Syed Muhammad Zeeshan Ahmed S/O Syed Muhammad Ibne Hussain Sabir</li> */}
                    </ul>
                </Col>
                <Col span={7} className="mr-3" style={{ border: '1px solid lightgray', borderRadius: '10px', padding: '10px', background: 'white' }}>
                    <p style={{ fontWeight: 'bold' }}>Rules:</p>
                </Col>
                <Col span={7} className="mr-3" style={{ border: '1px solid lightgray', borderRadius: '10px', padding: '10px', background: 'white' }}>
                    <p style={{ fontWeight: 'bold' }}>Announcements:</p>
                    {
                        announcements?.length < 0 ?
                            <p>No announcements</p> :
                            <ul style={{ paddingLeft: '20px' }}>
                                {
                                    announcements?.map(announcement => {
                                        return (
                                            <li>
                                                <p style={{ fontSize: '16px' }}>{announcement.title}</p>
                                                <p style={{ fontSize: '13px' }}>{announcement.description}</p>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                    }
                </Col>
            </Row>
        </div>
    )
}

export default MemberDashboard
