let myLibrary = [];
const second = 1000;

function Book(title,author,page,readStatus,) {
  this.title = title;
  this.author = author;
  this.isRead = readStatus;
  this.page = page;
  this.info = () => this.title + " by "+this.author+", "+ this.page+" page, "+ "read status:" + this.isRead;
}

function addBookToLibrary() {
  inputLocation = document.querySelectorAll(".book-input");
  inputLocation = Array.from(inputLocation);
  let info = ["title","author","page","isRead"],index =0;
  for(let input of inputLocation){
    info[index]= input.value;
    index++;
  }
  let book = new Book(info[0],info[1],info[2],info[3]);
  myLibrary.push(book);
}

function addButton(){
  button = document.querySelector(".book-add-button");
  button.addEventListener("click",addBookToLibrary);
}addButton();

function showBook(){
  bookShelf = document.querySelector(".book-box");
  clearBook(bookShelf);
  let background;
  for(let book of myLibrary){
    let child = document.createElement("div");
    child.textContent = `${book.title} ${book.author} ${book.page}`;
    if(book.isRead == "true"){
      child.classList ="book readed";
    }
    else if(book.isRead == "false"){
      child.classList ="book noread";
    }
    child.innerHTML += '<button class ="remove-button" type="button" onclick = "removeBook();">X</button>' 
    bookShelf.appendChild(child);
  }
}setInterval(showBook, 5*second);

function clearBook(location){
  let arr = location.querySelectorAll("div")
  arr.forEach(element => {
    element.remove();
  });
}