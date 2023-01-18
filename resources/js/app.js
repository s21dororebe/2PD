"use strict";

// define variable that will hold content DOM element
let root = null;


// functions that load data, set up page content, handle user actions

// setup index page
function setupIndex() {

    placeLoader();

    // load JSON data
    fetch('http://pd2/data/get-top-books')
        .then(
            response => response.json()
        )
        .then(books => {
            // on success remove spinner and render index page
            removeLoader();
            renderIndex(books);
        })
        .then(function () {
            // setup link handling
            setupLinks();
        })
    ;
}

// setup single book page
function setupSingle(id) {

    placeLoader();

    // load JSON data
    fetch('http://pd2/data/get-book/' + id)
        .then(
            response => response.json()
        )
        .then(book => {
            // on success remove spinner and render book page
            removeLoader();
            renderSingle(book);
        })
        .then(function () {
            // load related books
            fetch('http://pd2/data/get-related-books/' + id)
                .then(
                    response => response.json()
                )
                .then(books => {
                    // render related books links
                    renderRelated(books);
                })
                .then(function () {
                    // setup link handling
                    setupLinks();
                })
            ;
        })
    ;
}

// render index page content
function renderIndex(books) {

    let i = 0;
    for (const book of books) {
        i++;

        // create row
        let row = document.createElement('div');
        row.classList = 'row mb-5 pt-5 pb-5 bg-light';

        // create info div
        let info = document.createElement('div');
        info.classList = 'col-md-6 mt-2 px-5 ' + (i % 2 == 0 ? 'text-end order-1' : 'text-start order-2');

        // create info items
        // title
        let title = document.createElement('p');
        title.classList = 'display-4';
        title.textContent = book.name;
        info.appendChild(title);

        // description
        if (book.description.length > 0) {
            let lead = document.createElement('p');
            lead.classList = 'lead';
            lead.textContent = (book.description.split(' ').slice(0, 32).join(' ')) + '...';
            info.appendChild(lead);
        }

        // "See more" button
        let btn = document.createElement('a');
        btn.classList = 'btn btn-success see-more ' + (i % 2 == 0 ? 'float-right' : 'float-left');
        btn.textContent = 'Apskatīt';
        btn.href = '#';
        btn.dataset.bookId = book.id;
        info.appendChild(btn);

        // add info div to row
        row.appendChild(info);

        // create image div
        let image = document.createElement('div');
        image.classList = 'col-md-6 text-center ' + (i % 2 == 0 ? 'order-2' : 'order-1');

        // create image
        let img = document.createElement('img');
        img.classList = 'img-fluid img-thumbnail rounded-lg w-50';
        fetch(book.image, {method: 'HEAD'})
            .then(res => {
                if (res.ok) {
                    img.src = book.image;
                } else {
                    img.src = "data:image/png;base64,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";
                }
            })
        img.alt = book.name;
        image.appendChild(img);

        // add image div to row
        row.appendChild(image);

        // add row to document
        root.appendChild(row);
    }
}

// render main panel of single book page
function renderSingle(book) {

    // create row
    let row = document.createElement('div');
    row.classList = 'row mb-5';

    // create info div
    let info = document.createElement('div');
    info.classList = 'col-md-6 pt-5';

    // create info items
    // title
    let title = document.createElement('h1');
    title.classList = 'display-3';
    title.textContent = book.name;
    info.appendChild(title);

    // full description
    if (book.description.length > 0) {
        let lead = document.createElement('p');
        lead.classList = 'lead';
        lead.textContent = book.description;
        info.appendChild(lead);
    }

    // data
    let dl = document.createElement('dl');
    dl.classList = 'row';

    // year
    let yearLabel = document.createElement('dt');
    yearLabel.classList = 'col-sm-3';
    yearLabel.textContent = 'Gads';
    dl.appendChild(yearLabel);

    let yearValue = document.createElement('dd');
    yearValue.classList = 'col-sm-9';
    yearValue.textContent = book.year;
    dl.appendChild(yearValue);

    // price
    let priceLabel = document.createElement('dt');
    priceLabel.classList = 'col-sm-3';
    priceLabel.textContent = 'Cena';
    dl.appendChild(priceLabel);

    let priceValue = document.createElement('dd');
    priceValue.classList = 'col-sm-9';
    priceValue.innerHTML = "&euro; " + book.price;
    dl.appendChild(priceValue);

    // genre
    if (book.genre.length > 0) {
        let genreLabel = document.createElement('dt');
        genreLabel.classList = 'col-sm-3';
        genreLabel.textContent = 'إ½anrs';
        dl.appendChild(genreLabel);

        let genreValue = document.createElement('dd');
        genreValue.classList = 'col-sm-9';
        genreValue.textContent = book.genre;
        dl.appendChild(genreValue);
    }

    info.appendChild(dl);

    // "Go back" button
    let btn = document.createElement('a');
    btn.classList = 'btn btn-dark go-back float-left';
    btn.textContent = 'Uz sؤپkumu';
    btn.href = '#';
    info.appendChild(btn);

    // add info div to row
    row.appendChild(info);

    // create image div
    let image = document.createElement('div');
    image.classList = 'col-md-6 text-center p-5';

    // create image
// @if($book->image == null)
//     <img class="books-img card-img-top"
//          src="data:image/png;base64,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"
//          alt="Card image cap">
//         @else
//         <img class="books-img card-img-top" src="{{asset('images/' . $book->image)}}"
//              alt="Card image cap">
//             @endif

    let img = document.createElement('img');
    img.classList = 'img-fluid img-thumbnail rounded-lg';

    fetch(book.image, {method: 'HEAD'})
        .then(res => {
            if (res.ok) {
                img.src = book.image;
            } else {
                img.src = "data:image/png;base64,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";
            }
        })
    img.alt = book.name;
    image.appendChild(img);

    // add image div to row
    row.appendChild(image);

    // add row to document
    root.appendChild(row);
}

