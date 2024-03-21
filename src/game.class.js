import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
export class GameScene {
    scene;
    camera;
    renderer;
    mixer;
    mixerUpdate = 0.01;
    pos = 0;
    player;
    init() {
        this.drawScene();
        this.drawPlane();
        this.orbitControl();
        // this.drawSphere()
        this.createModel();
        this.createLight();
        this.movement();
        this.animate();
    }
    drawScene() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(-2, 10, 30);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
    }
    animate() {
        requestAnimationFrame(this.animate.bind(this));
        this.mixer.update(0.01);
        this.renderer.render(this.scene, this.camera);
    }
    drawPlane() {
        const gridHelper = new THREE.GridHelper(1000);
        this.scene.add(gridHelper);
        const planeGeometry = new THREE.PlaneGeometry(1000, 1000);
        const planeMaterial = new THREE.MeshBasicMaterial({ color: "white" });
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.rotation.x = -0.5 * Math.PI;
        this.scene.add(plane);
    }
    drawSphere() {
        const sphereGeomet = new THREE.SphereGeometry();
        const sphereMaterial = new THREE.MeshBasicMaterial({
            color: "blue",
        });
        const sphere = new THREE.Mesh(sphereGeomet, sphereMaterial);
        sphere.position.y = 1;
        this.scene.add(sphere);
    }
    movement() {
        window.addEventListener("keydown", (e) => {
            const key = e.key;
            switch (key) {
                case "w":
                    this.player.position.z -= 1;
                    this.camera.position.z -= 1;
                    break;
            }
        });
    }
    createModel() {
        const loader = new GLTFLoader();
        loader.load("model/Soldier.glb", (model) => {
            this.player = model.scene;
            this.player.scale.set(5, 5, 5);
            this.player.position.set(0, 0, 20);
            this.mixer = new THREE.AnimationMixer(this.player);
            const action = this.mixer.clipAction(model.animations[3]);
            action.play();
            this.scene.add(this.player);
        });
    }
    createLight() {
        const ambient = new THREE.AmbientLight("white", 10);
        this.scene.add(ambient);
    }
    orbitControl() {
        const orbit = new OrbitControls(this.camera, this.renderer.domElement);
        orbit.update();
    }
}
