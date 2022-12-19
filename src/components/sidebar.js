import React from "react";
import "./sidebar.css";
import { logout } from "../utils";
// import logo_ from "../../img/logo_.svg";
// import logo from "../../img/logo.svg";
import { Layout, Menu, Tooltip } from "antd";
import { Link } from "react-router-dom";
import {
    NotificationOutlined,
    RiseOutlined,
    SettingOutlined,
    DashboardOutlined,
    LogoutOutlined,
    HeartFilled,
    ScheduleOutlined,
    CarOutlined,
    ToolOutlined,
    FileTextOutlined,
    CalculatorOutlined,
    HomeOutlined,
} from "@ant-design/icons";

import logo from "../img/logo.png";

const { SubMenu } = Menu;
const { Sider } = Layout;

export default class SiderDemo extends React.Component {
    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        return (
            // <div>
            <Sider
                style={{
                    overflow: "auto",
                    minHeight: "100vh",
                    position: "sticky",
                    top: "60px",
                    left: 0,
                }}
                className="Sider  "
                width={220}
                trigger={null}
                collapsible
                collapsed={this.state.collapsed}
            >
                <Menu
                    mode="inline"
                    // defaultSelectedKeys={["1"]}
                    defaultOpenKeys={["sub1"]}
                    className="sidebar-left mt-[60px]"
                >
                    <SubMenu
                        key="sub1"
                        title={
                            <span>
                                {/* <DashboardOutlined /> */}
                                <span className="menuitem ">Basleshikler</span>
                            </span>
                        }
                    >
                        <Menu.Item className="menuitem menuitem2" key="63">
                            <Link to="/basleshik">Basleshikler</Link>
                        </Menu.Item>
                        <Menu.Item className="menuitem menuitem2" key="1">
                            <Link to="/DisBasleshik">DisActive Basleshik</Link>
                        </Menu.Item>
                        {/* <Menu.Item className="menuitem menuitem2" key="3">
                            <Link to="/DelBasleshik">Deleted Basleshik</Link>
                        </Menu.Item> */}
                    </SubMenu>

                    <SubMenu
                        key="sub8"
                        title={
                            <span className="menuitem">
                                <span>Soraglar</span>
                            </span>
                        }
                    >
                        <Menu.Item className="menuitem menuitem2" key="117">
                            <Link to="/ActiveNews">Active Sorag</Link>
                        </Menu.Item>
                        <Menu.Item className="menuitem menuitem2" key="217">
                            <Link to="/disActiveNews">Dis Sorag</Link>
                        </Menu.Item>
                    </SubMenu>

                    {/* <SubMenu
            key="sub9"
            title={
              <span className="menuitem"> 
                <span>Habarlar</span>
              </span>
            }
          >
            <Menu.Item className="menuitem menuitem2" key="19">
            <Link to="/posts">Gelen Habarlar</Link>
            </Menu.Item>
            <Menu.Item className="menuitem menuitem2" key="20">
            <Link to="/sendPost">Ugradylan Habarlar</Link>
            </Menu.Item> 
          </SubMenu> */}

                    <SubMenu
                        key="sub7"
                        title={
                            <span>
                                <SettingOutlined />
                                <span className="menuitem">Sazlamalar</span>
                            </span>
                        }
                    >
                        {/* <Menu.Item className="menuitem" key="9">
              Genral
            </Menu.Item> */}
                        <Menu.Item className="menuitem menuitem2" key="13">
                            <Link to="/ActiveUsers">Users</Link>
                        </Menu.Item>
                        <Menu.Item className="menuitem menuitem2" key="14">
                            <Link to="/DisActiveUsers">DisActive</Link>
                        </Menu.Item>
                    </SubMenu>
                </Menu>

                <div className="admin-footer">
                    <center
                        style={{
                            fontSize: 12,
                            color: "#C0C0C0",
                            fontWeight: 600,
                        }}
                    >
                        Developed by: <br />a programmer WB
                    </center>
                </div>
            </Sider>
        );
    }
}
