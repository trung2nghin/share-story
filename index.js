import "./screens/register.js";
import "./screens/login.js";
import "./components/inputWrapper.js";
import "./screens/story.js";
import "./components/header.js";
import "./components/createPost.js";
import "./components/postItem.js";
import "./components/listPost.js";
import {convertDate} from "./utils.js"
import { getItemLocalStorage } from "./utils.js";

// redirect("register");
checkAuthen();
async function checkAuthen() {
  const user = getItemLocalStorage("currentUser");
  if (user) {
    const res = await firebase
      .firestore()
      .collection("users")
      .where("email", "==", user.email)
      .where("password", "==", user.password)
      .get();
    if (user.empty) {
      redirect("login");
    } else {
      // saveToLocalStorage("currentUser", getDataFromDocs(user)[0]);
      redirect("story");
    }
  } else {
    redirect("login");
  }
}
export function redirect(screenName) {
  if (screenName == "register") {
    document.getElementById("app").innerHTML = `
  <register-screen></register-screen>
  `;
  } else if (screenName == "login") {
    document.getElementById("app").innerHTML = `
  <login-screen></login-screen>
  `;
  } else if ((screenName = "story")) {
    document.getElementById("app").innerHTML = `
  <story-screen></story-screen>
  `;
  }
}
