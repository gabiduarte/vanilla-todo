describe('Vanilla Todo', function() {

	var fakeStorage;

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
		var fakeTodo = {
			description: 'This todo',
			category: 'Personal'
		};

		beforeEach(function() {
			fakeStorage = { todos: '[]'};
		});

		it('creates a todo object with description', function(){		
			expect(Todo.create.todo('This todo')).toEqual(fakeTodo);
		});

		it('adds new todo to todos in localStorage', function() {
			expect(fakeStorage.todos).toEqual('[]');			
			Todo.newTodo(fakeTodo.description);
			var firstTodo = JSON.parse(fakeStorage.todos)[0];

			expect(firstTodo).toEqual(fakeTodo);
		});
	});

});
