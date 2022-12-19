import React ,{ useState, useEffect,createContext} from "react";

export const SebedimContext = createContext();

const SebedimContextProvider = (props)=>{

    let [dil,setDil]=useState();
    useEffect(()=>{
            let dilData = localStorage.getItem("TDYEDil");
        if(dilData){
            setDil(JSON.parse(dilData));
        }else{
            setDil("tm");
        }
    },[])

    const ChangeDil = (event)=>{
        setDil(event);
        localStorage.setItem("TDYEDil",JSON.stringify(event));
    }

    return(
        <SebedimContext.Provider value={{dil,ChangeDil}}>
            {props.children}
        </SebedimContext.Provider>
    );
};
 

export default SebedimContextProvider;