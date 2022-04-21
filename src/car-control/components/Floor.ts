import * as THREE from'three';
import Basic from "./Basic";


const floorBackgroundVertex = `
varying vec3 vColor;

void main()
{
    gl_Position = vec4(position, 1.0);

    vColor = color;
}
`
const floorBackgroundFragment = `
varying vec3 vColor;

void main()
{
    gl_FragColor = vec4(vColor, 1.0);
}
`

/**
 * the floor component
 */
export default class Floor extends Basic {
  background: any;

  constructor() {
    super();

    this.setBackground();
  }

  /**
   * set the world's background color
   */
  setBackground() {
    this.background = {}

    // Colors
    this.background.colors = {}

    this.background.colors.topLeft = {}
    this.background.colors.topLeft.value = '#e78d4d'
    this.background.colors.topLeft.instance = new THREE.Color(this.background.colors.topLeft.value)

    this.background.colors.topRight = {}
    this.background.colors.topRight.value = '#f09554'
    this.background.colors.topRight.instance = new THREE.Color(this.background.colors.topRight.value)

    this.background.colors.bottomLeft = {}
    this.background.colors.bottomLeft.value = '#efb991'
    this.background.colors.bottomLeft.instance = new THREE.Color(this.background.colors.bottomLeft.value)

    this.background.colors.bottomRight = {}
    this.background.colors.bottomRight.value = '#f5d09a'
    this.background.colors.bottomRight.instance = new THREE.Color(this.background.colors.bottomRight.value)

    // Geometry
    this.background.geometry = new THREE.PlaneGeometry(2, 2, 1, 1)
    
    // Material
    this.background.material = new THREE.ShaderMaterial({
        vertexColors: true,
        depthWrite: false,
        vertexShader: floorBackgroundVertex,
        fragmentShader: floorBackgroundFragment
    })

    // Mesh
    this.background.mesh = new THREE.Mesh(this.background.geometry, this.background.material)
    this.background.mesh.frustumCulled = false
    this.scene.add(this.background.mesh)

    // Update colors
    this.background.updateColors = () =>
    {
        this.background.colors.topLeft.instance.set(this.background.colors.topLeft.value)
        this.background.colors.topRight.instance.set(this.background.colors.topRight.value)
        this.background.colors.bottomLeft.instance.set(this.background.colors.bottomLeft.value)
        this.background.colors.bottomRight.instance.set(this.background.colors.bottomRight.value)
        
        const colors = new Float32Array(4 * 3)
        
        colors[0] = this.background.colors.topLeft.instance.r
        colors[1] = this.background.colors.topLeft.instance.g
        colors[2] = this.background.colors.topLeft.instance.b
        
        colors[3] = this.background.colors.topRight.instance.r
        colors[4] = this.background.colors.topRight.instance.g
        colors[5] = this.background.colors.topRight.instance.b
        
        colors[6] = this.background.colors.bottomLeft.instance.r
        colors[7] = this.background.colors.bottomLeft.instance.g
        colors[8] = this.background.colors.bottomLeft.instance.b
        
        colors[9] = this.background.colors.bottomRight.instance.r
        colors[10] = this.background.colors.bottomRight.instance.g
        colors[11] = this.background.colors.bottomRight.instance.b

        this.background.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    }
    this.background.updateColors()
  }
}