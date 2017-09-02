const inputTask = document.getElementById("new-task");
const incompleteTasksHolder = document.getElementById("incomplete-tasks");
const completedTasksHolder = document.getElementById("completed-tasks");

// New Task List Item
inputTask.addEventListener("keydown",(event) => {
	
	if (event.keyCode === 13 && inputTask.value !== "") {
		
		//Create List Item
		const listItem = document.createElement("li");
		const liCheckBox = document.createElement("input");
		const liLabel = document.createElement("label");
		const liInputType = document.createElement("input");
		const delBtn = document.createElement("button");
		const editBtn = document.createElement("button");
		
		liCheckBox.type = "checkbox";
		liInputType.type = "text";
		liInputType.className = "form-control";
		
		liLabel.innerHTML = inputTask.value;
		
		delBtn.className = "delete";
		delBtn.textContent = "Delete";
		editBtn.className = "edit";
		editBtn.textContent = "Edit";
		
		listItem.appendChild(liCheckBox);
		listItem.appendChild(liLabel);
		listItem.appendChild(liInputType);
		listItem.appendChild(delBtn);
		listItem.appendChild(editBtn);
		
		incompleteTasksHolder.appendChild(listItem);
		
		inputTask.value = "";
		
		bindEvents(listItem, completedTasks);
		
	}
	
});

//Edit an existing task
const editTask = function() {
	
	const listItem = this.parentNode;
	
	const label = listItem.querySelector("label");
	const inputText = listItem.querySelector("input[type=text]");
	const containsClass = listItem.classList.contains("editMode");
	//if the class of the parent is .editMode
	if (containsClass) {
		//Switch from .editMode
		//label text become the input's value
		label.innerHTML = inputText.value;
	} else {
		//Switch to .editMode
		//input value becomes the label's text
		inputText.value = label.innerHTML;
	}
	//Toggle .editMode on the list item
	listItem.classList.toggle("editMode");
}
//Delete an existing task
const deleteTask = function() {
	
	const listItem = this.parentNode;
	const ul = listItem.parentNode;
	//Remove the parent list item from the ul
	ul.removeChild(listItem);
}
//Mark a task as incomplete
const incompleteTasks = function() {
	
	const listItem = this.parentNode;
	//Append the task list item to the #incomplete-tasks
	incompleteTasksHolder.appendChild(listItem);
	bindEvents(listItem, completedTasks);
}
//Mark a task as complete
const completedTasks = function() {
	
	const listItem = this.parentNode;
	//Append the task list item to the #completed-tasks
	completedTasksHolder.appendChild(listItem);
	bindEvents(listItem, incompleteTasks);
}

const bindEvents = function(placeForListItem, placeForCheckBox) {
	//select taskListItem's children
	const checkBox = placeForListItem.querySelector("input[type=checkbox]");
	const editButton = placeForListItem.querySelector("button.edit");
	const deleteButton = placeForListItem.querySelector("button.delete");
	
	editButton.onclick = editTask;
	deleteButton.onclick = deleteTask;
	checkBox.onchange = placeForCheckBox;
}

// //cycle over incompleteTasksHolder ul list items
// for (let i = 0; i < incompleteTasksHolder.children.length; i++) {
// 	bindEvents(incompleteTasksHolder.children[i], completedTasks);
// }
// //cycle over completedTasksHolder ul list items
// for (let i = 0; i < completedTasksHolder.children.length; i++) {
// 	bindEvents(completedTasksHolder.children[i], incompleteTasks);
// }
