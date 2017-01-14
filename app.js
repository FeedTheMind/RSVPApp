const form = document.querySelector('#registrar');
const input = form.querySelector('input');


form.addEventListener('submit', (e) => {
  // Prevents refreshing of page--usual behavior of "submit"
  e.preventDefault();
  const text = input.value;
  const ul = document.querySelector('#invitedList');
  const li = document.createElement('li');
  li.textContent = text;
  ul.appendChild(li);
  // Clears input element 
  input.value = '';
});
