document.addEventListener("DOMContentLoaded", () => {
    const favoriteButtons = document.querySelectorAll(".favorite-btn");

    favoriteButtons.forEach(button => {
        button.addEventListener("click", () => {
            const title = button.getAttribute("data-title");
            const imgSrc = button.getAttribute("data-img");

            let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

            // Evita adicionar duplicatas
            if (!favorites.some(manga => manga.title === title)) {
                favorites.push({ title, imgSrc });
                localStorage.setItem("favorites", JSON.stringify(favorites));
                alert("Mangá adicionado aos favoritos!");
            } else {
                alert("Este mangá já está nos favoritos.");
            }
        });
    });
});
