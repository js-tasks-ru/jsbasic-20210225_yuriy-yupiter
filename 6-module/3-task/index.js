import createElement from '../../assets/lib/create-element.js';

export default class Carousel {

  constructor(slides) {
    this.slides = slides;

    this.currentSlideNumber = 0;
    this.render();
    this.addEventListeners();
  }

  render() {
    this.elem = createElement(`
        <div class="carousel">
          <div class="carousel__arrow carousel__arrow_right">
            <img src="/assets/images/icons/angle-icon.svg" alt="icon" />
          </div>
          <div class="carousel__arrow carousel__arrow_left">
            <img src="/assets/images/icons/angle-left-icon.svg" alt="icon" />
          </div>
          <div class="carousel__inner">
            ${this.slidesTemplate({ slides: this.slides })}
          </div>
        </div>
        `);
    this.update();
  }

  slidesTemplate({ slides }) {
    let slidesInner = slides.map(item => `
      <div class="carousel__slide" data-id="${item.id}">
        <img
          src="/assets/images/carousel/${item.image}"
          class="carousel__img"
          alt="slide"
        />
        <div class="carousel__caption">
          <span class="carousel__price">€${item.price.toFixed(2)}</span>
          <div class="carousel__title">${item.name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon" />
          </button>
        </div>
      </div>`).join('');
    return slidesInner;
  }

  addEventListeners() {
    this.elem.onclick = this.onContainerClick;
  }

  onContainerClick = ({target}) => {
    let buttonPlus = target.closest('.carousel__button');
    if (buttonPlus) {
      let id = target.closest('[data-id]').dataset.id;
      this.elem.dispatchEvent(new CustomEvent('product-add', {
        detail: id,
        bubbles: true
      }));
      return;
    }
    if (target.closest('.carousel__arrow_right')) {
      this.next();
      return;
    }
    if (target.closest('.carousel__arrow_left')) {
      this.prev();
      return;
    }
  }

  sub(ref) {
    return this.elem.querySelector(`.carousel__${ref}`);
  }

  next() {
    this.currentSlideNumber++;
    this.update();
  }

  prev() {
    this.currentSlideNumber--;
    this.update();
  }

  update() {
    let offset = -this.elem.offsetWidth * this.currentSlideNumber;
    this.sub('inner').style.transform = `translateX(${offset}px)`;

    if (this.currentSlideNumber == this.slides.length - 1) {
      this.sub('arrow_right').style.display = 'none';
    } else {
      this.sub('arrow_right').style.display = '';
    }

    if (this.currentSlideNumber == 0) {
      this.sub('arrow_left').style.display = 'none';
    } else {
      this.sub('arrow_left').style.display = '';
    }
  }

}
