var Card = function(imgUrl) {
    this.imgUrl = imgUrl;
}

var game = {
    cards: [],
    
    createCards: function() {
        for(var i = 0; i < 10; i++) {
            this.cards.push(new Card("images/flag" + i + ".png"));
            this.cards.push(new Card("images/flag" + i + ".png"));
        }
        this.cards = shuffleArray(this.cards);
    },
    restartGame: function() {
        debugger;
        view.flipedCards.splice(0, 2);
        var mainDiv = document.getElementById("mainDiv");
        mainDiv.innerHTML = "";
        this.cards.splice(0, this.cards.length);
        view.numberOfMoves = 0;
        this.createCards();
        view.createDivsForCards();
        view.displayNumberOfMoves(0);
        view.setUpEventListeners();
    }
}

var view = {
    numberOfMoves: 0,
    flipedCards: [],
    /**
     * Create rows as needed to put all cards(5 cars in each row)
     * Create divs and cards and put cards into divs
     * Set image for each card (front and back)
     */
    createDivsForCards: function() {
        var j = 0;
        var stayInRow = true;
        
        var mainDiv = document.getElementById("mainDiv");
        // crate rows
        for(var i = 0; i < game.cards.length / 5; i++) { 
            var rowDiv = document.createElement("div");
            rowDiv.className = "row";
            mainDiv.appendChild(rowDiv);
            // create elements for each row
            do{ 
                // front side
                var frontDiv = document.createElement("div");
                frontDiv.className = "front";
                var frontImg = document.createElement("img");
                frontImg.className = "cardImg";
                frontImg.src = "images/frontImg.png";
                frontDiv.appendChild(frontImg);
                // back side
                var backDiv = document.createElement("div");
                backDiv.className = "back";
                var backImg = document.createElement("img");
                backImg.className = "cardImg";
                backImg.src = game.cards[j].imgUrl; 
                backDiv.appendChild(backImg);
                // create a card
                var cardDiv = document.createElement("div");
                cardDiv.className = "card";
                cardDiv.appendChild(frontDiv);
                cardDiv.appendChild(backDiv);
                // put card in a card container
                var containerdDiv = document.createElement("div");
                containerdDiv.className = "col-sm-2 card-container";   
                containerdDiv.appendChild(cardDiv);
                // put card container in a row                
                rowDiv.appendChild(containerdDiv);
                j++;
                if(j % 5 == 0 && j != 0) {
                    stayInRow = false;
                }
            } while(stayInRow);
            stayInRow = true;
        }
    },
    /**
     * Display number of moves
     * This method is called after every move (after 2 cards are flipped)
     */
    displayNumberOfMoves: function(numberOfMoves) {
        var numberOfMovesDiv = document.getElementById("numberOfMovesDiv");
        numberOfMovesDiv.innerHTML = "";
        
        var numberOfMovesText = document.createElement("p");
        numberOfMovesText.innerHTML = "Number of moves: " + numberOfMoves;
        
        numberOfMovesDiv.appendChild(numberOfMovesText);
        
    },
    /**
     * Catch every click on cards
     * Flip clicked cards
     * Count moves
     */
    setUpEventListeners: function() {
        var mainDiv = document.getElementById("mainDiv");
        
        mainDiv.addEventListener("click", function(event) {
            var elementClicked = event.target;
            // if click was on card
            if(elementClicked.parentNode.parentNode.className === "card" && view.flipedCards.length < 2) {
                
                var clickedCard = elementClicked.parentNode.parentNode;
                // flip cliked card
                clickedCard.className = "card flipped";
                // push cliked card into array of clicked cards
                view.flipedCards.push(clickedCard);
                // if two cards are pushed into array, compare them
                if(view.flipedCards.length === 2) {
                    // increment number of moves 
                    view.numberOfMoves++;
                    // call method to display new value
                    view.displayNumberOfMoves(view.numberOfMoves);
                    
                    var firstCard = view.flipedCards[0].lastChild.firstChild.src;
                    var secondCard = view.flipedCards[1].lastChild.firstChild.src;
                    // compare images of two clicked cards
                    // if images are not the same, flip cards back
                    if(firstCard !== secondCard) {
                        // wait one second to flip card back
                        setTimeout(function(){
                            view.flipedCards[0].className = "card";
                            view.flipedCards[1].className = "card";
                            // clear an array of clicked cards
                            view.flipedCards.splice(0, 2);
                        }, 1000);  
                    } else {
                        // clear an array of clicked cards
                        view.flipedCards.splice(0, 2);
                    }
   
                }
            } 
        });
    }
}


/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}
/**
 * Load script when DOM is loaded
 */
document.addEventListener("DOMContentLoaded", function() { 
    game.createCards();
    view.createDivsForCards();
    view.displayNumberOfMoves(0);
    view.setUpEventListeners();
});
