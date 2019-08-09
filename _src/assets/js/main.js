'use strict';

const input = document.querySelector('.input__field');
const btn = document.querySelector('.btn');
const showList = document.querySelector('.show__list');
const showFavList = document.querySelector('.show__fav-list');

const savedTasks = JSON.parse(localStorage.getItem('obj'));
let arrObj = [];
if(savedTasks) {
  arrObj = savedTasks;
} else {
  arrObj = [];
}

let showLS = '';
for(let i=0; i<arrObj.length; i++){
  showLS += `
    <li class="show">
      <div class="show__container">
        <img src="${arrObj[i].showImg}" alt="${arrObj[i].showName}">
        <h2 class="title__name">${arrObj[i].showName}</h2>
      </div>
    </li>
  `;
}
showFavList.innerHTML = showLS;

const url = 'http://api.tvmaze.com/search/shows?q=';
let ENDPOINT = '';

function fav (event) {
  const item = event.currentTarget;
  const id = item.getAttribute('data-id');
  const name = item.getAttribute('data-name');
  const img = item.getAttribute('data-src');
  const obj = {
    'showId': id,
    'showName': name,
    'showImg': img,
  };

  let nameFavList = '';

  item.classList.toggle('favourite__show');

  if (item.classList.contains('favourite__show')) {
    if (arrObj.includes(obj) === false) {
      arrObj.push(obj);
      for (let i=0; i<arrObj.length; i++) {
        if (arrObj[i].showImg === null) { //si la imagen está vacía
          nameFavList += `
            <li class="show">
              <div class="show__container">
                <img src="https://via.placeholder.com/210x295/A7A7A7/?text=TV" alt="${arrObj[i].showName}">
                <h2 class="title__name">${arrObj[i].showName}</h2>
              </div>
            </li>
          `;
        } else {
          nameFavList += `
            <li class="show">
              <div class="show__container">
                <img src="${arrObj[i].showImg}" alt="${arrObj[i].showName}">
                <h2 class="title__name">${arrObj[i].showName}</h2>
              </div>
            </li>
          `;
        }
      }
    }
    localStorage.setItem('obj', JSON.stringify(arrObj));
  } else {
    const index = arrObj.indexOf(obj);
    if (index > -1) {
      arrObj.splice(index, 1);
    }
  }

  showFavList.innerHTML = nameFavList;
}


function getEndpoint () {
  ENDPOINT = url + input.value;

  getSeries();
}

function getSeries () {

  fetch(ENDPOINT)
    .then(response => response.json())
    .then(data => {

      let nameList = '';
      for (let item of data) {

        if (item.show.image === null) {
          nameList += `
            <li class="show" data-id="${item.show.id}" data-name="${item.show.name}" data-src="https://via.placeholder.com/210x295/A7A7A7/?text=TV">
              <div class="show__container">
                <img class="card" src="https://via.placeholder.com/210x295/A7A7A7/?text=TV" alt="${item.show.name}">
                <h2 class="title__name">${item.show.name}</h2>
              </div>
            </li>
          `;
        } else {
          nameList += `
            <li class="show" data-id="${item.show.id}" data-name="${item.show.name}" data-src="${item.show.image.medium}">
              <div class="show__container">
                <img class="card" src="${item.show.image.medium}" alt="${item.show.name}">
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
