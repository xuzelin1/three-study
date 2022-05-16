import Car from "../components/Car";

export default class Controls {
  car!: Car;

  constructor(options?: any) {
    this.car = options.car;
    this.setKeyboard();
  }

  setKeyboard() {
    window.addEventListener('keydown', (e: any) => {
      console.log(e);
      
      switch (e.key) {
        case 'ArrowUp':
          this.car.instance.translateZ(0.8);
      }
    })
  }
}