import * as THREE from "https://unpkg.com/three@0.166.1/build/three.module.js";

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

// Camera
const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
);

camera.position.set(0,2,5);

// Renderer
const renderer = new THREE.WebGLRenderer({
antialias:true
});

renderer.setSize(
window.innerWidth,
window.innerHeight
);

document.body.style.margin="0";
document.body.appendChild(renderer.domElement);

// Lights
scene.add(
new THREE.AmbientLight(
0xffffff,
1.2
)
);

const sun=new THREE.DirectionalLight(
0xffffff,
2
);

sun.position.set(
20,
30,
10
);

scene.add(sun);
// Ground
const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(300,300),
    new THREE.MeshStandardMaterial({
        color:0x55aa55
    })
);

ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// Tree function
function makeTree(x,z){

    const trunk = new THREE.Mesh(

        new THREE.CylinderGeometry(
            0.2,
            0.25,
            2
        ),

        new THREE.MeshStandardMaterial({
            color:0x7b4b22
        })

    );

    trunk.position.set(x,1,z);

    scene.add(trunk);

    const leaves = new THREE.Mesh(

        new THREE.ConeGeometry(
            1.2,
            3,
            8
        ),

        new THREE.MeshStandardMaterial({
            color:0x2f8f2f
        })

    );

    leaves.position.set(x,3,z);

    scene.add(leaves);

}

// Random forest

for(let i=0;i<70;i++){

    makeTree(

        (Math.random()-0.5)*220,

        (Math.random()-0.5)*
// =====================
// CAT
// =====================

const cat = new THREE.Group();

const fur = new THREE.MeshStandardMaterial({
    color: 0xff9933
});
    // Chest

const chest = new THREE.Mesh(
    new THREE.SphereGeometry(0.42, 24, 24),
    fur
);

chest.scale.set(1.0, 0.9, 1.25);
chest.position.set(0, 0.95, 0);

cat.add(chest);
    // Ribcage

const ribs = new THREE.Mesh(
    new THREE.SphereGeometry(0.40, 24, 24),
    fur
);

ribs.scale.set(1.0, 0.85, 1.5);
ribs.position.set(0, 0.95, 0.45);

cat.add(ribs);
    // Hips

const hips = new THREE.Mesh(
    new THREE.SphereGeometry(0.42, 24, 24),
    fur
);

hips.scale.set(1.05, 0.95, 1.1);
hips.position.set(0, 0.92, 1.0);

cat.add(hips);

scene.add(cat);
// =========================
// JOYSTICK VARIABLES
// =========================

let joyX = 0;
let joyY = 0;

const base = document.getElementById("joystickBase");
const stick = document.getElementById("joystickStick");

if (base) {

    base.addEventListener("pointerdown", startMove);
    base.addEventListener("pointermove", moveStick);
    window.addEventListener("pointerup", endMove);

}

function startMove(e) {

    moveStick(e);

}

function moveStick(e) {

    const rect = base.getBoundingClientRect();

    let x = e.clientX - rect.left - 65;
    let y = e.clientY - rect.top - 65;

    const d = Math.sqrt(x * x + y * y);

    if (d > 40) {

        x = x / d * 40;
        y = y / d * 40;

    }

    stick.style.left = (40 + x) + "px";
    stick.style.top = (40 + y) + "px";

    joyX = x / 40;
    joyY = y / 40;

}

function endMove() {

    joyX = 0;
    joyY = 0;

    stick.style.left = "40px";
    stick.style.top = "40px";

}
// =========================
// CAT MOVEMENT
// =========================

let angle = 0;

function animate() {

    requestAnimationFrame(animate);

    const speed = 0.12;

    if (joyX !== 0 || joyY !== 0) {

        angle = Math.atan2(joyX, joyY);

        cat.rotation.y = angle;

        cat.position.x += Math.sin(angle) * (-joyY) * speed;
        cat.position.z += Math.cos(angle) * (-joyY) * speed;

    }
    
// Camera Follow
const cameraDistance = 6;
const cameraHeight = 3.5;

camera.position.x = cat.position.x - Math.sin(angle) * cameraDistance;
camera.position.y = cat.position.y + cameraHeight;
camera.position.z = cat.position.z - Math.cos(angle) * cameraDistance;

camera.lookAt(
    cat.position.x,
    cat.position.y + 1,
    cat.position.z
);
    renderer.render(scene, camera);

}

animate();

window.addEventListener("resize", () => {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

});
