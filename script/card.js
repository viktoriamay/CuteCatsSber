class Card {
    constructor(data, selectorTemplate) {
        this._data = data;
        this._selectorTemplate = selectorTemplate;
    }
    
    _getTemplate() {
        return document
            .querySelector(this._selectorTemplate)
            .content.querySelector('.card'); 
    }

    getElement() {
        this.element = this._getTemplate().cloneNode(true);

        const cardTitle = this.element.querySelector('.card__name');
        const cardImage = this.element.querySelector('.card__image');
        const cardLike = this.element.querySelector('.card__like');

        if (!this._data.favorite) {
            cardLike.classList.add('card__like-dislike')
        }

        const popupEditCat = new Popup('popup-edit-cats');
        popupEditCat.setEventListener();

        cardTitle.addEventListener('click', () => {
            popupEditCat.open();
        });
        
        cardTitle.textContent = this._data.name;
        cardImage.src = this._data.image;
        return this.element;   
    }
}