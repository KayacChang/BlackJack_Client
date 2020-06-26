import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Game from './game';
import { App, UI } from './ui';
import { i18n, gsap } from './plugins';
import service from './services';
import './index.scss';

import store from './store';
import { getToken } from './utils';

async function main() {
  //
  await Promise.all([
    i18n.init(),
    gsap.init(),
    service.init({
      token: `Bearer ${
        await getToken()
        // getURLParam('token')
      }`,
      game_token: ``,
      game_id: `209B407F0F9751E3B87751FD8C99EDC9`,
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
    await service.joinRoom(1);
    // console.log(game);
  }, 1000);
}

main();
