import * as storageCtrl from './storageCtrl.js';
import * as dataCtrl from './dataCtrl.js';
import * as uiCtrl from './uiCtrl.js';

const init = () => {
  const items = dataCtrl.todoData;
  uiCtrl.renderPage(items);
};

init();
