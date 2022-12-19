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
  const [payBefore,setPayBefore] = useState("");
  const [payBeforeType,setPayBeforeType] = useState("");
  useEffect(()=>{
    getData();
  },[])

  const getData = ()=>{
    axiosInstance.get("/api/user/all?active=true").then((data)=>{
      console.log(data.data);
      setData(data.data);
    }).catch((err)=>{
      console.log(err);
    });

  }


  const columns = [
    {
      title: 'A.A.Familyasy',
      dataIndex: 'fname',
      
    },
    {
      title: 'Edara ady',
      dataIndex: 'name',
      render:(text,record)=>(
        <div>
          {record?.companyName}
        </div>
      )
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Telefon',
      dataIndex: 'phoneNumber',
    },
   
    {
      title: 'Action',
      render: (text,record) => <>
      {/* <Popconfirm placement="top" title={"Are you sure"} onConfirm={handleConfirm} okText="Yes" cancelText="No">  */}
                        {/* <Button onClick={()=>{setOpenChange(true);setOrder(record)}} type="primary" style={{borderRadius: "7px"}}>Maglumat</Button> */}
                    {/* </Popconfirm> */}
                    <Popconfirm placement="top" title={"Are you sure"} onConfirm={()=>Reject(record.id)} okText="Yes" cancelText="No"> 
                        <Button type="danger" style={{borderRadius: "7px", marginLeft: "10px"}}>Dis Active</Button>
                    </Popconfirm>
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
            <p className='mb-0 mt-0'>Code: {order?.code}</p>
            <p className='mt-0 mb-0'>payBefore: {order?.payBefore} {order?.payBeforeType}</p>
            <p className='mt-0 mb-0'>Payment: {order?.payment} {order?.peymentType}</p>
            <p className={`${order?.payment-order?.payBefore>0? "text-[#ff2a2a]":"text-[#27AE60] "} `}>Balance: {order?.payment-order?.payBefore} {order?.peymentType}</p>
            <h2 className='font-[700]'>Files:</h2>
             {order?.OrderDocs?.map((item)=>{
              console.log(BASE_URL+item.fileName);
              return <div style={{width:"100%",display:"flex"}}>
                 <a href={BASE_URL+"/"+item.fileName} target="_blank"> <img style={{marginRight:"10px",objectFit:"contain",height:"50px"}} src={file} alt="file"/></a>
                  <p style={{lineHeight:"50px"}}>{item.title}</p>
                </div>
             })}
          
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