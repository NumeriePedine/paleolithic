var images = [];
var all_cards = [];

var cards = [
    [],
    [],
    [],
    []
]

var num_cards = 7;

$(document).ready(function() {
    for (var i = 0; i < 28; i++) {
        images[i] = new Image();
        images[i].src = "img/" + i + ".jpg";
    }
    /*
    for (var i=0; i<10; i++){
        images[27+i] = new Image();
        images[27+i].src = "img/var_" + i + ".jpg";
    }
    */
    reset()
});

function toggle_settings() {
    Array.from(document.querySelectorAll('.settings')).forEach(function(el) {
        el.classList.toggle("hidden");
    });
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

function generate_arrays() {
    num_cards = $("input[type='radio'][name='card_number']:checked").val();
    var N = 28;
    // if ($("#card_variable").is(":checked")) N = 38;
    all_cards = Array.apply(null, { length: N }).map(Number.call, Number);
    shuffle(all_cards);
    cards[0] = all_cards.slice(0, num_cards);
    cards[1] = all_cards.slice(num_cards, num_cards * 2);
    cards[2] = all_cards.slice(num_cards * 2, num_cards * 3);
    cards[3] = all_cards.slice(num_cards * 3, num_cards * 4);
}

function clearCards() {
    var stacks = document.getElementsByClassName("stack")
    for (var i = 0; i < stacks.length; i++) {
        while (stacks[i].firstChild)
            stacks[i].firstChild.remove()
    }
}

function flip(el) {
    $("#settings_box").addClass("hidden")
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

function resetButton() {
    $("#settings_box").addClass("hidden")
    reset()
}