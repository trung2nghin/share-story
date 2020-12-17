import "../utils.js";

const style = `
.register-container {
    width: 100vw;
    height: 100vh;
    background: url("https://images.alphacoders.com/437/thumb-1920-437881.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    justify-content: flex-end
}
#register-form {
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

class RegisterScreen extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this._shadowRoot.innerHTML = `
        <style>
          ${style}
        </style>
        <div class = "register-container">
            <form id = "register-form">
              <h1>CI Project</h1>
              <input-wrapper id = "first-name" type = "text" placeholder = "First name"></input-wrapper>
              <input-wrapper id = "last-name" type = "text" placeholder = "Last name"></input-wrapper>
              <input-wrapper id = "email" type = "text" placeholder = "Email"></input-wrapper>
              <input-wrapper id = "password" type = "password" placeholder = "Password"></input-wrapper>
              <input-wrapper id = "confirm-password" type = "password" placeholder = "Confirm password"></input-wrapper>
              <button>Register</button>
              <a id = "redirect">Already have an account? login</a>
            </form>
        </div>
        `;
    const registerForm = this._shadowRoot.getElementById("register-form");
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const firstname = this._shadowRoot.getElementById("first-name").value;
      const lastname = this._shadowRoot.getElementById("last-name").value;
      const email = this._shadowRoot.getElementById("email").value;
      const password = this._shadowRoot.getElementById("password").value;
      const confirmpassword = this._shadowRoot.getElementById(
        "confirm-password"
      ).value;
      let isValid = true;
      // const myPassword = "myPassword";
      // const encrypted = CryptoJS.AES.encrypt(pass, myPassword);
      if (firstname.trim() === "") {
        this.setError("first-name", "Please input first name");
        isValid = false;
      } else {
      }
      if (lastname.trim() === "") {
        this.setError("last-name", "Please input last name");
        isValid = false;
      }
      if (email.trim() === "") {
        this.setError("email", "Please input email");
        isValid = false;
      }
      if (password.trim() === "") {
        this.setError("password", "Please input password");
        isValid = false;
      }
      if (confirmpassword.trim() === "") {
        this.setError("confirm-password", "Please input confirm-password");
        isValid = false;
      }
      if (password != confirmpassword) {
        this.setError("confirm-password", "Password didn't match");
        isValid = false;
      }
      if (!isValid) {
        return;
      }

      const user = {
        fullname: `${firstname} ${lastname}`,
        email: email,
        password: CryptoJS.MD5(password).toString(),
      };
      //Nếu email đã tồn tại trả ra true
      const check = await this.checkEmailExist(email);
      if (check) {
        alert("Email đã được đăng ký");
      } else {
        firebase.firestore().collection("users").add(user);
        alert("Đăng ký thành công");
        redirect(login);
      }
      // add document
      // function addDocument() {
      //   const data = {
      //     name: `${firstname} ${lastname}`,
      //     email: `${email}`,
      //     password: `${encrypted}`
      //   };
      //   firebase.firestore().collection("users").add(data);
      // }
      // addDocument();
    });
    this._shadowRoot
      .getElementById("redirect")
      .addEventListener("click", () => {
        redirect("login");
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
window.customElements.define("register-screen", RegisterScreen);
