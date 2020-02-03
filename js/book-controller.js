'use strict'


function onInit() {
    renderBooks();
}

function renderBooks(books) {
    var books = getBooksForDisplay();
    var strHTMLs = '';
    strHTMLs += books.map(book =>
        `<tr><td><span class="id">${book.id}</span></td>
    <td> ${book.name} </td>
    <td>$${book.price}</td>
    <td ><img class="inside-image" src="${book.imgUrl}"/img></td>
    <td>${book.rating}</td>
    <td><button onclick="onShowBookDetails(event,${book.id})" title="Read">Read</button></td>
    <td><button onclick="onUpdateBook(event,${book.id})" title="Update">Update</button></td>
    <td><button onclick="onRemoveBook(${book.id})" title="Remove">Remove</button></td><tr>`).join('');

    var elbookList = document.querySelector('.book-list');
    elbookList.innerHTML = strHTMLs;
}



function onChangePage(diff) {
    changePage(diff)
    var elPage = document.querySelector('.curr-page');
    elPage.innerText = getCurrPage();
    renderBooks();
}



function onAddBook() {
    document.querySelector('.bookInputs').hidden = false;
}

function saveAddedBook() {
    var elTxtName = document.querySelector('.txt-name');
    var elTxtPrice = document.querySelector('.txt-price');
    var elTxtUrl = document.querySelector('.txt-img');
    var name = elTxtName.value;
    var price = elTxtPrice.value;
    var imgUrl = elTxtUrl.value;
    if (!name || !price || !imgUrl) return;

    var id = getId();
    var book = getBook(id);

    if (book) {
        var newBook = book;
        newBook.name = name;
        newBook.price = price;
        newBook.imgUrl = imgUrl;
        updateBook(newBook);
    } else {
        addBook(name, price, imgUrl)
    }
    resetId();
    elTxtName.value = '';
    elTxtPrice.value = '';
    elTxtUrl.value = '';
    renderBooks();

    document.querySelector('.bookInputs').hidden = true;
}

function onRemoveBook(bookId) {
    var isSure = confirm('Are you sure?');
    if (isSure) {
        removeBook(bookId);
        renderBooks();
    }
}

function onUpdateBook(event, bookId) {
    document.querySelector('.bookInputs').hidden = false;
    setCurrID(bookId);
    var book = getBook(bookId);
    var elTxtName = document.querySelector('.txt-name');
    elTxtName.value = book.name;

    var elTxtPrice = document.querySelector('.txt-price');
    elTxtPrice.value = +book.price;

    var elTxtUrl = document.querySelector('.txt-img');
    elTxtUrl.value = book.imgUrl;

    event.stopPropagation();

}

function onShowBookDetails(event, bookId) {
    var book = getBook(bookId);
    renderUpdatingRatingBtn(bookId);
    var elModal = document.querySelector('.modal');
    elModal.querySelector('h3').innerText = book.name;
    elModal.querySelector('.image').innerHTML = `<img src="${book.imgUrl}"/>`;
    elModal.hidden = false;
}

function onCloseModal() {
    document.querySelector('.modal').hidden = true;
    document.querySelector('.number').innerHTML = 5;

}

function onSortBy(elSort) {
    var sortBy = elSort.dataset.sort;
    setSort(sortBy);
    renderBooks();
}

function onMinus() {
    var number = document.querySelector('.number').innerHTML;
    if (number > 0) {
        number--;
        document.querySelector('.number').innerHTML = number;
    }
    return number;
}

function onPlus() {
    var number = document.querySelector('.number').innerHTML;
    if (number < 10) {
        number++;
        document.querySelector('.number').innerHTML = number;
    }
    return number;
}

function renderUpdatingRatingBtn(bookId) {
    var strHTML = `<button class="new-rating-btn" onclick="onUpdateRating(${bookId})">Update Rating</button>`;
    var elBtn = document.querySelector('.btn-location');
    console.log(elBtn);
    elBtn.innerHTML = strHTML;
}

function onUpdateRating(bookId) {
    var book = getBook(bookId);
    book.rating = +document.querySelector('.number').innerHTML;
    renderBooks();
    onCloseModal();
}