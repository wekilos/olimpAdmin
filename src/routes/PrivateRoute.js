import './PrivateRoute.css';
import React, { useState,Suspense } from "react";
import { Route, useHistory } from "react-router-dom";
import { DesktopOutlined, AlertOutlined, ContactsOutlined, TeamOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import  logo  from "../img/logo.png";
import { isLogin } from '../utils';
import Sidebar from "../components/sidebar";
import Headers from '../components/header';
import Loading from "../components/loading"
const { Header, Content, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    label,
    key,
    icon,
    children,
  };
}



const PrivateRoute = ({ component: Component, ...rest},login) => {
  const history = useHistory();
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Route 
      {...rest}
      render={(props) =>
     <Layout className='layout flex'
      style={{
        height: '100vh',
      }}
    >
     
      <Headers/>
      <Layout className="flex w-full mt-[65px]">
        
        <Suspense fallback={<Loading />}>
              <Sidebar />
        </Suspense>
        <Content
          style={{
            margin: '10px 10px 15px',
            backgroundColor: "white",
          }}
          className="w-full"
        >
          
          <Component {...props} />
        </Content>
      
      </Layout>
    </Layout>
    // :(
    //        history.push({
    //           pathname:"/"
    //         })
    //         )
          
      }
    />
  );
};

export default PrivateRoute;
