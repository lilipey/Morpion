var isPlayerOne = true
var playerTurn = document.getElementById("player-turn");

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

var scares = [0, 0, 0, 0, 0, 0, 0, 0, 0];

var gridContainer = document.querySelector(".grid-container");

for (var i in scares) {
    var caseGrid = document.createElement("div");
    caseGrid.id = i;
    caseGrid.setAttribute("onclick", "clickOnScare(" + i + ")");
    gridContainer.appendChild(caseGrid);
};

if (getRandomInt(2) == 1) {
    bot();
}

function turn() {
    if (isPlayerOne == true) {
        playerTurn.innerHTML = "du joueur";
    }
    else {
        playerTurn.innerHTML = "de l'ordi";
    };
};

turn();

function clickOnScare(indexScare) {

    var caseGridColor = document.createElement("div");

    if (scares[indexScare] == 0 && document.querySelector("#victory-player").textContent == "") {
        caseGridColor.style.backgroundColor = "red";
        document.getElementById(indexScare).appendChild(caseGridColor);
        isPlayerOne = false;
        scares[indexScare] = 1;
        bot();
    }


    turn();
    victory();

}

// 7. Définissez une fonction pour détecter la victoire :
//      - déterminez ce qu'est une victoire => lorsque 3 cases alignés seront égale à 1 pour le J1 ou 2 pour le J2
//      - si un joueur gagne, affichez cette information dans le h3 (cf html)

function sommeRow(nb) {
    return scares[nb] + scares[nb + 1] + scares[nb + 2]
}

function sommeColumn(nb) {
    return scares[nb] + scares[nb + 3] + scares[nb + 6];
};

function sommeDiago1(nb) {
    return scares[nb] + scares[nb + 4] + scares[nb + 8];
};

function sommeDiago2(nb) {
    return scares[nb] + scares[nb + 2] + scares[nb + 4];
};

function victory() {
    if (sommeRow(0) == 3 || sommeRow(3) == 3 || sommeRow(6) == 3 || sommeColumn(0) == 3 || sommeColumn(1) == 3 || sommeColumn(2) == 3 || sommeDiago1(0) == 3 || sommeDiago2(2) == 3) {
        document.querySelector("#victory-player").textContent = "Victoire du joueur"
    }
    else if (sommeRow(0) == 21 || sommeRow(3) == 21 || sommeRow(6) == 21 || sommeColumn(0) == 21 || sommeColumn(1) == 21 || sommeColumn(2) == 21 || sommeDiago1(0) == 21 || sommeDiago2(2) == 21) {
        document.querySelector("#victory-player").textContent = "Victoire de l'ordi"
    }

    else if (scares.indexOf(0) == -1) {
        document.querySelector("#victory-player").textContent = "Match Nul"
    }
};


function reload() {
    window.location.reload();
}

function winTrigger(nb) {

    winCondition = []

    if (sommeRow(0) == nb) {
        winCondition.push(scares[0])
        winCondition.push(scares[1])
        winCondition.push(scares[2])
        return winCondition.indexOf(0)
    }
    else if (sommeRow(3) == nb) {
        winCondition.push(scares[3])
        winCondition.push(scares[4])
        winCondition.push(scares[5])
        return winCondition.indexOf(0) + 3
    }
    else if (sommeRow(6) == nb) {
        winCondition.push(scares[6])
        winCondition.push(scares[7])
        winCondition.push(scares[8])
        return winCondition.indexOf(0) + 6
    }
    else if (sommeColumn(0) == nb) {
        winCondition.push(scares[0])
        winCondition.push(scares[3])
        winCondition.push(scares[6])
        return winCondition.indexOf(0) * 3
    }
    else if (sommeColumn(1) == nb) {
        winCondition.push(scares[1])
        winCondition.push(scares[4])
        winCondition.push(scares[7])
        return winCondition.indexOf(0) * 3 + 1
    }
    else if (sommeColumn(2) == nb) {
        winCondition.push(scares[2])
        winCondition.push(scares[5])
        winCondition.push(scares[8])
        return winCondition.indexOf(0) * 3 + 2
    }
    else if (sommeDiago1(0) == nb) {
        winCondition.push(scares[0])
        winCondition.push(scares[4])
        winCondition.push(scares[8])
        return winCondition.indexOf(0) * 4
    }
    else if (sommeDiago2(2) == nb) {
        winCondition.push("inutile")
        winCondition.push(scares[2])
        winCondition.push(scares[4])
        winCondition.push(scares[6])
        return winCondition.indexOf(0) * 2
    }
    else {
        return -1
    }
}



function bot() {

    if (document.querySelector("#victory-player").textContent == "" && scares.indexOf(0) != -1) {
        var caseGridColor = document.createElement("div");

        if (winTrigger(14) == -1) {
            if (winTrigger(2) == -1) {
                nbCase = getRandomInt(9)
                while (scares[nbCase] != 0) {
                    nbCase = getRandomInt(9)
                }
            }
            else {
                nbCase = winTrigger(2)
            }
        }
        else {
            nbCase = winTrigger(14)
        }



        caseGridColor.style.backgroundColor = "blue";
        document.getElementById(nbCase).appendChild(caseGridColor);
        scares[nbCase] = 7;

        turn();
        victory();
    }


}