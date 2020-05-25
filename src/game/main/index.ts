import BG from './bg.jpg';

const resources = {
  BG_IMG: BG,
};

const stage = {
  //
  background: {
    //
    components: {
      //
      Transform: {
        position: {
          x: 0,
          y: 0,
        },
      },
      //
      Render: {
        type: 'Sprite',
        texture: 'BG_IMG',
      },
      //
      BoxModel: {
        width: '100%',
        height: '100%',
      },
    },
  },
};

export default {
  resources,
  stage,
};
