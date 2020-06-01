import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Game from './game';
import UI from './ui';
import { i18n } from './utils';
import './index.scss';

const Root = (
  <React.StrictMode>
    <App game={Game} ui={<UI />} />
  </React.StrictMode>
);

async function main() {
  await i18n.init();

  ReactDOM.render(Root, document.getElementById('root'));
}

main();
