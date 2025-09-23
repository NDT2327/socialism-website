console.log("Quiz Game module loaded");

// Global variables
var gameState = {
    mode: 'classic',
    difficulty: 'mixed',
    currentQuestion: 0,
    score: 0,
    lives: 3,
    combo: 0,
    maxCombo: 0,
    timeLeft: 0,
    questions: [],
    answers: [],
    usedPowerups: [],
    startTime: null,
    timeBonus: 0,
    gameTimer: null,
    finalResults: null,
    currentQuestionMapping: []
};

var questionBank = {
    easy: [
        {
            question: "Trong cơ cấu xã hội, nhóm cơ cấu nào có vị trí quan trọng hàng đầu?",
            options: [
                "Cơ cấu xã hội - giai cấp",
                "Cơ cấu dân tộc", 
                "Cơ cấu nghề nghiệp",
                "Cơ cấu vùng miền"
            ],
            correct: 0,
            topic: "Cơ cấu xã hội",
            explanation: "Cơ cấu xã hội - giai cấp có vị trí quan trọng hàng đầu vì liên quan đến sở hữu tư liệu sản xuất.",
            hint: "Loại cơ cấu này liên quan đến quyền lực và sở hữu trong xã hội."
        },
        {
            question: "Liên minh giai cấp cơ bản ở Việt Nam gồm những ai?",
            options: [
                "Công nhân - Nông dân - Trí thức",
                "Tư sản - Nông dân - Công nhân",
                "Địa chủ - Nông dân - Tiểu tư sản", 
                "Doanh nhân - Trí thức - Công nhân"
            ],
            correct: 0,
            topic: "Liên minh giai cấp",
            explanation: "Liên minh Công nhân - Nông dân - Trí thức là liên minh cơ bản.",
            hint: "Ba thành phần chính trong xã hội Việt Nam hiện nay."
        },
        {
            question: "Đặc điểm nào sau đây thuộc về giai cấp công nhân?",
            options: [
                "Lãnh đạo cách mạng, đại diện cho phương thức sản xuất tiên tiến",
                "Sở hữu tư liệu sản xuất lớn",
                "Chỉ làm việc trong nông nghiệp",
                "Không tham gia hoạt động chính trị"
            ],
            correct: 0,
            topic: "Giai cấp công nhân",
            explanation: "Giai cấp công nhân là lực lượng lãnh đạo cách mạng và đại diện cho phương thức sản xuất tiên tiến nhất.",
            hint: "Giai cấp này được coi là 'tiên phong' trong xã hội."
        },
        {
            question: "Vai trò của giai cấp nông dân trong xã hội Việt Nam là gì?",
            options: [
                "Bệ đỡ kinh tế, đảm bảo an ninh lương thực",
                "Lãnh đạo toàn bộ xã hội",
                "Chỉ sản xuất để tự cung tự cấp",
                "Không có vai trò quan trọng"
            ],
            correct: 0,
            topic: "Giai cấp nông dân",
            explanation: "Giai cấp nông dân đóng vai trò là bệ đỡ kinh tế, đảm bảo an ninh lương thực và xuất khẩu nông sản.",
            hint: "Giai cấp này liên quan đến việc 'nuôi sống' đất nước."
        },
        {
            question: "Trong liên minh giai cấp cơ bản, ai là lực lượng lãnh đạo?",
            options: [
                "Giai cấp công nhân",
                "Giai cấp nông dân",
                "Tầng lớp trí thức",
                "Tất cả đều bình đẳng"
            ],
            correct: 0,
            topic: "Liên minh giai cấp",
            explanation: "Giai cấp công nhân là lực lượng lãnh đạo trong liên minh giai cấp cơ bản.",
            hint: "Lực lượng này đại diện cho phương thức sản xuất tiên tiến."
        },
        {
            question: "Cơ cấu xã hội bao gồm những cơ cấu nào?",
            options: [
                "Cơ cấu giai cấp, dân tộc, nghề nghiệp, vùng miền",
                "Chỉ có cơ cấu giai cấp",
                "Cơ cấu kinh tế và chính trị",
                "Cơ cấu văn hóa và xã hội"
            ],
            correct: 0,
            topic: "Cơ cấu xã hội",
            explanation: "Cơ cấu xã hội bao gồm cơ cấu giai cấp, cơ cấu dân tộc, cơ cấu nghề nghiệp và cơ cấu vùng miền.",
            hint: "Xã hội được cấu trúc theo nhiều tiêu chí khác nhau."
        },
        {
            question: "Tại sao nói cơ cấu giai cấp là cơ cấu cơ bản của xã hội?",
            options: [
                "Vì nó quy định bản chất của chế độ xã hội",
                "Vì nó có lịch sử lâu đời nhất",
                "Vì nó có số lượng người nhiều nhất",
                "Vì nó được pháp luật công nhận"
            ],
            correct: 0,
            topic: "Cơ cấu giai cấp",
            explanation: "Cơ cấu giai cấp quy định bản chất của chế độ xã hội và chi phối các cơ cấu khác.",
            hint: "Cơ cấu này liên quan đến 'bản chất' của xã hội."
        },
        {
            question: "Quá trình công nghiệp hóa, hiện đại hóa ở Việt Nam có đặc điểm gì?",
            options: [
                "Kết hợp chặt chẽ với phát triển kinh tế thị trường định hướng XHCN",
                "Chỉ tập trung phát triển công nghiệp nặng",
                "Bỏ qua vai trò của nông nghiệp",
                "Hoàn toàn dựa vào viện trợ nước ngoài"
            ],
            correct: 0,
            topic: "Công nghiệp hóa",
            explanation: "Công nghiệp hóa, hiện đại hóa Việt Nam gắn liền với phát triển kinh tế thị trường định hướng xã hội chủ nghĩa.",
            hint: "Quá trình này có tính 'đặc thù' của Việt Nam."
        }
    ],
    medium: [
        {
            question: "Tỷ lệ lao động nông nghiệp của Việt Nam năm 2022 là bao nhiêu?",
            options: ["27.5%", "50%", "70%", "15%"],
            correct: 0,
            topic: "Thống kê kinh tế",
            explanation: "Tỷ lệ lao động nông nghiệp giảm từ 70% (1986) xuống 27.5% (2022).",
            hint: "Con số này thể hiện sự giảm mạnh so với thời điểm Đổi mới 1986."
        },
        {
            question: "GDP Việt Nam đã tăng bao nhiêu lần từ năm 1986 đến 2024?",
            options: ["59.5 lần", "35 lần", "20 lần", "100 lần"],
            correct: 0,
            topic: "Thành tựu Đổi mới",
            explanation: "GDP tăng từ 8 tỷ USD (1986) lên 476.3 tỷ USD (2024).",
            hint: "Con số này phản ánh thành công vượt bậc của công cuộc Đổi mới."
        },
        {
            question: "Tầng lớp trí thức có vai trò gì trong thời kỳ hiện nay?",
            options: [
                "Lực lượng sáng tạo đặc biệt, động lực phát triển KH&CN",
                "Chỉ làm việc trong giáo dục",
                "Thay thế vai trò lãnh đạo của giai cấp công nhân",
                "Không có vai trò trong sản xuất"
            ],
            correct: 0,
            topic: "Tầng lớp trí thức",
            explanation: "Tầng lớp trí thức là lực lượng sáng tạo đặc biệt, động lực quan trọng trong công nghiệp hóa, hiện đại hóa.",
            hint: "Tầng lớp này liên quan đến 'tri thức' và 'sáng tạo'."
        },
        {
            question: "Tầng lớp doanh nhân xuất hiện từ thời điểm nào ở Việt Nam?",
            options: [
                "Từ thời kỳ Đổi mới (1986)",
                "Từ thời kỳ kháng chiến chống Pháp",
                "Từ thời kỳ kháng chiến chống Mỹ",
                "Từ trước Cách mạng Tháng Tám"
            ],
            correct: 0,
            topic: "Tầng lớp doanh nhân",
            explanation: "Tầng lớp doanh nhân mới xuất hiện và phát triển từ thời kỳ Đổi mới 1986 với sự ra đời của kinh tế thị trường.",
            hint: "Tầng lớp này gắn liền với 'kinh tế thị trường'."
        },
        {
            question: "Đặc điểm nổi bật của giai cấp công nhân Việt Nam hiện nay là gì?",
            options: [
                "Không ngừng tăng về số lượng và nâng cao trình độ",
                "Giảm dần về số lượng",
                "Không thay đổi về chất lượng",
                "Chỉ làm việc trong công nghiệp nặng"
            ],
            correct: 0,
            topic: "Giai cấp công nhân",
            explanation: "Giai cấp công nhân Việt Nam không ngừng tăng về số lượng và được nâng cao về trình độ văn hóa, chuyên môn.",
            hint: "Sự phát triển này gắn với công nghiệp hóa, hiện đại hóa."
        },
        {
            question: "Vai trò của tầng lớp trí thức trong sự nghiệp xây dựng đất nước?",
            options: [
                "Đóng góp trí tuệ, sáng tạo khoa học công nghệ",
                "Chỉ nghiên cứu lý thuyết",
                "Không tham gia lao động sản xuất",
                "Chỉ làm việc trong lĩnh vực giáo dục"
            ],
            correct: 0,
            topic: "Tầng lớp trí thức",
            explanation: "Tầng lớp trí thức đóng góp trí tuệ, sáng tạo về khoa học công nghệ cho sự nghiệp phát triển đất nước.",
            hint: "Tầng lớp này liên quan đến 'trí tuệ' và 'sáng tạo'."
        },
        {
            question: "Tầng lớp nông dân Việt Nam có những biến đổi gì trong thời kỳ hiện nay?",
            options: [
                "Giảm tỷ trọng, tăng trình độ và hiệu quả sản xuất",
                "Tăng tỷ trọng trong dân số",
                "Không có biến đổi gì",
                "Chỉ sản xuất nông nghiệp truyền thống"
            ],
            correct: 0,
            topic: "Giai cấp nông dân",
            explanation: "Tầng lớp nông dân giảm tỷ trọng nhưng tăng trình độ và hiệu quả sản xuất, đa dạng hóa kinh tế.",
            hint: "Xu hướng này phản ánh quá trình công nghiệp hóa."
        },
        {
            question: "Đặc điểm của cơ cấu kinh tế Việt Nam trong thời kỳ đổi mới?",
            options: [
                "Chuyển từ nền kinh tế kế hoạch hóa tập trung sang kinh tế thị trường định hướng XHCN",
                "Duy trì hoàn toàn cơ chế kế hoạch hóa tập trung",
                "Áp dụng hoàn toàn mô hình kinh tế thị trường tự do",
                "Chỉ phát triển khu vực nhà nước"
            ],
            correct: 0,
            topic: "Cơ cấu kinh tế",
            explanation: "Việt Nam chuyển đổi từ kinh tế kế hoạch hóa tập trung sang kinh tế thị trường định hướng xã hội chủ nghĩa.",
            hint: "Quá trình này được gọi là 'chuyển đổi mô hình kinh tế'."
        }
    ],
    hard: [
        {
            question: "Theo văn kiện Đại hội IX, đặc điểm cơ cấu giai cấp thời kỳ quá độ là gì?",
            options: [
                "Có nhiều giai cấp, tầng lớp với cơ cấu, tính chất, vị trí thay đổi",
                "Chỉ có một giai cấp duy nhất",
                "Không có sự thay đổi về giai cấp",
                "Chỉ tồn tại giai cấp công nhân"
            ],
            correct: 0,
            topic: "Văn kiện Đảng",
            explanation: "Văn kiện Đại hội IX khẳng định có nhiều giai cấp, tầng lớp khác nhau.",
            hint: "Đây là đặc điểm của xã hội trong thời kỳ chuyển đổi."
        },
        {
            question: "Vai trò của giai cấp công nhân trong liên minh giai cấp là gì?",
            options: [
                "Lãnh đạo liên minh, đại diện cho phương thức sản xuất tiên tiến",
                "Chỉ tham gia như một thành viên bình thường",
                "Hỗ trợ giai cấp nông dân lãnh đạo",
                "Đảm nhận vai trò tư vấn cho trí thức"
            ],
            correct: 0,
            topic: "Vai trò giai cấp",
            explanation: "Giai cấp công nhân là lực lượng lãnh đạo cách mạng, đại diện cho phương thức sản xuất tiên tiến nhất.",
            hint: "Giai cấp này được coi là 'tiên phong' và có tính 'cách mạng triệt để'."
        },
        {
            question: "Tại sao cơ cấu xã hội - giai cấp lại chi phối các cơ cấu xã hội khác?",
            options: [
                "Vì liên quan đến quyền lực và sở hữu tư liệu sản xuất",
                "Vì có số lượng người nhiều nhất",
                "Vì được pháp luật quy định",
                "Vì có truyền thống lịch sử lâu đời"
            ],
            correct: 0,
            topic: "Vị trí cơ cấu giai cấp",
            explanation: "Cơ cấu giai cấp chi phối các cơ cấu khác vì nó liên quan đến quyền lực chính trị và sở hữu tư liệu sản xuất.",
            hint: "Vấn đề này liên quan đến 'quyền lực' và 'kinh tế'."
        },
        {
            question: "Theo quan điểm của chủ nghĩa xã hội khoa học, mâu thuẫn cơ bản của chủ nghĩa tư bản là gì?",
            options: [
                "Mâu thuẫn giữa tính chất xã hội của sản xuất và tình trạng chiếm hữu tư nhân tư liệu sản xuất",
                "Mâu thuẫn giữa thành thị và nông thôn",
                "Mâu thuẫn giữa các quốc gia phát triển và đang phát triển",
                "Mâu thuẫn giữa khoa học và tôn giáo"
            ],
            correct: 0,
            topic: "Mâu thuẫn cơ bản CNTB",
            explanation: "Đây là mâu thuẫn cơ bản nhất của chủ nghĩa tư bản theo lý thuyết Marx, dẫn đến khủng hoảng kinh tế và đấu tranh giai cấp.",
            hint: "Mâu thuẫn này liên quan đến 'sản xuất xã hội' và 'chiếm hữu tư nhân'."
        },
        {
            question: "Tính tất yếu lịch sử của chủ nghĩa xã hội được thể hiện qua điều gì?",
            options: [
                "Sự phát triển của lực lượng sản xuất và mâu thuẫn của chế độ tư bản chủ nghĩa",
                "Ý chí chủ quan của con người",
                "Sự can thiệp của các thế lực bên ngoài",
                "Truyền thống văn hóa dân tộc"
            ],
            correct: 0,
            topic: "Tính tất yếu CNXH",
            explanation: "Tính tất yếu của CNXH xuất phát từ quy luật phát triển khách quan của xã hội loài người.",
            hint: "Điều này liên quan đến 'quy luật khách quan' của lịch sử."
        },
        {
            question: "Đặc điểm của cuộc cách mạng xã hội chủ nghĩa ở Việt Nam là gì?",
            options: [
                "Kết hợp giải phóng dân tộc với giải phóng giai cấp và giải phóng xã hội",
                "Chỉ tập trung vào giải phóng dân tộc",
                "Chỉ quan tâm đến phát triển kinh tế",
                "Bắt chước hoàn toàn mô hình của các nước khác"
            ],
            correct: 0,
            topic: "Cách mạng XHCN Việt Nam",
            explanation: "Cách mạng Việt Nam có tính đặc thù là kết hợp ba nhiệm vụ giải phóng cùng lúc.",
            hint: "Ba nhiệm vụ 'giải phóng' được thực hiện đồng thời."
        },
        {
            question: "Vai trò của Đảng Cộng sản trong quá trình xây dựng chủ nghĩa xã hội ở Việt Nam?",
            options: [
                "Lãnh đạo toàn diện về chính trị, tư tưởng và tổ chức",
                "Chỉ lãnh đạo về kinh tế",
                "Chỉ lãnh đạo về văn hóa xã hội",
                "Không có vai trò lãnh đạo"
            ],
            correct: 0,
            topic: "Vai trò của Đảng",
            explanation: "Đảng Cộng sản Việt Nam là lực lượng lãnh đạo toàn diện của cách mạng và xây dựng đất nước.",
            hint: "Sự lãnh đạo này mang tính 'toàn diện' và 'tổng thể'."
        },
        {
            question: "Nguyên nhân sâu xa của sự ra đời chủ nghĩa xã hội khoa học là gì?",
            options: [
                "Sự phát triển của chủ nghĩa tư bản và mâu thuẫn giai cấp ngày càng gay gắt",
                "Ý chí cá nhân của Marx và Engels",
                "Ảnh hưởng của các tư tưởng xã hội chủ nghĩa không tưởng",
                "Yêu cầu của các chính đảng thời đó"
            ],
            correct: 0,
            topic: "Nguồn gốc CNXH khoa học",
            explanation: "Chủ nghĩa xã hội khoa học ra đời từ những mâu thuẫn khách quan của chủ nghĩa tư bản và đấu tranh giai cấp công nhân.",
            hint: "Nguồn gốc này có tính 'tất yếu lịch sử' và 'khách quan'."
        }
    ]
};

