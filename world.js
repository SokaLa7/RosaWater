import * as THREE from "https://unpkg.com/three@0.166.1/build/three.module.js";

// Scene
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
const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.style.margin="0";
document.body.appendChild(renderer.domElement);

// Lights
scene.add(new THREE.AmbientLight(0xffffff,1.2));

const sun=new THREE.DirectionalLight(0xffffff,2);
sun.position.set(20,30,10);
scene.add(sun);

// Ground
const ground=new THREE.Mesh(
    new THREE.PlaneGeometry(300,300),
    new THREE.MeshStandardMaterial({color:0x55bb55})
);

ground.rotation.x=-Math.PI/2;
scene.add(ground);

// Trees
function tree(x,z){

    const trunk=new THREE.Mesh(
        new THREE.CylinderGeometry(.2,.25,2),
        new THREE.MeshStandardMaterial({color:0x7b4b22})
    );

    trunk.position.set(x,1,z);
    scene.add(trunk);

    const leaves=new THREE.Mesh(
        new THREE.ConeGeometry(1.3,3,8),
        new THREE.MeshStandardMaterial({color:0x2e8b57})
    );

    leaves.position.set(x,3,z);
    scene.add(leaves);

}

for(let i=0;i<80;i++){

    tree(
        (Math.random()-0.5)*220,
        (Math.random()-0.5)*220
    );

}

// CAT
const cat=new THREE.Group();

const fur=new THREE.MeshStandardMaterial({
    color:0xff9933
});

const body=new THREE.Mesh(
    new THREE.BoxGeometry(1.2,.5,2),
    fur
);

body.position.y=.6;
cat.add(body);

const head=new THREE.Mesh(
    new THREE.BoxGeometry(.8,.8,.8),
    fur
);

head.position.set(0,1,-1.3);
cat.add(head);

function ear(x){

    const e=new THREE.Mesh(
        new THREE.ConeGeometry(.12,.3,4),
        fur
    );

    e.position.set(x,1.45,-1.45);
    cat.add(e);

}

ear(-.22);
ear(.22);

function leg(x,z){

    const l=new THREE.Mesh(
        new THREE.BoxGeometry(.2,.6,.2),
        fur
    );

    l.position.set(x,.3,z);
    cat.add(l);

}

leg(-.35,-.7);
leg(.35,-.7);
leg(-.35,.7);
leg(.35,.7);

const tail=new THREE.Mesh(
    new THREE.CylinderGeometry(.05,.08,1.2),
    fur
);

tail.rotation.x=Math.PI/3;
tail.position.set(0,.9,1.35);
cat.add(tail);

scene.add(cat);

// Controls
const keys={};

window.addEventListener("keydown",e=>{
    keys[e.key.toLowerCase()]=true;
});

window.addEventListener("keyup",e=>{
    keys[e.key.toLowerCase()]=false;
});

let angle=0;

function animate(){

    requestAnimationFrame(animate);

    if(keys["a"]) angle+=0.04;
    if(keys["d"]) angle-=0.04;

    cat.rotation.y=angle;

    const speed=.12;

    if(keys["w"]){

        cat.position.x+=Math.sin(angle)*speed;
        cat.position.z+=Math.cos(angle)*speed;

    }

    if(keys["s"]){

        cat.position.x-=Math.sin(angle)*speed;
        cat.position.z-=Math.cos(angle)*speed;

    }

    camera.position.x=cat.position.x-Math.sin(angle)*6;
    camera.position.z=cat.position.z-Math.cos(angle)*6;
    camera.position.y=3;

    camera.lookAt(
        cat.position.x,
        1,
        cat.position.z
    );

    renderer.render(scene,camera);

}

animate();

window.addEventListener("resize",()=>{

    camera.aspect=window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

});
