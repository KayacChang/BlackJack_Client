import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Game from './game';
import UI from './ui';
import { i18n, gsap } from './plugins';
import service from './service';
import './index.scss';

const Root = (
  <React.StrictMode>
    <App game={Game} ui={<UI />} />
  </React.StrictMode>
);

async function main() {
  //
  await Promise.all([
    //
    i18n.init(),
    gsap.init(),
    service.connect(),
  ]);

  ReactDOM.render(Root, document.getElementById('root'));
}

main();
