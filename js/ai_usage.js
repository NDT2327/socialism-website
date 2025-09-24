document.querySelectorAll('.modal .close').forEach(function(btn) {
    btn.onclick = function() {
        btn.closest('.modal').style.display = 'none';
    };
});
window.onclick = function(event) {
    document.querySelectorAll('.modal').forEach(function(modal) {
        if (event.target === modal) modal.style.display = 'none';
    });
};
window.onkeydown = function(e) {
    if (e.key === "Escape") {
        document.querySelectorAll('.modal').forEach(function(modal) {
            modal.style.display = 'none';
        });
    }
};
function openModal(id) {
    document.getElementById(id).style.display = 'block';
}
