# flask_react_socket.io

![Demo](demo/demo.gif)

### Introduction
- Flask-SocketIO gives Flask applications access to low latency bi-directional communications between the clients and
the server. The client-side application can use any of the SocketIO official clients libraries in Javascript, C++, Java and
Swift, or any compatible client to establish a permanent connection to the server.
- Socket.IO is a library that enables real-time, bidirectional and event-based communication between the browser
and the server.

### Installation

##### Running the backend.
steps : Install all the dependencies
 - ```cd server```
 - ```pip install -r requirements.txt```
 - ```python app.py```
 - ```server running at port:5000```

##### Running the Frontend.
steps:
 - ```cd client```
 - ```npm install``` or ```yarn install```
 - ```npm start``` or ```yarn start```
 - ```server running at port:3000```

#### Libraries used:
Backend:
-  [Flask](https://palletsprojects.com/p/flask/)
-  [Flask-Socket.io](https://github.com/miguelgrinberg/Flask-SocketIO)
-  [Flask-CORS](https://github.com/corydolphin/flask-cors)

Frontend:
-  [React](https://reactjs.org/)
-  [MaterializeCSS](https://materializecss.com/)


***

- Frontend is build using React.
- Backend is build using Flask.

> database connection can be achieved by using any database but I haven't added that part