// render related books panel of single book page
function renderRelated(books) {

    // create row
    let titleRow = document.createElement('div');
    titleRow.classList = 'row mt-5';

    // create col
    let titleDiv = document.createElement('div');
    titleDiv.classList = 'col-md-12';

    // create title
    let title = document.createElement('h2');
    title.classList = 'display-4';
    title.textContent = "Lؤ«dzؤ«gas grؤپmatas";

    // add elements to document
    titleDiv.appendChild(title);
    titleRow.appendChild(titleDiv);
    root.appendChild(titleRow);

    // create row element that will hold three related books
    let row = document.createElement('div');
    row.classList = 'row mb-5';

    for (const book of books) {

        // create book div
        let bookDiv = document.createElement('div');
        bookDiv.classList = 'col-md-4';

        // create card div
        let card = document.createElement('div');
        card.classList = 'card';

        // create card image
        let img = document.createElement('img');
        img.classList = 'card-img-top';
        fetch(book.image, {method: 'HEAD'})
            .then(res => {
                if (res.ok) {
                    img.src = book.image;
                } else {
                    img.src = "data:image/png;base64,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";
                }
            })
        img.alt = book.name;
        card.appendChild(img);

        // create card body
        let cardBody = document.createElement('div');
        cardBody.classList = 'card-body';

        // create card title
        let cardTitle = document.createElement('h5');
        cardTitle.classList = 'card-title';
        cardTitle.textContent = book.name;
        cardBody.appendChild(cardTitle);

        // create card link
        let btn = document.createElement('a');
        btn.classList = 'btn btn-success see-more';
        btn.textContent = 'Apskatؤ«t';
        btn.href = '#';
        btn.dataset.bookId = book.id;
        cardBody.appendChild(btn);

        // add elements to row
        card.appendChild(cardBody);
        bookDiv.appendChild(card);
        row.appendChild(bookDiv);
    }

    // add row to document
    root.appendChild(row);
}

// set up link functionality
function setupLinks() {

    // "see more" links
    let seeMores = document.querySelectorAll('a.see-more');
    for (let a of seeMores) {
        a.addEventListener("click", function (event) {
            event.preventDefault();
            let id = a.dataset.bookId;
            setupSingle(id);
        });
    }

    // "go back" links
    let goBacks = document.querySelectorAll('a.go-back');
    for (let a of goBacks) {
        a.addEventListener("click", function (event) {
            event.preventDefault();
            setupIndex();
        });
    }
}

// replace content with spinner
function placeLoader() {
    // clear the root element
    root.innerHTML = "";

    // create loading div
    let loading = document.createElement('div');
    loading.id = 'loading';
    loading.classList = 'text-center p-5';

    // create spinner image
    let img = document.createElement('img');
    img.alt = '...';
    img.src = '/loading.gif';
    loading.appendChild(img);

    // add div to document
    root.appendChild(loading);
}

// remove spinner
function removeLoader() {
    document.getElementById('loading').remove();
}


// start when page is loaded
document.addEventListener("DOMContentLoaded", function () {

    // get root element
    root = document.getElementById('root');

    // create index page
    setupIndex();

});
