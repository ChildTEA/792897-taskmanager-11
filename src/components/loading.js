import AbstractComponent from '../components/abstract-component';

const createLoadingTemplate = () => {
  return (
    `<div style="padding:100px;font-size:46px;color:blue;text-align:center;">
      Loading…
    </div>`
  );
};

export default class Loading extends AbstractComponent {
  getTemplate() {
    return createLoadingTemplate();
  }
}
