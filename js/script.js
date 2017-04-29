var Todo = {
	init: function() {
		return this.getFromLocalStorage('todos') || this.setToLocalStorage('todos', []);
	},

	getFromLocalStorage: function(item) {
		var localStorageItem = localStorage.getItem(item);
		return localStorageItem ? JSON.parse(localStorageItem) : null;
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

	newTodo: function(description) {
		var todo = this.create.todo(description);
		var todos = this.getFromLocalStorage('todos');

		todos.push(todo);
		this.setToLocalStorage('todos', todos);
	},

	delete: {
		all: function() {
			Todo.setToLocalStorage('todos', []);
		},

		todo: function(todo) {
			var todos = Todo.getFromLocalStorage('todos');
			todos.forEach(function(item, index) {
				if (item.description == todo.description) {
					return todos.splice(index, 1);
				}
			});

			Todo.setToLocalStorage('todos', todos);
		}
	},

	generateHTML: function() {
		var todos = this.getFromLocalStorage('todos'),
			HTML = '';

		todos.forEach(function(item) {
			HTML += "<tr><td><button type='button' class='fa-btn'><i class='fa fa-trash-o fa-fw'></i></button>" + item.description + "</td></tr>";
		});

		return HTML;
	},

	populate: {
		todos: function() {
			document.getElementById('td-input').innerHTML = Todo.generateHTML();
		}
	},

	listen: function() {
		document.getElementById('submit').addEventListener('click', function() {
			var description = document.getElementById('input').value;
			Todo.newTodo(description);
			Todo.populate.todos();
		});

		document.getElementById('clear-all').addEventListener('click', function(){
			Todo.delete.all();
		});
	}
}