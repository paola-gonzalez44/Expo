
        const questions = [
            { question: "I ___ a student", options: ["am", "is", "are"], correct: 0 },
            { question: "She ___ my teacher", options: ["am", "is", "are"], correct: 1 },
            { question: "They ___ happy", options: ["am", "is", "are"], correct: 2 },
            { question: "He ___ my friend", options: ["am", "is", "are"], correct: 1 },
            { question: "We ___ in class", options: ["am", "is", "are"], correct: 2 },
            { question: "It ___ a cat", options: ["am", "is", "are"], correct: 1 },
            { question: "You ___ kind", options: ["am", "is", "are"], correct: 2 },
            { question: "I ___ seven years old", options: ["am", "is", "are"], correct: 0 },
            { question: "My mom ___ nice", options: ["am", "is", "are"], correct: 1 },
            { question: "The dogs ___ playful", options: ["am", "is", "are"], correct: 2 }
        ];

        let currentQuestion = 0;
        let score = 0;
        let selectedOption = null;
        let answered = false;

        function loadQuestion() {
            const q = questions[currentQuestion];
            document.getElementById('questionText').innerHTML = 
                q.question.split('___').join('<span class="blank">___</span>');
            
            const optionsDiv = document.getElementById('options');
            optionsDiv.innerHTML = '';
            
            q.options.forEach((opt, idx) => {
                const btn = document.createElement('button');
                btn.className = 'option-btn';
                btn.textContent = opt;
                btn.onclick = () => selectOption(idx);
                optionsDiv.appendChild(btn);
            });

            document.getElementById('currentQ').textContent = currentQuestion + 1;
            
            const progress = (currentQuestion / questions.length) * 100;
            document.getElementById('progressBar').style.width = progress + '%';
            
            document.getElementById('feedback').classList.remove('show');
            document.getElementById('btnSubmit').style.display = 'inline-block';
            document.getElementById('btnNext').style.display = 'none';
            
            selectedOption = null;
            answered = false;
        }

        function selectOption(index) {
            if (answered) return;
            
            selectedOption = index;
            const buttons = document.querySelectorAll('.option-btn');
            buttons.forEach((btn, idx) => {
                btn.classList.remove('selected');
                if (idx === index) btn.classList.add('selected');
            });
        }

        function checkAnswer() {
            if (selectedOption === null) {
                alert('Please select an answer!');
                return;
            }

            answered = true;
            const q = questions[currentQuestion];
            const buttons = document.querySelectorAll('.option-btn');
            const feedback = document.getElementById('feedback');

            if (selectedOption === q.correct) {
                score++;
                document.getElementById('score').textContent = score;
                buttons[selectedOption].classList.add('correct');
                feedback.className = 'feedback correct show';
                feedback.innerHTML = 'Excellent! That is correct!';
            } else {
                buttons[selectedOption].classList.add('incorrect');
                buttons[q.correct].classList.add('correct');
                feedback.className = 'feedback incorrect show';
                feedback.innerHTML = 'The correct answer is: ' + q.options[q.correct];
            }

            document.getElementById('btnSubmit').style.display = 'none';
            document.getElementById('btnNext').style.display = 'inline-block';
        }

        function nextQuestion() {
            currentQuestion++;
            
            if (currentQuestion < questions.length) {
                loadQuestion();
            } else {
                showResults();
            }
        }

        function showResults() {
            document.getElementById('questionScreen').style.display = 'none';
            document.getElementById('resultScreen').classList.add('show');
            document.getElementById('progressBar').style.width = '100%';
            document.getElementById('finalScore').textContent = score + '/10';

            let message = '';
            if (score === 10) {
                message = 'Perfect score! You are a grammar master!';
            } else if (score >= 8) {
                message = 'Great job! You did really well!';
            } else if (score >= 6) {
                message = 'Good effort! Keep practicing!';
            } else {
                message = 'Nice try! Practice makes perfect!';
            }

            document.getElementById('resultMessage').textContent = message;
        }

        loadQuestion();
   