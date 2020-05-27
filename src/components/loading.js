import AbstractComponent from '../components/abstract-component';

const createLoadingTemplate = () => {
  return (
    `<p class="board__no-tasks">
      Loading...
    </p>`
  );
};

export default class Loading extends AbstractComponent {
  getTemplate() {
    return createLoadingTemplate();
  }
}
