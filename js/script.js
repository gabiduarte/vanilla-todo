var Todo = {
    init: function() {
        var todos = this.getTodos();
        if (todos) {
            this.create.tags(todos);
        } else {
            this.setTodos([]);
        }
    },
    getTodos: function() {
        var todos = localStorage.getItem('todos');
        return JSON.parse(todos);
    },
    setTodos: function(todos) {
        localStorage.setItem('todos', JSON.stringify(todos));
    },
    create: {
        todo: function() {
            var description = document.getElementById('input').value;
            var category = document.getElementById('category').value;
            var todo = {description: description, category: category, isCompleted: false};

            return this.todos(todo);
        },
        todos: function(todo) {
            var todos = Todo.getTodos();
            todos.push(todo);

            return this.tags(todos);
        },
        tags: function(todos) {
            var input = "";
            var tag = "<tr><td><button type='button' class='fa-btn' onclick='Todo.delete.todo(this)'><i class='fa fa-trash-o fa-fw'></i></button><span class='flag flag-";

            todos.forEach(function(e) {
                input += tag + e.category + "'>" + e.category + "</span>"  + e.description + "</td></tr>";
            });

            return Todo.populate(input, todos);
        }
    },
    populate: function(todoTags, todos) {
        this.setTodos(todos);
        document.getElementById('td-input').innerHTML = todoTags;
    },
    delete: {
        todo: function(todo) {
            var todoIndex = todo.parentElement.parentElement.rowIndex;
            var todos = Todo.getTodos();
            todos = todos.filter(item => todos.indexOf(item) !== todoIndex - 1);
            Todo.create.tags(todos);
        },
        all: function() {
            Todo.populate("", []);
        }
    }
}

window.onload = function() {
    Todo.init();
}