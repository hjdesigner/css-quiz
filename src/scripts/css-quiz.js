(function(){
  'use strict';
  const myQuestions = [
    {
      question: "What is 10/2?",
      answers: {
        a: '3',
        b: '5',
        c: '115'
      },
      correctAnswer: 'b'
    },
    {
      question: "What is 30/3?",
      answers: {
        a: '3',
        b: '50',
        c: '10'
      },
      correctAnswer: 'c'
    }
  ];

  const quizContainer = document.querySelector('[data-js="quiz"]'),
        resultsContainer = document.querySelector('[data-js="results"]'),
        submitButton = document.querySelector('[data-js="submit"]');

  function questions(questions){
    const output = [];

    for(let i = 0; i < questions.length; i++) {

      const answers = [];

      for(let letter in questions[i].answers) {

        answers.push(`
          <label>
            <input type="radio" name="question${i}" value="${letter}">
            <div class="checkbox"></div>
            ${letter} : ${questions[i].answers[letter]}
          </label>
        `);
        
      }

      output.push(`
        <div class="question">${questions[i].question}</div>
        <div class="answers">${answers.join('')}</div>
      `);

    }

    quizContainer.innerHTML = output.join('');

  }

  function result(questions) {
    const answerContainers = quizContainer.querySelectorAll('.answers');
    
    let userAnswer = '';
    let numCorrect = 0;

    for(let i = 0; i < questions.length; i++) {

      userAnswer = (answerContainers[i].querySelector('input[name=question' + i + ']:checked') || {}).value;

      if( userAnswer === questions[i].correctAnswer ) {
        numCorrect++;
        answerContainers[i].style.color = 'green';
      }else{
        answerContainers[i].style.color = 'red';
      }

    }

    resultsContainer.innerHTML = `${numCorrect} de ${questions.length}`;

  }

  questions(myQuestions);

  submitButton.addEventListener('click', function(){
    result(myQuestions);
  });

})();