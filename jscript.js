/*
  Credits and Copyright of all the source code.
  This  Game  is developed By:
  Pankaj Bassi,       Id: 100292175
  Manjot Singh Sarai, Id: 100290496
  Navpreet Singh,     Id: 100290584

  All Rights Reserved
  
  All this code is developed by three of us with the help of our instructor
  who provided us right guidance throughout the course.
  Our TA Kurban also helped us in developing this game.
  
  Idea of Timer animation and shuffling the ids is taken from our instructor Joseph Fall.
  
  -----------------------------------Game Description-------------------------------------------
  Whenever the player clicks anywhere on the webpage the images get shuffled and the timer also 
  begans and as the user clicks on any image it will change its position to shift to the empty
  image and the number of moves will increment by one with every move.
  The new game button helps the player to restart the game whenever required so that the player
  can start the game from a new begining.
  
  All the main functions used:  
    getIndexOfAnyElement , gotClick , mainFun ,performAction , 
	checkIfMoveValid , moveit , shuffleIds , shufflePieces ,
	shuffleAgain , ninthElement , getElementIdByindices , 
	checkIfAllAranged ,timer , displayResult , won.
	
	Functions whose use may be difficult to interpret directly from the code :
	ninthElement  : This function gets activated whenever the new game button is clicked.
	
	ninthElement : its use.
	whenever the user starts playing the game it displaces the empty image(black image) 
	from its orignal position(row 3, col 3) to somewhere in the puzzule.When new game
	button is clicked we need this empty image back to its orignal place so here comes
	this function to rescue.This function just swaps the empty image wherever it is in
	the puzzule with the image at location(3,3) in the puzzule.
*/


var moves = 0; // Variable to store number of moves in game made by the player
var idClicked ="";
var ids =["img1","img2","img3","img4","img5","img6","img7","img8","img9"];//this is a set of ids that always remain same
var ids2 =["img1","img2","img3","img4","img5","img6","img7","img8","img9"];
var arrangedArray = [];
var sortIds = ids2;
var rsortIds = ids2;
var ranIds  = ids2;
var size = 3;
var linearSize = size * size -1;
var x=0; //helping variable for shuffling the ids.
var t=0;
var tdsp = 0;
var chFT = 0; // helping variable for the timer.
var hasWon = false;


//Function to get Row and Column Index of any Element
function getIndexOfAnyElement(id)
{
	return {
		column :document.getElementById(id).cellIndex,
		row    :document.getElementById(id).parentElement.rowIndex,
	};
}

//gets activated whenever there is a click anywhere on the webpage
function gotClick(event)
{
	while(chFT === 0)
	{
		timer();
	}
   shuffleIds();// function to shuufle the puzzle at the begining of the game.
	for(var i=0;i<=linearSize;i++)
	{
		document.getElementById(ids[i]).onclick=mainFun;
	}
}

function mainFun(event)
{
	while(chFT === 1)
	{
		timer();
	}
	var idTpass=event.target.id;//it will get the id of table element that is clicked
	performAction(idTpass);
}

function performAction(passedId)
{
	var toPass=passedId;
	if(checkIfMoveValid(toPass))
	{
		moveit(toPass);//function to move or swap the table element images when the move is possible according to checkIfMoveValid() function
	}
}

// This function returns true or false on comparing the indices of clicked element and empty element that if they can be swaped or not
function checkIfMoveValid(passedIda)
{
	var emptyIcol = getIndexOfAnyElement("img9").column; //column index of empty image
	var emptyIrow = getIndexOfAnyElement("img9").row; //row index of empty image
	
	var clickedIcol = getIndexOfAnyElement(passedIda).column; //column index of clicked image
	var clickedIrow = getIndexOfAnyElement(passedIda).row; //row index of clicked image
	
	if(clickedIcol === emptyIcol)
	{
		return ((clickedIrow-1) === emptyIrow || (clickedIrow+1)=== emptyIrow);
        
	}
	else if(clickedIrow === emptyIrow)
	{
		return ((clickedIcol-1) === emptyIcol || (clickedIcol+1)=== emptyIcol);
	}
	else{ return false;}
}

