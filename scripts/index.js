const btnOpenPopupForm = document.querySelector('#add');
const btnLoginOpenPopup = document.querySelector('#login')
const formAddCat = document.querySelector('#popup-form-cat');
const formLogin = document.querySelector('#popup-form-login')
const sectionCard = document.querySelector('.cards');

const popupAddCat = new Popup("popup-add-cats");
popupAddCat.setEventListener();

const popupLogin = new Popup('popup-login');
popupLogin.setEventListener();


// cats.forEach(catData => {
//     const cat = new Card(catData, '#card-template');
//     const firstCat = cat.getElement();
//     sectionCard.append(firstCat);
// })

function createCat(dataCat) {
    const cat = new Card(dataCat, '#card-template');
    const firstCat = cat.getElement();
    sectionCard.append(firstCat);
}

function serializeForm(elements) {
    const formData = {};

    elements.forEach(input => {
        if (input.type === 'submit') {
            return
        }

        if (input.type !== 'checkbox') {
            formData[input.name] = input.value;
        }

        if (input.type === 'checkbox') {
            formData[input.name] = input.checked;
        }
    });
    return formData
}

function setDataRefrash(minutes) {
    const setTime = new Date(new Date().getTime() + minutes * 60000);
    localStorage.setItem('catsRefrash', setTime);
}



function checkLocalStorage() {
    const localData = JSON.parse(localStorage.getItem('cats'));
    const getTimeExpires = localStorage.getItem('catsRefrash')

    if (localData && localData.length && (new Date() < new Date(getTimeExpires))) {
        localData.forEach(catData => {
            createCat(catData);
        })
    } else {
        api.getAllCats().then((data) => {
            data.forEach(catData => {
                createCat(catData);
            });
            localStorage.setItem('cats', JSON.stringify(data));
            setDataRefrash(5);
        })

        
    }
}

checkLocalStorage();

function handleFormAddCat(e) {
    e.preventDefault()
    const elementsFromCat = [...formAddCat.elements]
    const dataFormCat = serializeForm(elementsFromCat);

    api.addNewCat(dataFormCat).then(() => {
        createCat(dataFormCat);
    })
        
    popupAddCat.close();
}

function handleFormLogin(e) {
    e.preventDefault();

    const loginData = [...formLogin.elements];
    const serializeData = serializeForm(loginData);

    Cookies.set('email', `email=${serializeData.email}`);
    btnOpenPopupForm.classList.remove('visually-hidden');
    btnLoginOpenPopup.classList.add('visually-hidden');

    popupLogin.close();

};

btnOpenPopupForm.addEventListener('click', () => popupAddCat.open());
btnLoginOpenPopup.addEventListener('click', () => popupLogin.open());
formAddCat.addEventListener('submit', handleFormAddCat);
formLogin.addEventListener('submit', handleFormLogin);


const isAuth = Cookies.get('email');

if (isAuth) {
    popupLogin.open();
    btnOpenPopupForm.classList.add('visually-hidden');
}



// document.cookie = 'email=kartmazova.m@mail.ru;samesite=strict;max-age=360'

//Cookies.set('cook', 'res')