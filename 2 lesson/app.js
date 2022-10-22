const item = document.querySelector('.item');
const placeholders = document.querySelectorAll('.placeholder');

item.setAttribute('draggable', 'true');

item.addEventListener('dragstart', dragstart);
item.addEventListener('dragend', dragend);

for (const placeholder of placeholders) {
  placeholder.addEventListener('dragover', dragover); //над объектом
  placeholder.addEventListener('dragenter', dragenter); //на территорию
  placeholder.addEventListener('dragleave', dragleave); //перетащили но вытащили
  placeholder.addEventListener('drop', drop); //отпустили
}

function dragstart(e) {
  e.target.classList.add('hold');
  setTimeout(() => e.target.classList.add('hide'));
}

function dragend(e) {
  e.target.classList.remove('hold', 'hide');
}

function dragover(e) {
  e.preventDefault();
}

function dragenter(e) {
  e.target.classList.add('hovered');
}

function dragleave(e) {
  e.target.classList.remove('hovered');
}

function drop(e) {
  e.target.classList.remove('hovered');
  e.target.append(item);
}