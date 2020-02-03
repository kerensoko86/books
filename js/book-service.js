'use strict'

var gBooks = createBooks();
var gId = 0;
var gSortBy;

const BOOKS_ON_PAGE = 2;
var gCurrPage = 1;

function getBooksForDisplay() {
    var from = (gCurrPage - 1) * BOOKS_ON_PAGE;
    var to = from + BOOKS_ON_PAGE;
    return gBooks.slice(from, to);
}

function getCurrPage() {
    return gCurrPage;
}

function createBooks() {
    var books = loadFromStorage('books');
    if (books) gBooks = books;
    else {
        gBooks = [
            _createBook('Thief River Falls', 15.99, 'https://images-na.ssl-images-amazon.com/images/I/5121qEQkIgL._SY346_.jpg'),
            _createBook('A Minute to Midnight', 14.28, 'https://images-na.ssl-images-amazon.com/images/I/418sHJ%2Bp-LL._SY346_.jpg'),
            _createBook('Last Day', 12.87, 'https://images-na.ssl-images-amazon.com/images/I/41AUKdIpuWL.jpg'),
            _createBook('When I Was You', 20.13, 'https://images-na.ssl-images-amazon.com/images/I/41TyAL9OHGL._SY346_.jpg')
        ];
        saveToStorage('books', gBooks);
    }
    return gBooks;
}

function _createBook(name, price, imgUrl) {
    var book = {
        id: Math.floor(Math.random() * 10000),
        name: name,
        price: price,
        imgUrl: imgUrl,
        rating: 5
    };

    return book;
}

function addBook(name, price, imgUrl) {
    var book = _createBook(name, price, imgUrl);
    gBooks.unshift(book);
    saveToStorage('books', gBooks);
}


function removeBook(bookId) {
    var idx = gBooks.findIndex(book => book.id === bookId)
    gBooks.splice(idx, 1);
    saveToStorage('books', gBooks);
}

function getBook(bookId) {
    return gBooks.find(gBook => gBook.id === bookId);
}

function updateBook(book) {
    var idx = gBooks.findIndex(gBook => gBook.id === book.id)
    gBooks[idx] = book;
    saveToStorage('books', gBooks);
}

function changePage(diff) {
    gCurrPage += diff;
    var lastPage = Math.ceil(gBooks.length / BOOKS_ON_PAGE);

    if (gCurrPage > lastPage) gCurrPage = 1;
    else if (gCurrPage < 1) gCurrPage = lastPage;

}

function setCurrID(bookId) {
    gId = bookId;
}

function getId() {
    return gId;
}

function resetId() {
    gId = 0;
}

function setSort(sortBy) {
    gSortBy = sortBy;
    sortingBooks();
}

function sortingBooks() {
    var sortedBooks;
    if (gSortBy === 'name') getSortText();
    else if (gSortBy === 'price') getSortPrice();

    renderBooks();
}


function getSortText() {
    var sortText = gBooks.sort(function(a, b) {
        var textA = a.name.toLowerCase();
        var textB = b.name.toLowerCase();
        if (textA < textB) //sort string ascending
            return -1;
        if (textA > textB)
            return 1;
        return 0; //default return value (no sorting)
    })
    return sortText;
}

function getSortPrice() {
    gBooks.sort(function(a, b) {
        return (a.price) - (b.price);
    })
}