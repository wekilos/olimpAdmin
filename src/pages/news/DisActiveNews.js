import { Popconfirm, Table, Button, message, Drawer, Select } from "antd";
import React, { useEffect, useState } from "react";
import { axiosInstance, BASE_URL } from "../../utils/axiosIntance";
import file from "../../img/file.png";
import DropFileInput from "./dropFile";
import { useHistory } from "react-router-dom";
// import { Option } from "antd/lib/mentions";
const { Option } = Select;

const Requests = () => {
    const history = useHistory();
    const [data, setData] = useState([]);
    const [basleshikler, setBasleshikler] = useState([]);
    const [openChange, setOpenChange] = useState(false);
    const [order, setOrder] = useState({});
    const [files, setFiles] = useState([]);
    const [active, setActive] = useState(false);
    const [code, setCode] = useState("");
    const [payBefore, setPayBefore] = useState("");
    const [payBeforeType, setPayBeforeType] = useState("");
    const [removeAll, setRemoveAll] = useState(false);
    const [edit, setEdit] = useState(false);
    const [surat, setSurat] = useState(false);
    const [news, setNews] = useState();
    const [gosh, setGosh] = useState(false);
    const [tazelik, setTazelik] = useState();
    const [jogap, setJogap] = useState();
    useEffect(() => {
        getData();
        getBasleshikler();
    }, []);

    const getData = () => {
        axiosInstance
            .get("/api/soraglar?active=false")
            .then((data) => {
                console.log(data.data);
                setData(data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getBasleshikler = () => {
        axiosInstance
            .get("/api/basleshikler?active=true")
            .then((data) => {
                console.log(data.data);
                setBasleshikler(data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const columns = [
        {
            title: "ID ",
            dataIndex: "id",
        },
        {
            title: "Sorag",
            dataIndex: "sorag",
        },
        {
            title: "Surat",
            dataIndex: "uploaded",
            render: (text, record) => (
                <div>
                    <img
                        className="object-contain h-[100px]"
                        src={BASE_URL + "/" + record.soragimg}
                        alt="surat"
                    />
                </div>
            ),
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
                        Maglumat
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
                            Active
                        </Button>
                    </Popconfirm>
                </>
            ),
        },
    ];

    const onFileChange = (files) => {
        console.log(files);
        files.length > 0 && setActive(true);
        files.length == 0 && setActive(true);
        setFiles(files);
    };

    const makeOrder = () => {
        if (
            code.length > 0 &&
            payBefore.length > 0 &&
            payBeforeType.length > 0
        ) {
            const formData = new FormData();
            console.log("order", order);
            formData.append("id", order?.id);
            formData.append("code", code);
            formData.append("payBefore", payBefore);
            formData.append("payBeforeType", payBeforeType);
            files?.map((item) => {
                formData.append("filess", item);
            });
            axiosInstance
                .post("/api/order/make", formData)
                .then((data) => {
                    console.log(data.data);
                    message.success("Ustunlikli!");
                    getData();
                    setOpenChange(false);
                    setCode("");
                    setPayBefore("");
                    setPayBeforeType("");
                    setFiles([]);
                    history.push({
                        pathname: "/orders",
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            message.warn("Maglumatlary doly dolduryn!");
        }
    };

    const Reject = (id) => {
        axiosInstance
            .patch("/api/sorag/active/" + id)
            .then((data) => {
                message.success("Dikeldildi!");
                getData();
            })
            .catch((err) => {
                console.log(err);
                message.warn("Gaytadan Barlan!");
            });
    };

    const editSurat = () => {
        const formData = new FormData();
        formData.append("picture", files[0]);
        formData.append("id", order?.id);

        axiosInstance
            .post("/api/news/update/file", formData)
            .then((data) => {
                message.success("Surat Tazelendi!");
                getData();
                setSurat(false);
                setOpenChange(false);
            })
            .catch((err) => {
                console.log(err);
                message.warn("Tazeden Barlan!");
            });
    };

    const editData = () => {
        axiosInstance
            .patch("/api/sorag/update", {
                sorag: tazelik.sorag,
                id: order?.id,
            })
            .then((data) => {
                message.success("Maglumatlar Uytgedildi!");
                getData();
                setEdit(false);
                setOpenChange(false);
            });
    };

    const TazelikGosh = () => {
        const formData = new FormData();
        formData.append("sorag", tazelik.sorag);
        formData.append("soragimg", tazelik.soragimg);
        formData.append("BasleshikId", tazelik.BasleshikId);
        console.log(tazelik);

        axiosInstance
            .post("/api/sorag/create", formData)
            .then((data) => {
                message.success("Doredildi!");
                getData();
                setGosh(false);
                setTazelik();
            })
            .catch((err) => {
                console.log(err);
                message.warn("Tazeden Barlan!");
            });
    };

    const jogapGosh = () => {
        console.log(jogap);
        axiosInstance
            .post("/api/jogap/create", {
                jogap: jogap.jogap1,
                isTrue: jogap.isTrue ? jogap.isTrue : false,
                SoragId: order.id,
            })
            .then((data) => {
                message.success("Doredildi!");
                getData();
                setJogap({});
                setSurat(false);
            })
            .catch((err) => {
                console.log(err);
                message.warn("Tazeden Barlan!");
            });
    };

    const deleteJogap = (id) => {
        axiosInstance
            .delete("/api/jogap/delete/" + id)
            .then(() => {
                message.success("Deleted!");
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
                    <div>
                        <h1>Jogaplar</h1>
                        {order.Jogaps?.map((item, i) => {
                            return (
                                <div className="flex justify-start leading-[24px] mb-2">
                                    <h3
                                        className={
                                            item.isTrue
                                                ? `text-[#00ff00]`
                                                : ` text-[#ff0000]`
                                        }
                                    >
                                        {i + 1 + ") " + item.jogap}
                                    </h3>
                                    <button
                                        onClick={() => deleteJogap(item.id)}
                                        className=" ml-4 rounded-[8px] leading-[24px] mb-[7px] border-[1px] w-[25px]"
                                    >
                                        X
                                    </button>
                                </div>
                            );
                        })}
                    </div>

                    <div className="w-full mt-4 flex justify-start">
                        <Button
                            onClick={() => {
                                setEdit(true);
                                setNews(order);
                                setTazelik(order);
                            }}
                            className="mr-[30px]"
                            type="primary"
                            style={{ borderRadius: "7px" }}
                        >
                            Uytget
                        </Button>
                        <Button
                            onClick={() => setSurat(true)}
                            type="primary"
                            style={{ borderRadius: "7px" }}
                        >
                            Jogap Gosh
                        </Button>
                    </div>
                </div>
            </Drawer>
            <Drawer
                width={500}
                placement="right"
                closable={true}
                mask={true}
                maskClosable={true}
                onClose={() => {
                    setEdit(false);
                }}
                visible={edit}
            >
                <div style={{ width: "100%" }}>
                    {/* <select
                        onChange={(e) => {
                            setTazelik({
                                ...tazelik,
                                BasleshikId: e.target.value,
                            });
                        }}
                        placeholder="Basleshik sayla!"
                        className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
                    >
                        {basleshikler.map((item) => {
                            return (
                                <option
                                    key={"bas" + item.id}
                                    value={item.id}
                                    className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
                                >
                                    {item.name}
                                </option>
                            );
                        })}
                    </select> */}
                    <textarea
                        value={tazelik?.sorag}
                        onChange={(e) =>
                            setTazelik({ ...tazelik, sorag: e.target.value })
                        }
                        className="min-h-[100px] p-4 rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
                        type="text"
                        placeholder="sorag"
                    />
                    {/* <input
                        // value={tazelik?.soragimg}
                        onChange={(e) =>
                            setTazelik({
                                ...tazelik,
                                soragimg: e.target.files[0],
                            })
                        }
                        className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
                        type="file"
                        placeholder="sorag img"
                    /> */}

                    <button
                        onClick={() => {
                            editData();
                        }}
                        className={
                            "!bg-blue !text-white    h-[50px] rounded-[5px] w-full mt-4 text-[18px] font-sans"
                        }
                    >
                        Send
                    </button>
                </div>
            </Drawer>
            <Drawer
                width={500}
                placement="right"
                closable={true}
                mask={true}
                maskClosable={true}
                onClose={() => setSurat(false)}
                visible={surat}
            >
                <div>
                    <input
                        value={jogap?.jogap1}
                        onChange={(e) =>
                            setJogap({ ...jogap, jogap1: e.target.value })
                        }
                        className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
                        type="text"
                        placeholder="Jogap"
                    />
                    <select
                        value={jogap?.isTrue}
                        onChange={(e) =>
                            setJogap({ ...jogap, isTrue: e.target.value })
                        }
                        className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
                    >
                        <option value={false}>Nadogry</option>
                        <option value={true}>Dogry</option>
                    </select>
                    <Button
                        onClick={() => {
                            jogapGosh();
                        }}
                        className="mr-[30px]"
                        type="primary"
                        style={{ borderRadius: "7px" }}
                    >
                        Jogap
                    </Button>
                </div>
            </Drawer>
            <Drawer
                width={500}
                placement="right"
                closable={true}
                mask={true}
                maskClosable={true}
                onClose={() => setGosh(false)}
                visible={gosh}
            >
                <select
                    onChange={(e) => {
                        setTazelik({ ...tazelik, BasleshikId: e.target.value });
                    }}
                    placeholder="Basleshik sayla!"
                    className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
                >
                    {basleshikler.map((item) => {
                        return (
                            <option
                                key={"bas" + item.id}
                                value={item.id}
                                className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
                            >
                                {item.name}
                            </option>
                        );
                    })}
                </select>
                <textarea
                    value={tazelik?.sorag}
                    onChange={(e) =>
                        setTazelik({ ...tazelik, sorag: e.target.value })
                    }
                    className="min-h-[100px] p-4 rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
                    type="text"
                    placeholder="sorag"
                />
                <input
                    // value={tazelik?.soragimg}
                    onChange={(e) =>
                        setTazelik({ ...tazelik, soragimg: e.target.files[0] })
                    }
                    className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
                    type="file"
                    placeholder="sorag img"
                />

                <button
                    onClick={() => TazelikGosh()}
                    className={`  bg-blue h-[50px] rounded-[5px] w-full mt-4 text-[18px] font-sans text-white`}
                >
                    Send
                </button>
            </Drawer>

            <div className="w-full h-[50px] p-0 flex justify-between ">
                <h2 className="leading-[50px] ml-[50px] text-sans text-[24px]">
                    Tazelikler
                </h2>
                <Button
                    onClick={() => {
                        setGosh(true);
                    }}
                    className="h-[40px] mt-[10px] mr-[50px] !rounded-[12px]"
                    type="primary"
                >
                    Tazelik Gosh
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
