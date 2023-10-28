export const state = {
  search: {},
};

export const loadWord = async function (word) {
  try {
    if (!word) {
      throw new Error("Write a word to search");
    }

    const res = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word
        .trim()
        .toLowerCase()}`
    );
    const [data] = await res.json();

    console.log(data);

    state.search = {
      word: data.word,
      phonetic: data.phonetics
        .map((el) => (el.text ?  el.text : 0))
        .filter((el) => typeof el === "string")[0],
      ...(data.meanings[0] && { meaningNoun: data.meanings[0] }),
      ...(data.meanings[1] && { meaningVerb: data.meanings[1].definitions }),
      synonyms: data.meanings[0].synonyms,
      sourceUrl: data.sourceUrls[0],
      audioUrl: data.phonetics
        .map((el) => (el.audio ? el.audio : 0))
        .filter((el) => typeof el === "string")[0],
    };
    if (!res.ok) throw new Error(`Didn't find a word ${res.status}`);
  } catch (err) {
    console.log(err);
    throw err;
  }
};
