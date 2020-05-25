import BG from './bg.jpg'

const resources = {
  BG_IMG: BG,
}

const stage =  {
  //
  background: {
    //
    components: {
      //
      transform: {
        position: {
          x: 0,
          y: 0,
        },
      },
      //
      render: {
        type: 'Sprite',
        texture: 'BG_IMG',
      },
    },
  },
};

export default {
  resources,
  stage
}
