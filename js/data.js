const STORAGE_KEY = "Bookshelf";

let bookList = [];

function isStorageExist() {
  if (typeof Storage === undefined) {
    alert("Local Storage Terdeteksi");
    return false;
  }
  return true;
}

function compose(textJudul, textNama, textTahun, isCompleted) {
  return {
    id: +new Date(),
    textJudul,
    textNama,
    textTahun,
    isCompleted,
  };
}
function saveData() {
  const parsed = JSON.stringify(bookList);
  localStorage.setItem(STORAGE_KEY, parsed);
  document.dispatchEvent(new Event("ondatasaved"));
}

function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);

  let data = JSON.parse(serializedData);

  if (data !== null) {
    bookList = data;
  }
  document.dispatchEvent(new Event("ondataloaded"));
}

function updateDataToStorage() {
  if (isStorageExist()) {
    saveData();
  }
}

function findBooks(booksId) {
  for (books of bookList) {
    if (books.id === booksId) return books;
  }

  return null;
}

function findBooksIndex(booksId) {
  let index = 0;
  for (books of bookList) {
    if (books.id === booksId) return index;

    index++;
  }

  return -1;
}
