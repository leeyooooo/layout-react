import styled from "styled-components";
import {useState,} from "react";//
const Button = styled.button`

`;


const OpenButton = () => {
    const [open,setOpen] =useState(false);
    if (open ===true){

    }
    const handlebuttonclick = () => {
        setOpen(true)
    };
    return(
        <button onClick={handlebuttonclick}>open</button>
        
        
    )
  
  
};

export default OpenButton;
