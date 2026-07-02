import * as THREE from "https://unpkg.com/three@0.166.1/build/three.module.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0, 8, 12);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const sun = new THREE.DirectionalLight(0xffffff, 3);
sun.position.set(5, 15, 5);
scene.add(sun);

scene.add(new THREE.AmbientLight(0xffffff, 1));

const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100),
    new THREE.MeshStandardMaterial({
        color: 0x4CAF50
    })
);

ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// TREE
function makeTree(x, z) {

    const trunk = new THREE.Mesh(
        new THREE.CylinderGeometry(0.2, 0.3, 2),
        new THREE.MeshStandardMaterial({
            color: 0x7b4b22
        })
    );

    trunk.position.set(x, 1, z);
    scene.add(trunk);

    const leaves = new THREE.Mesh(
        new THREE.SphereGeometry(1.2, 20, 20),
        new THREE.MeshStandardMaterial({
            color: 0x2f8f2f
        })
    );

    leaves.position.set(x, 2.6, z);
    scene.add(leaves);
}

for (let i = 0; i < 40; i++) {

    makeTree(
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 80
    );

}

// TEMP CAT
const cat = new THREE.Mesh(
    new THREE.BoxGeometry(0.8, 0.5, 1.4),
    new THREE.MeshStandardMaterial({
        color: 0xff9933
    })
);

cat.position.y = 0.25;
scene.add(cat);

const keys = {};

window.addEventListener("keydown", (e) => {
    keys[e.key.toLowerCase()] = true;
});

window.addEventListener("keyup", (e) => {
    keys[e.key.toLowerCase()] = false;
});

function animate() {

    requestAnimationFrame(animate);

    if (keys["w"]) cat.position.z -= 0.1;
    if (keys["s"]) cat.position.z += 0.1;
    if (keys["a"]) cat.position.x -= 0.1;
    if (keys["d"]) cat.position.x += 0.1;

    camera.position.x = cat.position.x;
    camera.position.z = cat.position.z + 10;

    camera.lookAt(cat.position);

    renderer.render(scene, camera);

}

animate();

window.addEventListener("resize", () => {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

});
