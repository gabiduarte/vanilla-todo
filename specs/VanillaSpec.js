describe('Vanilla Todo', function() {

	var fakeStorage,
		fakeTodos = [{
			description: 'A',
			category: 'Personal'
		}, {
			description: 'B',
			category: 'Personal'
		}];

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

		//TODO: Change implementation when tag creation is refactored
		it('returns todo array when there is any todo in localStorage', function() {
			localStorage.setItem('todos', '["A","B"]');
			var init = Todo.init();
			expect(init).toEqual('["A","B"]');
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
		var arrayWithTwoTodos = '[' + JSON.stringify(fakeTodos[0]) + ',' + JSON.stringify(fakeTodos[1]) + ']',
			arrayWithOneTodo = '[' + JSON.stringify(fakeTodos[1]) + ']';

		beforeEach(function () {
			fakeStorage = { todos: arrayWithTwoTodos};
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

});
