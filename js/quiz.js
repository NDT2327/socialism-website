// console.log("Quiz Game module loaded");

// // Global variables
// var gameState = {
//     mode: 'classic',
//     currentQuestion: 0,
//     score: 0,
//     lives: 3,
//     combo: 0,
//     maxCombo: 0,
//     timeLeft: 0,
//     questions: [],
//     answers: [],
//     usedPowerups: [],
//     startTime: null,
//     timeBonus: 0,
//     gameTimer: null,
//     finalResults: null
// };

// var questionBank = {
//     easy: [
//         {
//             question: "Trong cơ cấu xã hội, nhóm cơ cấu nào có vị trí quan trọng hàng đầu?",
//             options: [
//                 "Cơ cấu xã hội - giai cấp",
//                 "Cơ cấu dân tộc", 
//                 "Cơ cấu nghề nghiệp",
//                 "Cơ cấu vùng miền"
//             ],
//             correct: 0,
//             topic: "Cơ cấu xã hội",
//             explanation: "Cơ cấu xã hội - giai cấp có vị trí quan trọng hàng đầu vì liên quan đến sở hữu tư liệu sản xuất.",
//             hint: "Loại cơ cấu này liên quan đến quyền lực và sở hữu trong xã hội."
//         },
//         {
//             question: "Liên minh giai cấp cơ bản ở Việt Nam gồm những ai?",
//             options: [
//                 "Công nhân - Nông dân - Trí thức",
//                 "Tư sản - Nông dân - Công nhân",
//                 "Địa chủ - Nông dân - Tiểu tư sản", 
//                 "Doanh nhân - Trí thức - Công nhân"
//             ],
//             correct: 0,
//             topic: "Liên minh giai cấp",
//             explanation: "Liên minh Công nhân - Nông dân - Trí thức là liên minh cơ bản.",
//             hint: "Ba thành phần chính trong xã hội Việt Nam hiện nay."
//         },
//         {
//             question: "Đặc điểm nào sau đây thuộc về giai cấp công nhân?",
//             options: [
//                 "Lãnh đạo cách mạng, đại diện cho phương thức sản xuất tiên tiến",
//                 "Sở hữu tư liệu sản xuất lớn",
//                 "Chỉ làm việc trong nông nghiệp",
//                 "Không tham gia hoạt động chính trị"
//             ],
//             correct: 0,
//             topic: "Giai cấp công nhân",
//             explanation: "Giai cấp công nhân là lực lượng lãnh đạo cách mạng và đại diện cho phương thức sản xuất tiên tiến nhất.",
//             hint: "Giai cấp này được coi là 'tiên phong' trong xã hội."
//         },
//         {
//             question: "Vai trò của giai cấp nông dân trong xã hội Việt Nam là gì?",
//             options: [
//                 "Bệ đỡ kinh tế, đảm bảo an ninh lương thực",
//                 "Lãnh đạo toàn bộ xã hội",
//                 "Chỉ sản xuất để tự cung tự cấp",
//                 "Không có vai trò quan trọng"
//             ],
//             correct: 0,
//             topic: "Giai cấp nông dân",
//             explanation: "Giai cấp nông dân đóng vai trò là bệ đỡ kinh tế, đảm bảo an ninh lương thực và xuất khẩu nông sản.",
//             hint: "Giai cấp này liên quan đến việc 'nuôi sống' đất nước."
//         }
//     ],
//     medium: [
//         {
//             question: "Tỷ lệ lao động nông nghiệp của Việt Nam năm 2022 là bao nhiêu?",
//             options: ["27.5%", "50%", "70%", "15%"],
//             correct: 0,
//             topic: "Thống kê kinh tế",
//             explanation: "Tỷ lệ lao động nông nghiệp giảm từ 70% (1986) xuống 27.5% (2022).",
//             hint: "Con số này thể hiện sự giảm mạnh so với thời điểm Đổi mới 1986."
//         },
//         {
//             question: "GDP Việt Nam đã tăng bao nhiêu lần từ năm 1986 đến 2024?",
//             options: ["59.5 lần", "35 lần", "20 lần", "100 lần"],
//             correct: 0,
//             topic: "Thành tựu Đổi mới",
//             explanation: "GDP tăng từ 8 tỷ USD (1986) lên 476.3 tỷ USD (2024).",
//             hint: "Con số này phản ánh thành công vượt bậc của công cuộc Đổi mới."
//         },
//         {
//             question: "Tầng lớp trí thức có vai trò gì trong thời kỳ hiện nay?",
//             options: [
//                 "Lực lượng sáng tạo đặc biệt, động lực phát triển KH&CN",
//                 "Chỉ làm việc trong giáo dục",
//                 "Thay thế vai trò lãnh đạo của giai cấp công nhân",
//                 "Không có vai trò trong sản xuất"
//             ],
//             correct: 0,
//             topic: "Tầng lớp trí thức",
//             explanation: "Tầng lớp trí thức là lực lượng sáng tạo đặc biệt, động lực quan trọng trong công nghiệp hóa, hiện đại hóa.",
//             hint: "Tầng lớp này liên quan đến 'tri thức' và 'sáng tạo'."
//         },
//         {
//             question: "Tầng lớp doanh nhân xuất hiện từ thời điểm nào ở Việt Nam?",
//             options: [
//                 "Từ thời kỳ Đổi mới (1986)",
//                 "Từ thời kỳ kháng chiến chống Pháp",
//                 "Từ thời kỳ kháng chiến chống Mỹ",
//                 "Từ trước Cách mạng Tháng Tám"
//             ],
//             correct: 0,
//             topic: "Tầng lớp doanh nhân",
//             explanation: "Tầng lớp doanh nhân mới xuất hiện và phát triển từ thời kỳ Đổi mới 1986 với sự ra đời của kinh tế thị trường.",
//             hint: "Tầng lớp này gắn liền với 'kinh tế thị trường'."
//         }
//     ],
//     hard: [
//         {
//             question: "Theo văn kiện Đại hội IX, đặc điểm cơ cấu giai cấp thời kỳ quá độ là gì?",
//             options: [
//                 "Có nhiều giai cấp, tầng lớp với cơ cấu, tính chất, vị trí thay đổi",
//                 "Chỉ có một giai cấp duy nhất",
//                 "Không có sự thay đổi về giai cấp",
//                 "Chỉ tồn tại giai cấp công nhân"
//             ],
//             correct: 0,
//             topic: "Văn kiện Đảng",
//             explanation: "Văn kiện Đại hội IX khẳng định có nhiều giai cấp, tầng lớp khác nhau.",
//             hint: "Đây là đặc điểm của xã hội trong thời kỳ chuyển đổi."
//         },
//         {
//             question: "Vai trò của giai cấp công nhân trong liên minh giai cấp là gì?",
//             options: [
//                 "Lãnh đạo liên minh, đại diện cho phương thức sản xuất tiên tiến",
//                 "Chỉ tham gia như một thành viên bình thường",
//                 "Hỗ trợ giai cấp nông dân lãnh đạo",
//                 "Đảm nhận vai trò tư vấn cho trí thức"
//             ],
//             correct: 0,
//             topic: "Vai trò giai cấp",
//             explanation: "Giai cấp công nhân là lực lượng lãnh đạo cách mạng, đại diện cho phương thức sản xuất tiên tiến nhất.",
//             hint: "Giai cấp này được coi là 'tiên phong' và có tính 'cách mạng triệt để'."
//         },
//         {
//             question: "Tại sao cơ cấu xã hội - giai cấp lại chi phối các cơ cấu xã hội khác?",
//             options: [
//                 "Vì liên quan đến quyền lực và sở hữu tư liệu sản xuất",
//                 "Vì có số lượng người nhiều nhất",
//                 "Vì được pháp luật quy định",
//                 "Vì có truyền thống lịch sử lâu đời"
//             ],
//             correct: 0,
//             topic: "Vị trí cơ cấu giai cấp",
//             explanation: "Cơ cấu giai cấp chi phối các cơ cấu khác vì nó liên quan đến quyền lực chính trị và sở hữu tư liệu sản xuất.",
//             hint: "Vấn đề này liên quan đến 'quyền lực' và 'kinh tế'."
//         }
//     ]
// };

