describe('Vanilla Todo', function() {

	var fakeStorage,
		fakeTodos = [{
			description: 'A',
			category: 'Personal',
			isComplete: false
		}, {
			description: 'B',
			category: 'Work',
			isComplete: false
		}],

		fakeCategories = '["ABC", "DEF", "GHI"]',
		arrayWithTwoTodos = '[' + JSON.stringify(fakeTodos[0]) + ',' + JSON.stringify(fakeTodos[1]) + ']',
		arrayWithOneTodo = '[' + JSON.stringify(fakeTodos[1]) + ']',

		fakeHTMLForA = "<tr><td class=''><button type='button' class='fa-btn delete-todo'>" +
		"<i class='fa fa-trash-o fa-fw'></i></button>" +
		"<button type='button' class='fa-btn complete-todo'><i class='fa fa-check '></i></button>" +
		"<span>[Personal] </span><span>A</span></td></tr>";
		fakeHTMLForB = "<tr><td class=''><button type='button' class='fa-btn delete-todo'>" +
		"<i class='fa fa-trash-o fa-fw'></i></button>" +
		"<button type='button' class='fa-btn complete-todo'><i class='fa fa-check '></i></button>" +
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

	describe('Init from localStorage', function() {
		it('creates empty todos and categories in localStorage when there are none', function() {
				expect(fakeStorage.todos).toBeUndefined();
				Todo.init();
				// expect(localStorage.getItem).toHaveBeenCalled();
				expect(fakeStorage.todos).toEqual('[]');
				expect(fakeStorage.categories).toEqual('[]');
		});

		it('does not create empty todos or categories in localStorage when there are any', function() {
			fakeStorage = { todos: arrayWithOneTodo, categories: fakeCategories };
			Todo.init();
			expect(JSON.stringify(Todo.getFromLocalStorage('todos'))).not.toEqual('[]');
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

		// it('creates a new category', function(){
		// 	fakeStorage = { categories: fakeCategories };
		// 	Todo.create.category('JKL');
		// 	expect(fakeStorage.categories[fakeStorage.categories.length - 1]).toEqual('JKL');
		// });
	});

	describe('Complete Todo', function(){
		it('creates todo with isComplete property set to false', function() {
			expect(Todo.create.todo('B', 'Work').isComplete).toBeFalsy();
		});

		it('toggles todo isComplete property', function() {
			fakeStorage = { todos: arrayWithTwoTodos };

			Todo.toggleComplete(JSON.parse(fakeStorage.todos)[0]);
			expect(JSON.parse(fakeStorage.todos)[0].isComplete).toBeTruthy();
		});
	});
});
