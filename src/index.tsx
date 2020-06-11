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
    i18n.init(),
    gsap.init(),
    service.init({
      token: '$2y$10$g27N1Zk/EuqTZQYBkSmWhel0VEOln2ZNmbIvrItEbkyoV77nHhZ6u',
      gameID: '209B407F0F9751E3B87751FD8C99EDC9',
      gameToken: '',
    }),
  ]);

  const Root = (
    <React.StrictMode>
      <App game={Game} ui={<UI />} />
    </React.StrictMode>
  );
  ReactDOM.render(Root, document.getElementById('root'));

  setTimeout(async () => {
    await service.join(1);
  }, 1000);
}

main();
