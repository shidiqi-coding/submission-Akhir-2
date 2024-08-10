import notesAPI from "../../styles/apps.js";
import {showNote, showNoteArchived} from '../view/home.js';

class NoteItems extends HTMLElement {
  _shadowRoot = null;
  _style = null;
  _note = {
    id: null,
    title: null,
    body: null,
    createAt: null,
    archived : null,
  };

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");

    this.render();
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = "";
  }

  set note(value) {
    this._note = value;
    this.render();
  }

  get note() {
    return this._note;
  }

  _updateStyle() {
      this._style.textContent = `
        note-data {
        border: 1px solid #fff;
    border-radius: 8px;
    padding: 0 16px;
    grid-template-columns: 1fr 1fr 1fr 1fr;

    margin: 10px;   
    display:grid; 

      gap: 50px 100px;
   
 
        }

        .btn-del {
    padding: 10px;
     width: 45%;
       border-radius: 40px;
       display: flex;
    margin-top: 20px;
    background-color:  rgb(199, 19, 19);
    color:#fff;

        }
    
         .btn-del:hover{
     background-color: rgb(214, 36, 36);
    }


   
 
        }

        .title-card,.body-card,.create-card{
    color: #fff;
    }

    button {
    display : flex;
      }

    .btn-del {
    padding: 10px;
     width: 45%;
       border-radius: 40px;
       display: flex;
    margin-top: 20px;
    background-color:  rgb(199, 19, 19);
    color:#fff;

    
    }

    .archive-btn{
    padding: 10px;
     width: 100%;
       border-radius: 40px;
       display: block;
    margin-top: 20px;
    color:#000;
    }

    .btn-del:hover{
     background-color: rgb(214, 36, 36);
    }
  



    
        `;
  }

  _addUnarchivedButton(){
    const unarchivedButton = document.createElement("button");
    unarchivedButton.classList.add("Unarchive-btn");
    unarchivedButton.textContent = "Batalkan arsip catatan ini";
    unarchivedButton.addEventListener("click", () => this._UnarchivedButtonClicked(),);
    this._shadowRoot
    .querySelector(".info-archived")
    .appendChild(unarchivedButton);
  }
  _UnarchivedButtonClicked(){
    const confirmation = confirm("Apakah Anda yakin untuk membatalkan arsip catatan ini?",);
    if(confirmation){
      notesAPI.unArchiveNotes(this._note.id)
      .then(() => {
        this.remove();
        showNoteArchived();
        showNote();
      })

      .catch((error) => {
        console.log("Terjadi Kesalahan saat mengarsipkan Catatan:", error);
        alert("Gagal untuk mengarsip catatan. Harap coba lagi.");
      });
    }
  }

  render(){
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
     <article class =note-data>
      <h2 class = title-card>${this._note.title}</h2>
      <p class = body-card>${this._note.body}</p>
      <p class = create-card >${this._note.createdAt}</p>  
    </article>  

     
       
    `;

    this._addUnarchivedButton();
  }
}
customElements.define("note-item",NoteItems);