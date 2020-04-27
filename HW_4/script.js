const startButton = document.getElementById('start-btn');
const qDiv = document.getElementById('questions');
const aDiv = document.getElementById('answers');
const results = document.getElementById('results')
let shuffledQuestions;
let qIndex = 0;
let correct = 0;
let incorrect = 0;

startButton.addEventListener('click', startGame);

function startGame() {  
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    showQuestion()
}

function showQuestion() {
    //when shuffledQuestions.length is < qIndex; end the game;
    if(qIndex >= shuffledQuestions.length){
        endGame()
    }else{
        let question = shuffledQuestions[qIndex];
    qDiv.innerText = question.title;
    aDiv.innerHTML = '';
    question.choices.forEach(function(answer) { 
        const button = document.createElement('button')
        button.innerText = answer
        button.classList.add('btn');
        button.classList.add('btn-danger')
        button.addEventListener('click', selectAnswer)
        aDiv.appendChild(button)
    })
}
    }
    

function selectAnswer(e) {
    let selected = e.target.innerText;
    let answer = shuffledQuestions[qIndex].answer;
    if(answer === selected){
       console.log(" its correct")
       correct ++;
    }else{
       console.log("its incorrect") ;
       incorrect++;
    };
    qIndex ++;
    showQuestion()
}  

function endGame(){
    console.log(`game over! correct - ${correct}  incorrect - ${incorrect}`)
    qDiv.innerHTML = '';
    aDiv.innerHTML = '';
    results.innerText = `game over! correct - ${correct}  incorrect - ${incorrect}`
    let reset = document.createElement('button');
    reset.innerText = 'RESET';
    reset.addEventListener('click', resetGame);
    results.appendChild(reset)
}

function resetGame(){
    console.log('resetting!')
    startButton.classList.remove('hide');
    results.innerHTML = ''
    qIndex = 0;
    correct = 0;
    incorrect = 0;
}
     
