import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {TextField} from "@mui/material";



type AddItemFormType={
    todolistID:string
    addItem: (valueTask: string) => void
}


export const AddItemForm = (props:AddItemFormType) => {

    let [error, setError] = useState<string | null>(null)
    const [valueInput, setValueInput] = useState('')

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setError('')
        setValueInput(event.currentTarget.value)
    }

    const addTaskHandler = () => {
        if (valueInput.trim() !== "") {
            props.addItem(valueInput)
            setValueInput('')
        } else {
            setError('Ошибка')
        }
    }
    const enterAddHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            if (valueInput.trim() !== "") {
                props.addItem(valueInput)
                setValueInput('')
            } else {
                setError('Ошибка')
            }
        }
    }

    return (
        <div>
            {/*<input onKeyPress={enterAddHandler} value={valueInput} onChange={onChangeInputHandler}*/}
            {/*       className={error ? "error" : ""}/>*/}
            <TextField size={"medium"} autoComplete={"off"} error={!!error} onKeyPress={enterAddHandler} value={valueInput} onChange={onChangeInputHandler}
                   className={error ? "error" : ""}/>
            <IconButton size="large" onClick={addTaskHandler}>+</IconButton>
            {/*<button onClick={addTaskHandler}>+</button>*/}
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

