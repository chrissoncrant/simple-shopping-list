const taskInput = document.getElementById('task');
const enterBtn = document.getElementById('enter-btn');
const ul = document.getElementsByTagName('ul')[0];
const listItemText = document.querySelectorAll('.list-item-text');
const deleteBtn = document.querySelectorAll('.delete');
const editBtn = document.querySelectorAll('.edit');
const listContainer = document.getElementById('list-container');

function emptyListStyle() {
    if (!listContainer.children.length) {
        const p = document.createElement('p');
        p.classList.add('finished');
        p.textContent = "All finished!";
        p.style.textAlign = 'center';
        p.style.margin = "auto";
        p.style.cursor = "default";
        listContainer.appendChild(p);
    } else if (listContainer.children[0].textContent === "All finished!") {
        document.querySelector('.finished').remove()
    }
}

function addDeleteButtonListener(btn) {
    btn.addEventListener('click', (e) => {
        const parent = btn.parentElement.parentElement;
        parent.remove();
        e.stopPropagation();
        emptyListStyle();
    });
}

deleteBtn.forEach(addDeleteButtonListener);

function addLineThroughListener(listItemText, i) {
    listItemText.classList.add(`item${i}`);
    listItemText.addEventListener('click', () => {
        const clickedItem = document.querySelector(`.item${i}`)
        clickedItem.classList.toggle('line-through');
    })
}

for (let i = 0; i < listItemText.length; i++) {
    const element = listItemText[i];
    addLineThroughListener(element, i)
}

function createButtons() {
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Remove';
    addDeleteButtonListener(deleteBtn);
    const btnDiv = document.createElement('div');
    btnDiv.appendChild(deleteBtn);
    return btnDiv;
}

function addTaskToList() {
    const li = document.createElement('li');
    const p = document.createElement('p');
    p.classList.add('list-item-text');
    p.textContent = taskInput.value;
    p.addEventListener('click', () => {
        p.classList.toggle('line-through');
    });
    li.appendChild(p);
    const btnDiv = createButtons();
    li.appendChild(btnDiv);
    ul.appendChild(li);
    taskInput.value = '';
    emptyListStyle();
}

enterBtn.addEventListener('click', () => {
    if (taskInput.value !== '') {
        addTaskToList();
    }
});

taskInput.addEventListener('keypress', (event) => {
    if (taskInput.value !== '' && event.code === 'Enter') {
        addTaskToList();
    }
});

