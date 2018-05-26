var Todo = {
	init: function() {
		// if (!this.getFromLocalStorage('todos')) {
			this.setToLocalStorage('todos', []);
		// }

		// if (!this.getFromLocalStorage('categories')) {
			this.setToLocalStorage('categories', []);
		// }
	},

	getFromLocalStorage: function(item) {
		var localStorageItem = localStorage.getItem(item);
		return localStorageItem ? JSON.parse(localStorageItem) : null;
	},

	setToLocalStorage: function(string, items) {
		localStorage.setItem(string, JSON.stringify(items));
	},

	create: {
		todo: function(input, chosenCategory, complete) {
			return {
				description: input,
				category: chosenCategory || 'Personal',
				isComplete: complete || false
			}
		},

		category: function(newCategory) {
			var categories = Todo.getFromLocalStorage('categories');
		}
	},

	newTodo: function(description, category) {
		var todo = this.create.todo(description, category);
		var todos = this.getFromLocalStorage('todos');

		todos.push(todo);
		this.setToLocalStorage('todos', todos);
	},

	toggleComplete: function(todo) {
		var todos = this.getFromLocalStorage('todos'),
			foundTodo = false;

		if (todos) {
			todos.forEach(function(item, index) {
				if (item.description == todo.description && !foundTodo) {
					foundTodo = true;
					item.isComplete = !item.isComplete;
				}
			});
			Todo.setToLocalStorage('todos', todos);
		}
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
			 	var completeClass = item.isComplete ? 'complete' : '',
						completeIcon = item.isComplete ? 'complete-icon' : '';

				HTML += "<tr><td class='" + completeClass + "'>" +
				"<button type='button' class='fa-btn delete-todo'>" +
				"<i class='fa fa-trash-o fa-fw'></i></button>" +
				"<button type='button' class='fa-btn complete-todo'>" +
				"<i class='fa fa-check " + completeIcon + "'></i></button>" +
				"<span>[" + item.category + "] </span>" +
				"<span>" + item.description + "</span></td></tr>"
			});
		}
		return HTML;
	},

	populate: {
		todos: function() {
			document.getElementById('td-input').innerHTML = Todo.generateHTML();
			Todo.listen.complete();
			Todo.listen.delete();
		}
	},

	listen: {
		complete: function() {
			Array.from(document.getElementsByClassName('complete-todo')).forEach(function(element) {
				element.removeEventListener('click', function() {});
				element.addEventListener('click', function() {

					var todoDescription = this.parentElement.getElementsByTagName('span')[1].innerHTML;
					var todo = Todo.create.todo(todoDescription);

					Todo.toggleComplete(todo);
					Todo.populate.todos();
				});
			});
		},

		delete: function() {
			Array.from(document.getElementsByClassName('delete-todo')).forEach(function(element) {
				element.removeEventListener('click', function() {});
				element.addEventListener('click', function() {

					var todoDescription = this.parentElement.getElementsByTagName('span')[1].innerHTML;
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
