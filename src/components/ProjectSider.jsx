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

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const MemberSider = () => {
    const location = useLocation()
    return (
        <div>
            <Layout className='left-sider'>
                <Header className="header" style={{ display: 'flex', alignItems: 'center' }}>
                    <div className="logo" />
                    <h3 style={{ color: 'white' }}>Inchauli Society</h3>
                    {/* <Menu theme="light" mode="horizontal">
                        <Menu.Item key="1">nav 1</Menu.Item>
                        <Menu.Item key="2">nav 2</Menu.Item>
                        <Menu.Item key="3">nav 3</Menu.Item>
                    </Menu> */}
                </Header>
                <Layout>
                    <Sider width={200} className="site-layout-background">
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={[location.pathname]}
                            defaultOpenKeys={['/member']}
                            style={{ height: '100%', borderRight: 0 }}
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
                            <Menu.Item key="/add-member">
                                <NavLink to="/add-member">
                                    Add member
                                </NavLink>
                            </Menu.Item>
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
                            </Routes>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        </div>
    )
}

export default MemberSider