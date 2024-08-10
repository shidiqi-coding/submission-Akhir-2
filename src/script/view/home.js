import notesAPI from "../../styles/apps.js";
import Utils from "../../script/utils.js";

const noteContainListElements = document.querySelector("#containList");
const noteSearchingElement =
  noteContainListElements.querySelector('.searching');
const noteLoadingElement =
  noteContainListElements.querySelector('.search-loading');
const noteListElements = noteContainListElements.querySelector("note-list");

const noteArchivedListContainerElement = document.querySelector("#ArchiveList");
const notearchivedListElement =
  noteArchivedListContainerElement.querySelector("#archived-list",);

//handler buat tambah notes

const AddNoteHandler = (event) => {
  const { title, body } = event.detail;

  const newNote = {
    title,
    body,
  };

  notesAPI
    .createNote(newNote.title, newNote.body)
    .then((createdNote) => {
      console.log("Catatan telah berhasil dibuat:", createdNote);
      showNote();
      showNoteArchived();
    })
    .catch((error) => {
      console.error("Kesalahan saat membuat catatan:", error);
    });
};

document.querySelector("input-form").addEventListener("btn", AddNoteHandler);

//menampilkan data notes

export const showNote = (query) => {
  showLoading();
  notesAPI
    .getNotes(query)
    .then((results) => {
      displayResults(results);
      showNote();
    })
    .catch((error) => {
      console.error("Kesalahan saat mengambil catatan:", error);
    });
};

export const showNoteArchived = () => {
  showLoading();
  notesAPI
    .getArchived()
    .then((result) => {})
    .catch((error) => {
      console.error(
        "Terjadi kesalahan saat mengambil catatan yang ter-Arsip:",
        error
      );
    });
};

//untuk menangani hapus data note

const onDeleteNoteHandler = (event) => {
  const noteID = event.detail.noteID;
  notesAPI
    .deleteNote(noteID)
    .then(() => {
      const noteItems = document.querySelector(
        `list-item [note-id ="${noteID}]`
      );
      const archivedItem = document.querySelector(
        `archived-items[note-id="${noteID}"]`
      );

      if (noteItems) {
        noteItems.remove();
      }

      if (archivedItem) {
        archivedItem.remove();
      }
    })

    .catch((error) => {
      console.error("terjadi Kesalahan saat menghapus catatan:", error);
      alert("Gagal menghapus catatas, Mohon dicoba lagi.");
    });
};

// untuk unarchive note

const onUnarchiveNoteHandler = (event) => {
  const noteID = event.detail.noteID;
  notesAPI
    .unArchivedNote(noteID)
    .then(() => {
      const archivedItem = document.querySelector(
        `archive-items[note-id ="${noteID}]"`
      );
      if (archivedItem) {
        archivedItem.remove();
        showNoteArchived();
      }
    })
    .catch((error) => {
      console.error("Terjadi kesalahan saat membatakan catatan:", error);
      alert("Gagal untuk membatalkan catatan. Mohon dicoba lagi");
    });
};

const displayResults = (notes) => {
  const ListItemElements = notes.map((note) => {
    const ListItemElements = document.createElement("list-item");
    ListItemElements.note = note;
    ListItemElements.addEventListener("deleteNotes", onDeleteNoteHandler);

    return ListItemElements;
  });

  Utils.emptyElement(noteListElements);
  noteListElements.append(...ListItemElements);
};

const displayNotearchivedResult = (notearchived) => {
  const archivedItemElements = notearchived.map((notearchived) => {
    const archivedItemElement = document.createElement("archived-items");
    archivedItemElement.note = notearchived;
    archivedItemElement.addEventListener(
      "unarchiveNote",
      onUnarchiveNoteHandler
    );

    return archivedItemElements;
  },
 );

 Utils.emptyElement(archivedItemElement);
 archivedItemElement.append(...archivedItemElements);

};


const showNoteList = () => {
  Array.from(noteContainListElements.children).forEach((element) =>{
    Utils.hideElement(element);
  });
  Utils.showElement(noteListElements);
};

const showNotearchivedList = () => {
  Array.from(noteArchivedListContainerElement.children).forEach((element) => {
    Utils.hideElement(element);
  });
  Utils.showElement(notearchivedListElement);
};


const showLoading = () => {
  Array.from(noteContainListElements.children).forEach((element) => {
    Utils.hideElement(element);
  });
  Utils.showElement(noteLoadingElement);
};

const showQueryWaiting = () => {
  Array.from(noteContainListElements.children).forEach((element) =>{
    Utils.hideElement(element);
  });
  Utils.showElement(noteLoadingElement);
}

showQueryWaiting();
showNoteArchived();
showNote();
