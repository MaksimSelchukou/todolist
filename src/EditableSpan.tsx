import React, {ChangeEvent, useState} from 'react';

type EditableSpanType = {
    title: string
    onChange: (newValue: string) => void
}
export const EditableSpan = React.memo(({title, ...props}: EditableSpanType) => {
    console.log('EditableSpan span is called')

    const [editMode, setEditMode] = useState(false)
    const [newTitle, setNewTitle] = useState('')

    const activateEditMode = () => {
        setEditMode(true)
        setNewTitle(title)

    }
    const activateViewMode = () => {
        setEditMode(false)
    }

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
        props.onChange(newTitle)
    }

    return (
        editMode
            ? <input onChange={onChangeTitleHandler} value={newTitle} onBlur={activateViewMode} autoFocus/> :
            <span onDoubleClick={activateEditMode}>{title}</span>
    );
});

