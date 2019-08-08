'use strict';

console.log('>> Ready :)');

const input = document.querySelector('.input__field');
const btn = document.querySelector('.btn');
const seriesList = document.querySelector('.series__list');

const url = 'http://api.tvmaze.com/search/shows?q=';
let ENDPOINT = '';

function getTitle () {
  ENDPOINT = url + input.value;
  console.log(ENDPOINT);

  getSeries();
}

function getSeries () {

  fetch(ENDPOINT)
    .then(response => response.json())
    .then(data => {
      console.log(data[0].show.name);
    });
}



btn.addEventListener('click', getTitle);