var gameModes = {
    classic: { name: "Chế độ Cổ điển", questionCount: 8, timePerQuestion: 60, scoreMultiplier: 1 },
    speed: { name: "Chế độ Tốc độ", questionCount: 10, timePerQuestion: 30, scoreMultiplier: 1.5 },
    survival: { name: "Chế độ Sinh tồn", questionCount: -1, timePerQuestion: 45, scoreMultiplier: 2 }
};

// Initialize when page loads
function initializeGame() {
    console.log("Initializing game...");
    
    // Wait for elements to be available
    setTimeout(function() {
        setupEventListeners();
        showGameMenu();
    }, 500);
}

function setupEventListeners() {
    console.log("Setting up event listeners...");
    
    // Game mode cards - Remove click handlers, only buttons should be clickable
    // Cards are now purely decorative containers
    
    // Mode buttons inside cards
    var modeButtons = document.querySelectorAll('.mode-btn');
    console.log("Found mode buttons:", modeButtons.length);
    
    for (var i = 0; i < modeButtons.length; i++) {
        var btn = modeButtons[i];
        btn.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent any potential event bubbling
            var card = this.closest('.game-mode-card');
            var mode = card.getAttribute('data-mode');
            console.log("Button clicked for mode:", mode);
            
            if (mode === 'review') {
                showStudyMode();
            } else {
                showDifficultySelection(mode);
            }
        });
    }
    
    // Game control buttons
    setupGameControls();
}

