import React from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { NavLink, Route, Routes, useLocation } from 'react-router-dom';
import AllMembers from '../views/Member/AllMembers';
import AddMember from '../views/Member/AddMember';
import UpdateMember from '../views/Member/UpdateMember';
import MemberDashboard from '../views/Member/MemberDashboard';
import AllPlots from '../views/Plot/AllPlots';
import AddPlots from '../views/Plot/AddPlots';
import UpdatePlot from '../views/Plot/UpdatePlot';
import Ledgers from '../views/Ledgers';
import UpdateLedger from '../views/UpdateLedger';
import AddLedger from '../views/AddLedger';
import AllNph from '../views/Member/AllNph';
import MSI from '../views/MSI';
import Mursaleen from '../views/Mursaleen';
import logo from '../incholi.png'
import CreateAnnouncement from '../views/CreateAnnouncement';
import AllcommitteeMembers from '../views/AllcommitteeMembers';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const MemberSider = () => {
    const location = useLocation()
    return (
        <div>
            <Layout className='left-sider'>
                <Header className="header" style={{ display: 'flex', alignItems: 'center', padding: '40px' }}>
                    {/* <div className="logo" /> */}
                    <img src={logo} height="100px" width="100px" />
                    <h3 style={{ color: 'white' }}>Inchauli Cooperative Housing Society</h3>
                    {/* <Menu theme="light" mode="horizontal">
                        <Menu.Item key="1">nav 1</Menu.Item>
                        <Menu.Item key="2">nav 2</Menu.Item>
                        <Menu.Item key="3">nav 3</Menu.Item>
                    </Menu> */}
                </Header>
                <Layout>
                    <Sider width={200} className="site-layout-backgroundx">
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={[location.pathname]}
                            defaultOpenKeys={['/member']}
                            style={{ height: '100%', borderRight: 0 }}
                            theme='dark'
                            className='project-sider'
                        >
                            {/* <SubMenu key="/member" icon={<UserOutlined />} title="Members">
                                <Menu.Item key="/all-members">
                                    <NavLink to="/all-members">
                                        All Members
                                    </NavLink>
                                </Menu.Item>
                                <Menu.Item key="/add-member">
                                    <NavLink to="/add-member">
                                        Add Member
                                    </NavLink>
                                </Menu.Item>
                            </SubMenu> */}
                            {/* <SubMenu key="/plot" icon={<LaptopOutlined />} title="Plots"> */}
                            {/* <Menu.Item key="/plot-dashboard">
                                    <NavLink to="/plot-dashboard">
                                        Dashboard
                                    </NavLink>
                                </Menu.Item> */}
                            <Menu.Item key="/">
                                <NavLink to="/">
                                    Dashboard
                                </NavLink>
                            </Menu.Item>
                            <Menu.Item key="/all-plots">
                                <NavLink to="/all-plots">
                                    All plots
                                </NavLink>
                            </Menu.Item>
                            <Menu.Item key="/all-members">
                                <NavLink to="/all-members">
                                    All members
                                </NavLink>
                            </Menu.Item>
                            <SubMenu key="nph" title="Non Plot Holder">
                                <Menu.Item key="5">
                                    <NavLink to="/all-nph">
                                        View all
                                    </NavLink>
                                </Menu.Item>
                                <Menu.Item key="/add-member">
                                    <NavLink to="/add-member">
                                        Add new
                                    </NavLink>
                                </Menu.Item>
                            </SubMenu>
                            <Menu.Item key="/ledger">
                                <NavLink to="/ledger">
                                    Ledger
                                </NavLink>
                            </Menu.Item>
                            <Menu.Item key="/msi">
                                <NavLink to="/msi">
                                    MIS
                                </NavLink>
                            </Menu.Item>
                            <Menu.Item key="/create-announcement">
                                <NavLink to="/create-announcement">
                                    Edit Dashboard
                                </NavLink>
                            </Menu.Item>
                            {/* <Menu.Item key="/munni">
                                <NavLink to="/munni">
                                    Mursaleen
                                </NavLink>
                            </Menu.Item> */}
                            {/* <Menu.Item key="/add-plot">
                                    <NavLink to="/add-plot">
                                        Add plot
                                    </NavLink>
                                </Menu.Item> */}
                            {/* </SubMenu> */}
                            {/* <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
                                <Menu.Item key="9">option9</Menu.Item>
                                <Menu.Item key="10">option10</Menu.Item>
                                <Menu.Item key="11">option11</Menu.Item>
                                <Menu.Item key="12">option12</Menu.Item>
                            </SubMenu> */}
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        {/* <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb> */}
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                                overflowY: 'scroll',
                                scrollBehavior: 'smooth'
                            }}
                        >
                            <Routes>
                                <Route path="/" element={<MemberDashboard />} />
                                <Route path="/all-members" element={<AllMembers />} />
                                <Route path="add-plot-member/:plotId/:fileNo" element={<AddMember />} />
                                <Route path="add-member" element={<AddMember />} />
                                <Route path="update-member/:memberNo" element={<UpdateMember />} />
                                <Route path="all-plots" element={<AllPlots />} />
                                <Route path="add-plot" element={<AddPlots />} />
                                <Route path="update-plot" element={<UpdatePlot />} />
                                <Route path="ledger" element={<Ledgers />} />
                                <Route path="update-ledger/:ledgerId" element={<UpdateLedger />} />
                                <Route path="add-ledger" element={<AddLedger />} />
                                <Route path="all-nph" element={<AllNph />} />
                                <Route path="msi" element={<MSI />} />
                                <Route path="create-announcement" element={<CreateAnnouncement />} />
                                <Route path="committee-members" element={<AllcommitteeMembers />} />
                            </Routes>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        </div>
    )
}

export default MemberSider
