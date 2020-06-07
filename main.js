
//print a message when you win
function youWin(){
    document.querySelector('.container-pop').classList.add('active')
    if( document.getElementById('forme').classList.contains('goute') ){
        document.getElementById('forme').classList.remove('goute')
    }

    if( document.getElementById('lose').style.display == "block")
        document.getElementById('lose').style.display = "none"
    
    document.getElementById('win').style.display = "block"
    document.getElementById('forme').classList.add('star')
    document.getElementById('pts').innerHTML = score
}

//print a message when you lose
function youLose(){
    document.querySelector('.container-pop').classList.add('active')
    if( document.getElementById('forme').classList.contains('star') ){
        document.getElementById('forme').classList.remove('star')
    }

    if( document.getElementById('win').style.display == "block")
        document.getElementById('win').style.display = "none"
    
    document.getElementById('lose').style.display = "block"
    document.getElementById('forme').classList.add('goute')
}


//to reinitialze the board 
function restart(){
    init()
    moves = 8
    score = 0

    update(moves,score)

    if( document.querySelector('.container-pop').classList.contains('active') )
        document.querySelector('.container-pop').classList.remove('active')
    
        for(j = 0; j < cards.length; j++) {
            if(cards[j].children[0].classList.contains('tourned') && this.cards[j].children[1].classList.contains('tourned'))
            {
                cards[j].children[0].classList.remove('tourned')
                cards[j].children[1].classList.remove('tourned')
            }
        }
}

//to put the cards randomly
function init(){
    tab = []
    order = 0
    for(j = 0; j < cards.length; j++) {
        while(tab.includes(order))
            order = Math.floor(Math.random() * 12)
        
        tab.push(order)
        cards[j].style.order = order
    }
}

//function that check if you win or not
function checkWin(){
    if(moves <= 0) {
        if(score > 0)
            window.setTimeout(youWin(),400)
        else
            window.setTimeout(youLose(),400)
    }
}

// function that update your score and the moves in header
function update(move,score){
    userMoved.innerHTML = move
    userScored.innerHTML = score
}

//main
$(document).ready(function (){

    cards = cards = document.querySelectorAll('.card')
    firstImage = null
    cardReturned = null
    moves = 8
    score = 0

    userMoved = document.querySelector('#moves')
    userScored = document.querySelector('#score')

    userMoved.innerHTML = moves
    userScored.innerHTML = score

    init()
    
    for(i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', function(e){
            onCard = this;
            
            if(!this.children[0].classList.contains('tourned') && !this.children[1].classList.contains('tourned') ) {
                onCard.children[0].classList.add('tourned')
                onCard.children[1].classList.add('tourned')
            }
            else
                return false

                if(!firstImage){
                    firstImage = onCard.children[1].children[0].src
                    for(j = 0; j < cards.length; j++) {
                        if(cards[j] == onCard)
                            cardReturned = j
                    }
                }

                else {
                    if(firstImage != onCard.children[1].children[0].src) {
                        window.setTimeout(function (){
                            cards[cardReturned].children[0].classList.remove('tourned')
                            cards[cardReturned].children[1].classList.remove('tourned')
                            firstImage = null
                            cardReturned = null
                        }, 500)

                        window.setTimeout(function (){
                            onCard.children[0].classList.remove('tourned')
                            onCard.children[1].classList.remove('tourned')
                        }, 500)
                        
                        moves--;
                        update(moves,score)
                        checkWin()
                }

                else{
                    firstImage = null
                    cardReturned = null

                    moves--
                    score += 10
                    update(moves,score)
                    checkWin()
                }
                
            }

        })
    }
})