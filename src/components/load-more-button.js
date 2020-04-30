import AbstractComponent from '../components/abstract-component';

const createLoadMoreButtonTemplate = () => {
  return (
    `<button class="load-more" type="button">load more</button>`
  );
};

export default class LoadMoreButton extends AbstractComponent {
  getTemplate() {
    return createLoadMoreButtonTemplate();
  }

  setLoadMoreButtonClickHendler(hendler) {
    this.getElement().addEventListener(`click`, hendler);
  }
}