function setupGameControls() {
    // Power-up buttons
    var fiftyBtn = document.getElementById('fifty-fifty');
    if (fiftyBtn) {
        fiftyBtn.addEventListener('click', function() { usePowerup('fifty-fifty'); });
    }
    
    var expertBtn = document.getElementById('ask-expert');
    if (expertBtn) {
        expertBtn.addEventListener('click', function() { usePowerup('ask-expert'); });
    }
    
    var doubleBtn = document.getElementById('double-score');
    if (doubleBtn) {
        doubleBtn.addEventListener('click', function() { usePowerup('double-score'); });
    }
    
    // Other game buttons
    var hintBtn = document.getElementById('hint-btn');
    if (hintBtn) {
        hintBtn.addEventListener('click', showHint);
    }
    
    var skipBtn = document.getElementById('skip-btn');
    if (skipBtn) {
        skipBtn.addEventListener('click', skipQuestion);
    }
    
    var playAgainBtn = document.getElementById('play-again');
    if (playAgainBtn) {
        playAgainBtn.addEventListener('click', function() { 
            console.log("Play again clicked");
            startGame(gameState.mode, gameState.difficulty); 
        });
    }
    
    var menuBtn = document.getElementById('back-to-menu');
    if (menuBtn) {
        menuBtn.addEventListener('click', function() {
            console.log("Back to menu clicked");
            showGameMenu();
        });
    }
    
    var reviewBtn = document.getElementById('review-mistakes');
    if (reviewBtn) {
        reviewBtn.addEventListener('click', reviewMistakes);
    }
    
    // Study mode back button
    var studyMenuBtn = document.getElementById('back-to-menu-study');
    if (studyMenuBtn) {
        studyMenuBtn.addEventListener('click', function() {
            showGameMenu();
        });
    }

    // Difficulty selection buttons
    var difficultyButtons = document.querySelectorAll('.difficulty-btn');
    for (var i = 0; i < difficultyButtons.length; i++) {
        difficultyButtons[i].addEventListener('click', function(e) {
            var card = this.closest('.difficulty-card');
            var difficulty = card.getAttribute('data-difficulty');
            startGameWithDifficulty(gameState.selectedMode, difficulty);
        });
    }

    // Back to mode selection button
    var backToModeBtn = document.getElementById('back-to-mode-selection');
    if (backToModeBtn) {
        backToModeBtn.addEventListener('click', showGameMenu);
    }
}

