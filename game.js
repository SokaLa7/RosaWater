function startGame() {
    alert("Welcome to ThunderClan!");

    let catName = prompt("What is your cat's name?");

    if (catName && catName.trim() !== "") {
        alert("Welcome, " + catName + "! Your Warrior journey begins.");
    } else {
        alert("A nameless cat? We'll find you a name later.");
    }
}

function comingSoon(feature) {
    alert(feature + " is coming soon!");
}
