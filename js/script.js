document.addEventListener("DOMContentLoaded", function () {
  const submitForm = document.getElementById("add");

  submitForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addList();
  });
  if (isStorageExist()) {
    loadDataFromStorage();
  }
});
document.addEventListener("ondataloaded", () => {
  refreshDataFromBooks();
});