function showGameMenu() {
    console.log("Showing game menu");
    document.getElementById('game-menu').style.display = 'block';
    document.getElementById('difficulty-selection').style.display = 'none';
    document.getElementById('game-playing').style.display = 'none';
    document.getElementById('game-results').style.display = 'none';
    document.getElementById('study-mode').style.display = 'none';
}

function showDifficultySelection(mode) {
    console.log("Showing difficulty selection for mode:", mode);
    gameState.selectedMode = mode;
    
    // Update the description based on the mode
    var descriptions = {
        'classic': 'Chế độ Cổ điển - Hãy chọn độ khó phù hợp với trình độ của bạn',
        'speed': 'Chế độ Tốc độ - Chọn độ khó để bắt đầu thử thách tốc độ',
        'survival': 'Chế độ Sinh tồn - Lựa chọn độ khó cho cuộc chiến sinh tồn'
    };
    
    var descElement = document.getElementById('selected-mode-description');
    if (descElement) {
        descElement.textContent = descriptions[mode] || 'Hãy chọn mức độ khó phù hợp với trình độ của bạn';
    }
    
    document.getElementById('game-menu').style.display = 'none';
    document.getElementById('difficulty-selection').style.display = 'block';
    document.getElementById('game-playing').style.display = 'none';
    document.getElementById('game-results').style.display = 'none';
    document.getElementById('study-mode').style.display = 'none';
}

function showStudyMode() {
    console.log("Showing study mode");
    document.getElementById('game-menu').style.display = 'none';
    document.getElementById('difficulty-selection').style.display = 'none';
    document.getElementById('game-playing').style.display = 'none';
    document.getElementById('game-results').style.display = 'none';
    document.getElementById('study-mode').style.display = 'block';
}

function startGameWithDifficulty(mode, difficulty) {
    console.log("Starting game with mode:", mode, "difficulty:", difficulty);
    startGame(mode, difficulty);
}

function startGame(mode, difficulty) {
    difficulty = difficulty || 'mixed'; // Default to mixed if not specified
    console.log("Starting game with mode:", mode, "difficulty:", difficulty);
    
    gameState = {
        mode: mode,
        difficulty: difficulty,
        currentQuestion: 0,
        score: 0,
        lives: 3,
        combo: 0,
        maxCombo: 0,
        timeLeft: gameModes[mode].timePerQuestion,
        questions: generateQuestions(mode, difficulty),
        answers: [],
        usedPowerups: [],
        startTime: Date.now(),
        timeBonus: 0,
        gameTimer: null,
        finalResults: null,
        currentQuestionMapping: []
    };
    
    console.log("Generated", gameState.questions.length, "questions for difficulty:", difficulty);
    
    showGamePlaying();
    loadQuestion();
    playSound('gameStart');
}

function generateQuestions(mode, difficulty) {
    var questions = [];
    var config = gameModes[mode];
    var questionCount = config.questionCount === -1 ? 20 : config.questionCount;
    
    console.log("Generating questions for mode:", mode, "difficulty:", difficulty, "target count:", questionCount);
    
    if (difficulty === 'mixed') {
        // Original behavior: 40% easy, 40% medium, 20% hard
        var easyCount = Math.floor(questionCount * 0.4);
        var mediumCount = Math.floor(questionCount * 0.4);
        var hardCount = questionCount - easyCount - mediumCount;
        
        console.log("Mixed difficulty breakdown - Easy:", easyCount, "Medium:", mediumCount, "Hard:", hardCount);
        console.log("Available questions - Easy:", questionBank.easy.length, "Medium:", questionBank.medium.length, "Hard:", questionBank.hard.length);
        
        questions = questions.concat(getRandomQuestions(questionBank.easy, easyCount));
        questions = questions.concat(getRandomQuestions(questionBank.medium, mediumCount));
        questions = questions.concat(getRandomQuestions(questionBank.hard, hardCount));
    } else if (difficulty === 'easy') {
        // All questions from easy pool
        questions = getRandomQuestions(questionBank.easy, questionCount);
    } else if (difficulty === 'medium') {
        // All questions from medium pool
        questions = getRandomQuestions(questionBank.medium, questionCount);
    } else if (difficulty === 'hard') {
        // All questions from hard pool
        questions = getRandomQuestions(questionBank.hard, questionCount);
    }
    
    console.log("Final question count generated:", questions.length);
    return shuffleArray(questions);
}

