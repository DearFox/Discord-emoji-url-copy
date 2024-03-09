// ==UserScript==
// @name         Discord emoji url copy
// @namespace    https://github.com/DearFox/Discord-emoji-url-copy
// @version      0.2
// @description  Click on the gray emoji in the list of your emojis to copy the link to it. (does not remove the advertising sign about purchasing discord nitro)
// @author       DearFox
// @match        https://discord.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=discord.com
// @grant        none
// @updateURL    https://github.com/DearFox/Discord-emoji-url-copy/raw/main/discord-emoji-url-copy.user.js
// @downloadURL  https://github.com/DearFox/Discord-emoji-url-copy/raw/main/discord-emoji-url-copy.user.js
// ==/UserScript==

(function() {
    'use strict';
    // Function to log the current element to the console
function logCurrentElement() {
  const image = this.querySelector('img');
  if (image) {
    console.log(image.src.replace("webp", "png"));
      navigator.clipboard.writeText(image.src.replace("webp", "png"))
  .then(() => {
    // Получилось!
  })
  .catch(err => {
    console.log('Something went wrong', err);
  });
  }
}

// Function to add event listener to buttons
function addButtonListeners() {
  const buttons = document.querySelectorAll('.emojiItemDisabled__36cbf'); // <== Возможно нужно будет поменять emojiItemDisabled__36cbf на другой, если дискорд обновится
  buttons.forEach(button => {
    button.addEventListener('click', logCurrentElement);
  });
}

// Initial setup
addButtonListeners();

// Monitor DOM changes and update event listeners
const observer = new MutationObserver(mutationsList => {
  for (let mutation of mutationsList) {
    if (mutation.type === 'childList' && mutation.addedNodes.length) {
      addButtonListeners();
    }
  }
});

observer.observe(document.body, { childList: true, subtree: true });
    // Your code here...
})();
