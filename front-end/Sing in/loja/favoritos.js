document.addEventListener("DOMContentLoaded", () => {
    const favoritesContainer = document.getElementById("favorites-container");

    if (favoritesContainer) {
        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

        if (favorites.length === 0) {
            favoritesContainer.innerHTML = "<p>Você ainda não tem favoritos.</p>";
        } else {
            favorites.forEach(manga => {
                const mangaDiv = document.createElement("div");
                mangaDiv.classList.add("favorite-item");
                mangaDiv.innerHTML = `
                    <img src="${manga.imgSrc}" alt="${manga.title}" class="favorite-img">
                    <h3>${manga.title}</h3>
                    <button class="remove-fav" data-title="${manga.title}">Remover</button>
                `;
                favoritesContainer.appendChild(mangaDiv);
            });
        }
    }
});

// Remover favorito
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-fav")) {
        let titleToRemove = event.target.getAttribute("data-title");
        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

        favorites = favorites.filter(manga => manga.title !== titleToRemove);
        localStorage.setItem("favorites", JSON.stringify(favorites));

        location.reload(); // Atualiza a página para refletir a mudança
    }
});
