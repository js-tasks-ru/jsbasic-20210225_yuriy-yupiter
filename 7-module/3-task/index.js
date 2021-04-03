import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  #steps;
  #sliderSegments;
  #value;
  constructor({ steps, value = 0 }) {
    this.#steps = steps;
    this.#sliderSegments = steps - 1;
    this.#value = value;

    this.#render();
    this.#addEventListeners();
    this.#setValue(this.#value);
  }

  #render() {
    this.elem = createElement(`
                                    <div class="slider">
                                      <div class="slider__thumb">
                                        <span class="slider__value"></span>
                                      </div>
                                      <div class="slider__progress"></div>
                                      <div class="slider__steps">
                                        ${'<span></span>'.repeat(this.#steps)}
                                      </div>
                                    </div>
                                  `);
  }

  #setValue(value) {

    let valuePercents = (value / this.#sliderSegments) * 100;

    this.sub('thumb').style.left = `${valuePercents}%`;
    this.sub('progress').style.width = `${valuePercents}%`;

    this.sub('value').innerHTML = value;

    if (this.sub('step-active')) {
      this.sub('step-active').classList.remove('slider__step-active');
    }

    this.sub('steps').querySelectorAll('span')[value].classList.add('slider__step-active');
    return value;
  }

  #addEventListeners() {
    this.elem.onclick = this.onClick;
  }

  onClick = event => {
    let positionLeft = (event.clientX - this.elem.getBoundingClientRect().left) / this.elem.offsetWidth;

    this.#value = this.#setValue(Math.round(this.#sliderSegments * positionLeft));

    this.elem.dispatchEvent(
      new CustomEvent('slider-change', {
        detail: this.#value,
        bubbles: true
      })
    );
  }

  sub(ref) {
    return this.elem.querySelector(`.slider__${ref}`);
  }

}
