let arr=[]

function generateArray() {
  arr = [];
  for (let i = 0; i < 20; i++) {
    arr.push(Math.floor(Math.random() * 200) + 10);
  }
  renderBars(arr);
}


function renderBars(a, highlight = []) {
  let container = document.getElementById("bars");
  container.innerHTML = "";

  a.forEach((val, i) => {
    let bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = `${val}px`;

    if (highlight.includes(i)) {
      bar.classList.add("highlight");
    }

    container.appendChild(bar);
  });
}


generateArray();


//sort

async function startSort(type) {
const res = await fetch("http://localhost:5000/algo/sort/" + type, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ arr })
});

      const data = await res.json();
  animateSteps(data.steps);
}

async function animateSteps(steps) {
  for (let s of steps) {
    renderBars(s.arr, s.highlight);
    await new Promise(r => setTimeout(r, 150));
  }
}