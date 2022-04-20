import Basic from "./Basic";
import Floor from "./Floor";

/**
 * the whole world instance
 */
export default class World extends Basic {

  constructor() {
    super();

    new Floor();
  }
}