import { Col, Row } from 'antd';
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { link, URI } from '../helper'

const AllcommitteeMembers = () => {
    const [allMembers, setAllMembers] = useState([]);

    function getAllMembers() {
        axios.get(URI + 'get-committe-member')
            .then(resp => {
                setAllMembers(resp.data.response.detail)
            });
    }

    useEffect(() => {
        getAllMembers()
    }, [])

    return (
        <div>
            <h5>Committee Members</h5>
            {
                allMembers?.length > 0 ?
                    allMembers?.map(member => {
                        return (
                            <Row className='mb-3 align-items-center'>
                                <Col lg={6} style={{ textAlign: 'center' }}>
                                    <img src={link + member.picture} width="160px" height="120px" style={{ borderRadius: '10px' }} />
                                </Col>
                                <Col lg={12}>
                                    <p style={{ fontWeight: 'bold', fontSize: '20px' }}>{member.name}</p>
                                    <p style={{ fontWeight: 'bold', fontSize: '18px' }}>{member.title}</p>
                                    <p>{member.description}</p>
                                </Col>
                            </Row>
                        )
                    })
                    :
                    <p>No members yet</p>
            }
        </div>
    )
}

export default AllcommitteeMembers