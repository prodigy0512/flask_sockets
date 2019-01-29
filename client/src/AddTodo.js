import React, { useState } from 'react';

const AddTodo = props => {
	const [content, setContent] = useState('');
	return (
		<div>
			<form
				className='blue lighten-4'
				onSubmit={e => {
					e.preventDefault();
					props.addTodo({ content });
					setContent('')
				}}
			>
				<input
					type='text'
					placeholder='Add New Todo'
					style={{ paddingLeft: '10px' }}
					onChange={e => { setContent(e.target.value) }}
					value={content}
				/>
			</form>
		</div>
	)
}

export default AddTodo;