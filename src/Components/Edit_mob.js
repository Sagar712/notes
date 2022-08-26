import React, { useEffect, useState } from 'react'
import { DBcontrol } from './DBcontrol'
import './edit.css'

export default function Edit_mob(props) {
    const [para, setPara] = useState("");
    const [flag, setFlag] = useState(false);
    const [edit, setEdit] = useState(false);
    let ob = new DBcontrol();
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
                    if (font.color) {
                        font.color = "#9D0000";
                    }
                });
            }
            else if (localStorage.getItem('ScriptDarkMode') == 'OFF') {
                fonts.forEach(font => {
                    if (font.color) {
                        font.color = "#fdff70";
                    }
                });
            }
        }
    }


    function returnName() {
        if (props.index > 0)
            return props.allItems[props.index].title;
        return ""
    }
    function callR() {
        setFlag(true)
        setPara(shoMsg())
        let tasks = ob.callHH();
        let key = document.getElementById('key').value;
        let copy = ob.decrypt(key, tasks[props.index].signature);
        if (copy === "[&Vishvishvaraya;&") {
            document.querySelector('.opacitor').classList.remove('show')
            document.querySelector('.passwd').classList.remove('show')
            document.getElementById('key').blur()
        }
        else {
            document.querySelector('.opacitor').classList.add('show')
            document.querySelector('.passwd').classList.add('show')
        }
        setFlag(false)
    }


    function changeEditMode() {
        let tasks = ob.callHH();
        if (tasks[props.index] == null) return
        if (tasks[props.index].hasOwnProperty("signature")) {
            if (tasks[props.index].signature !== "open") {
                let key = document.getElementById('key').value;
                let copy = ob.decrypt(key, tasks[props.index].signature);
                if (copy === "[&Vishvishvaraya;&") {
                    document.getElementById('msgdecrypt').focus()
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
    function tellStatus() {
        if (props.index > 0) {
            let status = props.allItems[props.index].status;
            if (status === "Default Key") {
                str = ob.decrypt("", props.desc)
                return false;
            }
            else if (status === "Unique Key") {
                let tasks = ob.callHH();
                let key = document.getElementById('key').value;
                let copy = ob.decrypt(key, tasks[props.index].signature);
                console.log(copy);
                if (copy === "[&Vishvishvaraya;&")
                    return false
                else
                    return true;
            }
        }
        return false;
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
                        window.history.back();
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
                    window.history.back();
                }
            }
        }
        else {
            if (window.confirm("Are you sure to delete?")) {
                ob.deleteItem(props.index);
                props.deltePostOpertn();
                window.history.back();
            }
        }
    }


    function editAcomplish() {
        let msg = document.getElementById('msgdecrypt').innerHTML;
        let key = document.getElementById('key').value;
        console.log(msg)
        ob.saveChanges(key, msg, props.index);
        setEdit(false);
        props.useForceUpdate()
    }

    function SaveChanges() {
        let msg = document.getElementById('msgdecrypt').innerHTML;
        let key = document.getElementById('key').value;
        console.log(msg)
        ob.saveChanges(key, msg, props.index);
    }

    useEffect(() => {
        document.querySelectorAll('.copyicon').forEach(elem => {
            let size = 0;
            let color = 0;
            elem.addEventListener('click', () => {
                document.getElementById('msgdecrypt').focus()
                let command = elem.dataset['element'];
                console.log(command);
                let colorOfPallete = "#fdff70";
                let colorOfFont = "white";
                console.log(localStorage.getItem('ScriptDarkMode'));
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
    }, [edit])

    return (
        <div className="edit">
            <div className="closebutton" >
                <p className="filenameDisplay2">{returnName()}</p>
                <button onClick={() => window.history.back()}> {"< "} Back</button>
            </div>

            <div className="decryptedMsg" >
                <pre id="msgdecrypt" contentEditable={edit ? true : false} onKeyUp={SaveChanges}>
                    {flag ? para : shoMsg()}
                </pre>
            </div>

            <div className="containsinputs">
                <div className="inputKey">
                    <div className={tellStatus() ? "opacitor show" : "opacitor"}></div>
                    <div className={tellStatus() ? "passwd show" : "passwd"}>
                        <input type="number" id="key" placeholder=" Enter key.." onKeyUp={callR} />
                    </div>

                    <div className="tools">

                        {edit ?
                            <>
                                <div className="copyicon" data-element="bold"><i className="fas fa-bold"></i></div>
                                <div className="copyicon" data-element="italic"><i className="fas fa-italic"></i></div>
                                <div className="copyicon" data-element="underline"><i className="fas fa-underline"></i></div>
                                <div className="copyicon" data-element="fontSize"><i className="fas fa-text-height"></i></div>
                                <div className="copyicon" data-element="foreColor"><i className="fas fa-palette"></i></div>
                                <div className="copyicon" data-element="insertUnorderedList"><i className="fas fa-list-ul"></i></div>
                                <div className="copyicon" onClick={editAcomplish}>
                                    <i className="fas fa-save" style={{ color: "greenyellow" }}></i>
                                </div>
                            </>
                            : null}
                        {!edit ?
                            <>
                                <div className="delicon" onClick={delItm}>
                                    <i className="far fa-trash-alt"></i>
                                </div>
                                <div className="edticon" onClick={changeEditMode}>
                                    <i className="fas fa-pen"></i>
                                </div>

                            </>
                            : null}

                    </div>
                </div>
            </div>

        </div>
    )
}
