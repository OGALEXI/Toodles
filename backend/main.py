from flask import request, jsonify
from config import app, db
from models import User, Todo

#GET ALL USERS
@app.route('/users', methods=["GET"])
def get_users():
    users = User.query.all()
    json_users = list(map(lambda x: x.to_json(), users))
    return jsonify({ "users": json_users }), 200

#LOGIN
@app.route('/login', methods=["POST"])
def login():
    email = request.json.get('email')
    password = request.json.get('password')

    user = User.query.filter(User.email == email).first()

    if not user:
        return jsonify({ "message": "User not found." }), 404
    
    if user and not user.check_password(password):
        return jsonify({ "message": "Password is incorrect."}), 400
    
    return user.to_json(), 200


#CREATE NEW USER
@app.route('/new-user', methods=["POST"])
def create_user():
    first_name = request.json.get('firstName')
    last_name = request.json.get('lastName')
    email = request.json.get('email')
    password = request.json.get('password')

    if not first_name or not last_name or not email or not password:
        return (
            jsonify({ "message": "You must fill out all fields." }),
            400,
        )
    
    new_user = User(first_name=first_name, last_name=last_name, email=email, password=password)

    try:
        db.session.add(new_user)
        db.session.commit()
    except Exception as e:
        return jsonify({ "message": str(e) }), 500
    
    return jsonify({ "message": "User successfully created. "}), 201

#GET USERS TODOS
@app.route('/todos/<int:user_id>', methods=["GET"])
def get_user_todos(user_id):
    todos = Todo.query.filter(
        Todo.user_id == user_id
    ).all()
    json_todos = list(map(lambda x: x.to_json(), todos))

    return jsonify({'todos': json_todos}), 200

#GET COMPLETED TODOS
@app.route('/completed/<int:user_id>', methods=["GET"])
def get_completed_todos(user_id):
    completed_todos = Todo.query.filter(
        Todo.user_id == user_id
    ).filter(Todo.completed == True).all()

    json_todos = list(map(lambda x: x.to_json(), completed_todos))

    return json_todos, 200

#GET UPCOMING TODOS
@app.route('/upcoming/<int:user_id>', methods=["GET"])
def get_upcoming_todos(user_id):
    upcoming_todos = Todo.query.filter(
        Todo.user_id == user_id
    ).filter(Todo.completed == False).all()

    json_todos = list(map(lambda x: x.to_json(), upcoming_todos))

    return json_todos, 200

#CREATE NEW _TODO
@app.route('/new-todo/<int:user_id>', methods=["POST"])
def create_todo(user_id):
    title = request.json.get('title')
    description = request.json.get('description')
    date_due = request.json.get('dateDue')

    if not title or not description or not date_due:
        return ({
            jsonify({ "message": "You must fill out all fields." }), 400
        })

    new_todo = Todo(title=title, description=description, date_due=date_due, user_id=user_id)

    try:
        db.session.add(new_todo)
        db.session.commit()
    except Exception as e:
        return jsonify({ "message": str(e) }), 500
    
    return jsonify({ "message": new_todo.to_json() }), 201

#TOGGLE COMPLETE
@app.route('/toggle-complete/<int:todo_id>', methods=["POST"])
def complete_todo(todo_id):
    todo = Todo.query.get(todo_id)

    if not todo:
        return jsonify({ "message": "Todo not found." }), 404
    
    todo.completed = not todo.completed

    db.session.commit()
    return jsonify({ "Completed state": todo.completed})
    



if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    
    app.run(port=8000, debug=True)