function getRandomQuestions(pool, count) {
    var shuffled = shuffleArray(pool.slice());
    return shuffled.slice(0, Math.min(count, shuffled.length));
}

function shuffleArray(array) {
    var newArray = array.slice();
    for (var i = newArray.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = newArray[i];
        newArray[i] = newArray[j];
        newArray[j] = temp;
    }
    return newArray;
}

function showGamePlaying() {
    console.log("Showing game playing screen");
    document.getElementById('game-menu').style.display = 'none';
    document.getElementById('difficulty-selection').style.display = 'none';
    document.getElementById('game-playing').style.display = 'block';
    document.getElementById('game-results').style.display = 'none';
    document.getElementById('study-mode').style.display = 'none';
}

function loadQuestion() {
    console.log("Loading question", gameState.currentQuestion + 1);
    
    if (gameState.currentQuestion >= gameState.questions.length) {
        endGame();
        return;
    }
    
    // Clear any existing timer first
    if (gameState.gameTimer) {
        clearInterval(gameState.gameTimer);
        gameState.gameTimer = null;
    }
    
    var question = gameState.questions[gameState.currentQuestion];
    gameState.timeLeft = gameModes[gameState.mode].timePerQuestion;
    
    // Update question display
    document.getElementById('question-text').textContent = question.question;
    document.getElementById('question-topic').textContent = question.topic;
    
    var difficulty = getDifficulty(question);
    document.getElementById('question-difficulty').innerHTML = 
        '<i class="fas fa-star"></i><span>' + difficulty + '</span>';
    
    // Update progress
    var totalQuestions = gameState.questions.length;
    var progress = ((gameState.currentQuestion + 1) / totalQuestions) * 100;
    document.getElementById('game-progress').style.width = progress + '%';
    document.getElementById('question-counter').textContent = 
        'Câu ' + (gameState.currentQuestion + 1) + '/' + totalQuestions;
    
    // Generate answer options
    generateAnswerOptions(question);
    updateGameStats();
    resetQuestionPowerups();
    
    // Start the timer for this question
    startTimer();
}

function getDifficulty(question) {
    for (var i = 0; i < questionBank.easy.length; i++) {
        if (questionBank.easy[i] === question) return 'Cơ bản';
    }
    for (var i = 0; i < questionBank.medium.length; i++) {
        if (questionBank.medium[i] === question) return 'Trung bình';
    }
    return 'Nâng cao';
}

function generateAnswerOptions(question) {
    var container = document.getElementById('answers-container');
    container.innerHTML = '';
    
    // Create shuffled options with original indices
    var shuffledOptions = [];
    for (var i = 0; i < question.options.length; i++) {
        shuffledOptions.push({
            text: question.options[i],
            originalIndex: i,
            isCorrect: i === question.correct
        });
    }
    
    // Shuffle the options
    shuffledOptions = shuffleArray(shuffledOptions);
    
    // Store the mapping for answer checking
    gameState.currentQuestionMapping = shuffledOptions;
    
    for (var i = 0; i < shuffledOptions.length; i++) {
        var option = shuffledOptions[i];
        var optionElement = document.createElement('div');
        optionElement.className = 'answer-option';
        optionElement.innerHTML = 
            '<i class="fas fa-' + getOptionIcon(i) + '"></i>' +
            ' <span>' + option.text + '</span>';
        
        // Create closure to capture shuffled index
        (function(shuffledIndex) {
            optionElement.addEventListener('click', function() {
                selectAnswer(shuffledIndex);
            });
        })(i);
        
        container.appendChild(optionElement);
    }
}

function getOptionIcon(index) {
    var icons = ['circle', 'square', 'play', 'star'];
    return icons[index] || 'circle';
}

function selectAnswer(selectedIndex) {
    console.log("Answer selected:", selectedIndex);
    
    // Check if game is still valid (prevent issues after navigation)
    if (!gameState || !gameState.questions || gameState.currentQuestion >= gameState.questions.length) {
        console.log("Invalid game state, ignoring answer selection");
        return;
    }
    
    // Stop timer immediately to prevent double counting
    if (gameState.gameTimer) {
        clearInterval(gameState.gameTimer);
        gameState.gameTimer = null;
    }
    
    var question = gameState.questions[gameState.currentQuestion];
    var mapping = gameState.currentQuestionMapping;
    var selectedOption = selectedIndex >= 0 ? mapping[selectedIndex] : null;
    var isCorrect = selectedIndex >= 0 ? selectedOption.isCorrect : false;
    var options = document.querySelectorAll('.answer-option');
    
    // Find the correct answer in the shuffled options
    var correctAnswerIndex = -1;
    for (var i = 0; i < mapping.length; i++) {
        if (mapping[i].isCorrect) {
            correctAnswerIndex = i;
            break;
        }
    }
    
    // Disable all options
    for (var i = 0; i < options.length; i++) {
        options[i].classList.add('disabled');
        options[i].style.pointerEvents = 'none';
    }
    
    // Mark selected answer
    if (selectedIndex >= 0) {
        options[selectedIndex].classList.add('selected');
    }
    
    // Show results after delay
    setTimeout(function() {
        if (correctAnswerIndex >= 0) {
            options[correctAnswerIndex].classList.add('correct');
        }
        
        if (!isCorrect && selectedIndex >= 0) {
            options[selectedIndex].classList.add('incorrect');
            gameState.combo = 0;
            
            if (gameState.mode === 'survival') {
                gameState.lives--;
                if (gameState.lives <= 0) {
                    endGame();
                    return;
                }
            }
        } else if (isCorrect) {
            gameState.combo++;
            gameState.maxCombo = Math.max(gameState.maxCombo, gameState.combo);
            
            var baseScore = getBaseScore(question);
            var comboBonus = gameState.combo > 1 ? (gameState.combo - 1) * 50 : 0;
            var timeBonus = Math.floor(gameState.timeLeft * 2);
            var totalScore = Math.floor((baseScore + comboBonus + timeBonus) * gameModes[gameState.mode].scoreMultiplier);
            
            gameState.score += totalScore;
            gameState.timeBonus += timeBonus;
            
            showScorePopup(totalScore, comboBonus, timeBonus);
        }
        
        // Store answer (use original answer index for tracking)
        gameState.answers.push({
            questionIndex: gameState.currentQuestion,
            selectedAnswer: selectedOption ? selectedOption.originalIndex : -1,
            correctAnswer: question.correct,
            isCorrect: isCorrect,
            timeUsed: gameModes[gameState.mode].timePerQuestion - gameState.timeLeft,
            skipped: selectedIndex === -1
        });
        
        playSound(isCorrect ? 'correct' : 'wrong');
        
        // Move to next question
        setTimeout(function() {
            gameState.currentQuestion++;
            loadQuestion();
        }, 2000);
        
    }, 500);
    
    // Stop timer
    if (gameState.gameTimer) {
        clearInterval(gameState.gameTimer);
    }
}

