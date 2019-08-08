'use strict';

console.log('>> Ready :)');

const input = document.querySelector('.input__field');
const btn = document.querySelector('.btn');
const showList = document.querySelector('.show__list');

const arrFav = [];

const url = 'http://api.tvmaze.com/search/shows?q=';
let ENDPOINT = '';

function fav (event) {
  const item = event.currentTarget;
  const id = item.getAttribute('data-id');
  console.log(id);

  item.classList.toggle('favourite__show');

  if (item.classList.contains('favourite__show') && arrFav.includes(id) === false) {
    arrFav.push(id);
  } else {
    const index = arrFav.indexOf(id);
    if (index > -1) {
      arrFav.splice(index, 1);
    }
  }
  console.log(arrFav);
}


function getEndpoint () {
  ENDPOINT = url + input.value;
  //console.log(ENDPOINT);

  getSeries();
}

function getSeries () {

  fetch(ENDPOINT)
    .then(response => response.json())
    .then(data => {
      //console.log(data[0].show.name);

      let nameList = '';
      for (let item of data) {
        //console.log(item.show.name);

        if (item.show.image === null) {
          nameList += `
            <li class="show" data-id="${item.show.id}">
              <div class="show__container">
                <img src="https://via.placeholder.com/210x295/A7A7A7/?text=TV" alt="${item.show.name}">
                <h2 class="title__name">${item.show.name}</h2>
              </div>
            </li>
          `;
        } else {
          nameList += `
            <li class="show" data-id="${item.show.id}">
              <div class="show__container">
                <img src="${item.show.image.medium}" alt="${item.show.name}">
                <h2 class="title__name">${item.show.name}</h2>
              </div>
            </li>
          `;
        }

      }

      showList.innerHTML = nameList;

      const showFav = document.querySelectorAll('.show');

      for (let i=0; i<showFav.length; i++) {
        showFav[i].addEventListener('click', fav);
      }

    });
}


btn.addEventListener('click', getEndpoint);
