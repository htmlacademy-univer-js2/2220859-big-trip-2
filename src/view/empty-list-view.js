
import { createElement } from '../render.js';

const createFiltersTemplate = () => (
  `
  <p class="trip-events__msg">Click New Event to create your first point</p>
`
);

export default class EmptyListView {
  #element = null;

  get template() {
    return createFiltersTemplate();
  }

  get element () {
    if (!this.#element){
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement () {
    this.#element = null;
  }
}