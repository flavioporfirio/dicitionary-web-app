import icons from "url:../../imgs/icons.svg";

class WordView {
  _parentElement = document.querySelector(".search-result-container");
  _errorMessage = "We could not find that word, Please try another one!";
  _data;

  constructor() {}

  render(data) {
    this._data = data;
    const markup = this._generateMarkup();

    this._clean();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  addHandlerSearchWord(handler) {
    document
      .querySelector(".input-container")
      .addEventListener("submit", function (e) {
        e.preventDefault();
        handler();
      });
  }

  addHandlerPlayButton() {
    if (!this._data.audioUrl) return;

    document.querySelector(".btn-play").addEventListener("click", function () {
      const audio = document.querySelector("audio");

      audio.play();
    });
  }

  _clean() {
    this._parentElement.innerHTML = "";
  }

  errorMessage(message = this._errorMessage) {
    const markup = `
      <div class="error-message">
      <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm0 319.91a20 20 0 1120-20 20 20 0 01-20 20zm21.72-201.15l-5.74 122a16 16 0 01-32 0l-5.74-121.94v-.05a21.74 21.74 0 1143.44 0z"/></svg>
        <p>${message}</p>
      </div>

    `;
    this._clean();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
    `;
    this._clean();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _generateMarkup() {
    return `
        <div class="searched-word">
          <div class="word">
            <h1>${this._data.word}</h1>
            ${
              this._data.phonetic
                ? `<p><span>${this._data.phonetic}</span></p>`
                : ""
            }

          </div>
          ${
            this._data.audioUrl
              ? `
          <button class="btn-play">
            <audio>
              <source
              src=${this._data.audioUrl}
              type="audio/mpeg"
            />
            Your browser does not support the audio element.
            </audio>
            <svg>
              <use href="${icons}#icon-play"></use>
            </svg>
          </div>
          </button>
          `
              : ""
          }
        </div>
        ${this._generateNounMarkup()}
        ${this._generateVerbMarkup()}
        <div class="source-line">
          <hr />
        </div>
        <div class="source">
          <p>Source</p>
          <a target="_blank" href="${this._data.sourceUrl}"
            >${this._data.sourceUrl}</a
          >
        </div>
    `;
  }

  _generateNounMarkup() {
    return `
      <div class="noun-container">
        <div class="noun-header">
            <p>noun</p>
        </div>
        <div class="noun-meanings-container">
            <p><span>Meaning</span></p>
          <ul>
              ${this._data.meaningNoun.definitions
                .map((el) => {
                  return `
                  <li>
                    <p>
                     ${el.definition}
                    </p>
                  </li>
                `;
                })
                .join("")}
          </ul>
          ${
            this._data.synonyms.length !== 0
              ? ` <div class="synonyms">
            <p>Synonyms</p>
            <p><span>"${this._data.synonyms.join(" / ")}"</span></p>
          </div>`
              : ""
          }

        </div>
      </div>
    `;
  }

  _generateVerbMarkup() {
    const markup = this._data.meaningVerb
      ? `
      <div class="verb-container">
        <div class="verb-header">
          <p>verb</p>
        </div>
        <div class="verb-meanings-container">
          <p><span>Meaning</span></p>
          <ul>
              ${this._data.meaningVerb
                .map((el) => {
                  return `
                  <li>
                    <p>
                     ${el.definition}
                    </p>
                  </li>
                `;
                })
                .join("")}
          </ul>

          ${
            this._data.meaningVerb[0]?.example
              ? `
              <div class="example">
                <p>
                  <span>${this._data.meaningVerb[0].example}</span>
                </p>
              </div>`
              : ""
          }
        </div>
      </div>
      `
      : "";
    return markup;
  }
}

export default new WordView();
