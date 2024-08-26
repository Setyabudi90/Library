document.addEventListener('DOMContentLoaded', () => {
    searchBooks('harry potter');
});

function searchBooks(query = null) {
    const searchInput = document.getElementById('search-input');
    const searchQuery = query || searchInput.value;

    fetch(`https://openlibrary.org/search.json?q=${searchQuery}`)
        .then(response => response.json())
        .then(data => displayBooks(data.docs))
        .catch(error => console.error('Error loading books:', error));
}

function displayBooks(books) {
    const catalog = document.querySelector('.book-catalog');
    catalog.innerHTML = '';

    books.slice(0, 10).forEach(book => {
        const coverId = book.cover_i;
        const coverUrl = coverId ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg` : 'https://via.placeholder.com/100x150?text=No+Image';

        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        bookCard.innerHTML = `
            <img src="${coverUrl}" alt="Book Cover">
            <h2>${book.title}</h2>
            <p>${book.author_name ? book.author_name.join(', ') : 'Unknown Author'}</p>
        `;
        bookCard.onclick = () => openModal(book.title, book.author_name ? book.author_name.join(', ') : 'Unknown Author', book.first_sentence ? book.first_sentence : 'No description available.', coverUrl);
        catalog.appendChild(bookCard);
    });
}

function openModal(title, author, description, coverUrl) {
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-author').textContent = author;
    document.getElementById('modal-description').textContent = description;
    document.getElementById('modal-image').src = coverUrl;
    document.getElementById('modal').style.display = "block";
}

function closeModal() {
    document.getElementById('modal').style.display = "none";
}

function borrowBook() {
    alert("Buku berhasil dipinjam!");
    closeModal();
}
