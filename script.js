var images = [];
var all_cards = [];

var cards = [
    [],
    [],
    [],
    []
]

$(document).ready(function() {
    for (var i = 0; i < 28; i++) {
        images[i] = new Image();
        images[i].src = "img/" + i + ".jpg";
    }
    reset()
});


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

function generate_arrays() {
    var N = 28;
    all_cards = Array.apply(null, { length: N }).map(Number.call, Number);
    shuffle(all_cards);
    cards[0] = all_cards.slice(0, 7);
    cards[1] = all_cards.slice(7, 14);
    cards[2] = all_cards.slice(14, 21);
    cards[3] = all_cards.slice(21, 28);
}

function clearCards() {
    var stacks = document.getElementsByClassName("stack")
    for (var i = 0; i < stacks.length; i++) {
        while (stacks[i].firstChild)
            stacks[i].firstChild.remove()
    }
}

function flip(el) {
    if (el.classList.contains("flipped")) {
        el.animate({
            'opacity': '90%',
            'transform': 'translateY(-150px)'
        }, 200, 'swing')
        $(el).delay(180).queue(function() { // Wait for 1 second.
            $(el).remove().dequeue();
        })
    } else
        el.classList.add("flipped")
}

function drawCards() {
    for (var s = 0; s < 4; s++) {
        var stack = document.querySelector('.stack:nth-child(' + (s + 1) + ')')
        for (var i = 0; i < cards[s].length; i++) {
            var newCard = document.createElement('div');
            newCard.className = "card"
            newCard.append(images[cards[s][i]])
            newCard.setAttribute("onclick", "flip(this);")
            stack.appendChild(newCard)
        }
    }
}

function flipAllLast() {
    for (var s = 0; s < 4; s++) {
        var stack = document.querySelector('.stack:nth-child(' + (s + 1) + ')')
        stack.lastChild.classList.add("flipped")
    }
}

function reset() {
    clearCards()
    generate_arrays()
    drawCards()
    flipAllLast()
}