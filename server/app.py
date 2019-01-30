from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
# For development
cors = CORS(app)

todos = {
	'todoList': [
		{ 'id': 1, 'content': 'Buy some milk' },
		{ 'id': 2, 'content': 'Buy some groceries' },
	]
}

# Route to get all the todos
@app.route('/api/todos', methods=["GET"])
def index():
  return jsonify(todos)

# Route to add a new todo
@app.route('/api/add', methods=["POST"])
def addTodo():
	id = request.get_json().get('id')
	content = request.get_json().get('content')
	newTodo = { 'id': id, 'content': content }
	todos['todoList'].append(newTodo)
	return jsonify({'success': True })

# Route to delete a todo
@app.route('/api/delete', methods=["POST"])
def deleteTodo():
	id = request.get_json().get('id')
	todos['todoList'] = [i for i in todos['todoList'] if (i['id'] != id)]
	return jsonify({ 'success': True })

if __name__ == "__main__":
	app.debug = True
	app.run(host='localhost', port=5000)