//finally this function swap the ids to change the table td element
function moveit(passedId)
{
	var orId=document.getElementById(passedId);
	var emId=document.getElementById("img9");
	emId.id=passedId;
	orId.id="img9";
	moves++;
    document.getElementById("tme2").innerHTML = "Moves: "+moves;
    checkIfAllAranged();
    //this function checks if all the table elements had reached there original position after every move
}


//This function will shuffle the puzzle pieces whenever there is click anywhere on the page.
function shuffleIds()
{
	var temp = "";
	var mran=Math.floor((Math.random() * 9)+1)
    for(var i=0;i<(linearSize*mran);i++)
      {
	   var ran1 = Math.floor((Math.random() * ids.length));
	   var ran2 = Math.floor((Math.random() * ids2.length));
	   temp = sortIds[ran1];
	   sortIds[ran1]=ranIds[ran2];
	   ranIds[ran2]=temp;
      }
	  if(x===0){
	  shufflePieces();
	  }
}

//this function change and display the new ids.
function shufflePieces()
{
	for(var i=0;i<=linearSize;i++)
	{
		document.getElementById(ids[i]).id = ids2[i];
	}
	x=1;
}

document.onclick=gotClick;
document.getElementById("button").onclick = shuffleAgain; //this function got activated when the new game button is clicked.

//this function shuffle the ids when new button new button is clicked.
function shuffleAgain(event)
{
	if(hasWon)
	{
		location.reload();
	}
	clearTimeout(t);
	x=0;
    shuffleIds();
	ninthElement();//this function handle the ninth element which means it handles the empty image element to remain at ninth position after shuffling.
	chFT = 1;
	tdsp = 0;
    moves= 0;
    document.getElementById("tme1").innerHTML = "Time: "+tdsp;
    document.getElementById("tme2").innerHTML = "Moves: "+moves;

}


function ninthElement()
{
	var idTget = getElementIdByindices(2,2); //this function will get and return id of the table element by using its row and column index.
	moveit(idTget);            //this function will swap the empty image to its position which it was at the begining of the game
}

//This is a function that will help to get the id of the element by knowing its coloumn and row index.
function getElementIdByindices(r,c) //parameters include row and coloumn
{
 
	for(var i=0;i<=linearSize;i++)
	{
		var tempId=ids[i];
		var tempRow = getIndexOfAnyElement(tempId).row;
		var tempCol = getIndexOfAnyElement(tempId).column;
		if(tempRow === r && tempCol === c){return tempId;}
	}
}

// This is a function that will check if all the images are at that expected position or in short the puzzle has been sorted
function checkIfAllAranged()
{
	var j=0;
    for(var i=0;i<=2;i++)
       {
	    for(var k=0;k<=2;k++)
		{
			var idTget = getElementIdByindices(i,k);
		    if(idTget === ids[j]){
				arrangedArray[j] = true;
			}
			else arrangedArray[j] = false;
			j++;
		}
       }
	   displayResult();
}

function timer()
{
	t=setTimeout(timer ,1000);
	chFT += 2;
	tdsp++;
    document.getElementById("tme1").innerHTML = "Time: "+tdsp;
}
function displayResult()
{
	var x=0;
	for(var i=0;i<=linearSize;i++)
	{
		if(arrangedArray[i]){ x++; }
		else x=0;
	}
	if(x === 9){won();}
}

function won()
{
	hasWon = true;
	console.log("You Won");
    document.getElementById("won").style.display = "block";
    var ele = document.getElementsByClassName('tile');
	for (var i = 0; i < ele.length; i++ ) {
		ele[i].style.opacity="0.7";
	}
    document.getElementById("tme1").innerHTML='<object type="text/html" data="lab12.html" ></object>';
    clearTimeout(t);
    tdsp = 0;
    moves= 0;
    document.getElementById("tme1").innerHTML = "Time: "+tdsp;
    document.getElementById("tme2").innerHTML = "Moves: "+moves;
}