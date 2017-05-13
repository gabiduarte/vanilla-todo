describe('Vanilla Todo', function() {

	var fakeStorage,
		fakeTodos = [{
			description: 'A',
			category: 'Personal'
		}, {
			description: 'B',
			category: 'Work'
		}],
		arrayWithTwoTodos = '[' + JSON.stringify(fakeTodos[0]) + ',' + JSON.stringify(fakeTodos[1]) + ']',
		arrayWithOneTodo = '[' + JSON.stringify(fakeTodos[1]) + ']',

		fakeHTMLForA = "<tr><td><button type='button' class='fa-btn delete-todo'>" +
		"<i class='fa fa-trash-o fa-fw'></i></button>" +
		"<span>[Personal] </span><span>A</span></td></tr>";
		fakeHTMLForB = "<tr><td><button type='button' class='fa-btn delete-todo'>" +
		"<i class='fa fa-trash-o fa-fw'></i></button>" +
		"<span>[Work] </span><span>B</span></td></tr>";

	beforeEach(function () {
		fakeStorage = {};

		spyOn(localStorage, 'getItem').and.callFake(function (key) {
			return fakeStorage[key];
		});
		spyOn(localStorage, 'setItem').and.callFake(function (key, value) {
			return fakeStorage[key] = value + '';
		});
	});

	describe('Load Todos', function() {
		it('creates an empty array in localStorage when it has no todos', function() {
				expect(fakeStorage.todos).toBeUndefined();
				Todo.init();
				expect(localStorage.getItem).toHaveBeenCalled();
				expect(fakeStorage.todos).toEqual('[]');
		});

		it('returns todo array when there is any todo in localStorage', function() {
			localStorage.setItem('todos', '["A","B"]');
			var init = Todo.init();
			expect(init).toEqual(['A', 'B']);
		});
	});

	describe('Create Todo', function() {
		beforeEach(function() {
			fakeStorage = { todos: '[]'};
		});

		it('creates a todo object with description', function(){
			expect(Todo.create.todo('A')).toEqual(fakeTodos[0]);
		});

		it('adds new todo to todos in localStorage', function() {
			expect(fakeStorage.todos).toEqual('[]');
			Todo.newTodo(fakeTodos[0].description);
			var firstTodo = JSON.parse(fakeStorage.todos)[0];

			expect(firstTodo).toEqual(fakeTodos[0]);
		});
	});

	describe('Delete Todos', function() {
		beforeEach(function () {
			fakeStorage = { todos: arrayWithTwoTodos };
		});

		it('deletes all todos', function() {
			Todo.delete.all();
			expect(fakeStorage.todos).toEqual('[]');
		});

		it('deletes a single todo', function() {
			expect(fakeStorage.todos).toEqual(arrayWithTwoTodos);

			Todo.delete.todo(fakeTodos[0]);
			expect(fakeStorage.todos).toEqual(arrayWithOneTodo);
		});
	});

	describe('Populate Todo', function() {
		it('creates html for all todos in localStorage', function() {
			fakeStorage = { todos: arrayWithTwoTodos };
			expect(Todo.generateHTML()).toEqual(fakeHTMLForA + fakeHTMLForB);
		});
	});

	describe('Categorize Todo', function() {
		it('sets default category to personal if none is given', function(){
			expect(Todo.create.todo('A')).toEqual(fakeTodos[0]);
		});

		it('adds a category to a todo upon creation', function(){
			expect(Todo.create.todo('B', 'Work')).toEqual(fakeTodos[1]);
		});

		it('shows a todo category on the html tag', function() {
			fakeStorage = { todos: arrayWithOneTodo };
			expect(Todo.generateHTML()).toEqual(fakeHTMLForB);
		});
	});
});