// var gameModes = {
//     classic: { name: "Chế độ Cổ điển", questionCount: 8, timePerQuestion: 60, scoreMultiplier: 1 },
//     speed: { name: "Chế độ Tốc độ", questionCount: 10, timePerQuestion: 30, scoreMultiplier: 1.5 },
//     survival: { name: "Chế độ Sinh tồn", questionCount: -1, timePerQuestion: 45, scoreMultiplier: 2 }
// };

// // Initialize when page loads
// function initializeGame() {
//     console.log("Initializing game...");
    
//     // Wait for elements to be available
//     setTimeout(function() {
//         setupEventListeners();
//         showGameMenu();
//     }, 500);
// }

// function setupEventListeners() {
//     console.log("Setting up event listeners...");
    
//     // Game mode cards
//     var modeCards = document.querySelectorAll('.game-mode-card');
//     console.log("Found mode cards:", modeCards.length);
    
//     for (var i = 0; i < modeCards.length; i++) {
//         var card = modeCards[i];
//         card.addEventListener('click', function() {
//             var mode = this.getAttribute('data-mode');
//             console.log("Mode selected:", mode);
            
//             if (mode === 'review') {
//                 showStudyMode();
//             } else {
//                 startGame(mode);
//             }
//         });
//     }
    
//     // Mode buttons inside cards
//     var modeButtons = document.querySelectorAll('.mode-btn');
//     console.log("Found mode buttons:", modeButtons.length);
    
