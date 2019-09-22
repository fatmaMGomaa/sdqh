function getLocalStorageItem(item) {
  let data = localStorage.getItem(item);
  if (data) {
    return JSON.parse(data);
  }
  return data;
}

function saveToLocalStorage(name, item) {
  localStorage.setItem(name, JSON.stringify(item));
}

function removeLocalStorageItem(item) {
  localStorage.removeItem(item);
}
