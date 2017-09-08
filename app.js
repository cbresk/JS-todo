const inputTask = document.getElementById("new-task");
const incompleteTasksHolder = document.getElementById("incomplete-tasks");
const completedTasksHolder = document.getElementById("completed-tasks");

inputTask.focus();

inputTask.addEventListener("keydown", (event) => {
	if (event.keyCode === 13 && inputTask.value !== "") {
    
		const listItem = document.createElement("li");
		const liCheckBox = document.createElement("input");
		const liLabel = document.createElement("label");
		const liInputType = document.createElement("input");
		const delBtn = document.createElement("button");
		const editBtn = document.createElement("button");
		
		listItem.className = 'todoItem';
		liCheckBox.type = "checkbox";
		liInputType.type = "text";
		liInputType.className = "form-control";
		
		liLabel.innerHTML = inputTask.value;
		
		delBtn.className = "delete";
		delBtn.textContent = "X";
		editBtn.className = "edit";
		editBtn.textContent = 'Edit';
		
		listItem.appendChild(liCheckBox);
		listItem.appendChild(liLabel);
		listItem.appendChild(liInputType);
		listItem.appendChild(delBtn);
		listItem.appendChild(editBtn);

		incompleteTasksHolder.appendChild(listItem);
  
		inputTask.value = "";
		inputTask.focus();
		
		bindEvents(listItem, completedTasks);
    //todoHandleabars();
    todoCounter();
    
    if ($('#tasks-body ul li').length > 0) {
      $('#tasks-body').slideDown();
    }
	}
});

const editTask = function() {
	const listItem = this.parentNode;
	const label = listItem.querySelector("label");
	const inputText = listItem.querySelector("input[type=text]");
	const containsClass = listItem.classList.contains("editMode");
	
	if (containsClass) {
		label.innerHTML = inputText.value;
	} else {
		inputText.value = label.innerHTML;
	}

	listItem.classList.toggle("editMode");
	inputText.focus();
}

const deleteTask = function() {
	const listItem = this.parentNode;
	const ul = listItem.parentNode;
	
	ul.removeChild(listItem);
  
  if ($('#tasks-body ul li').length == 0) {
      $('#tasks-body').slideUp();
  }
  todoCounter();
}

const incompleteTasks = function() {
	const listItem = this.parentNode;
	
	incompleteTasksHolder.appendChild(listItem);
	bindEvents(listItem, completedTasks);
  todoCounter();
}

const completedTasks = function() {
	const listItem = this.parentNode;

	completedTasksHolder.appendChild(listItem);
	bindEvents(listItem, incompleteTasks);
  todoCounter();
}

const bindEvents = function(placeForListItem, placeForCheckBox) {
	const checkBox = placeForListItem.querySelector("input[type=checkbox]");
	const editButton = placeForListItem.querySelector("button.edit");
	const deleteButton = placeForListItem.querySelector("button.delete");
	
	editButton.onclick = editTask;
	deleteButton.onclick = deleteTask;
	checkBox.onchange = placeForCheckBox;
}

// for (let i = 0; i < incompleteTasksHolder.children.length; i++) {
// 	bindEvents(incompleteTasksHolder.children[i], completedTasks);
// }
// for (let i = 0; i < completedTasksHolder.children.length; i++) {
// 	bindEvents(completedTasksHolder.children[i], incompleteTasks);
// }

newColor.addEventListener('click', function(event) {
	if (event.target.tagName === 'LI') {
		let color = $(event.target).css("background-color");

		$(event.target).siblings().removeClass("selected");
		event.target.classList.add("selected");
		$('footer, #head').css("color", color);
		$('.container').css("border-color", color);
		inputTask.focus();
		$('.form-control:focus').css("border-color", color);
	}
});

const todoWordPlurazile = (count, word) => {
  return count === 1 ? word : word + 's';
}

var todoCounter = () => {
  const footerSource = document.getElementById("footer-template").innerHTML;
  const footerTemplate = Handlebars.compile(footerSource);
  
  let activeTodos = $('#incomplete-tasks').children().length;
  let footerContext = {
    activeTodoCount: activeTodos,
    activeTodoWord: todoWordPlurazile(activeTodos , 'item')
  };
  let html = footerTemplate(footerContext);
  return $("#activeTodo").html(html);
}

// var todoHandleabars = () => {
//   const source = document.getElementById("todo-template").innerHTML;
//   const todoTemplate = Handlebars.compile(source);
  
//   let todoContext = {
//     label: inputTask.value
//   };
//   let html = todoTemplate(todoContext);
//   return $("#incomplete-tasks").append(html);
// }
