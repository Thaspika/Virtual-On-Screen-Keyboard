const keyboardContainer = document.getElementById('keyboard');
const display = document.getElementById('display');
let isCaps = false;

// Define keyboard rows
const keyLayout = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'Backspace'],
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['Caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'Enter'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '?'],
  ['Space']
];

// Build the keyboard buttons dynamically
function createKeyboard() {
  keyLayout.forEach(row => {
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('keyboard-row');

        row.forEach(key => {
      const button = document.createElement('button');
      button.type = 'button';
      button.classList.add('key');
      button.dataset.key = key.toLowerCase();

          // Handle special key formatting
      if (key === 'Backspace') {
        button.textContent = '⌫';
        button.classList.add('key-wide');
      } else if (key === 'Caps') {
        button.innerHTML = 'Caps <span class="caps-indicator"></span>';
        button.classList.add('key-wide');
        button.id = 'caps-key';
      } else if (key === 'Enter') {
        button.textContent = 'Enter ↵';
        button.classList.add('key-wide');
      } else if (key === 'Space') {
        button.textContent = 'Space';
        button.classList.add('key-space');
      } else {
        button.textContent = key;
      }

           button.addEventListener('click', () => handleVirtualKeyPress(key));
      rowDiv.appendChild(button);
    });

    keyboardContainer.appendChild(rowDiv);
  });
}

// Handle on-screen button clicks
function handleVirtualKeyPress(key) {
  display.focus();

  switch (key) {
    case 'Backspace':
      display.value = display.value.slice(0, -1);
      break;

          case 'Caps':
      toggleCapsLock();
      break;

    case 'Enter':
      display.value += '\n';
      break;

    case 'Space':
      display.value += ' ';
      break;

    default:
      const char = isCaps ? key.toUpperCase() : key.toLowerCase();
      display.value += char;
      break;
  }
}

// Toggle uppercase/lowercase state across letter keys
function toggleCapsLock() {
  isCaps = !isCaps;
  const capsButton = document.getElementById('caps-key');
  capsButton.classList.toggle('caps-on', isCaps);

  document.querySelectorAll('.key').forEach(btn => {
    const keyVal = btn.dataset.key;
    if (keyVal.length === 1 && keyVal >= 'a' && keyVal <= 'z') {
      btn.textContent = isCaps ? keyVal.toUpperCase() : keyVal.toLowerCase();
    }
  });
}

// Sync physical keyboard presses with visual key highlights
document.addEventListener('keydown', (e) => {
  const pressedKey = e.key === ' ' ? 'space' : e.key.toLowerCase();
  const targetBtn = document.querySelector('.key[data-key="${pressedKey}"]');

  if (targetBtn) {
    targetBtn.classList.add('active');
  }

  if (e.key === 'CapsLock') {
    toggleCapsLock();
  }
});

document.addEventListener('keyup', (e) => {
  const releasedKey = e.key === ' ' ? 'space' : e.key.toLowerCase();
  const targetBtn = document.querySelector('.key[data-key="${releasedKey}"]');

    if (targetBtn) {
    targetBtn.classList.remove('active');
  }
});

// Initialize keyboard
createKeyboard();