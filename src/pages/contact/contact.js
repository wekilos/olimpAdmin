import { Popconfirm, Table, Button, message,Drawer } from 'antd';
import React, { useEffect, useState } from 'react';
import { axiosInstance,BASE_URL } from '../../utils/axiosIntance';
import file from "../../img/file.png";  
import { useHistory } from 'react-router-dom';

 
const handleReject = () => {
  message.success("Request Rejected!")
}






const Orders = () => {
  const history = useHistory();
  const [data,setData] = useState([]);
  const [openChange,setOpenChange] = useState(false);
  const [order,setOrder] = useState({});
  const [files,setFiles] = useState([]);
  const [active,setActive] = useState(false); 
  const [jogap,setJogap] = useState(false); 
  const [text,setText] = useState("");
  const [subject,setSubject] = useState('');
  const [messageId,setMessageId ] = useState();

  useEffect(()=>{
    getData();
  },[])

  const getData = ()=>{
    axiosInstance.get("/api/contact/all?came=true").then((data)=>{
      console.log(data.data);
      setData(data.data);
    }).catch((err)=>{
      console.log(err);
    });

  }


  const columns = [
    {
      title: 'Tema',
      dataIndex: 'subject',
      
    },
    {
      title: 'Text',
      dataIndex: 'text',
      
    },
    {
        title: 'Ady',
        dataIndex: 'name'
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    
   
    {
      title: 'Action',
      render: (text,record) => <>
      {/* <Popconfirm placement="top" title={"Are you sure"} onConfirm={handleConfirm} okText="Yes" cancelText="No">  */}
                        <Button onClick={()=>{setOpenChange(true);setOrder(record)}} type="primary" style={{borderRadius: "7px"}}>Maglumat</Button>
                    {/* </Popconfirm> */}
                    {/* <Popconfirm placement="top" title={"Are you sure"} onConfirm={()=>Reject(record.id)} okText="Yes" cancelText="No">  */}
                        <Button onClick={()=>{setJogap(true);setMessageId(record.id)}} type="primary" style={{borderRadius: "7px", marginLeft: "10px"}}>Jogap</Button>
                    {/* </Popconfirm> */}
                    </>
    }
  ];


  const Reject = (id)=>{
    axiosInstance.patch("/api/user/disActive/"+id).then((data)=>{
      message.success("Dis Aktiwe Edildi!");
      getData()
    }).catch((err)=>{
      console.log(err);
      message.warn("Gaytadan Barlan!")
    })
  }
  
  const SendResponse = ()=>{
    console.log(messageId,subject,text);
    if(subject.length>0 && text.length>0 ){
        axiosInstance.post("/api/contact/response",{
            subject:subject,
            text:text,
            messageId:messageId
        }).then((data)=>{
            message.success("Jogap berildi!");
            setJogap(false);
        }).catch((err)=>{
            console.log(err);
            message.warn("Gaytadan Barlan!")
        })
    }else{
        message.warn("Maglumatlary doly Girizin!")
    }
  }

  

  return (
    <>
    <Drawer
      width={500}
      placement="right"
      closable={true}
      mask={true}
      maskClosable={true}
      onClose={()=>setOpenChange(false)}
      visible={openChange}>
          <div>
            <h2 className='mb-0 font-[700]'>Maglumat:</h2>
            <p className='mb-0 mt-0'>Wagty: {order?.createdAt}</p>
            <p className='mb-0 mt-0'>Tema: {order?.subject}</p>
            <p className='mt-0 mb-0'>Text: {order?.text}</p>
            <p className='mt-0 '>Ady: {order?.name}</p>
            <p className='mt-0 mb-0'>Ulanyjy Ady: {order?.User?.fname}</p>
            <p className='mt-0 mb-0'>Email: {order?.email}</p>
            <p className='mt-0 mb-0'>Telefon: {order?.User?.phoneNumber}</p>
            <p className='mt-0 mb-0'>Edara Ady: {order?.User?.companyName}</p>
            
          
          </div>
    </Drawer>
    <Drawer
      width={500}
      placement="right"
      closable={true}
      mask={true}
      maskClosable={true}
      onClose={()=>setJogap(false)}
      visible={jogap}>
        <div className='w-full'>
                <div className="flex justify-start flex-wrap mt-[20px]">
                    <span className="font-sans md:text-[16px] text-[14px] font-bold mb-[10px] text-[#272D3E] w-full text-left"  >Tema</span> <br />
                    <input onClick={(e)=>setSubject(e.target.value)} className="font-sans border-[1px] border-[#E3E7EE] text-[16px] text-[#999999] pl-[15px] bg-[#F2F6FF] rounded-[6px] h-[50px] md:w-[90%] w-full text-left" type="text" name="name" placeholder="Subject" />
                </div> 
                <div className="flex justify-start flex-wrap mt-[20px]">
                    <span className="font-sans md:text-[16px] text-[14px] font-bold mb-[10px] text-[#272D3E] w-full text-left"  >Habar</span> <br />
                    <textarea onClick={(e)=>setText(e.target.value)}  rows={10} cols={50} className="font-sans border-[1px] border-[#E3E7EE] text-[16px] text-[#999999] pl-[15px] bg-[#F2F6FF] rounded-[6px] pt-[10px] h-[150px] md:w-[90%] w-full text-left" type="text" name="name" placeholder="Message" />
                </div> 
                <div className="flex justify-start   mt-[20px]">
                    <button onClick={()=>SendResponse()} className="font-sans md:text-[18px] text-[16px] h-[50px] md:w-[90%] w-full bg-blue text-[#fff] rounded-[5px]">Ugrat</button>
                </div>
        </div>
      </Drawer>
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
  )
};

export default Orders;