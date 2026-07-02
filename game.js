function startGame(){

    document.querySelector(".menu").style.display="none";

    document.querySelector(".creator").style.display="block";

}

function createCat(){

    const name=document.getElementById("catName").value;
    const gender=document.getElementById("gender").value;
    const clan=document.getElementById("clan").value;
    const fur=document.getElementById("fur").value;

    if(name===""){

        alert("Please enter your cat's name.");

        return;

    }
  	document.querySelector(".creator").style.display = "none";

document.getElementById("camp").style.display = "block";

document.getElementById("welcomeMessage").innerHTML =
"🌲 Welcome to " + clan + ", <b>" + name + "</b>!";      

}
