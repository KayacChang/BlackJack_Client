import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Game from './game';
import { App, UI } from './ui';
import { i18n, gsap } from './plugins';
import service from './services';
import './index.scss';

import store from './store';

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
      <Provider store={store}>
        <App game={Game} ui={<UI />} />
      </Provider>
    </React.StrictMode>
  );
  ReactDOM.render(Root, document.getElementById('root'));

  setTimeout(async () => {
    const game = await service.join(1);

    console.log(game);
  }, 1000);
}

main();
