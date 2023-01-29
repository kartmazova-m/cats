class Card {
    constructor(dataCat, selectorTemplate) {
        this.dataCat = dataCat;
        this.selectorTemplate = selectorTemplate;
    }

    _getTemplate() { 
        return document.querySelector(this.selectorTemplate).content.querySelector('.card');

    }

    getElement() {
        this.element = this._getTemplate().cloneNode(true); 
        const cardTitle = this.element.querySelector('.card__name');
        const cardImage = this.element.querySelector('.card__image');
        const cardLike = this.element.querySelector('.card__like');

        cardTitle.textContent = this.dataCat.name;
        cardImage.src = this.dataCat.image;

        if (!this.dataCat.favorite) {
            cardLike.classList.toggle('card__like_active');
        } else {
            cardLike.remove();
        }

        return this.element
    }

    setElement() {

    }

}
