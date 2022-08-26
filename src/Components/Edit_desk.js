import React, { useEffect, useState } from 'react'
import { DBcontrol } from './DBcontrol'
import './edit.css'

export default function Edit_desk(props) {
    const [para, setPara] = useState("");
    const [flag, setFlag] = useState(false);
    const [edit, setEdit] = useState(false);
    
    let ob = new DBcontrol();
    let currentIndex = ob.getX()
    let str = "";
    function shoMsg() {
        if (props.index > 0) {
            let status = props.allItems[props.index].status;
            //console.log(status)
            if (status === "Default key") {
                str = ob.decrypt("", props.desc)
                let content = document.querySelector('#msgdecrypt')
                if (content != null) {
                    content.innerHTML = str
                }
            }
            else {
                let str = props.desc;
                let num = document.getElementById('key').value;
                str = ob.decrypt(num, str);
                let content = document.querySelector('#msgdecrypt')
                if (content != null) {
                    content.innerHTML = str
                }
            }

            const fonts = document.querySelectorAll('font');
            if (localStorage.getItem('ScriptDarkMode') == 'ON') {
                fonts.forEach(font => {
                    console.log('red color');
                    if (font.color) {
                        font.color = "#9D0000";
                    }
                });
            }
            else if (localStorage.getItem('ScriptDarkMode') == 'OFF') {
                fonts.forEach(font => {
                    console.log('yellow color');
                    if (font.color) {
                        font.color = "#fdff70";
                    }
                });
            }
        }
    }

    useEffect(() => {
        console.log(document.querySelectorAll('.copyicon'));
        document.querySelectorAll('.copyicon').forEach(elem => {
            let size = 0;
            let color = 0;
            elem.addEventListener('click', () => {
                let command = elem.dataset['element'];
                console.log(command);
                let colorOfPallete = "#fdff70";
                let colorOfFont = "white";
                if (localStorage.getItem('ScriptDarkMode') == 'ON') {
                    colorOfPallete = "#9D0000";
                    colorOfFont = "black";
                }
                if (command == 'foreColor') {
                    if (color == 0) {
                        document.execCommand(command, false, colorOfPallete);
                        elem.style.color = colorOfPallete;
                        color = 1;
                    }
                    else {
                        document.execCommand(command, false, colorOfFont);
                        elem.style.color = colorOfFont;
                        color = 0;
                    }
                }
                else if (command == 'fontSize') {

                    if (size == 0) {
                        document.execCommand(command, false, 5);
                        size = 1;
                    }
                    else {
                        document.execCommand(command, false, 4);
                        size = 0;
                    }
                }
                else
                    document.execCommand(command, false, null);
            })
        })
    }, [])


    function tellStatus() {
        if (props.index > 0) {
            let status = props.allItems[props.index].status;
            if (status === "Default key") {
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
        console.log(ob.getX());
        if (tasks[currentIndex] == null) return
        if (tasks[currentIndex].hasOwnProperty("signature")) {
            if (tasks[currentIndex].signature !== "open") {
                let key = document.getElementById('key').value;
                let copy = ob.decrypt(key, tasks[currentIndex].signature);
                if (copy === "[&Vishvishvaraya;&") {
                    setEdit(true);
                }
                else {
                    alert("Please Enter Correct Password\n\nThis is protected file")
                }
            }
            else
                setEdit(true);
        }
        else {
            setEdit(true)
        }
    }

    function delItm() {
        let tasks = ob.callHH();
        console.log(tasks[props.index].hasOwnProperty("signature"))
        if (tasks[props.index].hasOwnProperty("signature")) {
            if (tasks[props.index].signature !== "open") {
                let key = document.getElementById('key').value;
                let copy = ob.decrypt(key, tasks[props.index].signature);
                if (copy === "[&Vishvishvaraya;&") {
                    if (window.confirm("Are you sure to delete?")) {
                        ob.deleteItem(props.index);
                        props.deltePostOpertn();
                    }
                }
                else {
                    alert("Please Enter Correct Password\n\nThis is protected file")
                }
            }
            else {
                if (window.confirm("Are you sure to delete?")) {
                    ob.deleteItem(props.index);
                    props.deltePostOpertn();
                }
            }
        }
        else {
            if (window.confirm("Are you sure to delete?")) {
                ob.deleteItem(props.index);
                props.deltePostOpertn();
            }
        }
    }

    function editAcomplish() {
        let num = props.index
        let msg = document.getElementById('msgdecrypt').innerHTML;
        let key = document.getElementById('key').value;
        console.log(msg)
        ob.saveChanges(key, msg, props.index);
        setEdit(false);
        props.useForceUpdate()
    }

    return (
        <div className="edit">
            <div className="containsinputs">
                <div className="inputKey">
                    {tellStatus() ? <input type="password" style={{ opacity: "1" }} id="key" placeholder=" Enter key.." onKeyUp={callR} />
                        : <input disabled type="password" style={{ opacity: "0", width: "0" }} id="key" placeholder=" Enter key.." onKeyUp={callR} />}

                    <div className="tools">

                        <div className="copyicon" data-element="bold"><i className="fas fa-bold"></i></div>
                        <div className="copyicon" data-element="italic"><i className="fas fa-italic"></i></div>
                        <div className="copyicon" data-element="underline"><i className="fas fa-underline"></i></div>
                        <div className="copyicon" data-element="fontSize"><i className="fas fa-text-height"></i></div>
                        <div className="copyicon" data-element="foreColor"><i className="fas fa-palette"></i></div>
                        <div className="copyicon" data-element="insertUnorderedList"><i className="fas fa-list-ul"></i></div>
                        {edit ?
                            <div className="copyicon" onClick={editAcomplish}>
                                <i className="fas fa-save" style={{ color: "greenyellow" }}></i>
                            </div>
                            : null}
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
                    {shoMsg()}
                </pre>
            </div>
        </div>
    )
}
