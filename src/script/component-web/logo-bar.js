class logoBar extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
    <style>
    .image-logo{
  padding: 10px 20px;
}

.image-logo img{
    width: 250px;
 
}
    </style>


 <div class="image-logo">
      <img src="DolphinNote logo.png" alt=""/>
    </div>

`;
  }
}

customElements.define("logo-bar", logoBar);