function getBaseScore(question) {
    var difficulty = getDifficulty(question);
    switch(difficulty) {
        case 'Cơ bản': return 100;
        case 'Trung bình': return 200;
        case 'Nâng cao': return 300;
        default: return 100;
    }
}

function showScorePopup(totalScore, comboBonus, timeBonus) {
    var popup = document.createElement('div');
    popup.className = 'score-popup';
    popup.innerHTML = '+' + totalScore;
    if (comboBonus > 0) {
        popup.innerHTML += '<br><small>Combo +' + comboBonus + '</small>';
    }
    if (timeBonus > 0) {
        popup.innerHTML += '<br><small>Thời gian +' + timeBonus + '</small>';
    }
    
    var container = document.querySelector('.question-container');
    container.style.position = 'relative';
    container.appendChild(popup);
    
    setTimeout(function() {
        popup.remove();
    }, 2000);
}

function startTimer() {
    console.log("Starting timer, current timeLeft:", gameState.timeLeft);
    
    // Always clear any existing timer first
    if (gameState.gameTimer) {
        console.log("Clearing existing timer");
        clearInterval(gameState.gameTimer);
        gameState.gameTimer = null;
    }
    
    // Ensure we have a valid time value
    if (gameState.timeLeft <= 0) {
        console.log("Invalid timeLeft value, not starting timer");
        return;
    }
    
    // Create new timer interval
    gameState.gameTimer = setInterval(function() {
        gameState.timeLeft--;
        console.log("Timer tick, timeLeft:", gameState.timeLeft);
        updateGameStats();
        
        // Check for time up
        if (gameState.timeLeft <= 0) {
            console.log("Time's up!");
            clearInterval(gameState.gameTimer);
            gameState.gameTimer = null;
            selectAnswer(-1); // Time's up
        }
    }, 1000);
    
    console.log("Timer started with interval ID:", gameState.gameTimer);
}

function updateGameStats() {
    // Ensure timeLeft doesn't go below 0 when displaying
    var displayTime = Math.max(0, gameState.timeLeft);
    
    document.getElementById('current-score').textContent = gameState.score.toLocaleString();
    document.getElementById('lives-count').textContent = gameState.lives;
    document.getElementById('combo-count').textContent = gameState.combo;
    document.getElementById('time-left').textContent = displayTime + 's';
    
    // Hide lives display for classic and speed modes, only show for survival
    var livesStatItem = document.getElementById('lives-count').parentNode;
    if (gameState.mode === 'survival') {
        livesStatItem.style.display = 'flex';
    } else {
        livesStatItem.style.display = 'none';
    }
    
    // Update colors based on values
    var livesElement = document.getElementById('lives-count');
    if (gameState.lives <= 1) {
        livesElement.style.color = '#e74c3c';
    } else if (gameState.lives <= 2) {
        livesElement.style.color = '#f39c12';
    } else {
        livesElement.style.color = '#2ecc71';
    }
    
    var timeElement = document.getElementById('time-left');
    if (gameState.timeLeft <= 10) {
        timeElement.style.color = '#e74c3c';
        timeElement.style.animation = 'pulse 1s infinite';
    } else if (gameState.timeLeft <= 20) {
        timeElement.style.color = '#f39c12';
        timeElement.style.animation = '';
    } else {
        timeElement.style.color = '#2ecc71';
        timeElement.style.animation = '';
    }
}

function resetQuestionPowerups() {
    var powerups = document.querySelectorAll('.powerup');
    for (var i = 0; i < powerups.length; i++) {
        var powerup = powerups[i];
        var powerupId = powerup.id;
        var questionKey = powerupId + '-' + gameState.currentQuestion;
        
        if (gameState.usedPowerups.indexOf(questionKey) !== -1) {
            powerup.classList.add('used');
            powerup.disabled = true;
        } else {
            powerup.classList.remove('used');
            powerup.disabled = false;
        }
    }
}

function usePowerup(powerupType) {
    var powerupElement = document.getElementById(powerupType);
    var cost = parseInt(powerupElement.getAttribute('data-cost'));
    var questionKey = powerupType + '-' + gameState.currentQuestion;
    
    if (gameState.score < cost) {
        showAlert('❌ Không đủ điểm để sử dụng trợ giúp này!', 'error');
        return;
    }
    
    if (gameState.usedPowerups.indexOf(questionKey) !== -1) {
        showAlert('❌ Đã sử dụng trợ giúp này cho câu hỏi này!', 'error');
        return;
    }
    
    gameState.score -= cost;
    gameState.usedPowerups.push(questionKey);
    
    switch(powerupType) {
        case 'fifty-fifty':
            useFiftyFifty();
            break;
        case 'ask-expert':
            useAskExpert();
            break;
        case 'double-score':
            useDoubleScore();
            break;
    }
    
    updateGameStats();
    resetQuestionPowerups();
    
    // Don't show generic success message - let specific powerup functions handle their own messages
    playSound('powerup');
}

function useFiftyFifty() {
    var question = gameState.questions[gameState.currentQuestion];
    var options = document.querySelectorAll('.answer-option');
    var mapping = gameState.currentQuestionMapping;
    var incorrectIndices = [];
    
    // Find incorrect answer indices in the shuffled order
    for (var i = 0; i < mapping.length; i++) {
        if (!mapping[i].isCorrect) {
            incorrectIndices.push(i);
        }
    }
    
    // Only proceed if we have enough incorrect answers to hide
    if (incorrectIndices.length < 2) {
        console.log("Not enough incorrect answers for 50:50");
        return;
    }
    
    // Randomly select 2 incorrect answers to hide
    var toHide = shuffleArray(incorrectIndices).slice(0, 2);
    
    console.log("50:50 hiding indices:", toHide, "Correct answer at:", mapping.findIndex(m => m.isCorrect));
    
    for (var i = 0; i < toHide.length; i++) {
        var index = toHide[i];
        options[index].style.opacity = '0.3';
        options[index].style.pointerEvents = 'none';
        options[index].innerHTML += ' <small>(Đã loại)</small>';
    }
    
    // Show success message for 50:50
    var fiftyFiftyMessage = '🎯 TRỢ GIÚP 50:50 ĐÃ KÍCH HOẠT\n\n❌ Đã loại bỏ 2 đáp án sai\n\n💰 Chi phí: 200 điểm';
    showAlert(fiftyFiftyMessage, 'success');
}

