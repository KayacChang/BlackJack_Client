import React from 'react';
import ReactDOM from 'react-dom';
import Game from './game';
import { App, UI } from './ui';
import { i18n, gsap } from './plugins';
import service from './services';
import './index.scss';

async function main() {
  //
  await Promise.all([
    //
    i18n.init(),
    gsap.init(),
    service.init(),
  ]);

  const Root = (
    <React.StrictMode>
      <App game={Game} ui={<UI />} />
    </React.StrictMode>
  );
  ReactDOM.render(Root, document.getElementById('root'));
}

main();
