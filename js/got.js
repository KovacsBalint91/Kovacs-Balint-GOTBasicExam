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
  sortByName(array);
  for (var i = 0; i < array.length; i++) {
    if (array[i].dead === '') {
      var newDiv = document.createElement('div');
      newDiv.setAttribute('id', `character${i + 1}`);
      newDiv.className = 'characters';
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
