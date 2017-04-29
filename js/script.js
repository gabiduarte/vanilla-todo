var Todo = {
    init: function() {
        var todos = this.getFromLocalStorage('todos');
        
        if (todos) {
            return todos;
        } else {
            this.setToLocalStorage('todos', []);
        }
    },
    getFromLocalStorage: function(item) {
        return localStorage.getItem(item);
    },
    setToLocalStorage: function(string, items) {
        localStorage.setItem(string, JSON.stringify(items));
    },

    create: {
        todo: function(input) {
            return {
                description: input,
                category: 'Personal'
            }
        }
    },

    newTodo: function(newTodo) {
        var todo = this.create.todo(newTodo);
        var todos = JSON.parse(this.getFromLocalStorage('todos'));

        todos.push(todo);
        this.setToLocalStorage('todos', todos);
    },

    delete: {
        all: function() {
            Todo.setToLocalStorage('todos', []);
        },

        todo: function(todo) {
            var todos = JSON.parse(Todo.getFromLocalStorage('todos'));
            todos.forEach(function(item, index) {
                if (item.description == todo.description) {
                    return todos.splice(index, 1);
                }
            });

            Todo.setToLocalStorage('todos', todos);
        }
    }
}