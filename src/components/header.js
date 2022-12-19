import React, { useContext, useEffect, useState } from "react";
import "./header.css";
import "antd/dist/antd.css";
import { Layout, Menu, Input, Dropdown, Badge, Popover, message } from "antd";

import { UserOutlined, BellOutlined, LogoutOutlined } from "@ant-design/icons";
import { logout } from "../utils/index";
import { axiosInstance } from "../utils/axiosIntance";
import { useHistory } from "react-router-dom";
// import sound from "../img/sound.wav";
import { SebedimContext } from "../context/sebedim";
import logo from "../img/logo.png";
const { Search } = Input;

const { Header } = Layout;
const profile_menu = (
    <Menu>
        <Menu.Item>
            {/* <a target="_blank" rel="noopener noreferrer">
        <UserOutlined /> Profile
      </a> */}
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer">
                <LogoutOutlined /> Logout
            </a>
        </Menu.Item>
    </Menu>
);

const Headers = () => {
    const { dil, newOrder } = useContext(SebedimContext);

    // const [audio] = useState(new Audio(sound));
    const history = useHistory();

    const [bool, setBool] = useState(false);
    const [bool2, setBool2] = useState(false);
    // const [newOrder,setNewOrder] = useState(0);

    const content = (
        <div
            onClick={() => history.push({ pathname: "/canceledOrders" })}
            className="notificationBatch"
        >
            {newOrder} sany taze zakaz
        </div>
    );

    return (
        <Header
            className="site-layout-background header bg-blue"
            style={{ position: "fixed" }}
        >
            {/* <Search
          placeholder="input search text"
          onSearch={(value) => console.log(value)}
          className="search"
        /> */}

            <div className="flex justify-start">
                <div className="bg-blue h-[60px] mr-[200px]" align="center">
                    {/* <img
                        className="object-contain h-[50px] pt-2"
                        src={logo}
                        alt="logo"
                    /> */}
                    {/* OTO */}
                </div>
                <div>Online Test Olimpiada</div>
            </div>
            <div className="profile">
                <Dropdown overlay={profile_menu}>
                    <div className="ant-dropdown-link" onClick={logout}>
                        <UserOutlined />
                    </div>
                </Dropdown>
            </div>

            <div className="notify">
                <Popover
                    placement="bottom"
                    title="Notification"
                    content={content}
                    trigger="click"
                >
                    <Badge count={newOrder}>
                        <BellOutlined style={{ fontSize: 22 }} />
                    </Badge>
                </Popover>
            </div>
        </Header>
    );
};
export default Headers;
