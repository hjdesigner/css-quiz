(function () {
  'use strict';
  const beginner = [
    {
      question: "Iniciante?",
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

  const intermediary = [
    {
      question: "intermediario?",
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

  const advanced = [
    {
      question: "avançado?",
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

  const resultsContainer = document.querySelector('[data-js="results"]'),
    submitButton = document.querySelector('[data-js="submit"]'),
    buttonsLevel = document.querySelectorAll('[data-js="buttons-level"]');

  function activeLevel() {
    buttonsLevel.forEach(function (e) {
      e.addEventListener('click', function () {

        let level = this.getAttribute('data-level');
        let container = document.querySelector('[data-js="quiz-' + level + '"]');

        if (level === 'beginner') {
          questions(beginner, container);
          document.querySelector('[data-level="intermediary"]').classList.remove('active');
          document.querySelector('[data-level="advanced"]').classList.remove('active');

          document.querySelector('[data-js="question"]').innerHTML = '';
          document.querySelector('[data-js="quiz-advanced"]').innerHTML = '';

        }
        if (level === 'intermediary') {
          questions(intermediary, container);
          document.querySelector('[data-level="beginner"]').classList.remove('active');
          document.querySelector('[data-level="advanced"]').classList.remove('active');
          document.querySelector('[data-js="quiz-beginner"]').innerHTML = '';
          document.querySelector('[data-js="quiz-advanced"]').innerHTML = '';
        }
        if (level === 'advanced') {
          questions(advanced, container);
          document.querySelector('[data-level="beginner"]').classList.remove('active');
          document.querySelector('[data-level="intermediary"]').classList.remove('active');
          document.querySelector('[data-js="quiz-beginner"]').innerHTML = '';
          document.querySelector('[data-js="quiz-intermediary"]').innerHTML = '';
        }

        this.classList.add('active');
      });
    })
  }

  function questions(questions, container) {
    const output = [];

    for (let i = 0; i < questions.length; i++) {

      const answers = [];

      for (let letter in questions[i].answers) {

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

    container.insertAdjacentHTML('afterbegin', output.join(''));

  }

  function result(questions) {
    const answerContainers = quizContainer.querySelectorAll('.answers');

    let userAnswer = '';
    let numCorrect = 0;

    for (let i = 0; i < questions.length; i++) {

      userAnswer = (answerContainers[i].querySelector('input[name=question' + i + ']:checked') || {}).value;

      if (userAnswer === questions[i].correctAnswer) {
        numCorrect++;
        answerContainers[i].style.color = 'green';
      } else {
        answerContainers[i].style.color = 'red';
      }

    }

    resultsContainer.innerHTML = `${numCorrect} de ${questions.length}`;

  }


  activeLevel();

  submitButton.addEventListener('click', function () {
    result(beginner);
  });

})();