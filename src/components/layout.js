import './layout.css';
import React, { useState } from "react";
import { Route, useHistory } from "react-router-dom";
import { DesktopOutlined, AlertOutlined, ContactsOutlined, TeamOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
const { Header, Content, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    label,
    key,
    icon,
    children,
  };
}

const items = [
  getItem('Zakazlar', 'sub1', <AlertOutlined />, [
    getItem('Zayawkalar', 'requests'),
    getItem('Zakazlar', 'orders'),
    getItem('Canceled Requests', 'canceledRequests'),
    getItem('Arhiw', 'archive'),
  ]),
  getItem('Tazelikler', 'news', <DesktopOutlined />),
  getItem('Habarlasmak', 'contact', <ContactsOutlined />),
  getItem('Ulanyjylar', 'sub2', <TeamOutlined />, [
    getItem('Aktiw', 'activeUsers'), 
    getItem('Aktiw dal', 'nonActiveUsers')]),
];


const LayoutComponent = () => {
  const history = useHistory();
  const [collapsed, setCollapsed] = useState(false);
  return (
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="logo">LOGO</div>
        <Menu 
            style={{backgroundColor: "white"}} 
            defaultOpenKeys={['sub1']} 
            defaultSelectedKeys={['requests']} 
            mode="inline" items={items} 
            onClick={(e) => {if(e.key!=='sub1' || e.key!=='sub2') {history.push(`/${e.key}`)}}} 
        />
      </Sider>
  );
};

export default LayoutComponent;
