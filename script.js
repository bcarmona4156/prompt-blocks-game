const blocks = document.querySelectorAll(".block");
const dropZone = document.getElementById("dropZone");

blocks.forEach(block => {
  block.addEventListener("dragstart", dragStart);
});

dropZone.addEventListener("dragover", dragOver);
dropZone.addEventListener("drop", drop);

function dragStart(e) {
  e.dataTransfer.setData("text", e.target.innerText);
}

function dragOver(e) {
  e.preventDefault();
}

function drop(e) {
  e.preventDefault();
  const text = e.dataTransfer.getData("text");

  const newBlock = document.createElement("div");
  newBlock.className = "block";
  newBlock.innerText = text;

  dropZone.appendChild(newBlock);
}

function checkPrompt() {
  const builtPrompt = dropZone.innerText;

  const required = [
    "You are a college biology instructor",
    "Generate 3 multiple-choice questions",
    "For first-year undergraduates",
    "Include answer key",
    "Format as a table"
  ];

  let score = 0;

  required.forEach(item => {
    if (builtPrompt.includes(item)) {
      score++;
    }
  });

  const feedback = document.getElementById("feedback");

  if (score === required.length) {
    feedback.innerText = "✅ Excellent prompt structure!";
  } else {
    feedback.innerText = `⚠️ You're missing ${required.length - score} key component(s).`;
  }
}

function resetPrompt() {
  dropZone.innerHTML = "<p>Drag blocks here to build your prompt</p>";
  document.getElementById("feedback").innerText = "";
  updateStrengthMeter();
}
