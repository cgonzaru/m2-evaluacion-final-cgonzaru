'use strict';

console.log('>> Ready :)');

const input = document.querySelector('.input__field');
const btn = document.querySelector('.btn');
const showList = document.querySelector('.show__list');

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
      //console.log(data[0].show.name);

      //obtenemos el name para meterlo en la lista
      let nameList = '';
      for (let item of data) {
        console.log(item.show.name);




        nameList += `
          <li class="show" data-id="${item.show.id}">
            <div class="show__container">
              <h2 class="title__name">${item.show.name}</h2>
              <img src="${item.show.image.medium}" alt="${item.show.name}">
            </div>
          </li>
        `;

      }


      showList.innerHTML = nameList;


    });
}



btn.addEventListener('click', getTitle);
