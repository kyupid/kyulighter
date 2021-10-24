document.addEventListener("mouseup", (event) => {
  if (window.getSelection().toString().length) {
    let exactText = window.getSelection().toString();
    console.log(exactText);
  }
});

document.addEventListener("selectionchange", (e) => {
  console.log("Archor node - ", window.getSelection().anchorNode);
  console.log("Focus Node - ", window.getSelection().toString());
});
