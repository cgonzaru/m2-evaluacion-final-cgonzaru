'use strict';

console.log('>> Ready :)');

const input = document.querySelector('.input__field');
const btn = document.querySelector('.btn');
const seriesList = document.querySelector('.series__list');

function writte () {
  seriesList.innerHTML = input.value;
}

btn.addEventListener('click', writte);
