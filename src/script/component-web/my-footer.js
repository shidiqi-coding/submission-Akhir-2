class myFooter extends HTMLElement{
  constructor(){
    super();

    this.attachShadow({mode: 'open'});

    this.shadowRoot.innerHTML = `
    <style>
    footer{
     background-image:linear-gradient(rgb(163, 162, 162),rgb(114, 113, 113)); 
    position: sticky;
    color: #fff;
}

.text-footer{
    padding: 10px 19px;
    text-align: center;
    font-weight: 600;
}
 </style>

<footer>
    <div class="content">
      <div class="text-footer"> DolphinNotes &copy; 2024</div>
    </div>
  </footer>
    `;
  }
}

customElements.define('my-footer',myFooter);