//     for (var i = 0; i < modeButtons.length; i++) {
//         var btn = modeButtons[i];
//         btn.addEventListener('click', function(e) {
//             e.stopPropagation();
//             var card = this.closest('.game-mode-card');
//             var mode = card.getAttribute('data-mode');
//             console.log("Button clicked for mode:", mode);
            
//             if (mode === 'review') {
//                 showStudyMode();
//             } else {
//                 startGame(mode);
//             }
//         });
//     }
    
//     // Game control buttons
//     setupGameControls();
// }

// function setupGameControls() {
//     // Power-up buttons
//     var fiftyBtn = document.getElementById('fifty-fifty');
//     if (fiftyBtn) {
//         fiftyBtn.addEventListener('click', function() { usePowerup('fifty-fifty'); });
//     }
    
//     var expertBtn = document.getElementById('ask-expert');
//     if (expertBtn) {
//         expertBtn.addEventListener('click', function() { usePowerup('ask-expert'); });
//     }
    
//     var doubleBtn = document.getElementById('double-score');
//     if (doubleBtn) {
//         doubleBtn.addEventListener('click', function() { usePowerup('double-score'); });
//     }
    
//     // Other game buttons
//     var hintBtn = document.getElementById('hint-btn');
//     if (hintBtn) {
//         hintBtn.addEventListener('click', showHint);
//     }
    
//     var skipBtn = document.getElementById('skip-btn');
//     if (skipBtn) {
//         skipBtn.addEventListener('click', skipQuestion);
//     }
    
//     var playAgainBtn = document.getElementById('play-again');
//     if (playAgainBtn) {
//         playAgainBtn.addEventListener('click', function() { 
//             console.log("Play again clicked");
//             startGame(gameState.mode); 
//         });
//     }
    
//     var menuBtn = document.getElementById('back-to-menu');
//     if (menuBtn) {
//         menuBtn.addEventListener('click', function() {
//             console.log("Back to menu clicked");
//             showGameMenu();
//         });
//     }
    
//     var reviewBtn = document.getElementById('review-mistakes');
//     if (reviewBtn) {
//         reviewBtn.addEventListener('click', reviewMistakes);
//     }
    
//     // Study mode back button
//     var studyMenuBtn = document.getElementById('back-to-menu-study');
//     if (studyMenuBtn) {
//         studyMenuBtn.addEventListener('click', function() {
//             showGameMenu();
//         });
//     }
// }

// function showGameMenu() {
//     console.log("Showing game menu");
//     document.getElementById('game-menu').style.display = 'block';
//     document.getElementById('game-playing').style.display = 'none';
//     document.getElementById('game-results').style.display = 'none';
//     document.getElementById('study-mode').style.display = 'none';
// }

// function showStudyMode() {
//     console.log("Showing study mode");
//     document.getElementById('game-menu').style.display = 'none';
//     document.getElementById('game-playing').style.display = 'none';
//     document.getElementById('game-results').style.display = 'none';
//     document.getElementById('study-mode').style.display = 'block';
// }

// function startGame(mode) {
//     console.log("Starting game with mode:", mode);
    
//     gameState = {
//         mode: mode,
//         currentQuestion: 0,
//         score: 0,
//         lives: 3,
//         combo: 0,
//         maxCombo: 0,
//         timeLeft: gameModes[mode].timePerQuestion,
//         questions: generateQuestions(mode),
//         answers: [],
//         usedPowerups: [],
//         startTime: Date.now(),
//         timeBonus: 0,
//         gameTimer: null,
//         finalResults: null
//     };
    