function useAskExpert() {
    var question = gameState.questions[gameState.currentQuestion];
    var hint = question.hint || "Hãy suy nghĩ kỹ về các khái niệm đã học.";
    
    showAlert(hint, 'info');
    
    // Reduce score as penalty for using expert help
    gameState.score = Math.max(0, gameState.score - 50);
    updateGameStats();
}

function useDoubleScore() {
    var doubleScoreMessage = '⭐ ĐIỂM SỐ X2 ĐÃ KÍCH HOẠT\n\n🎯 Câu trả lời đúng sẽ được nhân đôi điểm!\n\n💰 Chi phí: 100 điểm';
    showAlert(doubleScoreMessage, 'success');
}

function showHint() {
    var question = gameState.questions[gameState.currentQuestion];
    var hint = question.hint || "Hãy suy nghĩ kỹ về các khái niệm cơ bản đã học.";
    
    gameState.score = Math.max(0, gameState.score - 50);
    updateGameStats();
    
    var hintMessage = '� GỢI Ý NHANH\n\n' + hint + '\n\n⚠️ Bị trừ 50 điểm';
    showAlert(hintMessage, 'warning');
    playSound('hint');
}

function skipQuestion() {
    gameState.score = Math.max(0, gameState.score - 100);
    gameState.combo = 0;
    
    gameState.answers.push({
        questionIndex: gameState.currentQuestion,
        selectedAnswer: -1,
        correctAnswer: gameState.questions[gameState.currentQuestion].correct,
        isCorrect: false,
        timeUsed: 0,
        skipped: true
    });
    
    updateGameStats();
    showAlert('⏭️ Đã bỏ qua câu hỏi! (-100 điểm)', 'warning');
    
    // Move to next question with a delay
    setTimeout(function() {
        gameState.currentQuestion++;
        loadQuestion();
    }, 1500);
    
    playSound('skip');
}

function endGame() {
    console.log("Game ended");
    
    if (gameState.gameTimer) {
        clearInterval(gameState.gameTimer);
    }
    
    calculateFinalResults();
    showGameResults();
    playSound('gameEnd');
}

function calculateFinalResults() {
    var correctAnswers = 0;
    for (var i = 0; i < gameState.answers.length; i++) {
        if (gameState.answers[i].isCorrect) {
            correctAnswers++;
        }
    }
    
    var totalAnswers = gameState.answers.length;
    var accuracy = totalAnswers > 0 ? Math.round((correctAnswers / totalAnswers) * 100) : 0;
    
    gameState.finalResults = {
        correctAnswers: correctAnswers,
        totalAnswers: totalAnswers,
        accuracy: accuracy,
        finalScore: gameState.score,
        maxCombo: gameState.maxCombo,
        timeBonus: gameState.timeBonus,
        achievement: getAchievement(gameState.score, accuracy)
    };
}

function getAchievement(score, accuracy) {
    if (score >= 2000 && accuracy >= 90) {
        return { icon: 'fas fa-crown', text: 'Bậc thầy CNXH', color: '#ffd700' };
    } else if (score >= 1500 && accuracy >= 80) {
        return { icon: 'fas fa-medal', text: 'Thạc sĩ CNXH', color: '#c0c0c0' };
    } else if (score >= 1000 && accuracy >= 70) {
        return { icon: 'fas fa-star', text: 'Cử nhân CNXH', color: '#cd7f32' };
    } else if (score >= 500) {
        return { icon: 'fas fa-graduation-cap', text: 'Học viên giỏi', color: '#3498db' };
    } else {
        return { icon: 'fas fa-seedling', text: 'Người mới bắt đầu', color: '#95a5a6' };
    }
}

function showGameResults() {
    console.log("Showing game results");
    
    document.getElementById('game-menu').style.display = 'none';
    document.getElementById('game-playing').style.display = 'none';
    document.getElementById('game-results').style.display = 'block';
    document.getElementById('study-mode').style.display = 'none';
    
    var results = gameState.finalResults;
    
    // Update final score
    document.getElementById('final-score-value').textContent = results.finalScore.toLocaleString();
    
    // Update achievement
    var achievementBadge = document.getElementById('achievement-badge');
    var achievement = results.achievement;
    achievementBadge.innerHTML = 
        '<i class="' + achievement.icon + '" style="color: ' + achievement.color + ';"></i>' +
        '<span>' + achievement.text + '</span>';
    
    // Update stats
    document.getElementById('correct-answers').textContent = results.correctAnswers;
    document.getElementById('accuracy-rate').textContent = results.accuracy + '%';
    document.getElementById('max-combo').textContent = results.maxCombo;
    document.getElementById('time-bonus').textContent = results.timeBonus;
    
    generateResultsReview();
}

function generateResultsReview() {
    var reviewContainer = document.getElementById('results-review');
    var reviewHTML = '<h3><i class="fas fa-list-check"></i> Xem lại kết quả</h3>';
    
    for (var i = 0; i < gameState.answers.length; i++) {
        var answer = gameState.answers[i];
        var question = gameState.questions[answer.questionIndex];
        var statusIcon = answer.isCorrect ? 
            '<i class="fas fa-check-circle" style="color: #2ecc71;"></i>' :
            '<i class="fas fa-times-circle" style="color: #e74c3c;"></i>';
        
        reviewHTML += 
            '<div class="card" style="margin: 1rem 0; padding: 1rem;">' +
                '<div style="display: flex; align-items: flex-start; gap: 1rem;">' +
                    statusIcon +
                    '<div style="flex: 1;">' +
                        '<strong>Câu ' + (i + 1) + ': ' + question.question + '</strong><br>' +
                        '<small style="color: #666;">' +
                            (answer.skipped ? 'Đã bỏ qua' : 
                              answer.isCorrect ? 'Trả lời đúng' : 
                              'Trả lời sai - Đáp án đúng: ' + question.options[question.correct]) +
                        '</small>';
        
        if (!answer.isCorrect) {
            reviewHTML += '<br><em style="color: #3498db;">' + question.explanation + '</em>';
        }
        
        reviewHTML += '</div></div></div>';
    }
    
    reviewContainer.innerHTML = reviewHTML;
}

