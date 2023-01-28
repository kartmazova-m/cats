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
}




function handleFormAddCat(e) {
    e.preventDefault()
    const elementsFromCat = [...formAddCat.elements]
    serializeForm(elementsFromCat) 
    popupAddCat.close();
}

btnOpenPopupForm.addEventListener('click', () => popupAddCat.open());
formAddCat.addEventListener('submit', handleFormAddCat);