//     console.log("Generated", gameState.questions.length, "questions");
    
//     showGamePlaying();
//     loadQuestion();
//     startTimer();
//     playSound('gameStart');
// }

// function generateQuestions(mode) {
//     var questions = [];
//     var config = gameModes[mode];
//     var questionCount = config.questionCount === -1 ? 20 : config.questionCount;
    
//     var easyCount = Math.floor(questionCount * 0.4);
//     var mediumCount = Math.floor(questionCount * 0.4);
//     var hardCount = questionCount - easyCount - mediumCount;
    
//     // Add questions from each difficulty
//     questions = questions.concat(getRandomQuestions(questionBank.easy, easyCount));
//     questions = questions.concat(getRandomQuestions(questionBank.medium, mediumCount));
//     questions = questions.concat(getRandomQuestions(questionBank.hard, hardCount));
    
//     return shuffleArray(questions);
// }

// function getRandomQuestions(pool, count) {
//     var shuffled = shuffleArray(pool.slice());
//     return shuffled.slice(0, Math.min(count, shuffled.length));
// }

// function shuffleArray(array) {
//     var newArray = array.slice();
//     for (var i = newArray.length - 1; i > 0; i--) {
//         var j = Math.floor(Math.random() * (i + 1));
//         var temp = newArray[i];
//         newArray[i] = newArray[j];
//         newArray[j] = temp;
//     }
//     return newArray;
// }

// function showGamePlaying() {
//     console.log("Showing game playing screen");
//     document.getElementById('game-menu').style.display = 'none';
//     document.getElementById('game-playing').style.display = 'block';
//     document.getElementById('game-results').style.display = 'none';
//     document.getElementById('study-mode').style.display = 'none';
// }

// function loadQuestion() {
//     console.log("Loading question", gameState.currentQuestion + 1);
    
//     if (gameState.currentQuestion >= gameState.questions.length) {
//         endGame();
//         return;
//     }
    
//     var question = gameState.questions[gameState.currentQuestion];
//     gameState.timeLeft = gameModes[gameState.mode].timePerQuestion;
    
//     // Update question display
//     document.getElementById('question-text').textContent = question.question;
//     document.getElementById('question-topic').textContent = question.topic;
    
//     var difficulty = getDifficulty(question);
//     document.getElementById('question-difficulty').innerHTML = 
//         '<i class="fas fa-star"></i><span>' + difficulty + '</span>';
    
//     // Update progress
//     var totalQuestions = gameState.questions.length;
//     var progress = ((gameState.currentQuestion + 1) / totalQuestions) * 100;
//     document.getElementById('game-progress').style.width = progress + '%';
//     document.getElementById('question-counter').textContent = 
//         'Câu ' + (gameState.currentQuestion + 1) + '/' + totalQuestions;
    
//     // Generate answer options
//     generateAnswerOptions(question);
//     updateGameStats();
//     resetQuestionPowerups();
// }

// function getDifficulty(question) {
//     for (var i = 0; i < questionBank.easy.length; i++) {
//         if (questionBank.easy[i] === question) return 'Cơ bản';
//     }
//     for (var i = 0; i < questionBank.medium.length; i++) {
//         if (questionBank.medium[i] === question) return 'Trung bình';
//     }
//     return 'Nâng cao';
// }

// function generateAnswerOptions(question) {
//     var container = document.getElementById('answers-container');
//     container.innerHTML = '';
    
//     for (var i = 0; i < question.options.length; i++) {
//         var option = question.options[i];
//         var optionElement = document.createElement('div');
//         optionElement.className = 'answer-option';
//         optionElement.innerHTML = 
//             '<i class="fas fa-' + getOptionIcon(i) + '"></i>' +
//             '<span>' + option + '</span>';
        
//         // Create closure to capture index
//         (function(index) {
//             optionElement.addEventListener('click', function() {
//                 selectAnswer(index);
//             });
//         })(i);
        
//         container.appendChild(optionElement);
//     }
// }

// function getOptionIcon(index) {
//     var icons = ['circle', 'square', 'triangle', 'star'];
//     return icons[index] || 'circle';
// }

// function selectAnswer(selectedIndex) {
//     console.log("Answer selected:", selectedIndex);
    
