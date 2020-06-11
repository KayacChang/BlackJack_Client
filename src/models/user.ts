type Props = {
  id?: any;
  name: any;
};

export default class User {
  id?: number;
  name: string;

  constructor({ name, id }: Props) {
    //
    if (id) {
      this.id = Number(id);
    }

    this.name = String(name);
  }
}
