const container = document.querySelector('.container');
const numBars = 30;
const middleColor = [204.4,42.4,27.3]
const lightnessRange = 10;

let barElements;
let barHeights;

function generateBars() {
    while(container.firstChild) {
        container.removeChild(container.firstChild);
    }
    const arrayOfHeights = heightArray(1, 100, numBars);
    for (i=0; i < numBars; i++) {
        // const randomHeight = Math.random()*100;
        const child = document.createElement('div');
        child.classList.add('bar');
        child.style.height = `${arrayOfHeights[i]}%`;
        // const mappedLightness = (middleColor[2] + lightnessRange) - (arrayOfHeights[i] - (middleColor[2]-lightnessRange)) * 40 / 100 + (middleColor[2] - lightnessRange);
        // child.style.backgroundColor = `hsl(${middleColor[0]}, ${middleColor[1]}%, ${mappedLightness}%)`;
        container.appendChild(child);
    }
    // barElements = document.querySelectorAll('.bar');
  barElements = Array.from(document.querySelectorAll('.bar'));
  barHeights = barElements.map(bar => bar.style.height);
  console.log(barHeights);

}

const DELAY_MS = 30;
const generateButton = document.getElementById('generate');
const bars = [];

let g = 0;

async function sort(left = 0, right = barHeights.length - 1) {
  generateButton.disabled = true;
  if (left >= right) {
    return;
  }
  const mid = Math.floor((left + right) / 2);
  await sort(left, mid);
  await sort(mid+1, right);
  
  await merge(left, mid, right);
  generateButton.disabled = false;
}

async function merge(left, mid, right) {
  colorBars(left, right, '#1985A1');
  const leftLength = mid - left + 1;
  const rightLength = right - mid;
  const leftArr = barHeights.slice(left, mid + 1);
  const rightArr = barHeights.slice(mid + 1, right + 1);
  let i = 0, j = 0, k = left;
  while(i < leftLength && j < rightLength) {
    await new Promise(resolve => setTimeout(resolve, 50));
    if (parseFloat(leftArr[i]) <= parseFloat(rightArr[j])) {
      barHeights[k++] = leftArr[i++];
    }else {
      barHeights[k++] = rightArr[j++];
    }
    displayBars();
  }

  while(i < leftLength) {
    await new Promise(resolve => setTimeout(resolve, 50));
    barHeights[k++] = leftArr[i++];
    displayBars();
  }
  while(j < rightLength) {
    await new Promise(resolve => setTimeout(resolve, 50));
    barHeights[k++] = rightArr[j++];
    displayBars();
  }
  colorBars(left, right, '#ced4da');
}


function swapBars(bar1, bar2) {
  const tempHeight = bar1.style.height;
  const tempColor = bar1.style.backgroundColor;

  bar1.style.height = bar2.style.height;
  bar1.style.backgroundColor = bar2.style.backgroundColor;

  bar2.style.height = tempHeight;
  bar2.style.backgroundColor = tempColor;
}

function heightArray(min, max, nbr) {
  const distance = (max - min) / (nbr - 1);
  let result = [min];
  for(let i = 1; i < nbr; i++) {
      result.push(result[i-1] + distance);
  }

  for(let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

function displayBars() {
  for (let i = 0; i < barHeights.length; i++) {
    barElements[i].style.height = barHeights[i];
  }
}

function colorBars(left, right, color) {
  for (let i = left; i < right + 1; i++) {
    barElements[i].style.backgroundColor = color;
  }
}