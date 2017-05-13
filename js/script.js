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
		todo: function(input, chosenCategory) {
			return {
				description: input,
				category: chosenCategory || 'Personal'
			}
		}
	},

	newTodo: function(description, category) {
		var todo = this.create.todo(description, category);
		var todos = this.getFromLocalStorage('todos');

		todos.push(todo);
		this.setToLocalStorage('todos', todos);
	},

	delete: {
		all: function() {
			Todo.setToLocalStorage('todos', []);
		},

		todo: function(todo) {
			var todos = Todo.getFromLocalStorage('todos'),
					foundTodo = false;

			todos.forEach(function(item, index) {
				if (item.description == todo.description && !foundTodo) {
					foundTodo = true;
					return todos.splice(index, 1);
				}
			});

			Todo.setToLocalStorage('todos', todos);
		},

		html: function(element) {
			var todoLine = element.parentElement.parentElement;
			todoLine.parentElement.removeChild(todoLine);
		}
	},

	generateHTML: function() {
		var todos = this.getFromLocalStorage('todos'),
			HTML = '';

		if (todos) {
			todos.forEach(function(item) {
				HTML += "<tr><td><button type='button' class='fa-btn delete-todo'><i class='fa fa-trash-o fa-fw'></i></button><span>" + item.description + "</span></td></tr>";
			});
		}

		return HTML;
	},

	populate: {
		todos: function() {
			document.getElementById('td-input').innerHTML = Todo.generateHTML();
			Todo.listen.delete();
		}
	},

	listen: {
		delete: function() {
			Array.from(document.getElementsByClassName('delete-todo')).forEach(function(element) {
				element.removeEventListener('click', function() {});
				element.addEventListener('click', function() {

					var todoDescription = this.parentElement.getElementsByTagName('span')[0].innerHTML;
					var todo = Todo.create.todo(todoDescription);

					Todo.delete.todo(todo);
					Todo.delete.html(this);
				});
			});
		},
		submit: function() {
			document.getElementById('submit').addEventListener('click', function() {
				var description = document.getElementById('input').value,
				category = document.getElementById('category').value;
				Todo.newTodo(description, category);
				Todo.populate.todos();
			});
		},
		clearAll: function() {
			document.getElementById('clear-all').addEventListener('click', function(){
				Todo.delete.all();
				Todo.populate.todos();
			});
		},
		all: function() {
			this.submit();
			this.clearAll();
		}
	}
}
