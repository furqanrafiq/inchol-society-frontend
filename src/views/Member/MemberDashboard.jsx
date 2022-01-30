import React from 'react'
import { HomeOutlined, AreaChartOutlined } from '@ant-design/icons';
import { Card, Col, Row } from 'antd'
const MemberDashboard = () => {
    return (
        <div>
            {/* <Row gutter={16}> */}
                <Col span={18}>
                    <Card bordered={false} hoverable style={{ background: '#e0f3df', borderRadius: '10px' }}>
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
                                <Card bordered={false} hoverable style={{ background: '#d5f4f6', borderRadius: '10px' }}>
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
                                <Card bordered={false} hoverable style={{ background: '#ffe5e4 ', borderRadius: '10px' }}>
                                    <div className='row align-items-center'>
                                        <div className='col-md-9'>
                                            <p style={{ fontSize: '16px', margin: '0px',whiteSpace:"nowrap" }}>Commercial Plots</p>
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
                                <Card bordered={false} hoverable style={{ background: 'rgb(255 254 228)', borderRadius: '10px' }}>
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
            {/* </Row> */}
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
        </div>
    )
}

export default MemberDashboard
