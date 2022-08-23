import React from 'react'
import { DBcontrol } from './DBcontrol';
import './popupAdd.css'

export default function PopupAdd(props) {
    console.log("Pop UP HEREE");
    let obj = new DBcontrol();
    function addItem() {
        let title = document.getElementById('title').value;
        let key = document.getElementById('key2').value;
        console.log(key);
        let descrptn = document.getElementById('description2').value;
        obj.addItem(title, key, descrptn);
        window.history.back();
    }
    return (
        <>
            <div className="popupTask">
                <div className="taskTitle">
                    <input type="text" id="title" placeholder=" Title..." />
                </div>

                <div className="taskTitle">
                    <input type="number" id="key2" autoComplete="off" placeholder=" Enter key eg. 12345 or keep blank" />
                </div>

                <div className="description">
                    <textarea id="description2" rows="5" placeholder=" Description...."></textarea>
                </div>
                <div className="finalbtns">
                    <button onClick={addItem}>Save</button>
                </div>

            </div>
            <div className="bigContainer" onClick={() => {window.history.back()}}></div>
        </>

    )
}
