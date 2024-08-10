const baseUrl = "https://notes-api.dicoding.dev/v2";

class notesAPI {

  static CreateNote(note){
    return fetch(`${baseUrl}/notes`,{
      method:"POST",
      header :{
        "Content-Type":"application/json",
      },
      body:JSON.stringify(note),
    })

    .then((response) =>{
      if(response.status >= 200 && response.status <= 300){
        return response.json();
      } else{
        return Promise.reject(new Error(`Something went wrong`));
      }
    })

    .then((responseJSON) => {
       if(responseJSON.length > 0){
        return Promise.resolve(responseJSON);
       } else{
        return Promise.reject(new Error(`Note is not found`));
       }
    });
  }


  // Gunakan Fungsi ini untuk mengambil data dari API

  static getNotes(){

    return fetch(`${baseUrl}/notes`)
      .then((response) =>{
        if(response.status >= 200 && response.status <= 300){
          return response.json();
        } else{
          return Promise.reject(new Error(`Something went wrong`));
        }
      })
  
      .then((responseJSON) => {
        const {data :notes } = responseJSON;
        return Promise.resolve(notes);
      });
    
    }
    //Panggil fungsi ini untuk menghapus data dari API
    static deleteNote(id){
      return fetch(`${this.baseUrl}/notes/${id}`,{
        method: "DELETE",

      })

      .then((response) =>{
        if(response.status >= 200 && response.status <= 300){
          return response.json();
        } else{
          return Promise.reject(new Error(`Something went wrong`));
        }
      })
  
      .then((responseJSON) => {
         if(responseJSON.length > 0){
          return Promise.resolve(responseJSON);
         } else{
          return Promise.reject(new Error(`Note is not found`));
         }
      });

      
    }

    //request untuk ambil data note yg diarsipkan
    static getArchived(){
      return fetch(`${baseUrl}/notes/archived`,)
      .then((response) =>{
        if(response.status >= 200 && response.status <= 300){
          return response.json();
        } else{
          return Promise.reject(new Error(`Gagal untuk mengArsipkan Catatan ini`));
        }
      })
      .then((responseJSON) => {
        if(responseJSON.length > 0){
           return Promise.resolve(responseJSON);

        } else{
          return Promise.reject(new Error("Catatan yang terArsipkan tidak tersedia"))
        }
      });
    }

    //Request melakukan membatalkan Arsip
    static unArchiveNotes(noteID){
      return fetch(`${baseUrl}/notes/${noteID}/unarchive`, {
        method:"POST",
      })

      .then((response) =>{
        if(response.status >= 200 && response.status <= 300){
          return response.json();
        } else{
          return Promise.reject(new Error(`Gagal untuk membatalkan arsip Catatan ini`));
        }
      })
    }
    

  }

  export default notesAPI;
   



