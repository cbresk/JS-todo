const inputTask = document.getElementById("new-task");
const incompleteTasksHolder = document.getElementById("incomplete-tasks");
const completedTasksHolder = document.getElementById("completed-tasks");

inputTask.focus();

inputTask.addEventListener("keydown",(event) => {
	
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
		liInputType.className = "form-control editInput";
		
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

		$('#tasks-body').slideDown("slow", function() {
			$(this).toggle( $('#tasks-body ul li').length > 0 );
		});
		
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
	$('#tasks-body').slideUp("slow", function() {
		$(this).toggle( $('#tasks-body ul li').length > 0 );
	});
}

const incompleteTasks = function() {
	
	const listItem = this.parentNode;
	
	incompleteTasksHolder.appendChild(listItem);
	bindEvents(listItem, completedTasks);
}

const completedTasks = function() {
	
	const listItem = this.parentNode;

	completedTasksHolder.appendChild(listItem);
	bindEvents(listItem, incompleteTasks);
}

const bindEvents = function(placeForListItem, placeForCheckBox) {
	
	const checkBox = placeForListItem.querySelector("input[type=checkbox]");
	const editButton = placeForListItem.querySelector("button.edit");
	const deleteButton = placeForListItem.querySelector("button.delete");
	
	editButton.onclick = editTask;
	deleteButton.onclick = deleteTask;
	checkBox.onchange = placeForCheckBox;
}

for (let i = 0; i < incompleteTasksHolder.children.length; i++) {
	bindEvents(incompleteTasksHolder.children[i], completedTasks);
}
for (let i = 0; i < completedTasksHolder.children.length; i++) {
	bindEvents(completedTasksHolder.children[i], incompleteTasks);
}

newColor.addEventListener('click', function(event) {

	const newColor = document.getElementById('newColor');
	const container = document.getElementsByClassName('container');

	if (event.target.tagName === 'LI') {

		let $color = $(event.target).css("background-color");

		$(event.target).siblings().removeClass("selected");
		event.target.classList.add("selected");
		$('footer, #head').css("color", $color);
		$('.container').css("border-color", $color);
		inputTask.focus();
		$('*:focus').css("border-color", $color);
		$('#editInput:focus').css("border-color", $color);
		
	}

});
