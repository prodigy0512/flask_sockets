import React, { Component } from 'react';
import socketIOClient from "socket.io-client";
import Todos from './Todos';
import AddTodo from './AddTodo';

class App extends Component {

  state = {
    todos: [],
  }

  componentDidMount = () => {
    // For development on parallel servers
    this.socket = socketIOClient("http://localhost:5000");
    // For production after running npm run build
    // this.socket = socketIOClient("/");
    this.socket.on('connect', () => console.log('Connected to server'));
    // Recieving all todos from the server and adding them to the state
    this.socket.on('getAllTodos', todos => this.setState({
      todos
    }));
    // Adding a new todo which has been sent by the server to the state
    this.socket.on('addTodo', newTodo => {
      let todos = [...this.state.todos, newTodo];
      this.setState({
        todos
      });
    });
    // Delete a todo from state by filtering using the todo's id
    this.socket.on('deleteTodo', id => {
      const todos = this.state.todos.filter(todo => {
        return todo.id !== id
      });
      this.setState({
        todos
      });
    });
    this.socket.on('disconnect', () => console.log('disconnect'));
  }

  addTodo = todo => {
    // To get a random id from 1 to 100
    todo.id = Math.floor((Math.random() * 100) + 1);
    // Emiting event with new todo to let server know we want to add it
    this.socket.emit('newTodo', todo)
  }

  deleteTodo = id => {
    // Emiting event with todo id which has to deleted by server
    this.socket.emit('removeTodo', { id })
  }

  render() {
    return (
      <div className="App container" >
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