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
    }
}