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

// Completely new approach using event delegation and direct manipulation
var QuizGameSimple = {
    initialized: false,
    
    // Simple initialization that just sets up event delegation
    init: function() {
        console.log("🎮 QuizGameSimple.init() - Setting up event delegation");
        
        // Remove any existing global click handler
        document.removeEventListener('click', this.globalClickHandler);
        
        // Add global click handler using event delegation
        document.addEventListener('click', this.globalClickHandler.bind(this));
        
        this.initialized = true;
        this.showGameMenu();
        console.log("✅ Quiz game initialized with event delegation");
    },
    
    // Global click handler that captures all clicks
    globalClickHandler: function(e) {
        var target = e.target;
        
        // Handle mode button clicks
        if (target.classList.contains('mode-btn') || target.closest('.mode-btn')) {
            e.preventDefault();
            e.stopPropagation();
            
            var btn = target.closest('.mode-btn') || target;
            var card = btn.closest('.game-mode-card');
            
            if (card) {
                var mode = card.getAttribute('data-mode');
                console.log("🎯 Mode button clicked via delegation:", mode);
                
                if (mode === 'review') {
                    this.showStudyMode();
                } else {
                    this.showDifficultySelection(mode);
                }
            }
            return;
        }
        
        // Handle difficulty button clicks
        if (target.classList.contains('difficulty-btn') || target.closest('.difficulty-btn')) {
            e.preventDefault();
            e.stopPropagation();
            
            var btn = target.closest('.difficulty-btn') || target;
            var card = btn.closest('.difficulty-card');
            
            if (card) {
                var difficulty = card.getAttribute('data-difficulty');
                console.log("🎯 Difficulty button clicked via delegation:", difficulty);
                this.startGameWithDifficulty(gameState.selectedMode, difficulty);
            }
            return;
        }
        
        // Handle back to mode selection
        if (target.id === 'back-to-mode-selection' || target.closest('#back-to-mode-selection')) {
            e.preventDefault();
            e.stopPropagation();
            console.log("🔙 Back to mode selection clicked");
            this.showGameMenu();
            return;
        }
        
        // Handle other game control buttons
        if (target.id === 'back-to-menu' || target.closest('#back-to-menu')) {
            e.preventDefault();
            this.showGameMenu();
            return;
        }
        
        if (target.id === 'back-to-menu-study' || target.closest('#back-to-menu-study')) {
            e.preventDefault();
            this.showGameMenu();
            return;
        }
    },
    
    // Direct DOM manipulation methods
    showGameMenu: function() {
        console.log("📱 Showing game menu");
        this.hideAllScreens();
        var gameMenu = document.getElementById('game-menu');
        if (gameMenu) {
            gameMenu.style.display = 'block';
        } else {
            console.warn("⚠️ game-menu element not found");
        }
    },
    
    showDifficultySelection: function(mode) {
        console.log("📱 Showing difficulty selection for mode:", mode);
        gameState.selectedMode = mode;
        
        this.hideAllScreens();
        var difficultyScreen = document.getElementById('difficulty-selection');
        if (difficultyScreen) {
            difficultyScreen.style.display = 'block';
            
            // Update description
            var descriptions = {
                'classic': 'Chế độ Cổ điển - Hãy chọn độ khó phù hợp với trình độ của bạn',
                'speed': 'Chế độ Tốc độ - Chọn độ khó để bắt đầu thử thách tốc độ',
                'survival': 'Chế độ Sinh tồn - Lựa chọn độ khó cho cuộc chiến sinh tồn'
            };
            
            var descElement = document.getElementById('selected-mode-description');
            if (descElement) {
                descElement.textContent = descriptions[mode] || 'Hãy chọn mức độ khó phù hợp với trình độ của bạn';
            }
        } else {
            console.warn("⚠️ difficulty-selection element not found");
        }
    },
    
    showStudyMode: function() {
        console.log("📱 Showing study mode");
        this.hideAllScreens();
        var studyMode = document.getElementById('study-mode');
        if (studyMode) {
            studyMode.style.display = 'block';
        } else {
            console.warn("⚠️ study-mode element not found");
        }
    },
    
    hideAllScreens: function() {
        var screens = [
            'game-menu',
            'difficulty-selection', 
            'game-playing',
            'game-results',
            'study-mode'
        ];
        
        screens.forEach(function(screenId) {
            var screen = document.getElementById(screenId);
            if (screen) {
                screen.style.display = 'none';
            }
        });
    },
    
    startGameWithDifficulty: function(mode, difficulty) {
        console.log("🎮 Starting game with mode:", mode, "difficulty:", difficulty);
        if (typeof startGame === 'function') {
            startGame(mode, difficulty);
        } else {
            console.error("❌ startGame function not found");
        }
    }
};

