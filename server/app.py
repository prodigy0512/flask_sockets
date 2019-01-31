from flask import Flask, jsonify, request, render_template
from flask_socketio import SocketIO, emit
from flask_cors import CORS

# after npm run build paste the build folder inside server folder
app = Flask(__name__, static_folder='./build/static',
            template_folder='./build')
app.config['SECRET_KEY'] = 'mysecretkeylmao'
# For development
cors = CORS(app)
socketio = SocketIO(app)

# dummy data that can be made dynamic by connection to any database of your choice
# like MongoDb, MySQL, PostgreSQL etc
todos = {
	'todoList': [
		{ 'id': 1, 'content': 'Buy some milk' },
		{ 'id': 2, 'content': 'Buy some groceries' },
	]
}

# routes to render frontend after creating build version
# @app.route('/', defaults={'path': ''}, methods=['GET'])
# @app.route('/<path:path>', methods=['GET'])
# def index(path):
#     return render_template('index.html')

# to notify and for sending all todos to new client as soon as they are connected
@socketio.on('connect')
def onConnection():
	print('Connected')
	emit('getAllTodos', todos['todoList'], broadcast=False)

# send new todo data to all clients after adding it to local todoList
@socketio.on('newTodo')
def newTodo(newTodo):
	todos['todoList'].append(newTodo)
	emit('addTodo', newTodo, broadcast=True)

# sent todo id to be deleted after deleting from local todoList
@socketio.on('removeTodo')
def removeTodo(id):
	todos['todoList'] = [i for i in todos['todoList'] if (i['id'] != id['id'])]
	emit('deleteTodo', id['id'], broadcast=True)

# to notify on disconnect
@socketio.on('disconnect')
def onDisconnect():
	print('Disconnected')

if __name__ == "__main__":
	socketio.run(app, host='localhost', port=5000)