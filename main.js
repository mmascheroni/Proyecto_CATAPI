const API_URL_RANDOM = ' https://api.thecatapi.com/v1/images/'
const LIMIT_RANDOM = 'search?limit=16'

const API_KEY = "live_AxdLngQtmaQJsTHJsunuuqWHm5cs1PN1N1pevU5u1LgxXliMphLMhcxkK1J0i6UX";

const API_KEY_TWO = "live_p8gZ9g54dCDnjsWwK3Mzm1PAcm7djNnbm4kb29Woc32pxyVVBcLv7ePEfXVfkLN0"

const API_URL_FAVOURITES = "https://api.thecatapi.com/v1/favourites";


const img = document.querySelectorAll('div.item > img')

async function loadRamdomCats() {
    const res = await fetch(`${API_URL_RANDOM}${LIMIT_RANDOM}`, {
        headers: {
            'x-api-key': API_KEY
        }
    })
    const data = await res.json()
    console.log(data)

    const container = document.querySelector('.random'); // Obtener el contenedor por su ID
    while (container.firstChild) { // Mientras haya un primer hijo en el contenedor
        container.removeChild(container.firstChild); // Eliminar el primer hijo
    }


    for (let i = 0; i < data.length; i++) {
        let p = `<p><b>Id:</b>${data[i].id}</p>`;

        document.querySelector('.container').innerHTML += `
        <div class='item'>
            ${p}
            <img src=${data[i].url}><br>
            <button id="${data[i].id}" class="addFavourite" onclick="addCatToFavourite(this.id)">Add Cat To Favourites</button>
        </div>
        `
    }
}


loadRamdomCats()


async function addCatToFavourite(id) {
    console.log(id)
    await fetch(API_URL_FAVOURITES, {
        method: 'POST',
        headers: {
            'x-api-key': API_KEY,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            image_id: `${id}`
        })
    })

    loadFavouritesCats()
}


async function loadFavouritesCats() {
    const res = await fetch(`${API_URL_FAVOURITES}`, {
        headers: {
            'x-api-key': API_KEY,
        }
    })
    const response = await res.json()
    console.log(response)


    const container = document.querySelector('.favourites'); // Obtener el contenedor por su ID
    while (container.firstChild) { // Mientras haya un primer hijo en el contenedor
        container.removeChild(container.firstChild); // Eliminar el primer hijo
    }

    response.forEach(data => {

        const elementExists = document.querySelector(`div[id="${data.image_id}"]`)

        if (!elementExists) {
            let p = `<p><b>Id:</b>${data.image.id}</p>`;

            document.querySelector('.favourites').innerHTML += `
            <div id="${data.image.id}" class='item'>
                ${p}
                <img src=${data.image.url}><br>
                <button id="${data.id}" class="quitFavourite" onclick="deleteFavouriteCat(this.id)">Quit Cat To Favourites</button>
            </div>
        `
        }

    })
}
loadFavouritesCats()

async function deleteFavouriteCat(id) {
    const res = await fetch(`${API_URL_FAVOURITES}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            "x-api-key": API_KEY,
        }
    })
    const data = await res.json()
    console.log(data)

    if (res.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + res.status + data.message;
    } else {
        console.log('Michi eliminado de favoritos' + data.id)
    }

    loadFavouritesCats()
}
