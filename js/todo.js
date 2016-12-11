var log = function() {
    console.log.apply(console, arguments)
}

// add事件
var bindEventAdd = function(todo) {
    var addButton = document.querySelector('.center-button')
    addButton.addEventListener('click', function() {
        log('click', addButton)
        var todoInput = document.querySelector('.center-input')
        var task = todoInput.value
        todo = {
            'task' : task,
            'time' : currentTime(),
        }
        todoList.push(todo)
        saveTodos()
        insertTodo(todo)
        todoInput.value = ''
    })
}

// 完成与删除按钮
var bindEventButton = function(todo) {
    var todoContainer = document.querySelector('.right-list')
    todoContainer.addEventListener('click', function(event) {
        var target = event.target
        if (target.classList.contains('todo-done')) {
            var todoDiv = target.parentElement
            toggleClass(todoDiv, 'done')
            toggleClass(target, 'btn-info')
        } else if (target.classList.contains('todo-delete')) {
            var todoDiv = target.parentElement
            var index = indexOfElement(target)
            todoDiv.remove()
            todoList.splice(index, 1)
            saveTodos()
            log(todoList)
        }
    })
}


// 插入事件
var insertTodo = function(todo) {
    var todoContainer = document.querySelector('.right-list')
    todoContainer.insertAdjacentHTML('beforeend', templateTodo(todo))
}

// 插入HTML
var templateTodo = function(todo) {
    var t = `
        <div class='list-task'>
            <button class='btn btn-default todo-done'>完成</button>
            <button class='btn btn-default todo-delete'>删除</button>
            <span>${todo.task}</span>
            <span>${todo.time}</span>
        </div>
    `
    return t
}

// 插入时间
var currentTime = function() {
    var d = new Date()
    var month = d.getMonth() + 1
    var date = d.getDate()
    var hours = d.getHours()
    var minutes = d.getMinutes()
    var seconds = d.getSeconds()
    var timeString = `${month}-${date} ${hours}:${minutes}:${seconds}`
    return timeString
}

// 这个函数用来开关一个元素的某个 class
var toggleClass = function(element, className) {
    if (element.classList.contains(className)) {
        element.classList.remove(className)
    } else {
        element.classList.add(className)
    }
}

// 返回自己在父元素中的下标
var indexOfElement = function(element) {
    var parent = element.parentElement
    // log('parent', parent, 'len', parent.length)
    // log('children', parent.children, 'len', parent.children.length)
    for (var i = 0; i < parent.children.length; i++) {
        var e = parent.children[i]
        // log('parent.children[i]',parent.children[i])
        if (e === element.parentElement) {
            // log('i =', i)
            return i
        }
    }
}

// 保存 todoList
var saveTodos = function() {
    var s = JSON.stringify(todoList)
    localStorage.todoList = s
}

// 下载 todoList
var loadTodos = function() {
    var s = localStorage.todoList
    // 程序加载后, 加载 todoList 并且添加到页面中
    todoList = JSON.parse(s)
    for (var i = 0; i < todoList.length; i++) {
        var todo = todoList[i]
        insertTodo(todo)
    }
}

// 入口
var __main = function() {
    bindEventAdd()
    bindEventButton()
    loadTodos()
}

var todoList = []
__main()
