import React from 'react'

const Mursaleen = () => {
    return (
        <div style={{ background: 'white' }}>
            <div style={{ textAlign: 'center' }}>
                <p>Quotation</p>
                <table class="table table-bordered table-sm">
                    {/* <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Handle</th>
                    </tr>
                </thead> */}
                    <tbody>
                        <tr style={{ textAlign: 'left' }}>
                            <td style={{ width: '60%' }}>Artistic Milliners Pvt Ltd Unit 15</td>
                            <td >Quotation No :</td>
                            <td>Otto</td>
                        </tr>
                        <tr style={{ textAlign: 'left' }}>
                            <td style={{ width: '60%' }}></td>
                            <td >Quotation Date :</td>
                            <td>Otto</td>
                        </tr>
                        <tr style={{ textAlign: 'left' }}>
                            <td style={{ width: '60%' }}>Plot No 12 & 13, Sector 16 Korangi Industrial Area</td>
                            <td >Ref No :</td>
                            <td>Otto</td>
                        </tr>
                        <tr style={{ textAlign: 'left' }}>
                            <td style={{ width: '60%' }}></td>
                            <td >Our Ref No :</td>
                            <td>Otto</td>
                        </tr>
                    </tbody>
                </table>

                <div className='row col-12'>
                    <table class="table table-bordered mt-3 mb-0 col-12">
                        <thead>
                            <tr>
                                <th scope="col">Sr.</th>
                                <th scope="col">Description</th>
                                <th scope="col">Unit</th>
                                <th scope="col">Qty</th>
                                <th scope="col">Price</th>
                                <th scope="col">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style={{ textAlign: 'left' }}>
                                <td>1</td>
                                <td style={{ width: '60%' }}>SCBA Breathing Apparatus 30 Min Capacity</td>
                                <td style={{ width: '60%' }}>PCS</td>
                                <td >1.00</td>
                                <td>40000</td>
                                <td>40000</td>
                            </tr>
                            <tr style={{ textAlign: 'left' }}>
                                <td>2</td>
                                <td style={{ width: '60%' }}>Full Face Gas Mask Model 6800 3M Brand With Cartridges 6001 Set</td>
                                <td style={{ width: '60%' }}>PCS</td>
                                <td >1.00</td>
                                <td>40000</td>
                                <td>40000</td>
                            </tr>
                            <tr style={{ textAlign: 'left' }}>
                                <td>3</td>
                                <td style={{ width: '60%' }}>CHEMICAL MASK ( 3 M ) HALF FACE MODEL. 6200 </td>
                                <td style={{ width: '60%' }}>PCS</td>
                                <td >1.00</td>
                                <td>40000</td>
                                <td>40000</td>
                            </tr>
                        </tbody>
                    </table>
                    <table class="table table-bordered col-12 mb-0">
                        <tbody>
                            <tr style={{ textAlign: 'right' }}>
                                <td style={{ width: '80%' }}>Total Amount</td>
                                <td>55200 </td>
                            </tr>
                        </tbody>
                    </table>
                    <table class="table table-bordered col-12 mb-0">
                        <tbody>
                            <tr style={{ textAlign: 'right' }}>
                                <td style={{ width: '80%' }}>Total Tax</td>
                                <td>55200 </td>
                            </tr>
                        </tbody>
                    </table>
                    <table class="table table-bordered col-12 mb-0">
                        <tbody>
                            <tr style={{ textAlign: 'right' }}>
                                <td style={{ width: '80%' }}>Net Amount</td>
                                <td>55200 </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='mt-5'>
                <p>Terms & Condition</p>
                <p>Gst : 17% Inclusive</p>
                <p>Terms : 30 Days Credit</p>
                <p>Quote : Validity: 15 Days</p>
                <p>Await Your Positive Response</p>
                <p className='mt-3'>With Best Regards,</p>
                <p className='mt-5'>Faisal Javaid</p>
            </div>
        </div>
    )
}

export default Mursaleen