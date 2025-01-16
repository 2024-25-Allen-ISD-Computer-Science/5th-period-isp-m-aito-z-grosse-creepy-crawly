import * as THREE from "three";
import * as data from "./data.json";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

camera.position.z = 19;

console.log(data);

function convertToCartesian(lidarData) {
    return lidarData.lidar_test_data.map((entry) => {
        const { start, direction, distance } = entry;
        const { azimuth, elevation } = direction;

        const azimuthRad = (azimuth * Math.PI) / 180;
        const elevationRad = (elevation * Math.PI) / 180;

        const x =
            start.x + distance * Math.cos(elevationRad) * Math.cos(azimuthRad);
        const y =
            start.y + distance * Math.cos(elevationRad) * Math.sin(azimuthRad);
        const z = start.z + distance * Math.sin(elevationRad);

        return {
            id: entry.id,
            start,
            endpoint: { x, y, z },
        };
    });
}

function plotCartesianPoints(cartesianData, start) {

    const sphereGeometry = new THREE.SphereGeometry(0.1, 6, 6);

    const yValues = cartesianData.map(point => point.endpoint.y)
    const minY = Math.min(...yValues);
    const maxY = Math.max(...yValues);

    cartesianData.slice(start).forEach((point) => {
        const normalizedY = (point.endpoint.y - minY) / (maxY - minY);
        const color = new THREE.Color();
        color.setHSL(0.67 * (1 - normalizedY), 1, 0.5)

        const sphereMaterial = new THREE.MeshBasicMaterial({ color: color })
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
        sphere.position.set(
            point.endpoint.x,
            point.endpoint.y,
            point.endpoint.z
        );
        scene.add(sphere);
    });
    return cartesianData.length - start;
}

const cartesianData = convertToCartesian(data);
//plotCartesianPoints(cartesianData, 0);
const gridHelperCM = new THREE.GridHelper(1000, 1000, 0x888888, 0xcccccc) 
const gridHelperM = new THREE.GridHelper(1000, 10, 0xffffff, 0xffffff)

gridHelperCM.material.opacity = 0.2;
gridHelperM.material.opacity = 0.5; 
gridHelperCM.material.transparent = true;
gridHelperM.material.transparent = true

gridHelperM.material.linewidth = 2; 

gridHelperM.position.y = 0.001; 

scene.add(gridHelperCM)
scene.add(gridHelperM)

let lastPointIndex = 0;

function animate() {
    lastPointIndex = plotCartesianPoints(cartesianData, lastPointIndex);
    renderer.render(scene, camera);
}

const controls = new OrbitControls(camera, renderer.domElement);
