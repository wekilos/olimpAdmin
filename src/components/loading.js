import React, { useEffect } from "react"; 
import NProgress from "nprogress";
import {LoadingOutlined} from "@ant-design/icons"
import "./loading.css";
 const Loading = () => {
  useEffect(() => {
    NProgress.start();
    NProgress.configure({ showSpinner: false });
    NProgress.set(0.6);
    return () => {
      NProgress.done();
    };
  }, []);

  return <div className="min-h-[100vh] w-full font-[900] text-[56px] pt-[200px] text-center bg-blue text-white">{<LoadingOutlined />} </div>
};

export default Loading;