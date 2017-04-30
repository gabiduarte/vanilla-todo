window.onload = function() {
	Todo.populate.todos();

	Todo.init();
	Todo.listen.all();
}