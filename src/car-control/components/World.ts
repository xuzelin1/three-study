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

  constructor() {
    super();

    this.setFloor();
    this.setCar();
  }
  
  setCar() {
    this.car = new Car();
  }
  setFloor() {
    this.floor = new Floor();
  }
}