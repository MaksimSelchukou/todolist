import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import IconButton from '@mui/material/IconButton';
import {TextField} from "@mui/material";


type AddItemFormType = {
    addItem: (valueTask: string) => void
}


export const AddItemForm = React.memo ((props: AddItemFormType) => {
    console.log('Add item form is called')

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
                setError('Введите корректный список дел')
            }
        }
    }

    return (
        <div>

            <TextField size={"medium"} autoComplete={"off"} error={!!error} onKeyPress={enterAddHandler}
                       value={valueInput} onChange={onChangeInputHandler}
                       className={error ? "error" : ""}/>
            <IconButton size="large" onClick={addTaskHandler}>+</IconButton>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
});

