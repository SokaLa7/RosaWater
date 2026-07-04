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

camera.position.set(0,4,8);

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

        (Math.random()-0.5)*220

    );

}
// ===== CAT =====

const cat = new THREE.Group();

const fur = new THREE.MeshStandardMaterial({
    color:0xff9933
});

// Body
const body = new THREE.Mesh(
    new THREE.BoxGeometry(1.0,0.55,2.4),
    fur
);

body.position.y = 0.6;
cat.add(body);

// Head
const head = new THREE.Mesh(
    new THREE.BoxGeometry(0.95,0.8,0.95),
    fur
);

head.position.set(0,1,-1.55);
cat.add(head);

// Ears
function makeEar(x){

    const ear = new THREE.Mesh(
        new THREE.ConeGeometry(0.12,0.3,4),
        fur
    );

    ear.position.set(x,1.45,-1.72);

    cat.add(ear);

}

makeEar(-0.22);
makeEar(0.22);

// Legs
function makeLeg(x,z){

    const leg = new THREE.Mesh(
        new THREE.BoxGeometry(0.2,0.6,0.2),
        fur
    );

    leg.position.set(x,0.3,z);

    cat.add(leg);

}

makeLeg(-0.35,-0.8);
makeLeg(0.35,-0.8);
makeLeg(-0.35,0.8);
makeLeg(0.35,0.8);

// Tail
const tail = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05,0.08,1.3),
    fur
);

tail.rotation.x = -Math.PI/4;
tail.position.set(0,0.9,1.6);

cat.add(tail);

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

    camera.position.x = cat.position.x;
    camera.position.y = 4;
    camera.position.z = cat.position.z + 8;

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
