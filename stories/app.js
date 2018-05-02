const upload = document.getElementById("upload");
const preview = document.getElementById("preview");
const close = document.getElementById("close");
const type = document.getElementById("type");
const textInput = document.getElementById("text-input");
const showTypeBtn = document.getElementById("show-type-btn");
const saveTypeBtn = document.getElementById("hide-type-btn");
const printedTextEl = document.getElementById("printed-text");

const region = new ZingTouch.Region(printedTextEl);

const myRotateGesture = new ZingTouch.Rotate({
  minInputs: 2
});

const myPanGesture = new ZingTouch.Pan();

let img;

let printedText = "";

let currentAngle = 0;

let currentDistance = 0;
let currentDirection = 0;

function handleFiles(files) {
  for (var i = 0; i < files.length; i++) {
    let file = files[i];
    console.log(file);

    if (!file.type.startsWith("image/")) { continue }

    img = document.createElement("img");
    img.file = file;
    img.classList.add("img__thumb");
    preview.appendChild(img);
    preview.removeAttribute("hidden");

    let reader = new FileReader();
    reader.onload = (function(aImg) { return function(e) {
      aImg.src = e.target.result;
    }})(img);
    reader.readAsDataURL(file);
  }
}

upload.addEventListener("change", (e) => {
  let files = e.target.files;
  handleFiles(files);
});

close.addEventListener("click", (e) => {
  preview.setAttribute("hidden", "");
  printedTextEl.innerHTML = "";
})

showTypeBtn.addEventListener("click", (e) => {
  preview.classList.add("preview--typing");
})

saveTypeBtn.addEventListener("click", (e) => {
  // Show the preview block
  preview.classList.remove("preview--typing");
  if(textInput.value) {
    // Save the input value to the global var
    printedText = textInput.value;
    // Clear the input for next time
    textInput.setAttribute("value", "");
    // Print text into the span
    printedTextEl.innerHTML = printedText;
    printedTextEl.removeAttribute("hidden");
    region.bind(printedTextEl, myRotateGesture, (e) => {
      currentAngle += e.detail.distanceFromLast;
      printedTextEl.style.transform = "rotate(" + currentAngle + "deg)";
    })
    region.bind(printedTextEl, myPanGesture, (e) => {
      let distance = e.detail.data[0].distanceFromOrigin;
      let direction = e.detail.data[0].directionFromOrigin;
      let currentDirection = e.detail.data[0].currentDirection;
      currentDistance += distance;
      // printedTextEl.style.transform = "translateX(" + currentDistance + "px)";
      console.log("currentDirection :" + currentDirection);
    })
  }
})

textInput.addEventListener("keyup", (e) => {
  const val = e.target.value;
  if(val.length) {
    saveTypeBtn.removeAttribute("hidden");
  }
})
