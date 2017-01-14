const form = document.querySelector('#registrar');
const input = form.querySelector('input');
const ul = document.querySelector('#invitedList');

function createLI(text) {
  const li = document.createElement('li');
  li.textContent = text;
  const label = document.createElement('label');
  label.textContent = 'Confirmed';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  label.appendChild(checkbox);
  li.appendChild(label);

  const button = document.createElement('button');
  button.textContent = 'Remove';
  li.appendChild(button);

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
    const li = e.target.parentNode;
    const ul = li.parentNode;
    ul.removeChild(li);
  }
});


// Notes

// Use "change" event on checkbox, not "click," as it produces true/false
  // "change" can also fire on input, select, and textarea