//     var question = gameState.questions[gameState.currentQuestion];
//     var isCorrect = selectedIndex === question.correct;
//     var options = document.querySelectorAll('.answer-option');
    
//     // Disable all options
//     for (var i = 0; i < options.length; i++) {
//         options[i].classList.add('disabled');
//         options[i].style.pointerEvents = 'none';
//     }
    
//     // Mark selected answer
//     if (selectedIndex >= 0) {
//         options[selectedIndex].classList.add('selected');
//     }
    
//     // Show results after delay
//     setTimeout(function() {
//         options[question.correct].classList.add('correct');
        
//         if (!isCorrect && selectedIndex >= 0) {
//             options[selectedIndex].classList.add('incorrect');
//             gameState.combo = 0;
            
//             if (gameState.mode === 'survival') {
//                 gameState.lives--;
//                 if (gameState.lives <= 0) {
//                     endGame();
//                     return;
//                 }
//             }
//         } else if (isCorrect) {
//             gameState.combo++;
//             gameState.maxCombo = Math.max(gameState.maxCombo, gameState.combo);
            
//             var baseScore = getBaseScore(question);
//             var comboBonus = gameState.combo > 1 ? (gameState.combo - 1) * 50 : 0;
//             var timeBonus = Math.floor(gameState.timeLeft * 2);
//             var totalScore = Math.floor((baseScore + comboBonus + timeBonus) * gameModes[gameState.mode].scoreMultiplier);
            
//             gameState.score += totalScore;
//             gameState.timeBonus += timeBonus;
            
//             showScorePopup(totalScore, comboBonus, timeBonus);
//         }
        
//         // Store answer
//         gameState.answers.push({
//             questionIndex: gameState.currentQuestion,
//             selectedAnswer: selectedIndex,
//             correctAnswer: question.correct,
//             isCorrect: isCorrect,
//             timeUsed: gameModes[gameState.mode].timePerQuestion - gameState.timeLeft,
//             skipped: selectedIndex === -1
//         });
        
//         playSound(isCorrect ? 'correct' : 'wrong');
        
//         // Move to next question
//         setTimeout(function() {
//             gameState.currentQuestion++;
//             loadQuestion();
//         }, 2000);
        
//     }, 500);
    
//     // Stop timer
//     if (gameState.gameTimer) {
//         clearInterval(gameState.gameTimer);
//     }
// }

// function getBaseScore(question) {
//     var difficulty = getDifficulty(question);
//     switch(difficulty) {
//         case 'Cơ bản': return 100;
//         case 'Trung bình': return 200;
//         case 'Nâng cao': return 300;
//         default: return 100;
//     }
// }

// function showScorePopup(totalScore, comboBonus, timeBonus) {
//     var popup = document.createElement('div');
//     popup.className = 'score-popup';
//     popup.innerHTML = '+' + totalScore;
//     if (comboBonus > 0) {
//         popup.innerHTML += '<br><small>Combo +' + comboBonus + '</small>';
//     }
//     if (timeBonus > 0) {
//         popup.innerHTML += '<br><small>Thời gian +' + timeBonus + '</small>';
//     }
    
//     var container = document.querySelector('.question-container');
//     container.style.position = 'relative';
//     container.appendChild(popup);
    
//     setTimeout(function() {
//         popup.remove();
//     }, 2000);
// }

// function startTimer() {
//     if (gameState.gameTimer) {
//         clearInterval(gameState.gameTimer);
//     }
    
//     gameState.gameTimer = setInterval(function() {
//         gameState.timeLeft--;
//         updateGameStats();
        
//         if (gameState.timeLeft <= 0) {
//             selectAnswer(-1); // Time's up
//         }
//     }, 1000);
// }

// function updateGameStats() {
//     document.getElementById('current-score').textContent = gameState.score.toLocaleString();
//     document.getElementById('lives-count').textContent = gameState.lives;
//     document.getElementById('combo-count').textContent = gameState.combo;
//     document.getElementById('time-left').textContent = gameState.timeLeft + 's';
    
//     // Update colors based on values
//     var livesElement = document.getElementById('lives-count');
//     if (gameState.lives <= 1) {
//         livesElement.style.color = '#e74c3c';
//     } else if (gameState.lives <= 2) {
//         livesElement.style.color = '#f39c12';
//     } else {
//         livesElement.style.color = '#2ecc71';
//     }
    
