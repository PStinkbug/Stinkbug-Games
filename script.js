// Load saved theme OR default to neon
let savedTheme = localStorage.getItem("theme") || "theme-neon";
document.body.classList.add(savedTheme);

// Theme selection
const selector = document.getElementById("themeSelector");
selector.value = savedTheme;

selector.addEventListener("change", () => {
    // Remove old themes
    document.body.classList.remove("theme-neon", "theme-retro", "theme-clean", "theme-future");

    // Add new theme
    const newTheme = selector.value;
    document.body.classList.add(newTheme);

    // Save it
    localStorage.setItem("theme", newTheme);
});
