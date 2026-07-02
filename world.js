import * as THREE from "three";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0,4,8);

// Renderer
const renderer = new THREE.WebGLRenderer({
    antialias:true
});

renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lights
scene.add(new THREE.AmbientLight(0xffffff,1.2));

const sun=new THREE.DirectionalLight(0xffffff,2);

sun.position.set(20,30,10);

scene.add(sun);

// Ground
const ground=new THREE.Mesh(

new THREE.PlaneGeometry(250,250),

new THREE.MeshStandardMaterial({
color:0x5eb75e
})

);

ground.rotation.x=-Math.PI/2;

scene.add(ground);

// Trees
function makeTree(x,z){

const trunk=new THREE.Mesh(

new THREE.CylinderGeometry(.18,.22,2),

new THREE.MeshStandardMaterial({
color:0x7a4a24
})

);

trunk.position.set(x,1,z);

scene.add(trunk);

const leaves=new THREE.Mesh(

new THREE.ConeGeometry(1.2,3,8),

new THREE.MeshStandardMaterial({
color:0x2e8b57
})

);

leaves.position.set(x,3,z);

scene.add(leaves);

}

for(let i=0;i<80;i++){

makeTree(

(Math.random()-0.5)*180,

(Math.random()-0.5)*180

);

}

// ===== CAT =====

const cat=new THREE.Group();

const fur=new THREE.MeshStandardMaterial({
color:0xff9933
});

// Body
const body=new THREE.Mesh(

new THREE.BoxGeometry(1.3,.5,2.2),

fur

);

body.position.y=.65;

cat.add(body);

// Head

const head=new THREE.Mesh(

new THREE.BoxGeometry(.75,.75,.75),

fur

);

head.position.set(0,1,-1.35);

cat.add(head);

// Ears

function ear(x){

const e=new THREE.Mesh(

new THREE.ConeGeometry(.12,.28,4),

fur

);

e.position.set(x,1.45,-1.45);

cat.add(e);

}

ear(-.22);

ear(.22);

// Tail

const tail=new THREE.Mesh(

new THREE.CylinderGeometry(.05,.07,1.3),

fur

);

tail.rotation.x=Math.PI/3;

tail.position.set(0,1,1.45);

cat.add(tail);

// Legs

function leg(x,z){

const l=new THREE.Mesh(

new THREE.BoxGeometry(.22,.65,.22),

fur

);

l.position.set(x,.3,z);

cat.add(l);

}

leg(-.38,-.75);
leg(.38,-.75);
leg(-.38,.75);
leg(.38,.75);

scene.add(cat);
// ===== CONTROLS =====

const keys = {};

window.addEventListener("keydown",(e)=>{
    keys[e.key.toLowerCase()] = true;
});

window.addEventListener("keyup",(e)=>{
    keys[e.key.toLowerCase()] = false;
});

// Cat direction
let angle = 0;

// ===== GAME LOOP =====

function animate(){

    requestAnimationFrame(animate);

    const speed = 0.10;

    if(keys["a"]) angle += 0.04;
    if(keys["d"]) angle -= 0.04;

    cat.rotation.y = angle;

    if(keys["w"]){
        cat.position.x += Math.sin(angle) * speed;
        cat.position.z += Math.cos(angle) * speed;
    }

    if(keys["s"]){
        cat.position.x -= Math.sin(angle) * speed;
        cat.position.z -= Math.cos(angle) * speed;
    }

    // Camera follows behind cat
    camera.position.x = cat.position.x - Math.sin(angle) * 6;
    camera.position.z = cat.position.z - Math.cos(angle) * 6;
    camera.position.y = cat.position.y + 3;

    camera.lookAt(
        cat.position.x,
        cat.position.y + 1,
        cat.position.z
    );

    renderer.render(scene,camera);

}

animate();

// Resize

window.addEventListener("resize",()=>{

    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

});
