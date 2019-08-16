import React, { Component } from 'react';
import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    SphereGeometry,
    MeshPhongMaterial,
    Mesh,
    TextureLoader,
    AmbientLight
} from 'three';
import mapTexture from '../assets/icon3.png';

export class Globe extends Component {
    componentDidMount = () => {
        this.scene = new Scene();
        this.camera = new PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
        this.renderer = new WebGLRenderer();
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.mount.appendChild( this.renderer.domElement );
        this.addGlobe();
        this.addLighting();
        this.camera.position.z = 2;
        document.onkeydown = this.moveCamera;
        this.animate();
    }
    addGlobe = () => {
        let geometry = new SphereGeometry(1, 50, 50);
        let loader = new TextureLoader();
        let texture = loader.load(mapTexture);
        let material = new MeshPhongMaterial({
            color: 0xffffff,
            specular: 0xffffff,
            shininess: 100,
            map: texture,
            specularMap: texture,
            normalMap: texture
        });
        this.cube = new Mesh( geometry, material );
        this.scene.add( this.cube );
    }
    addLighting = () => {
        this.light = new AmbientLight( 0xffffff, 1.2);
        this.scene.add( this.light );
    }
    moveCamera = (e) => {
        e = e || window.event;
        switch(e.keyCode){
            case 37:
                this.cube.rotation.y += 0.1;
                //left
                break;
            case 38:
                this.cube.rotation.x += 0.1;
                //up
                break;
            case 39:
                this.cube.rotation.y -= 0.1;
                //right
                break;
            case 40:
                this.cube.rotation.x -= 0.1;
                //down
                break;
            default:
                break;
        }
    }
    animate = () => {
        requestAnimationFrame( this.animate );
        this.renderer.render( this.scene, this.camera );
    }
    render() {
        return (
            <div ref={ref => (this.mount = ref)} />
        )
    }
}

export default Globe;