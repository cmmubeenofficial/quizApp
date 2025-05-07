document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.querySelector("#start-btn");
  const nextBtn = document.querySelector("#next-btn");
  const restartBtn = document.querySelector("#restart-btn");
  const questionContainer = document.querySelector("#question-container");
  const questionText = document.querySelector("#question-text");
  const choicesList = document.querySelector("#choices-list");
  const resultContainer = document.querySelector("#result-container");
  const scoreContainer = document.querySelector("#score");

  startBtn.addEventListener("click", startQuiz);

  const questionsList = [
    {
      question: "Output of `console.log(typeof null)`",
      choices: ["null", "object", "undefined", "boolean"],
      answer: "object",
    },
    {
      question: "What will Array.isArray([]) return?",
      choices: ["false", "true", "null", "undefined"],
      answer: "true",
    },
    {
      question: "What is the purpose of === in JavaScript?",
      choices: [
        "Compare values without type",
        "Assign a value",
        "Compare values with type",
        "Multiply numbers",
      ],
      answer: "Compare values with type",
    },
    {
      question: "Which of the following is a falsy value in JavaScript?",
      choices: ["false", `"0"`, "0", "[]"],
      answer: "0",
    },
    {
      question: "What does setTimeout() do in JavaScript?",
      choices: [
        "Repeats code every second",
        "Immediately runs code",
        "Delays execution",
        "Stops a function",
      ],
      answer: "Delays execution",
    },
  ];

  let currentQuestionIndex = 0;
  let score = 0;
  let selectedAnswerVar = "";

  // function to start quiz
  function startQuiz() {
    startBtn.classList.add("hidden");
    questionContainer.classList.remove("hidden");

    displayQuestionChoices();
  }

  // function to display question and choices
  function displayQuestionChoices() {
    // console.log(currentQuestionIndex);
    choicesList.innerHTML = "";
    questionText.textContent = questionsList[currentQuestionIndex].question;
    questionsList[currentQuestionIndex].choices.forEach((choice) => {
      const LI = document.createElement("li");
      LI.classList.add(
        "bg-[#2e1959]",
        "w-full",
        "text-center",
        "py-[2px]",
        "rounded-sm",
        "cursor-pointer",
        "hover:bg-[#5426af]"
      );

      LI.textContent = choice;
      choicesList.appendChild(LI);
    });

    selectedChoiceUI();
  }

  // function to display selected choice
  function selectedChoiceUI() {
    choicesList.addEventListener("click", (e) => {
      if (e.target.tagName === "LI") {
        // Step 1: Remove class from all <li>
        const parentUL = e.target.parentElement;
        const allLIs = parentUL.querySelectorAll("li");
        selectedAnswerVar = e.target.textContent;

        allLIs.forEach((li) => {
          li.classList.remove("bg-[#602dc5]");
          li.classList.add("bg-[#2e1959]");
        });

        // Step 2: Add selected class to the clicked one
        e.target.classList.remove("bg-[#2e1959]");
        e.target.classList.add("bg-[#602dc5]");

        nextBtn.classList.remove("hidden");
        if (currentQuestionIndex < questionsList.length - 1) {
          nextBtn.textContent = "Next Question";
        } else {
          nextBtn.textContent = "Show Summary";
        }
      }
    });
  }

  // when someone click on next button give the grade
  nextBtn.addEventListener("click", () => {
    const correctChoice = questionsList[currentQuestionIndex].answer;
    if (selectedAnswerVar.trim() === correctChoice) {
      score++;
    }

    if (currentQuestionIndex < questionsList.length - 1) {
      nextBtn.classList.add("hidden");
      currentQuestionIndex++;
      displayQuestionChoices();
    } else {
      displayScore();
    }
  });

  // function to display the score
  function displayScore() {
    // console.log(`your score is: ${score} out of ${questionsList.length}`)
    questionText.textContent = "";
    choicesList.innerHTML = "";
    questionContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");
    scoreContainer.textContent = `${score} out of ${questionsList.length}`;
  }

  // restart button functionality
  restartBtn.addEventListener("click", () => {
    currentQuestionIndex = 0
    score = 0
    scoreContainer.textContent = ""
    resultContainer.classList.add("hidden")
    nextBtn.textContent = "Next Question"
    nextBtn.classList.add("hidden")
    startBtn.classList.remove("hidden")
  })
});
