import React, { useState } from 'react'
import { DBcontrol } from './DBcontrol'
import './edit.css'

export default function Edit_desk(props) {
    const [para, setPara] = useState("");
    const [flag, setFlag] = useState(false);
    const [edit, setEdit] = useState(false);
    let ob =   new DBcontrol();
    let str = "";
    function shoMsg() {
        if(props.index>0){
            let status = props.allItems[props.index].status;
            //console.log(status)
            if(status === "Default key"){
                str = ob.decrypt("", props.desc)
                return str;
                
            } 
            else{
                let str = props.desc;
                let num = document.getElementById('key').value;
                str = ob.decrypt(num, str);
                return str
            }
        }
       return str;
    }
    function tellStatus() {
        if(props.index>0){
            let status = props.allItems[props.index].status;
            if(status === "Default key"){
                str = ob.decrypt("", props.desc)
                return false;
            }
            return true;
        }
        return false;
    }
    
    function callR() {
        setFlag(true)
        setPara(shoMsg())
        setFlag(false)
    }

    function changeEditMode() {
        let tasks = ob.callHH();
        if(tasks[props.index].hasOwnProperty("signature")){
            if(tasks[props.index].signature!=="open"){
                let key = document.getElementById('key').value;
                let copy = ob.decrypt(key, tasks[props.index].signature);
                if(copy === "[&Vishvishvaraya;&"){
                    setEdit(true);
                }
                else{
                    alert("Please Enter Correct Password\n\nThis is protected file")
                }
            }
            else
                setEdit(true);
        }
        else{
            setEdit(true)
        }
    }

    function delItm() {
        let tasks = ob.callHH();
        console.log(tasks[props.index].hasOwnProperty("signature"))
        if(tasks[props.index].hasOwnProperty("signature")){
            if(tasks[props.index].signature!=="open"){
                let key = document.getElementById('key').value;
                let copy = ob.decrypt(key, tasks[props.index].signature);
                if(copy === "[&Vishvishvaraya;&"){
                    if(window.confirm("Are you sure to delete?")){
                        ob.deleteItem(props.index);
                        props.deltePostOpertn();
                    }
                }
                else{
                    alert("Please Enter Correct Password\n\nThis is protected file")
                }
            }
            else{
                if(window.confirm("Are you sure to delete?")){
                    ob.deleteItem(props.index);
                    props.deltePostOpertn();
                }
            }
        }
        else{
            if(window.confirm("Are you sure to delete?")){
                ob.deleteItem(props.index);
                props.deltePostOpertn();
            }
        }
    }

    function editAcomplish() {
        let msg = document.getElementById('msgdecrypt').innerText;
        let key = document.getElementById('key').value;
        console.log(msg)
        ob.saveChanges(key, msg, props.index);
        setEdit(false);
    }

    return (
        <div className="edit">
            <div className="containsinputs">
                <div className="inputKey">
                    {tellStatus() ? <input type="password" style={{opacity:"1"}} id="key" placeholder=" Enter key.." onKeyUp={callR} /> 
                    : <input disabled type="password" style={{opacity:"0", width:"0"}} id="key" placeholder=" Enter key.." onKeyUp={callR} /> }

                    

                    <div className="tools">
                        {edit ? 
                            <div className="copyicon" onClick={editAcomplish}>
                                <i className="fas fa-save" style={{color:"greenyellow"}}></i>
                            </div> 
                        : null}
                        <div className="copyicon" >
                            <i className="fas fa-clipboard"></i>
                        </div>
                        <div className="edticon" onClick={changeEditMode}>
                            <i className="fas fa-pen"></i>
                        </div>
                        <div className="delicon" onClick={delItm}>
                            <i className="far fa-trash-alt"></i>
                        </div>
                    </div>
                </div>	
            </div>
            
            <div className="decryptedMsg" >
                <pre id="msgdecrypt" contentEditable={edit ? true : false}>
                    {flag ? para : shoMsg()}
                </pre>
            </div>
        </div>
    )
}
