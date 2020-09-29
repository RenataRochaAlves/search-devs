let container = document.querySelector('.devs');
let form = document.querySelector('form');
let searchInput = document.getElementById('search');

window.addEventListener('load', () => {
  async function getArrayOfDevs() {
    let devsArray = await doFetch();
    render(doMap(devsArray));
  }

  getArrayOfDevs();
});

async function doFetch() {
  let res = await fetch('http://localhost:3001/devs');
  let json = await res.json();

  return json;
}

function doMap(devs) {
  let devsMapped = devs.map((dev) => {
    return {
      name: dev.name,
      searchName: dev.name
        .toLowerCase()
        .replace(/\s+/g, '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, ''),
      picture: dev.picture,
      languages: dev.programmingLanguages.map((language) => {
        return {
          languageName: language.id,
          icon: `./img/${language.id.toLowerCase()}.png`,
        };
      }),
    };
  });

  return devsMapped;
}

function render(json) {
  container.innerHTML = '';
  let devsFounded = `<h2>${json.length} dev(s) encontrado(s)</h2>`;
  container.innerHTML = devsFounded;

  json.forEach((dev) => {
    let devDiv = `
        <div class="dev">
        <img class="avatar" src="${dev.picture}" alt="${dev.name}">
        <div class="info">
        <h3>${dev.name}</h3>
        <div class="languages">`;

    let languages = '';
    dev.languages.forEach((language) => {
      languages += `<img class="icon" src="${language.icon}" alt="${language.languageName}">`;
    });

    let divEnd = `
        </div>
        </div>
        </div>
        `;

    container.innerHTML += devDiv + languages + divEnd;
  });
}

form.addEventListener('submit', (event) => event.preventDefault());

searchInput.addEventListener('keyup', (event) => {
  async function getOriginalArray() {
    let devsArray = await doFetch();
    let mappedArray = await doMap(devsArray);
    filterByInput(mappedArray);
  }

  function filterByInput(array) {
    // array = doMap(array);
    let searchedDevs = array.filter((dev) => {
      return dev.searchName.includes(
        event.target.value
          .toLowerCase()
          .replace(/\s+/g, '')
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
      );
    });

    render(searchedDevs);
  }

  getOriginalArray();
});
