console.log("Welcome to notes app. This is app.js");
showNotes();
//when browser will refresh if there some eleemnts will remain by this function we can show it to the user

// If user adds a note, add it to the localStorage
let addBtn = document.getElementById("addBtn"); //targeting the add btn
addBtn.addEventListener("click", function() {
    //applying the eventlistner to the addBtn function
    let addTitle = document.getElementById("addTitle"); //targetting the title elemnt
    let addTxt = document.getElementById("addTxt"); //targetting the text of the elemnt
    let notes = localStorage.getItem("notes"); //what ever the user input store it to the local storage
    if (notes == null) {
        //if nothing is in the note add it into the array object
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes); //to convert text into objects
    }
    // object literal for both
    let myObj = {
        title: addTitle.value,
        text: addTxt.value,
    };
    // when the user click add note
    notesObj.push(myObj); //push that into the object literal that is the title and text
    localStorage.setItem("notes", JSON.stringify(notesObj)); //add to loclastorage
    addTxt.value = ""; //after insert make that blank
    addTitle.value = "";
    //   console.log(notesObj);
    showNotes(); //now show the notes by calling the show function 
});

// Function to show elements from localStorage
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = ""; //from initial assume html is blank
    notesObj.forEach(function(element, index) { //itarate by for each and pass two arguments element and index 
        html += ` 
            <div class="noteCard my-2 mx-2 card" style="width: 18rem; color:black;">
                    <div class="card-body">
                        <h5 class="card-title">${element.title}</h5>
                        <p class="card-text"> ${element.text}</p>
                        <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                    </div>
                </div>`;
    }); //this.id => the id goes when click on that element 
    //by the button we get the id of the that box and use to delete the element by help of delete function
    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html; //show the notes entered by user
    } else {
        notesElm.innerHTML = `Nothing to show Use "Add a Note" above to add notes`;
    }
}

// Function to delete a note
function deleteNote(index) {
    //   console.log("I am deleting", index);

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1); //it takes two argument one is to take the index what to delete and 2nd arguments how many you want to delete. (splice use to remove element)

    // update our local storage to delete note
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

let search = document.getElementById("searchTxt");
search.addEventListener("input", function() {
    let inputVal = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName("noteCard"); //get the element by its class name
    Array.from(noteCards).forEach(function(element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText; //get the tag name by the paragraph
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
        // console.log(cardTxt);
    });
});