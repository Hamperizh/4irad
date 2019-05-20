var gameOver;
var CurrentGo;
var rows;
var board;

$(function() {
  initialiseGame();
});

function initialiseGame() {

  gameOver = false;
  CurrentGo = "Red";
  rows = {"1": 1, "2": 1, "3": 1, "4": 1, "5": 1, "6": 1, "7": 1};
  board = { "0":[0,0,0,0,0,0,0],
            "1":[0,0,0,0,0,0,0],
            "2":[0,0,0,0,0,0,0],
            "3":[0,0,0,0,0,0,0],
            "4":[0,0,0,0,0,0,0],
            "5":[0,0,0,0,0,0,0] };

  $('#game-table').html('<tr><td onclick="selectCol(1)" id="column-1"></td><td onclick="selectCol(2)" id="column-2"></td><td onclick="selectCol(3)" id="column-3"></td><td onclick="selectCol(4)" id="column-4"></td><td onclick="selectCol(5)" id="column-5"></td><td onclick="selectCol(6)" id="column-6"></td><td onclick="selectCol(7)" id="column-7"></td></tr> ');



  for(var i = 6; i > 0; i--) {
    $('#game-table').append('<tr id="row-' + i + '">');

    for(var i2 = 1; i2 < 8; i2++) {
      $('#game-table').append('<td><div class="coin" id="slot-' + i + '-' + i2 + '"></div></td>');
    }

    $('#game-table').append('</td>');
  }


}

function resetHoverCounters() {
  $('#column-1').html('');
  $('#column-2').html('');
  $('#column-3').html('');
  $('#column-4').html('');
  $('#column-5').html('');
  $('#column-6').html('');
  $('#column-7').html('');
}

function hoverOver(col) {
  if(gameOver) {
    return;
  }
  
  resetHoverCounters();

  $('#column-' + col).html('<div id="slot-6-1" class="coin ' + CurrentGo + '"></div>');


}


function checkforwinner(bd) {

  // check down
  for (r = 0; r < 3; r++) 
      for (c = 0; c < 7; c++) 
          if (chkLine(bd[r][c], bd[r+1][c], bd[r+2][c], bd[r+3][c])) 
            return bd[r][c]; 

  // Check right
  for (r = 0; r < 6; r++)
      for (c = 0; c < 4; c++)
          if (chkLine(bd[r][c], bd[r][c+1], bd[r][c+2], bd[r][c+3]))
              return bd[r][c];

  // Check down-right
  for (r = 0; r < 3; r++)
      for (c = 0; c < 4; c++)
          if (chkLine(bd[r][c], bd[r+1][c+1], bd[r+2][c+2], bd[r+3][c+3]))
              return bd[r][c];

  // Check down-left
  for (r = 3; r < 6; r++)
      for (c = 0; c < 4; c++)
          if (chkLine(bd[r][c], bd[r-1][c+1], bd[r-2][c+2], bd[r-3][c+3]))
              return bd[r][c];

  return 0;
}

function chkLine(a,b,c,d) {
    return ((a != 0) && (a ==b) && (a == c) && (a == d));
}

// Function called for when select button is clicked.
function selectCol(col) {

  var row = rows[col];

  // Set colour of counter
  $('#slot-' + rows[col] + "-" + col).addClass(CurrentGo);
  // Add 1 to row counter
  rows[col] = rows[col] + 1;

  // If current go is reds
  if(CurrentGo == "Red") {
    // update board array
    board[5-(row-1)][ col-1] = 1;
    // change current go title
    $('#CurrentGo').html("Gul");
    // update variable
    CurrentGo = "Yellow";
  }
  // If current go is yellow
  else {
    // update board array
    board[5-(row-1)][ col-1] = 2;
    // change current go title
    $('#CurrentGo').html("Röd");
    // update variable
    CurrentGo = "Red";
  }

  // store result for check winner
  var result = checkforwinner(board);

  // If red wins
  if(result == 1) {
    $('#winner').html('Röd vann!');
    resetHoverCounters();
    gameOver = true;
  }
  // If yellow wins
  else if(result == 2) {
    $('#winner').html('Gul vann!');
    resetHoverCounters();
    gameOver = true;
  }

}