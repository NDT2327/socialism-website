console.log("Alliance module loaded");

// Dữ liệu quốc gia
const countryData = {
  vietnam: {
    title: "Việt Nam (XHCN)",
    model: "<strong>Mô hình:</strong> Liên minh công - nông - trí thức",
    classes:
      "<strong>Giai cấp/tầng lớp chính:</strong> Công nhân, nông dân, trí thức, tư sản dân tộc",
    leadership:
      "<strong>Vai trò lãnh đạo:</strong> Đảng CSVN lãnh đạo, công nhân nòng cốt",
    goals:
      "<strong>Mục tiêu:</strong> Xây dựng CNXH, công nghiệp hóa, đoàn kết dân tộc",
  },
  china: {
    title: "Trung Quốc (XHCN)",
    model: "<strong>Mô hình:</strong> Mặt trận thống nhất",
    classes:
      "<strong>Giai cấp/tầng lớp chính:</strong> Công nhân, nông dân, trí thức, dân tộc thiểu số",
    leadership:
      "<strong>Vai trò lãnh đạo:</strong> Đảng Cộng sản Trung Quốc lãnh đạo",
    goals:
      "<strong>Mục tiêu:</strong> Xây dựng CNXH đặc sắc, thống nhất dân tộc",
  },
  cuba: {
    title: "Cuba (XHCN)",
    model: "<strong>Mô hình:</strong> Liên minh công - nông - trí thức",
    classes:
      "<strong>Giai cấp/tầng lớp chính:</strong> Công nhân, nông dân, trí thức",
    leadership:
      "<strong>Vai trò lãnh đạo:</strong> Đảng Cộng sản Cuba lãnh đạo",
    goals: "<strong>Mục tiêu:</strong> Xây dựng CNXH, chống đế quốc",
  },
  northkorea: {
    title: "Triều Tiên (XHCN)",
    model: "<strong>Mô hình:</strong> Liên minh giai cấp dưới hệ thống songbun",
    classes:
      "<strong>Giai cấp/tầng lớp chính:</strong> Công nhân, nông dân, trí thức (phân tầng theo lòng trung thành)",
    leadership:
      "<strong>Vai trò lãnh đạo:</strong> Đảng Lao động Triều Tiên lãnh đạo",
    goals: "<strong>Mục tiêu:</strong> Thực hiện Juche (tự lực), xây dựng CNXH",
  },
  laos: {
    title: "Lào (XHCN)",
    model: "<strong>Mô hình:</strong> Liên minh công - nông - trí thức",
    classes:
      "<strong>Giai cấp/tầng lớp chính:</strong> Công nhân, nông dân, trí thức",
    leadership:
      "<strong>Vai trò lãnh đạo:</strong> Đảng Nhân dân Cách mạng Lào lãnh đạo",
    goals:
      "<strong>Mục tiêu:</strong> Xây dựng CNXH từ lạc hậu, phát triển kinh tế",
  },
  usa: {
    title: "Mỹ (Tư bản)",
    model: "<strong>Mô hình:</strong> Không chính thức, xung đột giai cấp",
    classes:
      "<strong>Giai cấp/tầng lớp chính:</strong> Tư bản, trung lưu, công nhân",
    leadership: "<strong>Vai trò lãnh đạo:</strong> Tư bản thống trị",
    goals: "<strong>Mục tiêu:</strong> Tối đa lợi nhuận, tự do kinh doanh",
  },
  uk: {
    title: "Anh (Tư bản)",
    model: "<strong>Mô hình:</strong> Liên minh qua đảng",
    classes:
      "<strong>Giai cấp/tầng lớp chính:</strong> Elite, middle class, working class",
    leadership: "<strong>Vai trò lãnh đạo:</strong> Giai cấp thống trị",
    goals: "<strong>Mục tiêu:</strong> Ổn định xã hội",
  },
  france: {
    title: "Pháp (Tư bản)",
    model:
      "<strong>Mô hình:</strong> Xung đột giai cấp, liên minh tạm thời qua công đoàn",
    classes:
      "<strong>Giai cấp/tầng lớp chính:</strong> Tư bản, trung lưu, công nhân",
    leadership:
      "<strong>Vai trò lãnh đạo:</strong> Tư bản thống trị qua kinh tế-chính trị",
    goals: "<strong>Mục tiêu:</strong> Phát triển kinh tế, phúc lợi xã hội",
  },
  japan: {
    title: "Nhật Bản (Tư bản)",
    model: "<strong>Mô hình:</strong> Alliance capitalism (keiretsu)",
    classes:
      "<strong>Giai cấp/tầng lớp chính:</strong> Doanh nghiệp, công nhân, trung lưu",
    leadership:
      "<strong>Vai trò lãnh đạo:</strong> Tư bản thống trị qua liên minh doanh nghiệp",
    goals: "<strong>Mục tiêu:</strong> Tăng trưởng kinh tế, hợp tác xã hội",
  },
};

console.log("Alliance module loaded");
// Tự động khởi tạo khi modal xuất hiện trong DOM
function autoInitAllianceModal() {
  const modal = document.getElementById("countryModal");
  if (!modal) {
    setTimeout(autoInitAllianceModal, 200); // Thử lại sau 200ms
    return;
  }
  console.log("Alliance module initialized");

  const modalClose = modal.querySelector(".country-modal-close");
  document.querySelectorAll(".flag").forEach((flag) => {
    flag.onclick = function (e) {
      e.preventDefault();
      e.stopPropagation();
      const country = this.getAttribute("data-country");
      const data = countryData[country];
      console.log("Flag clicked:", country);
      if (data) {
        document.getElementById("modalCountryTitle").innerHTML = data.title;
        document.getElementById("modalModel").innerHTML = data.model;
        document.getElementById("modalClasses").innerHTML = data.classes;
        document.getElementById("modalLeadership").innerHTML = data.leadership;
        document.getElementById("modalGoals").innerHTML = data.goals;
      } else {
        document.getElementById("modalCountryTitle").innerHTML =
          "Không có dữ liệu cho quốc gia này.";
        document.getElementById("modalModel").innerHTML = "";
        document.getElementById("modalClasses").innerHTML = "";
        document.getElementById("modalLeadership").innerHTML = "";
        document.getElementById("modalGoals").innerHTML = "";
      }
      modal.classList.add("show");
    };
  });

  modalClose.onclick = function () {
    modal.classList.remove("show");
  };
  modal.onclick = function (e) {
    if (e.target === modal) modal.classList.remove("show");
  };
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.classList.contains("show")) {
      modal.classList.remove("show");
    }
  });
}

// Tự động chạy khi file JS được nạp
autoInitAllianceModal();