//     var timeElement = document.getElementById('time-left');
//     if (gameState.timeLeft <= 10) {
//         timeElement.style.color = '#e74c3c';
//         timeElement.style.animation = 'pulse 1s infinite';
//     } else if (gameState.timeLeft <= 20) {
//         timeElement.style.color = '#f39c12';
//         timeElement.style.animation = '';
//     } else {
//         timeElement.style.color = '#2ecc71';
//         timeElement.style.animation = '';
//     }
// }

// function resetQuestionPowerups() {
//     var powerups = document.querySelectorAll('.powerup');
//     for (var i = 0; i < powerups.length; i++) {
//         var powerup = powerups[i];
//         var powerupId = powerup.id;
//         var questionKey = powerupId + '-' + gameState.currentQuestion;
        
//         if (gameState.usedPowerups.indexOf(questionKey) !== -1) {
//             powerup.classList.add('used');
//             powerup.disabled = true;
//         } else {
//             powerup.classList.remove('used');
//             powerup.disabled = false;
//         }
//     }
// }

// function usePowerup(powerupType) {
//     var powerupElement = document.getElementById(powerupType);
//     var cost = parseInt(powerupElement.getAttribute('data-cost'));
//     var questionKey = powerupType + '-' + gameState.currentQuestion;
    
//     if (gameState.score < cost) {
//         showAlert('❌ Không đủ điểm để sử dụng trợ giúp này!', 'error');
//         return;
//     }
    
//     if (gameState.usedPowerups.indexOf(questionKey) !== -1) {
//         showAlert('❌ Đã sử dụng trợ giúp này cho câu hỏi này!', 'error');
//         return;
//     }
    
//     gameState.score -= cost;
//     gameState.usedPowerups.push(questionKey);
    
//     switch(powerupType) {
//         case 'fifty-fifty':
//             useFiftyFifty();
//             break;
//         case 'ask-expert':
//             useAskExpert();
//             break;
//         case 'double-score':
//             useDoubleScore();
//             break;
//     }
    
//     updateGameStats();
//     resetQuestionPowerups();
    
//     showAlert('✅ Đã sử dụng trợ giúp! (-' + cost + ' điểm)', 'success');
//     playSound('powerup');
// }

// function useFiftyFifty() {
//     var question = gameState.questions[gameState.currentQuestion];
//     var options = document.querySelectorAll('.answer-option');
//     var incorrectIndices = [];
    
//     for (var i = 0; i < question.options.length; i++) {
//         if (i !== question.correct) {
//             incorrectIndices.push(i);
//         }
//     }
    
//     var toHide = shuffleArray(incorrectIndices).slice(0, 2);
    
//     for (var i = 0; i < toHide.length; i++) {
//         var index = toHide[i];
//         options[index].style.opacity = '0.3';
//         options[index].style.pointerEvents = 'none';
//         options[index].innerHTML += ' <small>(Đã loại)</small>';
//     }
// }

// function useAskExpert() {
//     var question = gameState.questions[gameState.currentQuestion];
//     var hint = question.hint || "Hãy suy nghĩ kỹ về các khái niệm đã học.";
    
//     showAlert('💡 Gợi ý từ chuyên gia: ' + hint, 'info');
// }

// function useDoubleScore() {
//     showAlert('⭐ Trợ giúp "Điểm x2" đã được kích hoạt cho câu này!', 'success');
// }

// function showHint() {
//     var question = gameState.questions[gameState.currentQuestion];
//     var hint = question.hint || "Hãy suy nghĩ kỹ về các khái niệm cơ bản đã học.";
    
//     gameState.score = Math.max(0, gameState.score - 50);
//     updateGameStats();
    
//     showAlert('💡 Gợi ý: ' + hint + ' (-50 điểm)', 'info');
//     playSound('hint');
// }

// function skipQuestion() {
//     gameState.score = Math.max(0, gameState.score - 100);
//     gameState.combo = 0;
    
//     gameState.answers.push({
//         questionIndex: gameState.currentQuestion,
//         selectedAnswer: -1,
//         correctAnswer: gameState.questions[gameState.currentQuestion].correct,
//         isCorrect: false,
//         timeUsed: 0,
//         skipped: true
//     });
    
//     updateGameStats();
//     showAlert('⏭️ Đã bỏ qua câu hỏi! (-100 điểm)', 'warning');
    
//     gameState.currentQuestion++;
//     loadQuestion();
    
