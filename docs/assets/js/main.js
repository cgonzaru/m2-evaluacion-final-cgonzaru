"use strict";const input=document.querySelector(".input__field"),btn=document.querySelector(".btn"),showList=document.querySelector(".show__list"),showFavList=document.querySelector(".show__fav-list"),savedTasks=JSON.parse(localStorage.getItem("obj"));let arrObj=[];arrObj=savedTasks||[];let showLS="";for(let s=0;s<arrObj.length;s++)showLS+=`\n    <li class="show">\n      <div class="show__container">\n        <img src="${arrObj[s].showImg}" alt="${arrObj[s].showName}">\n        <h2 class="title__name">${arrObj[s].showName}</h2>\n      </div>\n    </li>\n  `;showFavList.innerHTML=showLS;const url="http://api.tvmaze.com/search/shows?q=";let ENDPOINT="";function fav(s){const t=s.currentTarget,e={showId:t.getAttribute("data-id"),showName:t.getAttribute("data-name"),showImg:t.getAttribute("data-src")};let a="";if(t.classList.toggle("favourite__show"),t.classList.contains("favourite__show")){if(!1===arrObj.includes(e)){arrObj.push(e);for(let s=0;s<arrObj.length;s++)null===arrObj[s].showImg?a+=`\n            <li class="show">\n              <div class="show__container">\n                <img src="https://via.placeholder.com/210x295/A7A7A7/?text=TV" alt="${arrObj[s].showName}">\n                <h2 class="title__name">${arrObj[s].showName}</h2>\n              </div>\n            </li>\n          `:a+=`\n            <li class="show">\n              <div class="show__container">\n                <img src="${arrObj[s].showImg}" alt="${arrObj[s].showName}">\n                <h2 class="title__name">${arrObj[s].showName}</h2>\n              </div>\n            </li>\n          `}localStorage.setItem("obj",JSON.stringify(arrObj))}else{const s=arrObj.indexOf(e);s>-1&&arrObj.splice(s,1)}showFavList.innerHTML=a}function getEndpoint(){ENDPOINT=url+input.value,getSeries()}function getSeries(){fetch(ENDPOINT).then(s=>s.json()).then(s=>{let t="";for(let e of s)null===e.show.image?t+=`\n            <li class="show" data-id="${e.show.id}" data-name="${e.show.name}" data-src="https://via.placeholder.com/210x295/A7A7A7/?text=TV">\n              <div class="show__container">\n                <img class="card" src="https://via.placeholder.com/210x295/A7A7A7/?text=TV" alt="${e.show.name}">\n                <h2 class="title__name">${e.show.name}</h2>\n              </div>\n            </li>\n          `:t+=`\n            <li class="show" data-id="${e.show.id}" data-name="${e.show.name}" data-src="${e.show.image.medium}">\n              <div class="show__container">\n                <img class="card" src="${e.show.image.medium}" alt="${e.show.name}">\n                <h2 class="title__name">${e.show.name}</h2>\n              </div>\n            </li>\n          `;showList.innerHTML=t;const e=document.querySelectorAll(".show");for(let s=0;s<e.length;s++)e[s].addEventListener("click",fav)})}btn.addEventListener("click",getEndpoint);