let myLibrary = [];
let bookIdPool = {
  size : 10,
  idPool:[]
};
const second = 1000;

function main(){
  addButton();
  generateBookId("generate",0);
}main();

function Book(title,author,page,readStatus,) {
  this.title = title;
  this.author = author;
  this.isRead = readStatus;
  this.page = page;
  this.info = () => this.title + " by "+this.author+", "+ this.page+" page, "+ "ID:" +this.ID;
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
  if(myLibrary.length+1 > bookIdPool.size){
    generateBookId("add",myLibrary.length);
  }
  book.ID = bookIdPool.idPool.splice(0,1);
  myLibrary.push(book);
  showBook();
}

function addButton(){
  button = document.querySelector(".book-add-button");
  button.addEventListener("click",addBookToLibrary);
  addRemoveButton();
}

function showBook(){
  bookShelf = document.querySelector(".book-box");
  clearBook(bookShelf);
  let index = 0;
  for(let book of myLibrary){
    let child = document.createElement("div");
    child.textContent = book.info();
    if(book.isRead == "true"){
      child.classList ="book readed";
    }
    else if(book.isRead == "false"){
      child.classList ="book noread";
    }
    child.innerHTML += '<button class ="remove-button" type="button" data-id ="'+ book.ID +'" >X</button>' 
    bookShelf.appendChild(child);
    index++;
  }
}

function addRemoveButton(){
  buttonZone = document.querySelector(".book-box")
  buttonZone.addEventListener("click",(e)=>{
    const isButton = e.target.nodeName === "BUTTON";
    if(!isButton){
      return;
    }
    remove(e.target.dataset.id);
  })
}

function remove(number){
  let index = 0;
  for(let book of myLibrary){
    if(book.ID == number){
      myLibrary.splice(index,1);
      bookIdPool.idPool.push(number);
      showBook();
      return;
    }
    index++
  }
}

function clearBook(location){
  let arr = location.querySelectorAll("div")
  arr.forEach(element => {
    element.remove();
  });
}

function generateBookId(option,num){
  if(option =="generate"){
    for(let i = 0; i < bookIdPool.size;i++){
    bookIdPool.idPool.push(i);
    }
  }else if(option == "add"){
    bookIdPool.idPool.push(bookIdPool.size);
    bookIdPool.size += 1;
  }
}