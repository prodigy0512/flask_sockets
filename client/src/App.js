import React, { Component } from 'react';
import Todos from './Todos';
import AddTodo from './AddTodo';

class App extends Component {

  state = {
    todos: [],
  }

  componentDidMount = () => {
    fetch('http://localhost:5000/api/todos')
      .then(res => res.json())
      .then(res => this.setState({
        todos: res.todoList,
      }))
      .catch(console.log)
  }

  deleteTodo = id => {
    fetch("http://localhost:5000/api/delete", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      body: JSON.stringify({ id })
    })
      .then(res => res.json())
      .then(console.log)
      .then(() => {
        const todos = this.state.todos.filter(todo => {
          return todo.id !== id
        });
        this.setState({
          todos
        });
      })
      .catch(console.log)
  }

  addTodo = todo => {
    // To get a random id from 1 to 100
    todo.id = Math.floor((Math.random() * 100) + 1)
    fetch("http://localhost:5000/api/add", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      body: JSON.stringify(todo)
    })
      .then(res => res.json())
      .then(console.log)
      .then(() => {
        let todos = [...this.state.todos, todo];
        this.setState({
          todos
        });
      })
      .catch(console.log)
  }

  render() {
    return (
      <div className="App container">
        <div className="container">
          <h1 className="center grey-text text-darken-4">Todo's</h1>
          <Todos todos={this.state.todos} deleteTodo={this.deleteTodo} />
          <AddTodo addTodo={this.addTodo} />
        </div>
      </div>
    )
  }

}

export default App; 