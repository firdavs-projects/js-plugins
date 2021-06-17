const cardsEl = document.querySelector('#cards');

let currentCard = null;
const placeholders = Array.from(cardsEl.children);

// Listeners
document.addEventListener('dragstart', dragstart);
document.addEventListener('dragend', dragend);
document.addEventListener('dragover', dragover);
document.addEventListener('dragenter', dragenter);
document.addEventListener('dragleave', dragleave);
document.addEventListener('drop', dragDrop);

document.addEventListener('dblclick', editCard);
document.addEventListener('click', addNewCard);

// Реализация dran-n-drop
function dragstart(event) {
  const target = event.target;
  if (!target.classList.contains('card')) return;

  target.classList.add('hold');
  setTimeout(() => target.classList.add('hide'), 0);
  currentCard = target;
}

function dragend(event) {
  const target = event.target;
  if (!target.classList.contains('card')) return;

  target.classList.remove('hold', 'hide');
  currentCard = target;
}

function dragover(event) {
  event.preventDefault();
}

function dragenter(event) {
  const target = event.target;
  if (!target.classList.contains('placeholder')) return;

  event.preventDefault();
  target.classList.add('hovered');
}

function dragleave(event) {
  const target = event.target;
  if (!target.classList.contains('placeholder')) return;

  target.classList.remove('hovered');
}

function dragDrop(event) {
  const target = event.target;
  if (target.classList.contains('placeholder')) {
    target.append(currentCard);
    target.classList.remove('hovered');
  } else if (target.classList.contains('card')) {
    const parent = target.closest('.placeholder');
    parent.insertBefore(currentCard, target);
  } else if (target.dataset.trash) {
    deleteCard();
  }
}

// Добавление новой карточки
function addNewCard(event) {
  const addBtn = event.target;
  if (!addBtn.classList.contains('add-card')) return;

  const newCard = createNewCard();
  const btnId = addBtn.dataset.id;

  const index = placeholders.findIndex((item) => {
    return item.dataset.id === addBtn.dataset.id;
  });

  placeholders[index].append(newCard);
}

function createNewCard() {
  const card = document.createElement('div');
  card.classList.add('card');
  card.setAttribute('draggable', true);
  card.textContent = 'Новая заметка';

  return card;
}

// Редактирование текста в заметке
function editCard(event) {
  const card = event.target;
  if (!card.classList.contains('card')) return;

  card.setAttribute('contenteditable', true);
  card.focus();

  card.addEventListener('focusout', () => stopEditCard(card));
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && event.ctrlKey === true) {
      event.preventDefault();
      stopEditCard(card);
    }
  });
}

function stopEditCard(card) {
  card.blur();
  card.removeAttribute('contenteditable');
}

// Удаление карточки
function deleteCard() {
  currentCard.remove();
}

