import { Loader, IResourceDictionary, LoaderResource } from "pixi.js";

type Tasks = {
  [name: string]: string;
};

export class Package {
  //
  private loader = new Loader();

  constructor(public name: string) {}

  async load(tasks: Tasks): Promise<IResourceDictionary> {
    //
    const loader = this.loader;

    // Add tasks
    for (const [name, url] of Object.entries(tasks)) {
      loader.add(name, url);
    }

    // Fetching
    await new Promise((resolve, reject) => {
      loader.load((_, res) => resolve(res));

      loader.onError.add(reject);
    });

    return loader.resources;
  }

  getRes(name: string): LoaderResource {
    //
    return this.loader.resources[name];
  }
}
