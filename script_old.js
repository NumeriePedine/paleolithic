var images = [];
var all_cards = [];
var pile1 = [];
var pile2 = [];
var pile3 = [];
var pile4 = [];

var currentCard = [0, 0, 0, 0]

var newCard = document.createElement('div')
newCard.className = 'card'
newCard.

function preload() {
    for (var i = 0; i < arguments.length; i++) {
        images[i] = new Image();
        images[i].src = preload.arguments[i];
    }
}

function shuffle(array) {
    let currentIndex = array.length,
        randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]
        ];
    }

    return array;
}

$(document).ready(function() {
    for (var i = 1; i < 29; i++)
        preload("img/" + i + ".jpg");
    generate_arrays();
    removeEmpty();
    draw_all_cards();
});

function generate_arrays() {
    var N = 28;
    all_cards = Array.apply(null, { length: N }).map(Number.call, Number);

    shuffle(all_cards);
    pile1 = all_cards.slice(0, 7);
    pile2 = all_cards.slice(7, 14);
    pile3 = all_cards.slice(14, 21);
    pile4 = all_cards.slice(21, 28);
}

function draw_pile1() {
    let pileid = pile1[currentCard[0]] + 1;
    if (currentCard[0] > 6) {
        document.pile1.parentElement.classList.add("empty");

    } else
        document.pile1.src = "img/" + pileid + ".jpg";
}

function draw_pile2() {
    let pileid = pile2[currentCard[1]] + 1;
    if (currentCard[1] > 6) {
        document.pile2.parentElement.classList.add("empty");

    } else
        document.pile2.src = "img/" + pileid + ".jpg";
}

function draw_pile3() {
    let pileid = pile3[currentCard[2]] + 1;
    if (currentCard[2] > 6) {
        document.pile3.parentElement.classList.add("empty");

    } else
        document.pile3.src = "img/" + pileid + ".jpg";
}

function draw_pile4() {
    let pileid = pile4[currentCard[3]] + 1;
    if (currentCard[3] > 6) {
        document.pile4.parentElement.classList.add("empty");

    } else
        document.pile4.src = "img/" + pileid + ".jpg";
}

function draw_all_cards() {
    draw_pile1();
    draw_pile2();
    draw_pile3();
    draw_pile4();
}

function removeEmpty() {
    const cards = document.querySelectorAll('.card');

    for (const card of cards) {
        card.classList.remove('empty');
    }
}

function reset() {
    currentCard = [0, 0, 0, 0]
    generate_arrays();
    removeEmpty();
    draw_all_cards();
}

function flip(pile) {
    switch (pile) {
        case 1:
            currentCard[0] += 1;
            draw_pile1();
            break;

        case 2:
            currentCard[1] += 1;
            draw_pile2();
            break;

        case 3:
            currentCard[2] += 1;
            draw_pile3();
            break;

        case 4:
            currentCard[3] += 1;
            draw_pile4();
            break;

    }

}