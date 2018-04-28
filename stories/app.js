const upload = document.getElementById("upload");
const preview = document.getElementById("preview");
const close = document.getElementById("close");
const type = document.getElementById("type");

let img;

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
}) ;

close.addEventListener("click", (e) => {
  preview.setAttribute("hidden", "");
  img.setAttribute("src", "");
})
