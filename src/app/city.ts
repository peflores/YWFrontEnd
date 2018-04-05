export class City {

  private saludo: string="hola mundo";
  constructor(public title: string, public lat: string, public lon: string,
              public description: string, public date: string,
              public temp: string, public text: string
              ) {}
  setSaludo() {
    return this.saludo;
  }
}