function reviewMistakes() {
    var wrongTopics = [];
    for (var i = 0; i < gameState.answers.length; i++) {
        var answer = gameState.answers[i];
        if (!answer.isCorrect) {
            var question = gameState.questions[answer.questionIndex];
            if (wrongTopics.indexOf(question.topic) === -1) {
                wrongTopics.push(question.topic);
            }
        }
    }
    
    var message = '📚 Bạn nên ôn tập các chủ đề sau:\n\n';
    for (var i = 0; i < wrongTopics.length; i++) {
        message += '• ' + wrongTopics[i] + '\n';
    }
    
    if (wrongTopics.length === 0) {
        message = '🌟 Chúc mừng! Bạn đã trả lời đúng tất cả các câu hỏi!';
    }
    
    showAlert(message, 'info');
}

// Global variable to track active alerts
var activeAlerts = [];

function showAlert(message, type) {
    // Remove old alerts of the same type to prevent stacking
    var existingAlerts = document.querySelectorAll('.game-alert[data-type="' + type + '"]');
    for (var i = 0; i < existingAlerts.length; i++) {
        existingAlerts[i].remove();
    }
    
    var alert = document.createElement('div');
    alert.className = 'game-alert';
    alert.setAttribute('data-type', type);
    
    var bgColor = '#3498db';
    if (type === 'success') bgColor = '#2ecc71';
    else if (type === 'error') bgColor = '#e74c3c';
    else if (type === 'warning') bgColor = '#f39c12';
    else if (type === 'info') bgColor = '#9b59b6';
    
    // Calculate vertical position based on existing alerts
    var topOffset = 2 + (activeAlerts.length * 5); // Each alert is 5rem apart
    
    alert.style.cssText = 
        'position: fixed; top: ' + topOffset + 'rem; right: 2rem; background: ' + bgColor + '; color: white; ' +
        'padding: 1.2rem 1.8rem; border-radius: 16px; box-shadow: 0 12px 40px rgba(0,0,0,0.3); ' +
        'z-index: 10000; transform: translateX(100%); transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55); ' +
        'max-width: 400px; font-weight: 500; white-space: pre-line; font-size: 0.95rem; line-height: 1.5; ' +
        'border-left: 4px solid rgba(255,255,255,0.3);';
    
    alert.innerHTML = message;
    document.body.appendChild(alert);
    activeAlerts.push(alert);
    
    // Animate in
    setTimeout(function() {
        alert.style.transform = 'translateX(0) scale(1)';
    }, 100);
    
    // Auto remove after delay
    setTimeout(function() {
        if (alert.parentNode) {
            alert.style.transform = 'translateX(100%) scale(0.8)';
            alert.style.opacity = '0';
            
            setTimeout(function() {
                if (alert.parentNode) {
                    alert.remove();
                    // Remove from active alerts array
                    var index = activeAlerts.indexOf(alert);
                    if (index > -1) {
                        activeAlerts.splice(index, 1);
                    }
                    // Reposition remaining alerts
                    repositionAlerts();
                }
            }, 400);
        }
    }, type === 'info' ? 6000 : 4000); // Info alerts (expert tips) stay longer
}

function repositionAlerts() {
    for (var i = 0; i < activeAlerts.length; i++) {
        var alert = activeAlerts[i];
        if (alert.parentNode) {
            var topOffset = 2 + (i * 5);
            alert.style.top = topOffset + 'rem';
        }
    }
}

function playSound(type) {
    try {
        var audioContext = new (window.AudioContext || window.webkitAudioContext)();
        var oscillator = audioContext.createOscillator();
        var gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        switch(type) {
            case 'correct':
                oscillator.frequency.setValueAtTime(523, audioContext.currentTime);
                break;
            case 'wrong':
                oscillator.frequency.setValueAtTime(330, audioContext.currentTime);
                break;
            case 'gameStart':
                oscillator.frequency.setValueAtTime(261, audioContext.currentTime);
                break;
            case 'gameEnd':
                oscillator.frequency.setValueAtTime(523, audioContext.currentTime);
                break;
            default:
                oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
        }
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.2);
    } catch (e) {
        console.log('Audio not supported');
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    var gamePlayingVisible = document.getElementById('game-playing') && 
                           document.getElementById('game-playing').style.display !== 'none';
    
    if (gamePlayingVisible) {
        if (e.key >= '1' && e.key <= '4') {
            var answerIndex = parseInt(e.key) - 1;
            var options = document.querySelectorAll('.answer-option');
            if (options[answerIndex] && !options[answerIndex].classList.contains('disabled')) {
                selectAnswer(answerIndex);
            }
        }
        
        if (e.code === 'Space') {
            e.preventDefault();
            var hintBtn = document.getElementById('hint-btn');
            if (hintBtn) hintBtn.click();
        }
        
        if (e.code === 'Enter' && e.shiftKey) {
            e.preventDefault();
            var skipBtn = document.getElementById('skip-btn');
            if (skipBtn) skipBtn.click();
        }
    }
});

// Initialize game when loaded
console.log("Quiz game script loaded, initializing...");
initializeGame();

// Global cleanup function that can be called from main navigation
window.cleanupQuizGame = function() {
    console.log("External cleanup request received");
    if (gameState && gameState.gameTimer) {
        clearInterval(gameState.gameTimer);
        gameState.gameTimer = null;
        console.log("Quiz timer cleared externally");
    }
    
    // Reset game state to initial values
    gameState = {
        mode: 'classic',
        difficulty: 'mixed',
        currentQuestion: 0,
        score: 0,
        lives: 3,
        combo: 0,
        maxCombo: 0,
        timeLeft: 0,
        questions: [],
        answers: [],
        usedPowerups: [],
        startTime: null,
        timeBonus: 0,
        gameTimer: null,
        finalResults: null,
        currentQuestionMapping: []
    };
    console.log("Quiz game state reset");
};