var log = function() {
    console.log.apply(console, arguments)
}

// add事件
var bindEventAdd = function(todo) {
    var addButton = document.querySelector('.center-button')
    addButton.addEventListener('click', function() {
        // log('click', addButton)
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

// 切换task diary class
var bindEventleft = function() {
    var todoTask = document.querySelector('#id-task')
    var todoDiary = document.querySelector('#id-diary')
    var todoRightlist = document.querySelector(".todo-right")
    var todoRightdiary = document.querySelector('.todo-right-diary')
    todoTask.addEventListener('click', function(event) {
        var todoDiv = event.target.parentElement
        if (!todoDiv.classList.contains('left-active')) {
            todoDiv.classList.add("left-active")
            todoDiary.parentElement.classList.remove("left-active")

            todoRightlist.classList.remove("right-hide")
            todoRightdiary.classList.add("right-hide")
        }
    })
    todoDiary.addEventListener('click', function(event) {
        var todoDiv = event.target.parentElement
        if (!todoDiv.classList.contains('left-active')) {
            todoDiv.classList.add("left-active")
            todoTask.parentElement.classList.remove("left-active")

            todoRightlist.classList.add("right-hide")
            todoRightdiary.classList.remove("right-hide")
        }
    })

}

// 完成与删除按钮
var bindEventButton = function(todo) {
    var todoContainer = document.querySelector('.right-list')
    todoContainer.addEventListener('click', function(event) {
        var target = event.target
        // console.log("target",target);
        if (target.classList.contains('todo-done')) {
            var todoDiv = target.parentElement
            toggleClass(todoDiv, 'done')
            toggleClass(target, 'btn-info')
        } else if (target.classList.contains('todo-delete')) {
            var todoDiv = target.parentElement
            var index = indexOfElement(todoDiv)
            todoDiv.remove()
            todoList.splice(index, 1)
            saveTodos()
            log(todoList)
        }
    })
}

// 监听字数
var bindTextarea = function() {
    var textarea = document.querySelector(".center-input-diary")
    var spanNumber = document.querySelector("#id-span-140")
    textarea.addEventListener('input', function() {
        var value1 = textarea.value
        var len = value1.length
        var numbers = 140 - len
        if (len > 140) {
            alert('输入字数超出范围')
        } else {
            spanNumber.innerText = numbers
        }
    })
}

//插入回复内容
var bindArea = function(area) {
    var t = `
            <div class='vker-buttom'>
                <img class="vker-img-tx" src="头像.jpg" alt="" />
                <span id="id-span-time">${currentTime()}</span>
                <div class=''>
                    <textarea class="todo-huifu" name="huifu" rows="4" cols="15">${area}</textarea>
                </div>
            </div>
        `
        return t
}


// area内容
var bindEventarea = function() {
    var buttonAdd = document.querySelector(".center-button-diary")
    var textarea = document.querySelector(".center-input-diary")
    var spanNumber = document.querySelector("#id-span-140")
    var spanTime = document.querySelector("#id-span-time")
    var diaryHtml = document.querySelector('.right-list-diary')
    buttonAdd.addEventListener('click', function() {
        // 取到评论框中的内容
        var value1 = textarea.value
        // 填写回复框中的时间
        // spanTime.innerText = "1"
        // 清空评论框中的内容
        textarea.value = ''
        // 重置字数
        spanNumber.text = 140
        // 插入HTML
        diaryHtml.innerHtml = bindArea(value1)
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
    for (var i = 0; i < parent.children.length; i++) {
        var e = parent.children[i]
        if (e === element) {
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
    bindEventleft()
    bindEventAdd()
    bindEventButton()
    loadTodos()
    bindTextarea()
    bindEventarea()
}

var todoList = []
__main()
