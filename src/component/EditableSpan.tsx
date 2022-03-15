import React, { ChangeEvent, useState } from 'react';

type propsType = {
	oldTitle: string
	callback: (title: string) => void
}

export const EditableSpan = (props: propsType) => {

	let [edit, setEdit] = useState(false)
	let [newtitle, setNewTitle] = useState(props.oldTitle)


	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setNewTitle(e.currentTarget.value)
	}
	const onDoubleClickHandler = () => {
		setEdit(true)
	}
	const onBlurHandler = () => {
		props.callback(newtitle)
		setEdit(false)
	}
	return (
		edit
			? <input value={newtitle} onChange={onChangeHandler} autoFocus onBlur={onBlurHandler} />
			: <span onDoubleClick={onDoubleClickHandler}  >{props.oldTitle}</span>
	)
}