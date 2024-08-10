import notesAPI from "../../styles/apps.js";
//import {showNote, showNoteArchived} from '../view/home.js';

class archiveItems extends HTMLElement {
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
        :host{
         display:block;
         border-radius: 8px;
        overflow: hidden;
        box-shadow : 0 0 2px 0;
          

        info-archived{

        
         background-color: rgba(26, 25, 25, 0.425);
  -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px);
    /*border: 1px solid #ffffff;*/
    border-radius: 10px;
    padding:  40px;
    align-items: center;
    
   display: grid;
    flex-basis: 19%;
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
    unarchivedButton.textContent = "Unarchive Note";
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
     <!--<div class ="card-list">
       <div class ="info-archived">
        <div class ="info-archived__title">
         <h2>${this._note.title}</h2>
        </div>
        <div class ="info-archived__desc">
         <p>${this._note.body}</p>
         <p>${this._note.createAt}</p>
         <p>${this._note.archived}</p>
        </div>
       </div>
     </div>-->

     
       
    `;

    this._addUnarchivedButton();
  }
}
customElements.define("archived-items",archiveItems);
