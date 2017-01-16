const form = document.querySelector('#registrar');
const input = form.querySelector('input');

const mainDiv = document.querySelector('.main');
const ul = document.querySelector('#invitedList');

const div = document.createElement('div');
const filterLabel = document.createElement('label');
const filterCheckBox = document.createElement('input');

filterLabel.textContent = 'Hide those who have yet to respond.';
filterCheckBox.type = 'checkbox';
div.appendChild(filterLabel);
div.appendChild(filterCheckBox);
mainDiv.insertBefore(div, ul);
filterCheckBox.addEventListener('change', (e) => {
  const isChecked = e.target.checked;
  const lis = ul.children;

  if (isChecked) {
    for (let i = 0; i < lis.length; i++) {
      let li = lis[i];

      if (li.className === 'responded') {
        li.style.display = '';
      } else {
        li.style.display = 'none';
      }
    }
  } else {
    for (let i = 0; i < lis.length; i++) {
      let li = lis[i];

      li.style.display = '';
    }
  }
});

function createLI(text) {
  const li = document.createElement('li');
  const span = document.createElement('span');
  span.textContent = text;
  li.appendChild(span);

  const label = document.createElement('label');
  label.textContent = 'Confirmed';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  label.appendChild(checkbox);
  li.appendChild(label);

  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  li.appendChild(editButton);

  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remove';
  li.appendChild(removeButton);

  return li;
}

form.addEventListener('submit', (e) => {
  // Prevents refreshing of page--usual behavior of "submit"
  e.preventDefault();
  
  // Prevents blank content from being added
  if (input.value.trim() === '') {
    input.value = '';
    input.focus();
    return;
  }
  
  const text = input.value;
  const li = createLI(text);

  ul.appendChild(li);

  // Clears input element and adds focus
  input.value = '';
  input.focus();
});

ul.addEventListener('change', (e) => {
  const checkbox = event.target;
  const checked = checkbox.checked;
  const listItem = checkbox.parentNode.parentNode;

  // Runs if checked is true
  if (checked) {
    listItem.className = 'responded';
  } else {
    listItem.className = '';
  }
});

ul.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    const button = e.target;
    const li = button.parentNode;
    const ul = li.parentNode;

    if (button.textContent === 'Remove') {
      ul.removeChild(li);
    } else if (button.textContent === 'Edit') {
      const span = li.firstElementChild;
      const input = document.createElement('input');

      input.type = 'text';
      input.value = span.textContent;
      li.insertBefore(input, span);
      li.removeChild(span);
      button.textContent = 'Save';

      input.focus();
    } else if (button.textContent === 'Save') {
      const input = li.firstElementChild;
      const span = document.createElement('span');

      span.textContent = input.value;
      li.insertBefore(span, input)
      li.removeChild(input);
      button.textContent = 'Edit';
    }
  }
});


// Notes

// Use "change" event on checkbox, not "click," as it produces true/false
  // "change" can also fire on input, select, and textarea
