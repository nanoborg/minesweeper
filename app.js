document.addEventListener('DOMContentLoaded', () => {

    const grid = document.querySelector('.grid')
    
    let width = 10
    let bombAmount = 20
    let flags = 0
    let squares = []
    let isGameOver = false



    // create board
    function createBoard() {
        // get shuffled game array with random bombs
        const bombArray = Array(bombAmount).fill('bomb') // create array 20 times with the string bomb

        const emptyArray = Array(width*width - bombAmount).fill('valid')

        const gameArray = emptyArray.concat(bombArray)

        const shuffledArray = gameArray.sort(() => Math.random() -0.5)
        

        // loop that will run 100 times
        for (let i = 0; i < width*width; i++) {
            // each time it loops it will create a new square div which is an object with the id of [i] and className of of the element
            const square = document.createElement('div')
            square.setAttribute('id', i)
            square.classList.add(shuffledArray[i])
            
            // insert new square div into existing grid div
            grid.appendChild(square)

            // add new square to squares array
            squares.push(square)
            
            //normal click
            square.addEventListener('click', function(e) {
                click(square)
            })

            // cntrl and left click
            // square.oncontextmenu = function(e) {
            //     e.preventDefault()
            //     addFlag(square)
            // }
            square.addEventListener('contextmenu', (e) => {
                e.preventDefault()
                addFlag(square)
            })
        } 

        // add numbers
        for (let i = 0; i < squares.length; i++) {
            let total = 0

            // create boolean variable to detect edges
            const isLeftEdge = (i % width === 0)
            const isRightEdge = (i % width === width -1)

            if (squares[i].classList.contains('valid')) {
                
                // check left
                if (i > 0 && !isLeftEdge && squares[i -1].classList.contains('bomb')) total++

                // check northeast
                if (i > 9 && !isRightEdge && squares[i +1 -width].classList.contains('bomb')) total ++

                // check square above 
                if (i > 10 && squares[i - width].classList.contains('bomb')) total++

                // check northwest
                if (i > 11 && !isLeftEdge && squares[i -1 -width].classList.contains('bomb')) total ++
                
                // check right
                if (i < 98 && !isRightEdge && squares[i +1].classList.contains('bomb')) total ++

                // check southwest
                if (i < 90 && !isLeftEdge && squares[i -1 +width].classList.contains('bomb')) total ++

                // check southeast
                if (i < 88 && !isRightEdge && squares[i +1 +width].classList.contains('bomb')) total ++

                // check below
                if (i < 89 && squares[i +width].classList.contains('bomb')) total ++
                
                squares[i].setAttribute('data', total)
                // console.log(squares[i])
            }
        }
    }
    createBoard()


    // add flag
    function addFlag(square) {
        if (isGameOver) return
        if (!square.classList.contains('checked') && (flags < bombAmount)) {
            if (!square.classList.contains('flag')) {
                square.classList.add('flag')
                square.innerHTML = "🚩"
                flags++
                checkForWin()
            } else {
                square.classList.remove('flag')
                square.innerHTML = ''
                flags--
            }
        }
    }


    // click on square actions
    function click(square) {
        let currentId = square.id

        // no action if gameover is true
        if (isGameOver) return 

        // check for already checked or flag
        if (square.classList.contains('checked') || square.classList.contains('flag')) return

        // if bomb is clicked game over
        if (square.classList.contains('bomb')) {
            // console.log('game over')
            gameOver(square)

        } else {
            let total = square.getAttribute('data')
            if (total != 0) {
                square.classList.add('checked')
                square.innerHTML = total
                return
            }

            checkSquare(square, currentId)
        }
        square.classList.add('checked')
    }

    
    // check neighboring squares once square is clicked
    
    function checkSquare(square, currentId) {

        // console.log(currentId)
        const isLeftEdge = (currentId % width === 0)
        const isRightEdge = (currentId % width === width -1)

        setTimeout(() => {
            if (currentId > 0 && !isLeftEdge) {
                const newId = squares[parseInt(currentId) -1].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId > 9 && !isRightEdge) {
                const newId = squares[parseInt(currentId) +1 -width].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId > 10) {
                const newId = squares[parseInt(currentId -width)].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId > 11 && !isLeftEdge) {
                const newId = squares[parseInt(currentId) -1 -width].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId < 98 && !isRightEdge) {
                const newId = squares[parseInt(currentId) +1].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId < 90 && !isLeftEdge) {
                const newId = squares[parseInt(currentId) -1 +width].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId < 88 && !isRightEdge) {
                const newId = squares[parseInt(currentId) +1 +width].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId < 89) {
                const newId = squares[parseInt(currentId) +width].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }

        }, 10)
    }

    // game over function
    function gameOver(square) {
        console.log('BOOM! Game Over')
        isGameOver = true

        // show all the bombs
        squares.forEach(square => {
            if (square.classList.contains('bomb')) {
                square.innerHTML = '💣'
            }
        })
    }


    // check for win
    function checkForWin() {
        let match = 0
        for (let i = 0; squares.length; i++ ) {
            if (squares[i].classList.contains('flag') && squares[i].classList.contains('bomb')) {
                match++
            }
            if  (match === bombAmount) {
                console.log('YOU WIN!')
                isGameOver = true
            }
        }
    }




})


