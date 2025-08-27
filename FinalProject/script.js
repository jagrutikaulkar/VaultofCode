document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const screens = {
        welcome: document.getElementById('welcome-screen'),
        selection: document.getElementById('selection-screen'),
        quiz: document.getElementById('quiz-screen'),
        results: document.getElementById('results-screen'),
        review: document.getElementById('review-screen')
    };
    
    const usernameInput = document.getElementById('username');
    const usernameDisplay = document.getElementById('username-display');
    const nameError = document.getElementById('name-error');
    const startBtn = document.getElementById('start-btn');
    const backBtn = document.getElementById('back-btn');
    const quizCards = document.querySelectorAll('.quiz-card');
    const nextBtn = document.getElementById('next-btn');
    const quitBtn = document.getElementById('quit-btn');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const questionCount = document.getElementById('question-count');
    const progressBar = document.getElementById('progress');
    const timerElement = document.getElementById('timer');
    const scoreDisplay = document.getElementById('score-display');
    const quizCategory = document.getElementById('quiz-category');
    const scoreValue = document.getElementById('score-value');
    const scorePercentage = document.getElementById('score-percentage');
    const scoreMessage = document.getElementById('score-message');
    const correctAnswers = document.getElementById('correct-answers');
    const timeSpent = document.getElementById('time-spent');
    const resultCategory = document.getElementById('result-category');
    const restartBtn = document.getElementById('restart-btn');
    const reviewBtn = document.getElementById('review-btn');
    const backToResults = document.getElementById('back-to-results');
    const modal = document.getElementById('confirmation-modal');
    const confirmQuit = document.getElementById('confirm-quit');
    const cancelQuit = document.getElementById('cancel-quit');
    const reviewContainer = document.getElementById('review-container');
    
    // Quiz variables
    let currentCategory = '';
    let currentQuestionIndex = 0;
    let score = 0;
    let selectedOption = null;
    let timer = null;
    let timeLeft = 30;
    let totalTimeSpent = 0;
    let userAnswers = [];
    let quizStartTime = 0;
    
    // Quiz questions database
    const quizData = {
        general: [
            {
                question: "What is the capital of France?",
                options: ["Paris", "London", "Berlin", "Madrid"],
                answer: 0,
                explanation: "Paris is the capital and most populous city of France."
            },
            {
                question: "Which planet is known as the Red Planet?",
                options: ["Venus", "Mars", "Jupiter", "Saturn"],
                answer: 1,
                explanation: "Mars is often called the 'Red Planet' because of its reddish appearance."
            },
            {
                question: "Who painted the Mona Lisa?",
                options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
                answer: 2,
                explanation: "Leonardo da Vinci painted the Mona Lisa between 1503 and 1506."
            },
            {
                question: "What is the largest ocean on Earth?",
                options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
                answer: 3,
                explanation: "The Pacific Ocean is the largest and deepest ocean on Earth."
            },
            {
                question: "Which element has the chemical symbol 'O'?",
                options: ["Gold", "Oxygen", "Osmium", "Oganesson"],
                answer: 1,
                explanation: "Oxygen has the chemical symbol O and atomic number 8."
            },
            {
                question: "What is the tallest mammal?",
                options: ["Elephant", "Giraffe", "Blue Whale", "Hippopotamus"],
                answer: 1,
                explanation: "Giraffes are the tallest mammals on Earth, with heights up to 18 feet."
            },
            {
                question: "Which language is spoken in Brazil?",
                options: ["Spanish", "Portuguese", "French", "English"],
                answer: 1,
                explanation: "Brazil is the only Portuguese-speaking country in South America."
            },
            {
                question: "How many sides does a hexagon have?",
                options: ["5", "6", "7", "8"],
                answer: 1,
                explanation: "A hexagon is a polygon with six sides and six angles."
            },
            {
                question: "Who wrote 'Romeo and Juliet'?",
                options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
                answer: 1,
                explanation: "William Shakespeare wrote the tragedy 'Romeo and Juliet' in the late 16th century."
            },
            {
                question: "What is the currency of Japan?",
                options: ["Yuan", "Won", "Yen", "Ringgit"],
                answer: 2,
                explanation: "The Japanese Yen is the official currency of Japan."
            }
        ],
        science: [
            {
                question: "What is the chemical symbol for gold?",
                options: ["Go", "Gd", "Au", "Ag"],
                answer: 2,
                explanation: "The chemical symbol for gold is Au, from the Latin word 'aurum'."
            },
            {
                question: "Which planet has the most moons?",
                options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
                answer: 1,
                explanation: "Saturn has over 80 moons, the most of any planet in our solar system."
            },
            {
                question: "What is the hardest natural substance on Earth?",
                options: ["Gold", "Iron", "Diamond", "Platinum"],
                answer: 2,
                explanation: "Diamond is the hardest known natural material on Earth."
            },
            {
                question: "What is the main gas found in Earth's atmosphere?",
                options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
                answer: 2,
                explanation: "Nitrogen makes up about 78% of Earth's atmosphere."
            },
            {
                question: "At what temperature does water boil?",
                options: ["90°C", "100°C", "110°C", "120°C"],
                answer: 1,
                explanation: "Water boils at 100°C (212°F) at standard atmospheric pressure."
            },
            {
                question: "What is the speed of light?",
                options: ["299,792 km/s", "150,000 km/s", "450,000 km/s", "1,000,000 km/s"],
                answer: 0,
                explanation: "The speed of light in a vacuum is 299,792 kilometers per second."
            },
            {
                question: "Which blood type is known as the universal donor?",
                options: ["A", "B", "AB", "O"],
                answer: 3,
                explanation: "Type O negative blood is considered the universal donor type."
            },
            {
                question: "What is the smallest unit of life?",
                options: ["Atom", "Cell", "Molecule", "Organelle"],
                answer: 1,
                explanation: "The cell is the smallest structural and functional unit of life."
            },
            {
                question: "Which subatomic particle has a positive charge?",
                options: ["Electron", "Neutron", "Proton", "Photon"],
                answer: 2,
                explanation: "Protons have a positive electrical charge and are found in the nucleus of an atom."
            },
            {
                question: "What is the most abundant element in the universe?",
                options: ["Oxygen", "Carbon", "Hydrogen", "Helium"],
                answer: 2,
                explanation: "Hydrogen is the most abundant element, accounting for about 75% of normal matter."
            }
        ],
        history: [
            {
                question: "In which year did World War II end?",
                options: ["1943", "1945", "1947", "1950"],
                answer: 1,
                explanation: "World War II ended in 1945 with the surrender of Germany and Japan."
            },
            {
                question: "Who was the first President of the United States?",
                options: ["Thomas Jefferson", "John Adams", "George Washington", "Benjamin Franklin"],
                answer: 2,
                explanation: "George Washington was the first President of the United States, serving from 1789 to 1797."
            },
            {
                question: "The ancient civilization of Mesopotamia was located in which modern-day country?",
                options: ["Egypt", "Greece", "Iraq", "Iran"],
                answer: 2,
                explanation: "Mesopotamia was located in what is now Iraq, between the Tigris and Euphrates rivers."
            },
            {
                question: "Who was the first woman to win a Nobel Prize?",
                options: ["Marie Curie", "Rosalind Franklin", "Florence Nightingale", "Jane Addams"],
                answer: 0,
                explanation: "Marie Curie was the first woman to win a Nobel Prize, in Physics in 1903."
            },
            {
                question: "Which empire was ruled by Genghis Khan?",
                options: ["Roman Empire", "Ottoman Empire", "Mongol Empire", "British Empire"],
                answer: 2,
                explanation: "Genghis Khan founded and ruled the Mongol Empire in the 13th century."
            },
            {
                question: "When did the Berlin Wall fall?",
                options: ["1987", "1989", "1991", "1993"],
                answer: 1,
                explanation: "The Berlin Wall fell on November 9, 1989, leading to German reunification."
            },
            {
                question: "Who discovered America?",
                options: ["Christopher Columbus", "Leif Erikson", "Vasco da Gama", "Ferdinand Magellan"],
                answer: 0,
                explanation: "Christopher Columbus is credited with discovering America in 1492."
            },
            {
                question: "Which ancient wonder was located in Alexandria, Egypt?",
                options: ["Hanging Gardens", "Colossus of Rhodes", "Lighthouse of Alexandria", "Temple of Artemis"],
                answer: 2,
                explanation: "The Lighthouse of Alexandria was one of the Seven Wonders of the Ancient World."
            },
            {
                question: "The Renaissance began in which country?",
                options: ["France", "England", "Germany", "Italy"],
                answer: 3,
                explanation: "The Renaissance began in Italy in the 14th century and spread throughout Europe."
            },
            {
                question: "Who was the first female Prime Minister of the United Kingdom?",
                options: ["Theresa May", "Margaret Thatcher", "Angela Merkel", "Indira Gandhi"],
                answer: 1,
                explanation: "Margaret Thatcher was the first female Prime Minister of the UK, serving from 1979 to 1990."
            }
        ]
    };
    
    // Category titles
    const categoryTitles = {
        general: "General Knowledge",
        science: "Science & Nature",
        history: "History"
    };
    
    // Initialize the application
    function init() {
        attachEventListeners();
    }
    
    // Attach event listeners
    function attachEventListeners() {
        // Start button click
        startBtn.addEventListener('click', startQuiz);
        
        // Username input validation
        usernameInput.addEventListener('input', validateUsername);
        
        // Quiz category selection
        quizCards.forEach(card => {
            card.addEventListener('click', () => selectCategory(card.dataset.category));
        });
        
        // Back button
        backBtn.addEventListener('click', goBack);
        
        // Next question button
        nextBtn.addEventListener('click', nextQuestion);
        
        // Quit quiz button
        quitBtn.addEventListener('click', showQuitConfirmation);
        
        // Modal buttons
        confirmQuit.addEventListener('click', quitQuiz);
        cancelQuit.addEventListener('click', hideModal);
        
        // Results screen buttons
        restartBtn.addEventListener('click', restartQuiz);
        reviewBtn.addEventListener('click', showReviewScreen);
        
        // Review screen button
        backToResults.addEventListener('click', backToResultsScreen);
    }
    
    // Validate username
    function validateUsername() {
        const username = usernameInput.value.trim();
        
        if (username.length < 3) {
            nameError.textContent = "Username must be at least 3 characters long";
            startBtn.disabled = true;
            return false;
        } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
            nameError.textContent = "Username can only contain letters, numbers and underscores";
            startBtn.disabled = true;
            return false;
        } else {
            nameError.textContent = "";
            startBtn.disabled = false;
            return true;
        }
    }
    
    // Start quiz process
    function startQuiz() {
        if (!validateUsername()) return;
        
        // Set username in header
        usernameDisplay.textContent = usernameInput.value.trim();
        
        switchScreen(screens.welcome, screens.selection);
    }
    
    // Select quiz category
    function selectCategory(category) {
        currentCategory = category;
        quizCategory.textContent = categoryTitles[category];
        currentQuestionIndex = 0;
        score = 0;
        userAnswers = [];
        totalTimeSpent = 0;
        quizStartTime = Date.now();
        
        switchScreen(screens.selection, screens.quiz);
        loadQuestion();
    }
    
    // Load question
    function loadQuestion() {
        resetOptions();
        clearInterval(timer);
        
        const questions = quizData[currentCategory];
        const currentQuestion = questions[currentQuestionIndex];
        
        // Update question count and progress bar
        questionCount.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
        progressBar.style.width = `${((currentQuestionIndex) / questions.length) * 100}%`;
        
        // Update score display
        scoreDisplay.textContent = `Score: ${score}`;
        
        // Set question text
        questionText.textContent = currentQuestion.question;
        
        // Create options
        currentQuestion.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.classList.add('option');
            
            const optionIndex = document.createElement('div');
            optionIndex.classList.add('option-index');
            optionIndex.textContent = String.fromCharCode(65 + index); // A, B, C, D
            
            const optionText = document.createElement('div');
            optionText.classList.add('option-text');
            optionText.textContent = option;
            
            optionElement.appendChild(optionIndex);
            optionElement.appendChild(optionText);
            optionElement.dataset.index = index;
            
            optionElement.addEventListener('click', () => selectOption(optionElement));
            
            optionsContainer.appendChild(optionElement);
        });
        
        // Start timer
        timeLeft = 30;
        timerElement.textContent = formatTime(timeLeft);
        timerElement.style.color = '';
        timerElement.classList.remove('pulse');
        timer = setInterval(updateTimer, 1000);
        
        // Disable next button initially
        nextBtn.disabled = true;
    }
    
    // Format time as MM:SS
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    
    // Update timer
    function updateTimer() {
        timeLeft--;
        timerElement.textContent = formatTime(timeLeft);
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            handleTimeUp();
        }
        
        // Change color when time is running out
        if (timeLeft <= 10) {
            timerElement.style.color = '#e74c3c';
            timerElement.classList.add('pulse');
        }
    }
    
    // Handle time up
    function handleTimeUp() {
        // Mark the correct answer
        const questions = quizData[currentCategory];
        const correctAnswerIndex = questions[currentQuestionIndex].answer;
        const correctOption = optionsContainer.children[correctAnswerIndex];
        correctOption.classList.add('correct');
        
        // Store the user's answer (null for timeout)
        userAnswers.push({
            question: questions[currentQuestionIndex].question,
            userAnswer: null,
            correctAnswer: correctAnswerIndex,
            options: questions[currentQuestionIndex].options,
            explanation: questions[currentQuestionIndex].explanation
        });
        
        // Enable next button
        nextBtn.disabled = false;
    }
    
    // Select option
    function selectOption(optionElement) {
        if (selectedOption) return; // Prevent re-selection
        
        clearInterval(timer);
        selectedOption = optionElement;
        
        // Mark selected option
        optionElement.classList.add('selected');
        
        const questions = quizData[currentCategory];
        const correctAnswerIndex = questions[currentQuestionIndex].answer;
        const userAnswerIndex = parseInt(optionElement.dataset.index);
        
        // Check if answer is correct
        if (userAnswerIndex === correctAnswerIndex) {
            optionElement.classList.add('correct');
            score++;
            scoreDisplay.textContent = `Score: ${score}`;
        } else {
            optionElement.classList.add('incorrect');
            // Also show the correct answer
            optionsContainer.children[correctAnswerIndex].classList.add('correct');
        }
        
        // Store the user's answer
        userAnswers.push({
            question: questions[currentQuestionIndex].question,
            userAnswer: userAnswerIndex,
            correctAnswer: correctAnswerIndex,
            options: questions[currentQuestionIndex].options,
            explanation: questions[currentQuestionIndex].explanation
        });
        
        // Enable next button
        nextBtn.disabled = false;
    }
    
    // Reset options styling
    function resetOptions() {
        while (optionsContainer.firstChild) {
            optionsContainer.removeChild(optionsContainer.firstChild);
        }
        selectedOption = null;
    }
    
    // Next question
    function nextQuestion() {
        const questions = quizData[currentCategory];
        currentQuestionIndex++;
        
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            showResults();
        }
    }
    
    // Show results
    function showResults() {
        totalTimeSpent = Math.floor((Date.now() - quizStartTime) / 1000);
        
        switchScreen(screens.quiz, screens.results);
        
        // Update score and details
        const totalQuestions = quizData[currentCategory].length;
        const percentage = Math.round((score / totalQuestions) * 100);
        
        scoreValue.textContent = score;
        scorePercentage.textContent = `${percentage}%`;
        correctAnswers.textContent = `${score}/${totalQuestions}`;
        timeSpent.textContent = formatTime(totalTimeSpent);
        resultCategory.textContent = categoryTitles[currentCategory];
        
        // Set score message
        if (percentage >= 90) {
            scoreMessage.textContent = "Outstanding! You're a quiz master!";
        } else if (percentage >= 70) {
            scoreMessage.textContent = "Excellent job! You know your stuff!";
        } else if (percentage >= 50) {
            scoreMessage.textContent = "Good effort! Keep learning!";
        } else if (percentage >= 30) {
            scoreMessage.textContent = "Not bad, but there's room for improvement!";
        } else {
            scoreMessage.textContent = "Keep studying and try again!";
        }
        
        // Animate score counting
        animateScore(0, score, 1500);
    }
    
    // Animate score counting
    function animateScore(start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            scoreValue.textContent = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    // Show review screen
    function showReviewScreen() {
        switchScreen(screens.results, screens.review);
        populateReviewScreen();
    }
    
    // Populate review screen with answers
    function populateReviewScreen() {
        reviewContainer.innerHTML = '';
        
        userAnswers.forEach((answer, index) => {
            const reviewItem = document.createElement('div');
            reviewItem.classList.add('review-item');
            
            const questionElement = document.createElement('div');
            questionElement.classList.add('review-question');
            questionElement.innerHTML = `<strong>Question ${index + 1}:</strong> ${answer.question}`;
            reviewItem.appendChild(questionElement);
            
            // Add user's answer
            const userAnswerElement = document.createElement('div');
            userAnswerElement.classList.add('review-answer');
            
            if (answer.userAnswer === null) {
                userAnswerElement.classList.add('incorrect');
                userAnswerElement.innerHTML = `
                    <i class="fas fa-clock status-icon"></i>
                    <span>Time's up! You didn't answer this question.</span>
                `;
            } else {
                const isCorrect = answer.userAnswer === answer.correctAnswer;
                userAnswerElement.classList.add(isCorrect ? 'correct' : 'incorrect');
                
                userAnswerElement.innerHTML = `
                    <i class="fas ${isCorrect ? 'fa-check' : 'fa-times'} status-icon"></i>
                    <span>Your answer: ${String.fromCharCode(65 + answer.userAnswer)}. ${answer.options[answer.userAnswer]}</span>
                `;
            }
            
            reviewItem.appendChild(userAnswerElement);
            
            // Add correct answer if user was wrong
            if (answer.userAnswer !== answer.correctAnswer) {
                const correctAnswerElement = document.createElement('div');
                correctAnswerElement.classList.add('review-answer', 'correct');
                correctAnswerElement.innerHTML = `
                    <i class="fas fa-check status-icon"></i>
                    <span>Correct answer: ${String.fromCharCode(65 + answer.correctAnswer)}. ${answer.options[answer.correctAnswer]}</span>
                `;
                reviewItem.appendChild(correctAnswerElement);
            }
            
            // Add explanation
            const explanationElement = document.createElement('div');
            explanationElement.classList.add('review-explanation');
            explanationElement.innerHTML = `<strong>Explanation:</strong> ${answer.explanation}`;
            reviewItem.appendChild(explanationElement);
            
            reviewContainer.appendChild(reviewItem);
        });
    }
    
    // Back to results screen
    function backToResultsScreen() {
        switchScreen(screens.review, screens.results);
    }
    
    // Show quit confirmation modal
    function showQuitConfirmation() {
        modal.classList.add('active');
    }
    
    // Hide modal
    function hideModal() {
        modal.classList.remove('active');
    }
    
    // Quit quiz
    function quitQuiz() {
        hideModal();
        switchScreen(screens.quiz, screens.welcome);
    }
    
    // Restart quiz
    function restartQuiz() {
        switchScreen(screens.results, screens.selection);
    }
    
    // Go back to previous screen
    function goBack() {
        if (screens.selection.classList.contains('active')) {
            switchScreen(screens.selection, screens.welcome);
        } else if (screens.quiz.classList.contains('active')) {
            showQuitConfirmation();
        }
    }
    
    // Switch between screens
    function switchScreen(from, to) {
        from.classList.remove('active');
        to.classList.add('active');
    }
    
    // Initialize the application
    init();
});