// Global function for main.js
window.initQuizGame = function() {
    console.log("🔄 External quiz game initialization request received");
    QuizGameSimple.init();
};

// Legacy function wrappers for compatibility with existing code
function showGameMenu() {
    QuizGameSimple.showGameMenu();
}

function showDifficultySelection(mode) {
    QuizGameSimple.showDifficultySelection(mode);
}

function showStudyMode() {
    QuizGameSimple.showStudyMode();
}

// Old functions removed - functionality moved to QuizGame object

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
                // Store the answer before ending the game when out of lives
                if (gameState.lives <= 0) {
                    // Store answer for the last failed question
                    gameState.answers.push({
                        questionIndex: gameState.currentQuestion,
                        selectedAnswer: selectedOption ? selectedOption.originalIndex : -1,
                        correctAnswer: question.correct,
                        isCorrect: isCorrect,
                        timeUsed: gameModes[gameState.mode].timePerQuestion - gameState.timeLeft,
                        skipped: selectedIndex === -1
                    });
                    
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

// Study Mode Functions
var studyContent = {
    'structure': {
        title: "Cơ cấu xã hội",
        questions: [
            {
                question: "Trong cơ cấu xã hội, nhóm cơ cấu nào có vị trí quan trọng hàng đầu?",
                options: [
                    "Cơ cấu xã hội - giai cấp",
                    "Cơ cấu dân tộc", 
                    "Cơ cấu nghề nghiệp",
                    "Cơ cấu vùng miền"
                ],
                correct: 0,
                explanation: "Cơ cấu xã hội - giai cấp có vị trí quan trọng hàng đầu vì liên quan đến sở hữu tư liệu sản xuất và quyền lực trong xã hội."
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
                explanation: "Cơ cấu xã hội bao gồm cơ cấu giai cấp, cơ cấu dân tộc, cơ cấu nghề nghiệp và cơ cấu vùng miền."
            },
            {
                question: "Cơ cấu xã hội là gì?",
                options: [
                    "Tổng thể các mối quan hệ bền vững giữa các nhóm xã hội",
                    "Chỉ là các mối quan hệ kinh tế",
                    "Các đảng phái chính trị",
                    "Là tập hợp các cá nhân"
                ],
                correct: 0,
                explanation: "Cơ cấu xã hội là tổng thể các mối quan hệ bền vững giữa các nhóm xã hội, được hình thành do vị trí của các nhóm trong hệ thống quan hệ xã hội nhất định."
            }
        ]
    },
    'alliance': {
        title: "Liên minh giai cấp",
        questions: [
            {
                question: "Liên minh giai cấp cơ bản ở Việt Nam gồm những ai?",
                options: [
                    "Công nhân - Nông dân - Trí thức",
                    "Tư sản - Nông dân - Công nhân",
                    "Địa chủ - Nông dân - Tiểu tư sản", 
                    "Doanh nhân - Trí thức - Công nhân"
                ],
                correct: 0,
                explanation: "Liên minh Công nhân - Nông dân - Trí thức là liên minh cơ bản trong xã hội Việt Nam hiện đại."
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
                explanation: "Giai cấp công nhân là lực lượng lãnh đạo trong liên minh giai cấp cơ bản vì đại diện cho phương thức sản xuất tiên tiến."
            }
        ]
    },
    'vietnam': {
        title: "Thực tiễn Việt Nam",
        questions: [
            {
                question: "Đặc điểm nào sau đây thuộc về giai cấp công nhân Việt Nam hiện đại?",
                options: [
                    "Lãnh đạo cách mạng, đại diện cho phương thức sản xuất tiên tiến",
                    "Sở hữu tư liệu sản xuất lớn",
                    "Chỉ làm việc trong nông nghiệp",
                    "Không tham gia hoạt động chính trị"
                ],
                correct: 0,
                explanation: "Giai cấp công nhân Việt Nam là lực lượng lãnh đạo cách mạng và đại diện cho phương thức sản xuất tiên tiến nhất trong xã hội hiện đại."
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
                explanation: "Giai cấp nông dân đóng vai trò là bệ đỡ kinh tế, đảm bảo an ninh lương thực và xuất khẩu nông sản quan trọng."
            },
            {
                question: "Sự biến đổi cơ cấu xã hội của Việt Nam sau Đổi mới thể hiện như thế nào?",
                options: [
                    "Đa dạng hóa các thành phần kinh tế và giai cấp xã hội",
                    "Xóa bỏ hoàn toàn giai cấp công nhân",
                    "Giảm vai trò của nông dân",
                    "Hạn chế phát triển tư nhân"
                ],
                correct: 0,
                explanation: "Sau Đổi mới, cơ cấu xã hội Việt Nam có sự biến đổi sâu sắc theo hướng đa dạng hóa các thành phần kinh tế và giai cấp xã hội."
            },
            {
                question: "Xu hướng chủ yếu trong biến đổi cơ cấu xã hội ở Việt Nam hiện nay là gì?",
                options: [
                    "Tăng tỷ trọng lao động trong công nghiệp và dịch vụ, giảm tỷ trọng lao động nông nghiệp",
                    "Tăng tỷ trọng lao động nông nghiệp, giảm công nghiệp",
                    "Không có sự thay đổi đáng kể",
                    "Giảm tất cả các thành phần xã hội"
                ],
                correct: 0,
                explanation: "Xu hướng chủ yếu là tăng tỷ trọng lao động trong công nghiệp và dịch vụ, đồng thời giảm tỷ trọng lao động nông nghiệp, phản ánh quá trình công nghiệp hóa, hiện đại hóa đất nước."
            }
        ]
    }
};

let currentStudyTopic = null;
let currentStudyQuestionIndex = 0;

function setupStudyModeListeners() {
    // Setup topic buttons
    var topicButtons = document.querySelectorAll('.topic-btn');
    for (var i = 0; i < topicButtons.length; i++) {
        topicButtons[i].addEventListener('click', function() {
            var topicCard = this.closest('.topic-card');
            var topic = topicCard.getAttribute('data-topic');
            showTopicContent(topic);
        });
    }
    
    // Setup back to topics button
    var backToTopicsBtn = document.getElementById('back-to-topics');
    if (backToTopicsBtn) {
        backToTopicsBtn.addEventListener('click', function() {
            showStudyTopicsList();
        });
    }
}

function showStudyTopicsList() {
    // Fade out content view and fade in topics view
    var topicsView = document.getElementById('study-topics-view');
    var contentView = document.getElementById('study-content-view');
    
    // Fade out content view
    contentView.style.opacity = '0';
    contentView.style.transition = 'opacity 0.3s ease';
    
    setTimeout(function() {
        contentView.style.display = 'none';
        topicsView.style.display = 'block';
        topicsView.style.opacity = '0';
        
        // Reset the current topic
        currentStudyTopic = null;
        currentStudyQuestionIndex = 0;
        
        // Animate topic cards when they appear
        setTimeout(function() {
            topicsView.style.opacity = '1';
            topicsView.style.transition = 'opacity 0.5s ease';
            
            // Add animation to topic cards
            var topicCards = document.querySelectorAll('.topic-card');
            for (var i = 0; i < topicCards.length; i++) {
                topicCards[i].classList.add('animated-card');
                topicCards[i].style.animationDelay = (i * 0.15) + 's';
            }
        }, 50);
    }, 300);
}

// Helper function to convert hex to RGB
function hexToRgb(hex) {
    // Remove the '#' if present
    hex = hex.replace('#', '');
    
    // Parse the hex values
    var r = parseInt(hex.substring(0, 2), 16);
    var g = parseInt(hex.substring(2, 4), 16);
    var b = parseInt(hex.substring(4, 6), 16);
    
    return r + ',' + g + ',' + b;
}

function showTopicContent(topic) {
    console.log("Showing content for topic:", topic);
    
    // Hide topics list and show content view with a smooth transition
    var topicsView = document.getElementById('study-topics-view');
    var contentView = document.getElementById('study-content-view');
    
    // Fade out topics view
    topicsView.style.opacity = '0';
    topicsView.style.transition = 'opacity 0.3s ease';
    
    setTimeout(function() {
        topicsView.style.display = 'none';
        contentView.style.display = 'block';
        contentView.style.opacity = '0';
        
        // Set the current topic
        currentStudyTopic = topic;
        currentStudyQuestionIndex = 0;
        
        // Set the title and update UI elements
        var topicTitle = document.getElementById('topic-title');
        var topicSubtitle = document.getElementById('topic-subtitle');
        var topicDescription = document.getElementById('topic-description');
        var topicIconLarge = document.getElementById('topic-icon-large');
        var topicInfoSection = document.querySelector('.topic-info');
        
        if (studyContent[topic]) {
            // Title with animation
            topicTitle.innerHTML = '<span class="topic-title-text" style="position: relative; display: inline-block;">' + 
                studyContent[topic].title + 
                '<span class="title-underline" style="position: absolute; bottom: -8px; left: 0; width: 0; height: 3px; background: var(--primary-red); animation: widthExpand 1.2s ease-out forwards;"></span>' +
                '</span>';
            
            // Update theme colors based on topic
            var themeColor, iconBg, badgeColor;
            
            if (topic === 'structure') {
                topicSubtitle.textContent = 'Nền tảng cơ cấu xã hội';
                topicDescription.textContent = 'Tìm hiểu về khái niệm, đặc điểm và vai trò của các loại cơ cấu trong xã hội.';
                topicIconLarge.className = 'fas fa-sitemap';
                themeColor = 'linear-gradient(135deg, #3867d6, #4b7bec)';
                iconBg = 'linear-gradient(135deg, #3867d6, #4b7bec)';
                badgeColor = '#3867d6';
            } else if (topic === 'alliance') {
                topicSubtitle.textContent = 'Liên minh giai cấp';
                topicDescription.textContent = 'Khám phá vai trò và ý nghĩa lịch sử của liên minh giai cấp trong phát triển xã hội.';
                topicIconLarge.className = 'fas fa-handshake';
                themeColor = 'linear-gradient(135deg, #20bf6b, #26de81)';
                iconBg = 'linear-gradient(135deg, #20bf6b, #26de81)';
                badgeColor = '#20bf6b';
            } else if (topic === 'vietnam') {
                topicSubtitle.textContent = 'Thực tiễn Việt Nam';
                topicDescription.textContent = 'Phân tích sự biến đổi cơ cấu xã hội qua các giai đoạn lịch sử Việt Nam.';
                topicIconLarge.className = 'fas fa-flag';
                themeColor = 'linear-gradient(135deg, #eb3b5a, #fc5c65)';
                iconBg = 'linear-gradient(135deg, #eb3b5a, #fc5c65)';
                badgeColor = '#eb3b5a';
            }
            
            // Apply theme color to UI elements
            if (topicInfoSection) {
                topicInfoSection.style.background = 'linear-gradient(135deg, rgba(' + hexToRgb(badgeColor) + ', 0.05), rgba(255, 255, 255, 0.8))';
                topicInfoSection.style.borderLeft = '4px solid ' + badgeColor;
            }
            
            var topicIconLargeDiv = document.querySelector('.topic-icon-large');
            if (topicIconLargeDiv) {
                topicIconLargeDiv.style.background = iconBg;
            }
            
            topicSubtitle.style.color = badgeColor;
        }
        
        // Generate content
        generateStudyContent(topic);
        
        // Update navigation buttons
        updateTopicNavigation();
        
        // Fade in content view
        setTimeout(function() {
            contentView.style.opacity = '1';
            contentView.style.transition = 'opacity 0.5s ease';
        }, 50);
    }, 300);
}

function generateStudyContent(topic) {
    var contentContainer = document.getElementById('study-content-container');
    var html = '';
    
    // Get the topic data
    var topicData = studyContent[topic];
    if (!topicData) {
        html = '<div class="alert alert-warning" style="background: rgba(255, 193, 7, 0.1); border-left: 4px solid #ffc107; padding: 1rem; border-radius: 4px;">' +
               '<i class="fas fa-exclamation-triangle" style="color: #ffc107; margin-right: 0.5rem;"></i>' +
               'Không tìm thấy nội dung cho chủ đề này</div>';
        contentContainer.innerHTML = html;
        return;
    }
    
    // Add introduction based on topic
    html += '<div class="study-intro" style="margin-bottom: 2.5rem;">' +
            '<h4 style="color: var(--text-primary); font-size: 1.3rem; margin-bottom: 1rem; font-weight: 600;">' +
            '<i class="fas fa-info-circle" style="color: var(--primary-red); margin-right: 0.5rem;"></i>Giới thiệu</h4>' +
            '<p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 0; font-size: 1.1rem;">';
    
    if (topic === 'structure') {
        html += 'Cơ cấu xã hội là nền tảng để hiểu biết về các mối quan hệ xã hội. Phần này giúp bạn nắm vững các khái niệm cơ bản và ' +
                'vai trò của cơ cấu xã hội trong phân tích xã hội học hiện đại.';
    } else if (topic === 'alliance') {
        html += 'Liên minh giai cấp là một khái niệm quan trọng trong phân tích xã hội. Mục này giúp bạn hiểu rõ về các mối quan hệ ' +
                'giữa các giai cấp và vai trò của liên minh giai cấp trong phát triển xã hội.';
    } else if (topic === 'vietnam') {
        html += 'Việt Nam đã trải qua nhiều biến đổi về cơ cấu xã hội qua các giai đoạn lịch sử. Phần này phân tích những biến đổi ' +
                'này và tác động của chúng đến sự phát triển của đất nước.';
    }
    
    html += '</p></div>';
    
    // Generate HTML for each question in the topic
    for (var i = 0; i < topicData.questions.length; i++) {
        var question = topicData.questions[i];
        html += generateQuestionHTML(question, i);
    }
    
    // Add completion message
    html += '<div class="study-completion" style="background: linear-gradient(135deg, rgba(40, 167, 69, 0.1), rgba(32, 201, 151, 0.1)); border-radius: 16px; padding: 2rem; margin: 3rem 0 1rem; text-align: center; border: 1px dashed rgba(40, 167, 69, 0.3);">' +
            '<div style="font-size: 3rem; margin-bottom: 1rem; color: #28a745;"><i class="fas fa-check-circle"></i></div>' +
            '<h4 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem; color: #28a745;">Hoàn thành chủ đề!</h4>' +
            '<p style="color: var(--text-secondary); margin-bottom: 1.5rem;">Bạn đã hoàn thành tất cả các câu hỏi trong chủ đề này. Hãy thử làm bài kiểm tra hoặc chuyển sang chủ đề khác.</p>' +
            '<button class="btn btn-success" style="background: linear-gradient(135deg, #28a745, #20c997); border: none; border-radius: 50px; padding: 1rem 2rem; color: white; font-weight: 600; transition: all 0.3s ease; box-shadow: 0 5px 15px rgba(40, 167, 69, 0.2);" onclick="tryQuizNow()">' +
            '<i class="fas fa-gamepad"></i> Làm bài kiểm tra ngay</button>' +
            '</div>';
    
    // Show the content with a slight delay for animation
    contentContainer.innerHTML = '<div class="study-loading" style="text-align: center; padding: 3rem 0;">' +
        '<div class="spinner" style="width: 50px; height: 50px; border: 5px solid rgba(214, 48, 49, 0.1); border-top-color: var(--primary-red); border-radius: 50%; animation: spin 1s linear infinite; display: inline-block; margin-bottom: 1rem;"></div>' +
        '<p style="color: var(--text-secondary); font-size: 1.1rem;">Đang tải nội dung...</p>' +
        '</div>';
    
    setTimeout(function() {
        contentContainer.innerHTML = html;
        
        // Add fade-in animation to each question card
        var questionCards = document.querySelectorAll('.study-question-card');
        for (var j = 0; j < questionCards.length; j++) {
            questionCards[j].style.animationDelay = (j * 0.15) + 's';
            questionCards[j].classList.add('animated-card');
        }
    }, 800);
}

function generateQuestionHTML(question, index) {
    var topicBadgeColor = '#6c757d';
    var topicBadgeBg = 'rgba(108, 117, 125, 0.1)';
    
    // Set topic badge colors based on topic
    if (question.topic.toLowerCase().includes('cơ cấu')) {
        topicBadgeColor = '#3867d6';
        topicBadgeBg = 'rgba(56, 103, 214, 0.1)';
    } else if (question.topic.toLowerCase().includes('công nghiệp') || question.topic.toLowerCase().includes('kinh tế')) {
        topicBadgeColor = '#20bf6b';
        topicBadgeBg = 'rgba(32, 191, 107, 0.1)';
    } else if (question.topic.toLowerCase().includes('giai cấp') || question.topic.toLowerCase().includes('liên minh')) {
        topicBadgeColor = '#f7b731';
        topicBadgeBg = 'rgba(247, 183, 49, 0.1)';
    } else if (question.topic.toLowerCase().includes('việt nam') || question.topic.toLowerCase().includes('đổi mới')) {
        topicBadgeColor = '#eb3b5a';
        topicBadgeBg = 'rgba(235, 59, 90, 0.1)';
    }

    var html = '<div class="study-question-card animated-card" style="background: white; border-radius: 16px; padding: 1.5rem; margin-bottom: 2rem; box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05); border: 1px solid rgba(0, 0, 0, 0.05); position: relative; overflow: hidden;">' +
        '<div class="question-topic-badge" style="position: absolute; top: 1rem; right: 1rem; background: ' + topicBadgeBg + '; color: ' + topicBadgeColor + '; padding: 0.3rem 0.8rem; border-radius: 50px; font-size: 0.8rem; font-weight: 600;">' +
        '<i class="fas fa-tag" style="margin-right: 0.3rem;"></i>' + question.topic + '</div>' +
        '<h4 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 1.5rem; color: var(--text-primary); line-height: 1.6; padding-right: 7rem;">' + 
        '<span style="display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, var(--primary-red), var(--secondary-red)); color: white; font-size: 0.9rem; margin-right: 0.8rem;">' + 
        (index + 1) + '</span>' + question.question + '</h4>' +
        '<div class="study-answers" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">';
    
    // Icons for answers
    var icons = ['A', 'B', 'C', 'D'];
    
    for (var i = 0; i < question.options.length; i++) {
        var isCorrect = (i === question.correct);
        var bgColor = isCorrect ? 'linear-gradient(135deg, rgba(40, 167, 69, 0.1), rgba(32, 201, 151, 0.05))' : 'white';
        var borderColor = isCorrect ? 'rgba(40, 167, 69, 0.3)' : 'rgba(0, 0, 0, 0.05)';
        var textColor = isCorrect ? '#28a745' : 'var(--text-secondary)';
        var iconBg = isCorrect ? 'linear-gradient(135deg, #28a745, #20c997)' : 'linear-gradient(135deg, #f8f9fa, #e9ecef)';
        var iconColor = isCorrect ? 'white' : '#6c757d';
        
        html += '<div class="study-answer ' + (isCorrect ? 'correct' : 'incorrect') + '" ' +
            'style="background: ' + bgColor + '; border-radius: 12px; padding: 1rem; position: relative; border: 1px solid ' + borderColor + '; display: flex; align-items: center; gap: 0.75rem; transition: all 0.3s ease;">' +
            '<div style="width: 32px; height: 32px; min-width: 32px; border-radius: 50%; background: ' + iconBg + '; color: ' + iconColor + '; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 0.85rem;">' +
            icons[i] + '</div>' +
            '<div style="color: ' + textColor + '; font-weight: ' + (isCorrect ? '600' : 'normal') + ';">' + question.options[i] + '</div>' +
            (isCorrect ? '<div style="position: absolute; top: -8px; right: -8px; width: 24px; height: 24px; border-radius: 50%; background: #28a745; color: white; display: flex; align-items: center; justify-content: center;"><i class="fas fa-check"></i></div>' : '') +
            '</div>';
    }
    
    html += '</div>' +
        '<div class="study-explanation" style="background: linear-gradient(135deg, rgba(214, 48, 49, 0.05), rgba(255, 255, 255, 0.8)); border-radius: 12px; padding: 1.5rem; border-left: 4px solid var(--primary-red);">' +
        '<h5 style="display: flex; align-items: center; color: var(--primary-red); font-weight: 700; margin-bottom: 0.8rem; font-size: 1.1rem;">' +
        '<i class="fas fa-lightbulb" style="margin-right: 0.5rem; color: #ffc107;"></i> Giải thích</h5>' +
        '<p style="color: var(--text-secondary); margin-bottom: 0; font-size: 1.05rem; line-height: 1.6;">' + question.explanation + '</p>' +
        '</div>' +
        '</div>';
    
    return html;
}

function updateTopicNavigation() {
    var topics = Object.keys(studyContent);
    var currentIndex = topics.indexOf(currentStudyTopic);
    
    var prevButton = document.getElementById('prev-topic');
    var nextButton = document.getElementById('next-topic');
    
    if (currentIndex <= 0) {
        prevButton.disabled = true;
    } else {
        prevButton.disabled = false;
    }
    
    if (currentIndex >= topics.length - 1) {
        nextButton.disabled = true;
    } else {
        nextButton.disabled = false;
    }
}

function navigateToPreviousTopic() {
    var topics = Object.keys(studyContent);
    var currentIndex = topics.indexOf(currentStudyTopic);
    
    if (currentIndex > 0) {
        showTopicContent(topics[currentIndex - 1]);
    }
}

function navigateToNextTopic() {
    var topics = Object.keys(studyContent);
    var currentIndex = topics.indexOf(currentStudyTopic);
    
    if (currentIndex < topics.length - 1) {
        showTopicContent(topics[currentIndex + 1]);
    }
}

function tryQuizNow() {
    // Add a visual feedback before navigating
    var tryQuizBtn = document.querySelector('.btn-success[onclick="tryQuizNow()"]');
    if (tryQuizBtn) {
        // Add pulse effect
        tryQuizBtn.classList.add('pulse-animation');
        tryQuizBtn.style.transform = 'scale(1.05)';
        tryQuizBtn.style.boxShadow = '0 10px 25px rgba(40, 167, 69, 0.4)';
        
        // Add dynamic style for the pulse animation if it doesn't exist
        if (!document.getElementById('pulse-animation-style')) {
            var styleTag = document.createElement('style');
            styleTag.id = 'pulse-animation-style';
            styleTag.innerHTML = '@keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.05); } 100% { transform: scale(1); } } ' +
                                '.pulse-animation { animation: pulse 0.5s ease-in-out; }';
            document.head.appendChild(styleTag);
        }
    }
    
    // Fade out the current view
    var studyMode = document.getElementById('study-mode');
    if (studyMode) {
        studyMode.style.opacity = '0';
        studyMode.style.transition = 'opacity 0.4s ease';
    }
    
    // Navigate back to the game menu and start a quiz in classic mode after the animation
    setTimeout(function() {
        showGameMenu();
        
        // Find the classic mode button and click it after the game menu is shown
        setTimeout(function() {
            var gameMenu = document.getElementById('game-menu');
            if (gameMenu) {
                gameMenu.style.opacity = '0';
                gameMenu.style.display = 'block';
                
                setTimeout(function() {
                    gameMenu.style.opacity = '1';
                    gameMenu.style.transition = 'opacity 0.5s ease';
                    
                    // Highlight classic mode card
                    var classicModeCard = document.querySelector('.game-mode-card[data-mode="classic"]');
                    if (classicModeCard) {
                        classicModeCard.style.transform = 'translateY(-12px) scale(1.03)';
                        classicModeCard.style.boxShadow = '0 20px 60px rgba(214, 48, 49, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.3)';
                        classicModeCard.style.borderColor = 'var(--primary-gold)';
                    }
                    
                    // Click the classic mode button after a brief delay
                    setTimeout(function() {
                        var classicModeBtn = document.querySelector('.game-mode-card[data-mode="classic"] .mode-btn');
                        if (classicModeBtn) {
                            classicModeBtn.click();
                        }
                    }, 800);
                }, 50);
            }
        }, 300);
    }, 400);
}

// Initialize game when script loads - using simple event delegation approach
console.log("Quiz game script loaded, initializing with simple approach...");
QuizGameSimple.init();

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