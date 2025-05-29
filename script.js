let botButtons = document.querySelector(".bot-buttons");
let inputBox = document.getElementById("arguments");
let botButtonsChildren = Array.from(botButtons.children);

const input = (key) => {
  inputBox.value += key.target.textContent;
};

const del = () => {
  // inputBox.value = inputBox.value.slice(0, -1);
  const tokens = ["Ans", "sin", "cos", "tan", "log", "√"];
  let { value, selectionStart, selectionEnd } = inputBox;

  // Only support deletion when there's no selection
  if (selectionStart === selectionEnd) {
    const before = value.slice(0, selectionStart);
    const after = value.slice(selectionEnd);

    // Check if a known token ends right before the caret
    let matched = tokens.find((token) => before.endsWith(token));

    if (matched) {
      // Remove the whole token
      const newBefore = before.slice(0, -matched.length);
      inputBox.value = newBefore + after;
      inputBox.setSelectionRange(newBefore.length, newBefore.length);
    } else {
      // Delete a single character
      const newBefore = before.slice(0, -1);
      inputBox.value = newBefore + after;
      inputBox.setSelectionRange(newBefore.length, newBefore.length);
    }
  } else {
    // If some text is selected, delete selection
    const newBefore = value.slice(0, selectionStart);
    const newAfter = value.slice(selectionEnd);
    inputBox.value = newBefore + newAfter;
    inputBox.setSelectionRange(newBefore.length, newBefore.length);
  }
};

const clear = () => {
  inputBox.value = "";
};

botButtonsChildren.forEach((element) => {
  const text = element.textContent;
  switch (text) {
    case "DEL":
      element.addEventListener("click", del);
      break;
    case "AC":
      element.addEventListener("click", clear);
      break;
    default:
      element.addEventListener("click", input);
      break;
  }
});

console.log(botButtons, inputBox, botButtonsChildren);

