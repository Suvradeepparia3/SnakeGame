document.addEventListener('DOMContentLoaded', () => {

    const squares = document.querySelectorAll('.grid div')
    const scoreDispaly = document.querySelector('#score')
    const startBtn = document.querySelector('.start')
    const highestScoreDisplay = document.querySelector('#highestScore')

    const width = 15
    let currentIndex = 0
    let appleIndex = 0
    let currentSnake = [2,1,0]
    let direction = 1
    let score = 0
    let speed = 0.9
    let intervalTime = 0
    let interval = 0
    let highestScore = 0


 // start the game 
 function startGame() {
    currentSnake.forEach(index => squares[index].classList.remove('snake'))
    squares[appleIndex].classList.remove('apple')
    clearInterval(interval)
    score = 0
    randomApple()
    direction = 1
    scoreDispaly.innerText = score
    highestScore = localStorage.getItem('score', highestScore)
    highestScoreDisplay.innerText = highestScore
    intervalTime = 500
    currentSnake = [2,1,0]
    currentIndex= 0
    currentSnake.forEach(index => squares[index].classList.add('snake'))
    interval = setInterval(moveOutComes, intervalTime)
}


    // function for outcomes 
    function moveOutComes() {
        // deals if snake hit wall
        if ((currentSnake[0] + width >= (width * width) && direction === width) ||
            (currentSnake[0] % width === width -1 && direction === 1) ||
            (currentSnake[0] % width === 0 && direction === -1) ||
            (currentSnake[0] -width < 0 && direction === -width) ||
            squares[currentSnake[0] + direction].classList.contains('snake')
        ) {
            alert('Game over')
            return clearInterval(interval)
        }

        const tail = currentSnake.pop()
        squares[tail].classList.remove('snake')
        currentSnake.unshift(currentSnake[0] + direction)

        // deals with getting apple
        if(squares[currentSnake[0]].classList.contains('apple')){
            squares[currentSnake[0]].classList.remove('apple')
            squares[tail].classList.add('snake')
            currentSnake.push(tail)
            randomApple()
            score++
            scoreDispaly.textContent = score
            if (score >= highestScore){
                highestScore = score
                localStorage.setItem('score', highestScore)
                highestScoreDisplay.innerText = highestScore
            } else {
                highestScore = localStorage.getItem('score', highestScore)
                highestScoreDisplay.innerText = highestScore
            }
            clearInterval(interval)
            intervalTime = intervalTime * speed
            interval = setInterval(moveOutComes, intervalTime)
        }
        squares[currentSnake[0]].classList.add('snake')
    }

    function randomApple() {
        do {
            appleIndex = Math.floor(Math.random() * squares.length)
        } while ((squares[appleIndex].classList.contains('snake')))
        squares[appleIndex].classList.add('apple')
    }

    // asign func to keycode 
    function control(e){
        squares[currentIndex].classList.remove('snake')
        const goingUp = direction === -width;
        const goingDown = direction === width;
        const goingRight = direction === 1;  
        const goingLeft = direction === -1;

        if(e.keyCode === 39 && !goingLeft){
            direction = 1
        }else if (e.keyCode === 38 && !goingDown) {
            direction = -width
        }else if(e.keyCode === 37 && !goingRight){
            direction = -1
        }else if (e.keyCode === 40 && !goingUp) {
            direction = +width
        }
    }

    document.addEventListener('keyup', control)
    startBtn.addEventListener('click', startGame)

})