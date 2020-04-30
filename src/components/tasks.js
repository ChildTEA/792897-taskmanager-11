import AbstractComponent from '../components/abstract-component';

const createTasksTemplate = () => {
  return (
    `<div class="board__tasks"></div>`
  );
};


export default class Tasks extends AbstractComponent {
  getTemplate() {
    return createTasksTemplate();
  }
}
