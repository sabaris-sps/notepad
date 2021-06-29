const btnSave = document.getElementById("btnSave");
let notes = "";
init();
writeNotes();
document.getElementById("noteDisplay").style.display = "none";

function init() {
    let out = "";
    let noteArray = JSON.parse(localStorage.getItem("noteData"));

    if (noteArray !== null && noteArray !== "") {
        noteArray = JSON.parse(localStorage.getItem("noteData"));

        for (let x = 0; x < noteArray.length; x++) {
            out += "<option value=" + x + ">";
            out += noteArray[x].title;
            out += "</option>";

            document.getElementById("noteMaster").innerHTML = out;
        }

        document.getElementById("btnWrite").addEventListener("click", function(e) {
            writeNotes();
        });

        document.getElementById("noteMaster").addEventListener("click", function(e) {
            displayNote(e.target.value);
            document.getElementById("noteDisplay").style.display = "block";
        });

        readNotes();
    } else {
        writeNotes();
    }
}

function writeNotes() {
    document.getElementById("noteTitle").value = "";
    document.getElementById("noteBody").value = "";
    document.getElementById("write").style.display = "block";
    document.getElementById("read").style.display = "none";
}

function readNotes() {
    document.getElementById("read").style.display = "block";
    document.getElementById("write").style.display = "none";
}

function displayNote(note) {
    let noteArray = JSON.parse(localStorage.getItem("noteData"));

    let out = "<h2>" + noteArray[note].title + "</h2>";
    out += "<h4>Date created: " + new Date(noteArray[note].date).toDateString() + "</h4>";
    out += "<p>" + noteArray[note].body + "</p>";
    out += "<button id='btnDelete'>Delete Note</button>";

    document.getElementById("noteDisplay").innerHTML = out;
    document.getElementById("btnDelete").onclick = function() {
        noteArray.splice(note, 1);
        localStorage.setItem("noteData", JSON.stringify(noteArray));
        init();
        document.getElementById("noteDisplay").style.display = "none";
        if (noteArray == "" || noteArray == null || noteArray == []) {
            writeNotes();
        } else {
            readNotes();
        }
    };
}

btnSave.onclick = function() {
    const noteDate = new Date();
    const noteTitle = document.getElementById("noteTitle").value;
    const noteBody = document.getElementById("noteBody").value;
    const theNote = new Note(noteDate, noteTitle, noteBody);
    saveNotes(theNote);
    document.getElementById("noteDisplay").style.display = "none";
}

btnCancel.onclick = function() {
    readNotes();
}

function saveNotes(note) {
    let noteArray = JSON.parse(localStorage.getItem("noteData"));

    if (noteArray == null) {
        noteArray = new Array();
        noteArray.push(note);
    } else {
        noteArray.push(note);
    }

    localStorage.setItem("noteData", JSON.stringify(noteArray));
    readNotes();
    init();
}