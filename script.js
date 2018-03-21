class Player {
    constructor(hand){
      this.hand = new Array();
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
var vals = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

function start_game(){
  generate_deck();
  shuffle_deck();
  var card1 = deck.pop();
  var card2 = deck.pop([card1, card2]);
  player = new Player();
  console.log("Game has begun.");
  toggle_play_button();
  toggle_game_buttons();
  deal(card1);
  deal(card2);
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

function toggle_game_buttons(){
  $("#hit").toggle();
  $("#stay").toggle();
}

function deal(card){
  console.log(player);
  player.addCard(card);
  deal_ui(card);
}

function deal_ui(card){
  var suit_color = "red";
  if(card.suit == "spades" || card.suit == "clubs"){
    suit_color = "black";
  }
  var card_html = '<div class="card"><h2 class="' + suit_color + '">' + card.val + '</h2><h2 class="' + suit_color + '">' + card.suit + '</h2></div>';
  $("#hand").append(card_html);
}

function hit_me(){
  var next_card = deck.pop();
  deal(next_card);
  setTimeout(function(){
    check_bust();
  }, 10);
}

function check_bust(){
  var score = 0;
  for(var i = 0; i < player.hand.length; ++i){
    var cur_card = player.hand[i];
    var val = parseInt(cur_card.val);
    if(cur_card.val == "J" || cur_card.val == "Q" || cur_card.val == "K"){
      val = 10;
    }
    else if(cur_card.val == "A"){
      val = 1;
    }
    score += val;
  }
  if(score > 21){
    gone_and_busted(score);
  }
}

function gone_and_busted(score){
  alert("You've gone and busted my good man. " + score + " > 21");
  toggle_game_buttons();
  toggle_play_button();
  $(".card").remove();
}

function stay(){
  var score = 0;
  for(var i = 0; i < player.hand.length; ++i){
    var cur_card = player.hand[i];
    var val = parseInt(cur_card.val);
    if(cur_card.val == "J" || cur_card.val == "Q" || cur_card.val == "K"){
      val = 10;
    }
    else if(cur_card.val == "A"){
      val = 11;
    }
    score += val;
    if(score > 21){
      score -= 10;
    }
  }
  alert("You stayed with a final score of " + score + ".");
  toggle_game_buttons();
  toggle_play_button();
  $(".card").remove();
}
