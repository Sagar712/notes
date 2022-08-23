import React from 'react'
import { DBcontrol } from './DBcontrol'
import './OneItem.css'

export default function OneItem(props) {
    let obj = new DBcontrol();
    function modifyY() {
        if(window.innerWidth<=1110)
        window.history.pushState(null, null, null);
        obj.modify(props.index);
        console.log(obj.getX());
        props.useForceUpdate();
        let i=1;
        document.querySelectorAll('.sample').forEach(sample => {
            const aa = document.querySelector(':root')
            const styleVAr = getComputedStyle(aa)
            if(window.innerWidth>1109){
                if(props.index === i){
                    sample.style.background = "#9e9e9e";
                }
                else{
                    sample.style.background = styleVAr.getPropertyValue('--item-back');
                }   
            }
            i++;
        })
        document.querySelector('.edit').classList.toggle('active')
        if(props.status === "Unique Key" && document.getElementById('key').value==="")
            document.getElementById('key').focus();
    }
    
    function handleIcon() {
        const style = window.getComputedStyle(document.documentElement)
        let green = style.getPropertyValue('--green-flag')
        let yellow = style.getPropertyValue('--yellow-flag')

        if(props.status === "Unique Key")
            return <i style={{border: `2px solid ${green}`}} id="statusIcon" className="fas fa-lock" ></i>
        else
            return <i style={{border: `2px solid ${yellow}`}} id="statusIcon" className="fas fa-lock-open" ></i>
    }
    return (
        <div className="sample" onClick={modifyY}>
            <div className="status">
                {handleIcon()}
            </div>
            <div className="contentContainer" >
                <h2>{props.line}</h2>
            </div>
        </div>
    )
}
