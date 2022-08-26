import React from 'react'
import { DBcontrol } from './DBcontrol';
import './items.css'
import OneItem from './OneItem';

export default function Items_mob(props) {
    let obj = new DBcontrol();
    let allTasks = obj.callHH();
    let Str=[];
    let i=1;
    
    while(allTasks[i]!=null){
        Str.push(<OneItem line={allTasks[i].title} status={allTasks[i].status} key = {i} index = {i} useForceUpdate = {props.useForceUpdate}/>);
        i++;
    }

    return (
        <div className="item">
            {Str.map(comp=> comp)}
        </div>
    );
}
