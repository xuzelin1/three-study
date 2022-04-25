import Controls from "../common/Controls";
import Basic from "./Basic";
import Car from "./Car";
import Floor from "./Floor";

/**
 * the whole world instance
 */
export default class World extends Basic {
  /**
   * the floor instance
   */
  floor!: Floor;

  /**
   * the car instance
   */
  car!: Car;

  /**
   * the control instance
   */
  controls!: Controls;

  constructor() {
    super();

    this.setFloor();
    this.setCar();
    this.setControls();
  }
  
  setCar() {
    this.car = new Car();
  }
  setFloor() {
    this.floor = new Floor();
  }
  setControls() {
    this.controls = new Controls({
      car: this.car,
    });
  }
}