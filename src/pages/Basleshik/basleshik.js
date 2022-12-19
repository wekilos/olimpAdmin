import { Popconfirm, Table, Button, message, Drawer } from "antd";
import React, { useEffect, useState } from "react";
import { axiosInstance, BASE_URL } from "../../utils/axiosIntance";
import file from "../../img/file.png";
import DropFileInput from "./dropFile";
import { useHistory } from "react-router-dom";

const Requests = () => {
    const history = useHistory();
    const [data, setData] = useState([]);
    const [openChange, setOpenChange] = useState(false);
    const [newBas, setNewBas] = useState(false);
    const [order, setOrder] = useState({});
    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axiosInstance
            .get("/api/basleshikler?active=true")
            .then((data) => {
                console.log(data.data);
                setData(data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const columns = [
        {
            title: "No",
            dataIndex: "id",
        },
        {
            title: "Basleshik Ady",
            dataIndex: "name",
        },
        {
            title: "Dushundirish",
            dataIndex: "description",
        },
        {
            title: "Time",
            dataIndex: "time",
        },

        {
            title: "Action",
            render: (text, record) => (
                <>
                    {/* <Popconfirm placement="top" title={"Are you sure"} onConfirm={handleConfirm} okText="Yes" cancelText="No">  */}
                    <Button
                        onClick={() => {
                            setOpenChange(true);
                            setOrder(record);
                        }}
                        type="primary"
                        style={{ borderRadius: "7px" }}
                    >
                        Update
                    </Button>
                    {/* </Popconfirm> */}
                    <Popconfirm
                        placement="top"
                        title={"Are you sure"}
                        onConfirm={() => Reject(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button
                            type="danger"
                            style={{ borderRadius: "7px", marginLeft: "10px" }}
                        >
                            Reject
                        </Button>
                    </Popconfirm>
                </>
            ),
        },
    ];

    const makeOrder = () => {
        axiosInstance
            .patch("/api/basleshik/update", {
                name: order.name,
                description: order.description,
                time: order.time,
                id: order.id,
            })
            .then((data) => {
                console.log(data.data);
                message.success("Ustunlikli!");
                getData();
                setOpenChange(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const newBasleshik = () => {
        axiosInstance
            .post("/api/basleshik/create", {
                name: order.name,
                description: order.description,
                time: order.time,
            })
            .then((data) => {
                console.log(data.data);
                message.success("Ustunlikli!");
                getData();
                setNewBas(false);
                setOrder({});
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const Reject = (id) => {
        axiosInstance
            .patch("/api/basleshik/disActive/" + id)
            .then((data) => {
                message.success("Yatyryldy!");
                getData();
            })
            .catch((err) => {
                console.log(err);
                message.warn("Gaytadan Barlan!");
            });
    };

    return (
        <>
            <Drawer
                width={500}
                placement="right"
                closable={true}
                mask={true}
                maskClosable={true}
                onClose={() => setOpenChange(false)}
                visible={openChange}
            >
                <div>
                    <div style={{ width: "100%" }}>
                        <input
                            value={order.name}
                            onChange={(e) =>
                                setOrder({ ...order, name: e.target.value })
                            }
                            className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
                            type="text"
                            placeholder="Ady"
                        />
                        <input
                            value={order.description}
                            onChange={(e) =>
                                setOrder({
                                    ...order,
                                    description: e.target.value,
                                })
                            }
                            className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
                            type="text"
                            placeholder="Dushundirishi"
                        />
                        <input
                            value={order.time}
                            onChange={(e) =>
                                setOrder({ ...order, time: e.target.value })
                            }
                            className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
                            type="time"
                            placeholder="Time"
                        />

                        <button
                            onClick={() => {
                                makeOrder();
                            }}
                            className={` bg-blue h-[50px] rounded-[5px] w-full mt-4 text-[18px] font-sans text-white`}
                        >
                            Update
                        </button>
                    </div>
                </div>
            </Drawer>
            <Drawer
                width={500}
                placement="right"
                closable={true}
                mask={true}
                maskClosable={true}
                onClose={() => setNewBas(false)}
                visible={newBas}
            >
                <div>
                    <div style={{ width: "100%" }}>
                        <input
                            value={order.name}
                            onChange={(e) =>
                                setOrder({ ...order, name: e.target.value })
                            }
                            className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
                            type="text"
                            placeholder="Ady"
                        />
                        <input
                            value={order.description}
                            onChange={(e) =>
                                setOrder({
                                    ...order,
                                    description: e.target.value,
                                })
                            }
                            className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
                            type="text"
                            placeholder="Dushundirishi"
                        />
                        <input
                            value={order.time}
                            onChange={(e) =>
                                setOrder({ ...order, time: e.target.value })
                            }
                            className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
                            type="time"
                            placeholder="Time"
                        />

                        <button
                            onClick={() => {
                                newBasleshik();
                            }}
                            className={` bg-blue h-[50px] rounded-[5px] w-full mt-4 text-[18px] font-sans text-white`}
                        >
                            Doret
                        </button>
                    </div>
                </div>
            </Drawer>
            <div className="w-full flex justify-between h-[50px]">
                <h2 className="font-sans font-bold text-[24px] ml-[20px] leading-[50px]">
                    Basleshikler
                </h2>
                <Button
                    style={{ borderRadius: "7px" }}
                    className=" mt-auto mb-auto mr-[20px]"
                    type="primary"
                    onClick={() => setNewBas(true)}
                >
                    Basleshik Gosh
                </Button>
            </div>
            <Table
                columns={columns}
                dataSource={data}
                pagination={{
                    pageSize: 50,
                }}
                scroll={{
                    y: "72vh",
                }}
            />
        </>
    );
};

export default Requests;
