import React from 'react';

const Todos = ({ todos, deleteTodo }) => {
	const todoList = todos.length ? (
		todos.map(todo => {
			return (
				<div
					className="collection-item blue lighten-4"
					key={todo.id}
					onClick={() => { deleteTodo(todo.id) }}
				>
					<span>
						{todo.content}
					</span>
				</div>
			)
		})
	) : (
			<p className="center">You have no todo's left, yay!!!</p>
		)
	return (
		<div className="todos collection">
			{todoList}
		</div>
	)
}

export default Todos;