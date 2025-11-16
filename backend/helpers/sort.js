function bubbleSortSteps(arr) {
  let steps = [];
  let a = [...arr];

  for (let i = 0; i < a.length - 1; i++) {
    for (let j = 0; j < a.length - i - 1; j++) {
      steps.push({ arr: [...a], highlight: [j, j + 1] });

      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        steps.push({ arr: [...a], highlight: [j, j + 1] });
      }
    }
  }
  return steps;
}

function selectionSortSteps(arr) {
  let steps = [];
  let a = [...arr];

  for (let i = 0; i < a.length; i++) {
    let minIdx = i;

    for (let j = i + 1; j < a.length; j++) {
      steps.push({ arr: [...a], highlight: [minIdx, j] });

      if (a[j] < a[minIdx]) {
        minIdx = j;
      }
    }

    [a[i], a[minIdx]] = [a[minIdx], a[i]];
    steps.push({ arr: [...a], highlight: [i, minIdx] });
  }

  return steps;
}

module.exports = { bubbleSortSteps, selectionSortSteps };
