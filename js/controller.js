import * as model from "./model.js";
import headerView from "./view/headerView.js";
import wordView from "./view/wordView.js";

const select = document.querySelector("#font-options");
const options = document.querySelectorAll("option");

const addDarkChances = function () {
  document.body.classList.toggle("dark-mode");
  document.querySelector(".icon-dark-theme").classList.toggle("hidden");
  document.querySelector(".icon-light-theme").classList.toggle("hidden");
};

document
  .querySelector(".switch__container")
  .addEventListener("change", addDarkChances);

select.addEventListener("change", function () {
  options.forEach((option) => document.body.classList.remove(option.value));

  document.body.classList.add(select.value);
});

const controlLoadWord = async function () {
  try {
    wordView.renderSpinner();
    // headerView.addDarkThemeHandler();

    const input = document.querySelector("#word-input");
    await model.loadWord(input.value);
    input.value = "";

    console.log(model.state.search);
    wordView.render(model.state.search);
    wordView.addHandlerPlayButton();
  } catch (err) {
    wordView.errorMessage();
  }
};

const init = function () {
  wordView.addHandlerSearchWord(controlLoadWord);
  headerView.addDarkThemeHandler();
};

init();

if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
) {
  addDarkChances();
}

// palavra strange tem um noun estranho