//     playSound('skip');
// }

// function endGame() {
//     console.log("Game ended");
    
//     if (gameState.gameTimer) {
//         clearInterval(gameState.gameTimer);
//     }
    
//     calculateFinalResults();
//     showGameResults();
//     playSound('gameEnd');
// }

// function calculateFinalResults() {
//     var correctAnswers = 0;
//     for (var i = 0; i < gameState.answers.length; i++) {
//         if (gameState.answers[i].isCorrect) {
//             correctAnswers++;
//         }
//     }
    
//     var totalAnswers = gameState.answers.length;
//     var accuracy = totalAnswers > 0 ? Math.round((correctAnswers / totalAnswers) * 100) : 0;
    
//     gameState.finalResults = {
//         correctAnswers: correctAnswers,
//         totalAnswers: totalAnswers,
//         accuracy: accuracy,
//         finalScore: gameState.score,
//         maxCombo: gameState.maxCombo,
//         timeBonus: gameState.timeBonus,
//         achievement: getAchievement(gameState.score, accuracy)
//     };
// }

// function getAchievement(score, accuracy) {
//     if (score >= 2000 && accuracy >= 90) {
//         return { icon: 'fas fa-crown', text: 'Bậc thầy CNXH', color: '#ffd700' };
//     } else if (score >= 1500 && accuracy >= 80) {
//         return { icon: 'fas fa-medal', text: 'Thạc sĩ CNXH', color: '#c0c0c0' };
//     } else if (score >= 1000 && accuracy >= 70) {
//         return { icon: 'fas fa-star', text: 'Cử nhân CNXH', color: '#cd7f32' };
//     } else if (score >= 500) {
//         return { icon: 'fas fa-graduation-cap', text: 'Học viên giỏi', color: '#3498db' };
//     } else {
//         return { icon: 'fas fa-seedling', text: 'Người mới bắt đầu', color: '#95a5a6' };
//     }
// }

// function showGameResults() {
//     console.log("Showing game results");
    
//     document.getElementById('game-menu').style.display = 'none';
//     document.getElementById('game-playing').style.display = 'none';
//     document.getElementById('game-results').style.display = 'block';
//     document.getElementById('study-mode').style.display = 'none';
    
//     var results = gameState.finalResults;
    
//     // Update final score
//     document.getElementById('final-score-value').textContent = results.finalScore.toLocaleString();
    
//     // Update achievement
//     var achievementBadge = document.getElementById('achievement-badge');
//     var achievement = results.achievement;
//     achievementBadge.innerHTML = 
//         '<i class="' + achievement.icon + '" style="color: ' + achievement.color + ';"></i>' +
//         '<span>' + achievement.text + '</span>';
    
//     // Update stats
//     document.getElementById('correct-answers').textContent = results.correctAnswers;
//     document.getElementById('accuracy-rate').textContent = results.accuracy + '%';
//     document.getElementById('max-combo').textContent = results.maxCombo;
//     document.getElementById('time-bonus').textContent = results.timeBonus;
    
//     generateResultsReview();
// }

// function generateResultsReview() {
//     var reviewContainer = document.getElementById('results-review');
//     var reviewHTML = '<h3><i class="fas fa-list-check"></i> Xem lại kết quả</h3>';
    
//     for (var i = 0; i < gameState.answers.length; i++) {
//         var answer = gameState.answers[i];
//         var question = gameState.questions[answer.questionIndex];
//         var statusIcon = answer.isCorrect ? 
//             '<i class="fas fa-check-circle" style="color: #2ecc71;"></i>' :
//             '<i class="fas fa-times-circle" style="color: #e74c3c;"></i>';
        
//         reviewHTML += 
//             '<div class="card" style="margin: 1rem 0; padding: 1rem;">' +
//                 '<div style="display: flex; align-items: flex-start; gap: 1rem;">' +
//                     statusIcon +
//                     '<div style="flex: 1;">' +
//                         '<strong>Câu ' + (i + 1) + ': ' + question.question + '</strong><br>' +
//                         '<small style="color: #666;">' +
//                             (answer.skipped ? 'Đã bỏ qua' : 
//                               answer.isCorrect ? 'Trả lời đúng' : 
//                               'Trả lời sai - Đáp án đúng: ' + question.options[question.correct]) +
//                         '</small>';
        
