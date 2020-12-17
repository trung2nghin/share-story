const style = `
.login-container {
    width: 100vw;
    height: 100vh;
    background: url("https://images.alphacoders.com/437/thumb-1920-437881.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    justify-content: flex-end
}
#login-form {
    width: 30vw;
    height: 100vh;
    background: #fff;
    padding: 20px
  }
h1{
    text-align: center;
    // color: #808080;
    font-family: 'Nunito', sans-serif
  }
button {
  background: #033d99;
  color: white;
  padding: 10px 15px;
  border-radius: 5px;
  }
}
`;

import { redirect } from "../index.js";
import { getDataFromDocs, saveToLocalStorage } from "../utils.js";

class loginScreen extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this._shadowRoot.innerHTML = `
        <style>
          ${style}
        </style>
        <div class = "login-container">
            <form id = "login-form">
              <h1>CI Project</h1>
              <input-wrapper id = "email" type = "text" placeholder = "Email"></input-wrapper>
              <input-wrapper id = "password" type = "password" placeholder = "Password"></input-wrapper>
              <button>login</button>
              <a id = "redirect">Don't have an account? login</a>
            </form>
        </div>
        `;
    const loginForm = this._shadowRoot.getElementById("login-form");
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = this._shadowRoot.getElementById("email").value;
      const password = this._shadowRoot.getElementById("password").value;
      let isValid = true;
      // const myPassword = "myPassword";
      // const encrypted = CryptoJS.AES.encrypt(pass, myPassword);
      if (email.trim() === "") {
        this.setError("email", "Please input email");
        isValid = false;
      }
      if (password.trim() === "") {
        this.setError("password", "Please input password");
        isValid = false;
      }
      if (!isValid) {
        return;
      }

      const user = await firebase
        .firestore()
        .collection("users")
        .where("email", "==", email)
        .where("password", "==", CryptoJS.MD5(password).toString())
        .get();
      if (user.empty) {
        alert("Sai email /password");
      } else {
        saveToLocalStorage("currentUser", getDataFromDocs(user)[0]);
        redirect("story");
        // console.log(getDataFromDocs(user)[0])
      }
    });
    this._shadowRoot
      .getElementById("redirect")
      .addEventListener("click", () => {
        redirect("register");
      });
  }

  setError(id, message) {
    this._shadowRoot.getElementById(id).setAttribute("error", message);
  }
  async checkEmailExist(email) {
    const res = await firebase
      .firestore()
      .collection("users")
      .where("email", "==", email)
      .get();
    return !res.empty;
  }
}
window.customElements.define("login-screen", loginScreen);
