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
  function createElement(elementName, property, value) {
    const element = document.createElement(elementName);
    element[property] = value;

    return element;
  }

  function appendToLI(elementName, property, value) {
    const element = createElement(elementName, property, value);
    li.appendChild(element);

    return element;
  }

  const li = document.createElement('li');

  appendToLI('span', 'textContent', text);
  appendToLI('label', 'textContent', 'Confirmed')
    .appendChild(createElement('input', 'type', 'checkbox'));

  appendToLI('button', 'textContent', 'Edit');
  appendToLI('button', 'textContent', 'Remove');

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
    const nameActions = {
      remove: () => {
        ul.removeChild(li);
      },
      edit: () => {
        const span = li.firstElementChild;
        const input = document.createElement('input');

        input.type = 'text';
        input.value = span.textContent;
        li.insertBefore(input, span);
        li.removeChild(span);
        button.textContent = 'Save';

        input.focus();
      },
      save: () => {
        const input = li.firstElementChild;
        const span = document.createElement('span');

        span.textContent = input.value;
        li.insertBefore(span, input)
        li.removeChild(input);
        button.textContent = 'Edit';
      }
    };

    if (button.textContent === 'Remove') {
      nameActions.remove();
    } else if (button.textContent === 'Edit') {
      nameActions.edit();
    } else if (button.textContent === 'Save') {
      nameActions.save();
    }
  }
});


// Notes

// Use "change" event on checkbox, not "click," as it produces true/false
  // "change" can also fire on input, select, and textarea
