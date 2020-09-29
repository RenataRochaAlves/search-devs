let container = document.querySelector('.devs');

window.addEventListener('load', () => {
  async function doFetch() {
    let res = await fetch('http://localhost:3001/devs');
    let json = await res.json();

    render(doMap(json));
  }

  doFetch();
});

function doMap(devs) {
  let devsMapped = devs.map((dev) => {
    return {
      name: dev.name,
      searchName: dev.name.toLowerCase().replace(/\s+/g, ''),
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
