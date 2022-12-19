import React from "react";
import { useRef, useState } from "react";
import { VscChromeClose } from "react-icons/vsc";
import { HiOutlineCloudUpload } from "react-icons/hi";
import { ImageConfig } from "./ImageConfig";
import PropTypes from "prop-types";

const DropFileInput = (props) => {
  const wrapperRef = useRef(null);
  const [fileList, setFileList] = useState([]);
  const onDragEnter = () => wrapperRef.current.classList.add("dragover");
  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");
  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  const onFileDrop = (e) => {
    const newFile = e.target.files[0];
    console.log("newFile",newFile)
    if (newFile) {
      const updatedList = [...fileList, newFile];
      setFileList(updatedList);
      props.onFileChange(updatedList);
    }
  };

  const fileRemove = (file) => {
    const updatedList = [...fileList];
    updatedList.splice(fileList.indexOf(file), 1);
    setFileList(updatedList);
    props.onFileChange(updatedList);
  };

  return (
    <>
      <div
        ref={wrapperRef}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className="w-full shadow-[0_0_6px_0_rgba(23,23,23,0.1)] text-[#b0adad] outline-none p-3 rounded-md h-52 border-dashed border-[#b0adad] hover:border-blue border-2 flex justify-center flex-col items-center hover:text-blue my-auto relative"
      >
        <HiOutlineCloudUpload size={100} />
        <span className="  w-1/2 mx-auto  mt-6">
          Информация, которую вы хотите добавить, должна быть представлена
          ​​следующими способами: PNG, PDF, WORD
        </span>
        <input
          type="file"
          value=""
          // onClick={onFileDrop}
          onChange={onFileDrop}
          className="absolute opacity-0 w-full h-full cursor-pointer"
        />
      </div>
      {fileList.length > 0 ? (
        <div className="mt-12 w-full">
          {fileList.map((item, index, size) => (
            <div key={index}>
              <div className="relative flex mb-2.5 bg-gray/10 p-4 rounded-xl w-full justify-between">
                <div className="flex">
                  <img
                    src={
                      ImageConfig[item.type.split("/")[1]] ||
                      ImageConfig["default"]
                    }
                    alt=""
                    width={50}
                    height={50}
                  />
                  <div className="ml-6">
                    <p>{item.name}</p>
                    <span className="flex">
                      <p>{item.size}&nbsp;b</p>
                    </span>
                  </div>
                </div>
                <div className="flex">
                  <span
                    className="my-auto cursor-pointer"
                    onClick={() => fileRemove(item)}
                  >
                    <VscChromeClose />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
};
DropFileInput.propTypes = {
  onFileChange: PropTypes.func,
};
export default DropFileInput;