const CONFIG_API = {
    url: 'https://cats.petiteweb.dev/api/single/joythecat',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
};

class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
        console.log('API');
    }

    getAllCats() {
        fetch(`${this._url}/show`, {
            method: 'GET',
        });
    }

    getAllIds() {
        fetch(`${this._url}/ids`, {
            method: "GET"
        });
    }

    addNewCat(body) {
        fetch(`${this._url}/add`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(body),
        });
    }

    updateCatById(data, idCat) {
        fetch(`${this._url}/update/${idCat}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: this._headers,
        });
    }

    deleteCatById(idCat) {
        fetch(`${this._url}/delete/${idCat}`, {
            method: 'DELETE',
        });
    }
    
    getCatById(idCat) {
        fetch(`${this._url}/show/${idCat}`, {
            method: 'GET',
        });
    }
}

const api = new Api(CONFIG_API);
