function getData(url, callbackFunc) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function becauseOfEsLint() {
    if (this.readyState === 4 && this.status === 200) {
      callbackFunc(this);
    }
  };
  xhttp.open('GET', url, true);
  xhttp.send();
}

function successAjax(xhttp) {
  // itt a json content, benne a data változóban
  var userDatas = JSON.parse(xhttp.responseText)[2].data;
  /*
      Pár sorral lejebb majd ezt olvashatod:
      IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ!

      Na azokat a függvényeket ITT HÍVD MEG!

      A userDatas NEM GLOBÁLIS változó, ne is tegyétek ki globálisra. Azaz TILOS!
      Ha valemelyik függvényeteknek kell, akkor paraméterként adjátok át.
    */
  makeDivsForCharacters(userDatas);
  fillDivsWithCharacters(userDatas);
  characterSearch(userDatas);
}

// Írd be a json fileod nevét/útvonalát úgy, ahogy nálad van
getData('/json/characters.json', successAjax);

// Live servert használd mindig!!!!!
/* IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ! */

// Név szerinti rendezés
function sortByName(array) {
  for (var i = 0; i < array.length - 1; i++) {
    for (var j = i + 1; j < array.length; j++) {
      if (array[i].name > array[j].name) {
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
  }
  return array;
}

// Divek létrehozása
function makeDivsForCharacters(array) {
  makeSideDiv();
  sortByName(array);
  for (var i = 0; i < array.length; i++) {
    if (array[i].dead === '') {
      var newDiv = document.createElement('div');
      newDiv.setAttribute('id', `character${i + 1}`);
      newDiv.className = 'characters';
      newDiv.character = array[i];
      newDiv.onclick = function eslint() {
        oneCharacterInfos(this.character);
      };
      document.querySelector('.character-list').appendChild(newDiv);
    }
  }
}

// Divek feltöltése
function fillDivsWithCharacters(array) {
  sortByName(array);
  var message = '';
  for (var i = 0; i < array.length; i++) {
    if (array[i].dead === '') {
      message += `<img class='character-image' src=/${array[i].portrait} alt=${array[i].name}<br>`;
      message += `${array[i].name}`;
      characterToTheDiv(`#character${i + 1}`, message);
      message = '';
    }
  }
  return message;
}

// Kiíratás
function characterToTheDiv(destination, message) {
  document.querySelector(destination).innerHTML = message;
}

// Jobb oldali sávba csinálok 2 divet. Ide megy a logo és a kattintás/keresés.

function makeSideDiv() {
  var sideDiv = document.querySelector('.one-character');
  var logoDiv = document.createElement('div');
  var characterInfo = document.createElement('div');
  logoDiv.className = 'logo';
  characterInfo.className = 'selected-character';
  sideDiv.appendChild(logoDiv);
  sideDiv.appendChild(characterInfo);
}

// Kattintásra egy karakter infoi a jobb oldali sávba
function oneCharacterInfos(array) {
  var message = '';
  for (var i in array) {
    if (Object.prototype.hasOwnProperty.call(array, i)) {
      message +=
      `<img class='side-picture' src=/${array.picture} alt=${array.name} onerror=this.src='/assets/downloaded/signal-error.png'><br>
      <img class="house-icon" src="/assets/houses/${array.house}.png" alt="${array.name} has no house" onerror=this.src='/assets/downloaded/house-error.png'>
      ${array.name}<br><br><br>
      ${array.bio}`;
      putToTheSideDiv(message);
      message = '';
    }
  }
}

function putToTheSideDiv(message) {
  document.querySelector('.selected-character').innerHTML = message;
}

// Keresés
function characterSearch(data) {
  document.querySelector('#search-button').onclick = function iLoveEslint() {
    var input = document.querySelector('#search-text').value.toLowerCase();
    for (var i = 0; i < data.length; i++) {
      if (data[i].name.toLowerCase().indexOf(input) !== -1 && data[i].dead === '' && input !== '') {
        oneCharacterInfos(data[i]);
        break;
      } else {
        document.querySelector('.selected-character').innerHTML = '<p class="not-found-picture"></p><p class="not-found-text">\Character not found\</p>';
      }
    }
  };
}