/*let notesData = [];

async function createNoteApi(title, body) {
  try {
    const response = await fetch(`https://notes-api.dicoding.dev/v2/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, body }),
    });

    const data = await response.json();
    if (response.ok) {
      console.log("Note created successfully: ", data);
      return data.data;
    } else {
      console.error("failed to create note:", data);
      return null;
    }
  } catch (error) {
    console.error("Error creating note: ", data);
    return null;
  }
}

//membuat event listener untuk tombol "Create Note"
const createButton = document.getElementById("create-button");
createButton.addEventListener('click', async function () {
  const title = prompt("Enter note title:");
  const body = prompt("Enter note body:");

  if (title !== null && body !== null) {
    const newNote = await createNoteApi(title, body);

    if (newNote) {
      notesData.pus(newNote);
      displayNotes(notesData);
    }
  }
});

//fungsi untuk mendapatkan catatan dari API

async function fetchNotes() {
  try {
    //menampilkan indikator loading sebelum memulai permintaan
    showLoadingIndicator();

    const response = await fetch("https://notes-api.dicoding.dev/v2/notes");
    const data = await response.json();
    notesData = data.data;
    renderNoteList();

    //Menyembunyikan Indikator loading setelah permintaan selesai
    hideLoadingIndicator();
  } catch (error) {
    console.error("Error fetching notes:", error);
    hideLoadingIndicator();
  }
}

async function getNotesAPI() {
  try {
    const response = await fetch(`https://notes-api.dicoding.dev/v2/notes`, {
      method: "GET",
    });

    const data = await response.json();
    if (response.ok) {
      console.log("Notes retrieved successfully:", data);
      return data.data;
    } else {
      console.error("Failed to reterieved notes :", data);
      return [];
    }
  } catch (error) {
    console.error("Error retrieving notes :", error);
    return [];
  }
}

async function archiveNoteAPI(noteID) {
  try {
    const response = await fetch(
      `https://notes-api.dicoding.dev/v2/notes/${noteID}/archive`,
      {
        method: "POST",
      }
    );

    const data = await response.json();
    if (response.ok) {
      console.log("Notes retrieved successfully:", data);
      return true;
    } else {
      console.error("Failed to reterieved notes :", data);
      return false;
    }
  } catch (error) {
    console.error("Error retrieving notes :", error);
    return false;
  }
}

//Mendapatkan elemen tombol "Archive Note" berdasarkan class atu id
const archiveButton = document.getElementById("archive-button");

//Mendapatkan event listener untuk tombol "Archive note"
archiveButton.addEventListener("click", async function () {
  //Mendapatkan ID catatan yang diarsipkan dari atribut data di elemen catatan
  const noteID = this.closest(".note").dataset.id;

  //meminta konfirmasi dari pengguna sebelum melakukan arsip catatan
  const archiveConfirmed = confirm(
    "Apakah Anda yakin untuk mengarsip catatan ini?"
  );

  //Jika pengguna mengonfirmasi untuk mengarsipkan catatan
  if (archiveConfirmed) {
    //Memanggil fungsi archiveNoteAPI untuk mengarsipkan catatan dengan ID yang sesuai
    const isArchived = await archiveNoteAPI(noteID);

    // jika catatan berhasil diarsipkan, hapus elemen catatan dari tampilan
    if (isArchived) {
      this.closest(".note").remove();
    }
  }
});

async function unArchiveNoteAPI(noteID) {
  try {
    const response = await fetch(
      `https://notes-api.dicoding.dev/v2/notes/${noteID}/unarchive`,
      {
        method: "POST",
      }
    );

    const data = await response.json();
    if (response.ok) {
      console.log("Notes unarchived successfully:", data);
      return true;
    } else {
      console.error("Failed to unarchived notes :", data);
      return false;
    }
  } catch (error) {
    console.error("Error unarchiving notes :", error);
    return false;
  }
}

// Mendapatkan elemen tombo "Unarchived Note" berdasarkan class atau id
const unarchiveButton = document.getElementById("unarchive-button"); // Gantikan 'unarchive-button' dengan id tombol yang sesuai

// Menambahkan event listener untuk tombol "Unarchve Note"
unarchiveButton.addEventListener("click", async function () {
  // //Mendapatkan ID catatan yang di-unarchive dari atribut data di elemen catatan
  const noteID = this.closest(".note").dataset.id;

  //meminta konfirmasi dari pengguna sebelum melakukan arsip catatan
  const archiveConfirmed = confirm(
    "Apakah Anda yakin untuk membatalkan pengarsipan catatan ini?"
  );

  //Jika pengguna mengonfirmasi untuk mengunarchive-kan catatan
  if (UnarchiveConfirmed) {
    //Memanggil fungsi archiveNoteAPI untuk mengarsipkan catatan dengan ID yang sesuai
    const isUnArchived = await archiveNoteAPI(noteID);

    // jika catatan berhasil diarsipkan, hapus elemen catatan dari tampilan
    if (isUnArchived) {
      this.closest(".note").remove();
    }
  }
});

function renderNotes(notes) {
  const noteList = document.getElementById("note-list");
  noteList.innerHTML = "";

  notes.forEach((note) => {
    const listNoteElement = document.createElement("div");
    listNoteElement.classList.add("note");
    listNoteElement.dataset.id = note.id;

    const titleElement = document.createElement("h2");
    titleElement.textContent = note.title;

    const bodyElement = document.createElement("p");
    bodyElement.textContent = note.body;

    listNoteElement.appendChild(titleElement);
    listNoteElement.appendChild(bodyElement);
    listNoteElement.appendChild(deleteButton.cloneNode(true));

    noteList.appendChild(listNoteElement);
  });
}

// Panggil fungsi renderNotes dengan data catatan yang telah Anda dapatkan
renderNotes(notesData);

async function deleteNoteAPI(noteID) {
  try {
    const response = await fetch(
      "https://notes-api.dicoding.dev/v2/notes/${noteId}",
      {
        method: "DELETE",
      }
    );

    const data = await response.json();
    if (response.ok) {
      console.log("Catatan berhasil dihapus:", data);
      return true;
    } else {
      console.error("Catatan gagal dihapus :", data);
      return false;
    }
  } catch (error) {
    console.error("Terjadi Kesalahan saat menghapus catatan :", error);
    return false;
  }
}

// Mengubah event listener untuk tombol hapus
const deleteButton = document.createElement("Button");
deleteButton.textContent = "Delete";
deleteButton.addEventListener("click", async function () {
  const listNoteElement = this.closest(".note");
  if (listNoteElement) {
    const noteID = listNoteElement.dataset.id;
    const deleteNote = confirm(
      "Apakah Anda Yakin ingin menghapus catatan ini?"
    );
    if (deleteNote) {
      const deleteResponse = await deleteNoteAPI(noteID);
      if (deleteResponse) {
        listNoteElement.remove();
      }
    }
  }
});

export default apps;

/*function apps() {
  const baseUrl = " https://notes-api.dicoding.dev/v2";

  const getNotes = () => {
    //membuat instance dari XMLhttpRequest

    fetch(`${basUrl}/notes`);

    const xhr = new XMLHttpRequest();

    //menetapkan callback jika response berhasil dan error

    xhr.onload = function () {
      const responseJSON = JSON.parse(this.responseText);

      if (responseJSON.error) {
        showResponseMessanger(responseJSON.message);
      } else {
        renderAllNotes(responseJSON.books);
      }
    };

    //membuat GET request dan menetapkan target URL
    xhr.open("GET", `${baseUrl}/list`);

    // mengirimkan request

    xhr.send();
  };

  const insertNotes = (note) => {
    //membuat instance dari XMLhttpRequest
    const xhr = new XMLHttpRequest();

    //menetapkan callback jika response berhasil dan error

    xhr.onload = function () {
      const responseJSON = JSON.parse(this.responseText);
      showResponseMessanger(responseJSON.message);

      getNotes();
    };

    xhr.onerror = function () {
      showResponseMessanger();
    };

    //membuat POST request dan menetapkan target URL
    xhr.open("POST", `${baseUrl}/add`);

    //Mementapkan property Content-Type dan X-Auth-Token pada header Request
    xhr.setRequestHeader('Content-Type','application/json');
    xhr.setRequestHeader('X-Auth-Token','12345');

    //Mengirimkan request dan menyisipkan JSON.stringify(books) pada body
    xhr.send(JSON.stringify(note));
  };

  const updateNotes = (note) => {
    //membuat instance dari XMLhttpRequest
    const xhr = new XMLHttpRequest();

    //menetapkan callback jika response berhasil dan error

    xhr.onload = function () {
      const responseJSON = JSON.parse(this.responseText);
      showResponseMessanger(responseJSON.message);

      getNotes();
    };

    xhr.onerror = function () {
      showResponseMessanger();
    };

    //membuat PUT request dan menetapkan target URL
    xhr.open("PUT", `${baseUrl}/edit/${note.id}`);

    //Mementapkan property Content-Type dan X-Auth-Token pada header Request
     xhr.setRequestHeader('Content-Type','application/json');
    xhr.setRequestHeader('X-Auth-Token','12345');

    //Mengirimkan request dan menyisipkan JSON.stringify(books) pada body
    xhr.send(JSON.stringify(note));
  };

  const removeNotes = (noteID) => {
    //membuat instance dari XMLhttpRequest
    const xhr = new XMLHttpRequest();

    //menetapkan callback jika response berhasil dan error

    xhr.onload = function () {
      const responseJSON = JSON.parse(this.responseText);
      showResponseMessanger(responseJSON.message);

      getNotes();
    };

    xhr.onerror = function () {
      showResponseMessanger();
    };

    //membuat DELETE request dan menetapkan target URL
    xhr.open("DELETE", `${baseUrl}/delete/${noteID}`);

    //Mementapkan property Content-Type dan X-Auth-Token pada header Request
    xhr.setRequestHeader("X-Auth-Token", "12345");

    // mengirimkan request

    xhr.send();
  };

  const renderAllNotes = (notes) => {
    const listNoteElement = document.querySelector('#noteList');
    listNoteElement.innerHTML = ' ';

    notes.forEach((note) => {
      listNoteElement.innerHTML += `

        <article class =note-data>
      <h2 class = title-card>(${note.id}) ${note.title}</h2>
      <p class = body-card>${note.body}</p>
      <p class = body-card>${note.createdAt}</p>
      <button type ="button" class ="btn-del" id ="${note.id}"><i class="fa-solid fa-trash"></i>
    </article>
        `;
    });

    const deleteButtonElements = document.querySelectorAll(".btn-del");
    deleteButtonElements.forEach((button) => {
      button.addEventListener("click", (event) => {
        const noteID = event.target.dataset.id;

        removeNotes(noteID);
      });
    });
  };

  const showResponseMessanger = (
    message = "check your internet connection"
  ) => {
    alert(message);
  };

  document.addEventListener("DOMContentLoaded", () => {
    const noteForm = document.querySelector("form");

    const inputNoteTitle = noteForm.elements.inputNoteTitle;
    const inputNoteBody = noteForm.elements.inputNoteBody;

    noteForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const note = {
        title: inputNoteTitle.value,
        body: inputNoteBody.value,
      };
      insertNotes(note);

      switch (event.submitter.textContent){
        case 'Tambah Catatan':
            insertNotes(note);
            break;
      }
    });
    getNotes();
  });
}

export default apps;*/
