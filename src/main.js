//  import noteComponent from "../src/component/list-item.js";
// import "../src/script/component-web/my-footer.js";
// import "../src/script/component-web/input-form.js"
// import "../src/script/component-web/form-title.js";
// import "../src/script/component-web/logo-bar.js";


import "./script/component-web/index.js";

import "./script/view/home.js";

import './styles/responsive.css';
import './styles/loader.css';

import './styles/style.css';
//import 'regenerator-runtime';

document.addEventListener('DOMContentLoaded', () =>{
  customElements.define("note-list",noteComponent);

});

window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");
  


  loader.classList.add("loader-hidden");

  loader.addEventListener("transitioned", () => {
      document.body.removeChild("loader");
  })
})
//apps();


//document.querySelector('.btn').className = 'fa fa-star';

//document.addEventListener('DOMContentLoaded', () =>{
//  customElements.define("my-footer",myFooter);

//});









//import "./script/view/note-list.js";
//import notesData from "./script/data/local/notesData.js";

/*document.addEventListener('DOMContentLoaded', () => {
    notesData();
})*/
/*(() => {
    const noteList = document.getElementById("noteList");

    //notesData.map((note) => {
    const tempelateNoteitem = (note) => `
    <article class =note-data id="${note.id}">
      <h2 class = title-card>${note.title}</h2>
      <p class = body-card>${note.body}</p>
      <p class = create-card >${note.createdAt}</p>
    </article>
  `;


    noteList.innerHTML = '';
    notesData.forEach((note) => {
        noteList.innerHTML += tempelateNoteitem(note);
    });

})();*/

//const noteListElement = document.createElement("note-list");
//noteListElement.notesData = notesData;
//document.body.appendChild(noteListElement);

/*const noteListElement = document.querySelector('note-list');
noteListElement.setnoteList(notesData);*/

