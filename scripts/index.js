const btnOpenPopupForm = document.querySelector('#add');
const formAddCat = document.querySelector('#popup-form-cat');
const sectionCard = document.querySelector('.cards');

const popupAddCat = new Popup("popup-add-cats");
popupAddCat.setEventListener();



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

api.getAllCats().then((data) => {
    data.forEach(catData => {
        createCat(catData);
    })
})




function handleFormAddCat(e) {
    e.preventDefault()
    const elementsFromCat = [...formAddCat.elements]
    const dataFormCat = serializeForm(elementsFromCat);

    api.addNewCat(dataFormCat).then(() => {
        createCat(dataFormCat);
    })
        
    popupAddCat.close();
}

btnOpenPopupForm.addEventListener('click', () => popupAddCat.open());
formAddCat.addEventListener('submit', handleFormAddCat);


// document.cookie = 'email=kartmazova.m@mail.ru;samesite=strict;max-age=360'

Cookies.set('cook', 'res')