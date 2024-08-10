class formTitle extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode: 'open'});

    this.shadowRoot.innerHTML =`


    <style>
    .form-title{
   padding: 100px;
   text-align: center;
   color: #fff;
  
   
  }

  </style>

    <h1 class="form-title">Buat Catatan Baru</h1>
    
    `;
  }
}

customElements.define("form-title",formTitle);  