//         if (!answer.isCorrect) {
//             reviewHTML += '<br><em style="color: #3498db;">' + question.explanation + '</em>';
//         }
        
//         reviewHTML += '</div></div></div>';
//     }
    
//     reviewContainer.innerHTML = reviewHTML;
// }

// function reviewMistakes() {
//     var wrongTopics = [];
//     for (var i = 0; i < gameState.answers.length; i++) {
//         var answer = gameState.answers[i];
//         if (!answer.isCorrect) {
//             var question = gameState.questions[answer.questionIndex];
//             if (wrongTopics.indexOf(question.topic) === -1) {
//                 wrongTopics.push(question.topic);
//             }
//         }
//     }
    
//     var message = '📚 Bạn nên ôn tập các chủ đề sau:\n\n';
//     for (var i = 0; i < wrongTopics.length; i++) {
//         message += '• ' + wrongTopics[i] + '\n';
//     }
    
//     if (wrongTopics.length === 0) {
//         message = '🌟 Chúc mừng! Bạn đã trả lời đúng tất cả các câu hỏi!';
//     }
    
//     showAlert(message, 'info');
// }

// function showAlert(message, type) {
//     var alert = document.createElement('div');
//     var bgColor = '#3498db';
    
//     if (type === 'success') bgColor = '#2ecc71';
//     else if (type === 'error') bgColor = '#e74c3c';
//     else if (type === 'warning') bgColor = '#f39c12';
    
//     alert.style.cssText = 
//         'position: fixed; top: 2rem; right: 2rem; background: ' + bgColor + '; color: white; ' +
//         'padding: 1rem 1.5rem; border-radius: 12px; box-shadow: 0 8px 30px rgba(0,0,0,0.2); ' +
//         'z-index: 10000; transform: translateX(100%); transition: transform 0.3s ease; ' +
//         'max-width: 350px; font-weight: 500; white-space: pre-line;';
    
//     alert.innerHTML = message;
//     document.body.appendChild(alert);
    
//     setTimeout(function() {
//         alert.style.transform = 'translateX(0)';
//     }, 100);
    
//     setTimeout(function() {
//         alert.style.transform = 'translateX(100%)';
//         setTimeout(function() { alert.remove(); }, 300);
//     }, 4000);
// }

// function playSound(type) {
//     try {
//         var audioContext = new (window.AudioContext || window.webkitAudioContext)();
//         var oscillator = audioContext.createOscillator();
//         var gainNode = audioContext.createGain();
        
//         oscillator.connect(gainNode);
//         gainNode.connect(audioContext.destination);
        
//         switch(type) {
//             case 'correct':
//                 oscillator.frequency.setValueAtTime(523, audioContext.currentTime);
//                 break;
//             case 'wrong':
//                 oscillator.frequency.setValueAtTime(330, audioContext.currentTime);
//                 break;
//             case 'gameStart':
//                 oscillator.frequency.setValueAtTime(261, audioContext.currentTime);
//                 break;
//             case 'gameEnd':
//                 oscillator.frequency.setValueAtTime(523, audioContext.currentTime);
//                 break;
//             default:
//                 oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
//         }
        
//         gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
//         gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
        
//         oscillator.start(audioContext.currentTime);
//         oscillator.stop(audioContext.currentTime + 0.2);
//     } catch (e) {
//         console.log('Audio not supported');
//     }
// }

// // Keyboard shortcuts
// document.addEventListener('keydown', function(e) {
//     var gamePlayingVisible = document.getElementById('game-playing') && 
//                            document.getElementById('game-playing').style.display !== 'none';
    
//     if (gamePlayingVisible) {
//         if (e.key >= '1' && e.key <= '4') {
//             var answerIndex = parseInt(e.key) - 1;
//             var options = document.querySelectorAll('.answer-option');
//             if (options[answerIndex] && !options[answerIndex].classList.contains('disabled')) {
//                 selectAnswer(answerIndex);
//             }
//         }
        
//         if (e.code === 'Space') {
//             e.preventDefault();
//             var hintBtn = document.getElementById('hint-btn');
//             if (hintBtn) hintBtn.click();
//         }
        
//         if (e.code === 'Enter' && e.shiftKey) {
//             e.preventDefault();
//             var skipBtn = document.getElementById('skip-btn');
//             if (skipBtn) skipBtn.click();
//         }
//     }
// });

// // Initialize game when loaded
// console.log("Quiz game script loaded, initializing...");
// initializeGame();