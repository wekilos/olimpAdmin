import React, { useState } from "react";
import {
    MailFilled,
    LockFilled,
    EyeFilled,
    EyeInvisibleFilled,
} from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { message } from "antd";
import "./login.css";
import { axiosInstance } from "../../utils/axiosIntance";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [type, setType] = useState("password");
    const history = useHistory();
    const CheckPassword = () => {
        axiosInstance
            .post("/api/admin/login", {
                email: email,
                password: password,
            })
            .then((data) => {
                console.log(data.data);
                if (data.data.login === false) {
                    message.warn(data.data.msg);
                } else {
                    message.success("Ustunlikli!");
                    localStorage.setItem("TDYAdmin", JSON.stringify(data.data));
                    // history.push({ pathname: "/basleshik" });
                    window.location.href = "/basleshik";
                }
            })
            .catch((err) => {
                console.log(err);
                message.warn(err.msg);
            });
    };
    return (
        <div>
            {/* <h2 className='logo' >Logo</h2> */}
            <div className="login-container">
                <h2>Welcome Back</h2>
                <p>Enter your credentials to access!</p>

                <div className="input-container">
                    <MailFilled className="icon" />
                    <input
                        value={email}
                        type="email"
                        style={{ width: "395px" }}
                        placeholder="Email girizin"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="input-container">
                    <LockFilled className="icon-lock" />
                    <input
                        type={type}
                        placeholder="Parol girizin"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {type == "password" ? (
                        <EyeFilled
                            className="icon"
                            style={
                                !password
                                    ? { color: "white" }
                                    : { color: "#267fff" }
                            }
                            onClick={() => setType("text")}
                        />
                    ) : (
                        <EyeInvisibleFilled
                            className="icon"
                            onClick={() => setType("password")}
                        />
                    )}
                </div>

                <button onClick={() => CheckPassword()}>Log In</button>
            </div>
        </div>
    );
};

export default Login;
