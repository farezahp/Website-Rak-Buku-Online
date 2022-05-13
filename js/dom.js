const UNCOMPLETED_READ = "BEFORE";
const COMPLETED_READ = "AFTER";
let BOOKS_ITEMID = "itemId";

function addList() {
  const Uncompletedread = document.getElementById(UNCOMPLETED_READ);
  const textJudul = document.getElementById("judul").value;
  const textNama = document.getElementById("nama").value;
  const textTahun = document.getElementById("tahun").value;
  const checkboxsudah = document.getElementById("sudahbelum").checked;

  const list = makeList(textJudul, textNama, textTahun, checkboxsudah);

  let obj = compose(textJudul, textNama, textTahun, checkboxsudah);
  list[BOOKS_ITEMID] = bookList.id;

  bookList.push(obj);

  updateDataToStorage();
  window.location.reload();
}

function makeList(textJudul, textNama, textTahun, isCompleted) {
  const textjudul = document.createElement("h2");
  textjudul.classList.add("judul");
  textjudul.innerText = textJudul;

  const textnama = document.createElement("h3");
  textnama.innerText = textNama;

  const texttahun = document.createElement("p");
  texttahun.innerText = textTahun;

  const textContainer = document.createElement("div");
  textContainer.classList.add("inner");
  textContainer.append(textjudul, textnama, texttahun);

  const container = document.createElement("div");
  container.classList.add("item", "shadow");
  container.append(textContainer);

  if (isCompleted) {
    container.append(createUndoButton(), createTrashButton());
  } else {
    container.append(createCheckButton(), createTrashButton());
  }

  return container;
}

/////////////////////////////////
function addBooksToCompleted(element) {
  const taskJudul = element.querySelector(".inner > h2").innerText;
  const taskNama = element.querySelector(".inner > h3").innerText;
  const taskTahun = element.querySelector(".inner > p").innerText;

  const books = findBooks(element[BOOKS_ITEMID]);
  books.isCompleted = true;

  const newList = makeList(taskJudul, taskNama, taskTahun, true);
  newList[BOOKS_ITEMID] = books.id;
  element.append(newList);
  updateDataToStorage();

  const listCompleted = document.getElementById(COMPLETED_READ);
  listCompleted.append(newList);
  element.remove();
  window.location.reload();
}

function removeTaskFromCompleted(element) {
  element.remove();
}

function createCheckButton() {
  return createButton("Selesai Baca", function (event) {
    addBooksToCompleted(event.target.parentElement);
  });
}

function createUndoButton() {
  return createButton("Belum Selesai", function (event) {
    undoBooksFromCompleted(event.target.parentElement);
  });
}

function createTrashButton() {
  return createButton("Hapus Buku", function (event) {
    removeBooksFromCompleted(event.target.parentElement);
  });
}

function createButton(buttonTypeClass, eventListener) {
  const button = document.createElement("button");
  button.innerHTML = buttonTypeClass;
  button.addEventListener("click", function (event) {
    eventListener(event);
    event.stopPropagation();
  });
  return button;
}

function undoBooksFromCompleted(element) {
  const listUncompleted = document.getElementById(UNCOMPLETED_READ);
  const titleBooks = element.querySelector(".inner > h2").innerText;
  const authorBooks = element.querySelector(".inner > h3").innerText;
  const yearBooks = element.querySelector(".inner > p").innerText;

  const newList = makeList(titleBooks, authorBooks, yearBooks, false);

  const books = findBooks(element[BOOKS_ITEMID]);
  books.isCompleted = false;
  newList[BOOKS_ITEMID] = books.id;

  listUncompleted.append(newList);
  element.remove();

  updateDataToStorage();
  window.location.reload();
}

function removeBooksFromCompleted(element) {
  const booksPosition = findBooksIndex(element[BOOKS_ITEMID]);
  bookList.splice(booksPosition, 1);

  element.remove();
  updateDataToStorage();
  window.location.reload();
}
function refreshDataFromBooks() {
  let unRead = document.getElementById(UNCOMPLETED_READ);
  let wasRead = document.getElementById(COMPLETED_READ);

  for (book of bookList) {
    let newBooks = makeList(
      book.textJudul,
      book.textNama,
      book.textTahun,
      book.isCompleted
    );
    newBooks[BOOKS_ITEMID] = book.id;

    if (book.isCompleted) {
      wasRead.append(newBooks);
    } else {
      unRead.append(newBooks);
    }
  }
}

let searchForm = document.getElementById("searchBook");
searchForm.addEventListener("submit", function () {
  searchKeys = document.getElementById("searchText").value.toLowerCase();
  let judul = document.querySelectorAll(".judul");
  for (const textJudul of judul) {
    let el = textJudul.parentElement.parentElement;
    lowText = textJudul.innerText.toLowerCase();
    if (!lowText.includes(searchKeys)) {
      el.classList.add("hidden");
    } else {
      el.classList.remove("hidden");
    }
  }
});
