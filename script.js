let currentLevel = 1;

const levelRequirements = {
  1: [
    "You are a college biology instructor",
    "Generate 3 multiple-choice questions",
    "For first-year undergraduates",
    "Include answer key",
    "Format as a table"
  ],
  2: [
    "You are an environmental science professor",
    "Explain causes and long-term impacts",
    "For high school seniors",
    "Include real-world examples",
    "Limit to 300 words"
  ]
};

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

  const existingBlocks = dropZone.innerText;

  if (existingBlocks.includes(text)) {
    return; // Stop if duplicate
  }

  const newBlock = document.createElement("div");
  newBlock.className = "block";
  newBlock.innerText = text;
  newBlock.draggable = true;

  newBlock.addEventListener("dragstart", dragStart);

  dropZone.appendChild(newBlock);

  updateStrengthMeter();
}

function checkPrompt() {
  const builtPrompt = dropZone.innerText;

  const required = levelRequirements[currentLevel];

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
    feedback.innerText =
      `⚠️ You're missing ${required.length - score} key component(s).`;
  }
}


function resetPrompt() {
  dropZone.innerHTML = "<p>Drag blocks here to build your prompt</p>";
  document.getElementById("feedback").innerText = "";
  updateStrengthMeter();
}

function updateStrengthMeter() {
  const builtPrompt = dropZone.innerText;

  const required = levelRequirements[currentLevel];

  let score = 0;

  required.forEach(item => {
    if (builtPrompt.includes(item)) {
      score++;
    }
  });

  const percentage = (score / required.length) * 100;

  document.getElementById("strengthMeter").style.width = percentage + "%";
}

  let score = 0;

  required.forEach(item => {
    if (builtPrompt.includes(item)) {
      score++;
    }
  });

  const percentage = (score / required.length) * 100;

  document.getElementById("strengthMeter").style.width = percentage + "%";
}

function nextLevel() {
  currentLevel++;

  if (currentLevel === 2) {
document.getElementById("missionText").innerText =
      "Fix this bad prompt: 'Write about climate change.'";

    dropZone.innerHTML = "<p>Drag blocks here to improve the prompt</p>";

    document.querySelector(".blocks").innerHTML = `
      <div class="block" draggable="true">You are an environmental science professor</div>
      <div class="block" draggable="true">Explain causes and long-term impacts</div>
      <div class="block" draggable="true">For high school seniors</div>
      <div class="block" draggable="true">Include real-world examples</div>
      <div class="block" draggable="true">Limit to 300 words</div>
    `;

    document.querySelectorAll(".block").forEach(block => {
      block.addEventListener("dragstart", dragStart);
    });

    updateStrengthMeter();
  }
}
