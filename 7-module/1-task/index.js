import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;

    this.render();
    this.addEventListeners();
  }

  render() {
    this.elem = createElement(`
              <div class="ribbon">
                <button class="ribbon__arrow ribbon__arrow_left">
                  <img src="../assets/images/icons/angle-icon.svg" alt="icon" />
                </button>
                <nav class="ribbon__inner">${this.createInnerElem( {categories: this.categories} )}</nav>
                <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
                  <img src="../assets/images/icons/angle-icon.svg" alt="icon" />
                </button>
              </div>
            `);

    this.sub('item').classList.add('ribbon__item_active');
  }

  createInnerElem({categories}) {
    return categories.map(category =>
                    `
                    <a href="#" class="ribbon__item" data-id="${category.id}">${category.name}</a>
                    `).join('');
  }

  addEventListeners() {
    this.sub('arrow_left').onclick = this.onArrowLeftClick;
    this.sub('arrow_right').onclick = this.onArrowRightClick;

    this.elem.onclick = (event) => {
      let itemElem = event.target.closest('.ribbon__item');
      if (itemElem) {
        this.onItemClick(itemElem);
        event.preventDefault();
      }
    };

    this.sub('inner').onscroll = this.onScroll;
  }

  onArrowRightClick = () => {
    let scrolling = 350;
    this.sub('inner').scrollBy(scrolling, 0);
    this.updateArrows();
  }

  onArrowLeftClick = () => {
    let scrolling = 350;
    this.sub('inner').scrollBy(-scrolling, 0);
    this.updateArrows();
  }

  onItemClick(itemElem) {
    let previouslyActive = this.sub('item_active');
    if (previouslyActive) {
      previouslyActive.classList.remove('ribbon__item_active');
    }

    itemElem.classList.add('ribbon__item_active');

    this.elem.dispatchEvent(
      new CustomEvent('ribbon-select', {
        detail: itemElem.dataset.id,
        bubbles: true,
      })
    );
  }

  onScroll = () => {
    this.updateArrows();
  }

  sub(ref) {
    return this.elem.querySelector(`.ribbon__${ref}`);
  }

  scrollRight() {
    return this.sub('inner').scrollWidth - (this.sub('inner').scrollLeft + this.sub('inner').clientWidth);
  }

  scrollLeft() {
    return this.sub('inner').scrollLeft;
  }

  updateArrows() {
    if (this.scrollLeft() > 0) {
      this.sub('arrow_left').classList.add('ribbon__arrow_visible');
    } else {
      this.sub('arrow_left').classList.remove('ribbon__arrow_visible');
    }

    let scrollRight = this.scrollRight();
    scrollRight = scrollRight < 1 ? 0 : scrollRight;
    if (scrollRight > 0) {
      this.sub('arrow_right').classList.add('ribbon__arrow_visible');
    } else {
      this.sub('arrow_right').classList.remove('ribbon__arrow_visible');
    }
  }

}
