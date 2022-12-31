const cardsContainer = document.querySelector('.cards');
const btnOpenPopupForm = document.querySelector('#add');
const btnOpenPopupLogin = document.querySelector('#login');
const formCatAdd = document.querySelector('#popup-form-cat');
const formLogin = document.querySelector('#popup-form-login');

const popupAddCat = new Popup('popup-add-cats');
popupAddCat.setEventListener();

const popupLogin = new Popup('popup-login');
popupLogin.setEventListener();

btnOpenPopupForm.addEventListener('click', () => {
  popupAddCat.open();
}); 

btnOpenPopupLogin.addEventListener('click', () => popupLogin.open());

formCatAdd.addEventListener('submit', handleFormAddCat);

formLogin.addEventListener('submit', handleFormLogin);

function serializeForm(elements) {
    const formData = {};

    elements.forEach((input) => {
        if (input.type === 'submit') {
            return
        }

        if (input.type !== 'checkbox') {
            formData[input.name] = input.value;
        }

        if (input.type === 'checkbox') {
            formData[input.name] = input.checked;
        }
    })
    
    return formData;
}

function createCat(dataCat) {
    const cardInstance = new Card(dataCat, '#card-template');
    const newCardElement = cardInstance.getElement();
    cardsContainer.append(newCardElement);
}

function handleFormAddCat(e) {
    e.preventDefault();
    const elementsFormCat = [...formCatAdd.elements];
    const dataFromForm = serializeForm(elementsFormCat);
    api.addNewCat(dataFromForm).then(() => {
        createCat(dataFromForm);
    })
    popupAddCat.close();
}

function handleFormLogin(e) {
    e.preventDefault();
    const elementsFormCat = [...formLogin.elements];
    const dataFromForm = serializeForm(elementsFormCat);
    Cookies.set('email', `email=${dataFromForm.email}`);
    btnOpenPopupLogin.classList.add('visually-hidden');
    popupLogin.close();
}

const isAuth = Cookies.get('email');
if (!isAuth) {
    popupLogin.open();
    btnOpenPopupLogin.classList.remove('visually-hidden');
}

function checkLocalStorage() {
    const localData = JSON.parse(localStorage.getItem('cats'));
    const getTimeExpires = localStorage.getItem('catsRefresh');
    const isActual = new Date() < new Date(getTimeExpires);

    if (localData && localData.length && isActual) {
        localData.forEach(function (catData) {
            createCat(catData)
        })
    } else {
        api.getAllCats().then((data) => {
            data.forEach(function (catData) {
                createCat(catData);
            });
            localStorage.setItem('cats', JSON.stringify(data));
            setDataRefresh(1, 'catsRefresh');
        })
    }
}

function setDataRefresh(minutes, key) {
    const setTime =new Date(new Date().getTime() + minutes * 600);
    localStorage.setItem(key, setTime);
    return setTime;
}

checkLocalStorage();