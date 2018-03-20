class Player {
    constructor(hand){
      this.hand = hand;
    }

    addCard(card){
      this.hand.push(card);
    }
}

class Card {
  constructor(suit, value){
    this.suit = suit;
    this.val = value;
  }
}

var player;
var deck = new Array();
var suits = ["spades", "clubs", "hearts", "diamonds"];
var vals = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"];

function start_game(){
  generate_deck();
  shuffle_deck();
  var card1 = deck.pop();
  var card2 = deck.pop([card1, card2]);
  player = new Player();
  console.log("Game has begun.");
  toggle_play_button();
}

function generate_deck(){
  // Creates a standard deck of cards
  for(var suit = 0; suit < suits.length; suit++){
    for(var val = 0; val < vals.length; val++){
      var card = new Card(suits[suit], vals[val]);
      deck.push(card);
    }
  }
  console.log(deck[0]);
}

function shuffle_deck(){
  for(var i = deck.length - 1; i > 0; i--){
    // Generate random number between 0 and i
    var rand = Math.random()*(i+1);
    rand = Math.floor(rand);

    // Swap cards at indices rand and i
    var temp = deck[rand];
    deck[rand] = deck[i];
    deck[i] = temp;
  }
}

function toggle_play_button(){
  var but = $("#Play").toggle();

}
