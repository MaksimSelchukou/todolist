import React, {ChangeEvent} from 'react';
import {Button, Checkbox} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskType} from "./App";


type taskType ={
    t:TaskType
    onClickDeleteTaskHandler:(taskID: string, todolistID: string)=>void
    todolistID:string
    onChangeStatusHandler:(taskID: string,event: ChangeEvent<HTMLInputElement>)=>void
    changeTitleTaskHandler:(newValue: string,taskID:string)=>void
}


export const Task = React.memo (({t,changeTitleTaskHandler,onClickDeleteTaskHandler,onChangeStatusHandler,...props}:taskType) => {
    return (
        <li key={t.id} className={t.isDone ? "is-done" : ""}>
            <Checkbox onChange={(e) => onChangeStatusHandler(t.id, e)} checked={t.isDone}/>
            {/*<span>{t.title}</span>*/}
            <EditableSpan onChange={(newValue)=>changeTitleTaskHandler(newValue,t.id)} title={t.title}/>
            <Button size={'small'} onClick={() => onClickDeleteTaskHandler(t.id, props.todolistID)}><Delete/></Button>
        </li>
    );
});
