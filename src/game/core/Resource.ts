import { Loader, LoaderResource } from "pixi.js";

type Manifest = {
  [name: string]: string;
};

const loader = new Loader();

async function load(manifest: Manifest) {
  //
  for (const [name, url] of Object.entries(manifest)) {
    loader.add(name, url);
  }

  return new Promise((resolve, reject) => {
    loader.load(resolve);

    loader.onError.add(reject);
  });
}

function get(name: string): LoaderResource {
  return loader.resources[name];
}

export default {
  load,
  get,
};
