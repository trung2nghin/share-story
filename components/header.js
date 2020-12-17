const style = `
    * {
        margin: 0;
        padding: 0;
    }
    .container {
        background-color: #1976D2;
        display: flex;
        height: 64px;
        justify-content: space-between;
        align-items: center;
        padding: 0px 10%;
        font-family: 'Roboto Mono', monospace;
    }
    .logo, .user-info{
        display: flex;
        align-items: center;
        cursor: pointer;
    }
    .branch {
        font-size: 1.8rem;
        color: #fff;
        margin-left: 20px;
        font-weight: 500;
        cursor: pointer;
    }
    .user-info {
        font-size: 1.8rem;
        color: #fff;
    }
    .btn {
        background-color: transparent;
        border: none;
        margin-left: 20px;
        cursor: pointer;    
        font-size: 1.8rem;
        outline: none;
        color: white;
    }
`;
import { removeItemFromLocalStorage } from "../utils.js";
import { redirect } from "../index.js";

class HeaderScreen extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this._shadowRoot.innerHTML = `
        <head>
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@200&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        </head>
          <style>
            ${style}
          </style>
        <div class="container">
            <div class="logo">
              <img src="./img/text-button.png" width="40px" height="40px" alt="" >
              <div class="branch">Share story</div>
            </div>

        <div class="user-info">
            <div class="avatar"><i class="fa fa-user-o" aria-hidden="true"></i></div>
            <button id="logout-btn" class = "btn"><i class="fa fa-sign-out" aria-hidden="true"></i></button>
        </div>
        `;
    this._shadowDOM
      .getElementById("logout-btn")
      .addEventListener("click", () => {
        // xoa currentUser trong localstorage
        removeItemFromLocalStorage("currentUser");
        redirect("login");
      });
  }
}
window.customElements.define("story-header", HeaderScreen);
