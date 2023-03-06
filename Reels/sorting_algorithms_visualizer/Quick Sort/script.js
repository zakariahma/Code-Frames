const container = document.querySelector('.container');
const numBars = 30;

let barElements;
let barHeights;
let generateButton;

function generateBars() {
    while(container.firstChild) {
        container.removeChild(container.firstChild);
    }
    const arrayOfHeights = heightArray(1, 100, numBars);
    for (i=0; i < numBars; i++) {
        const child = document.createElement('div');
        child.classList.add('bar');
        child.style.height = `${arrayOfHeights[i]}%`;
        container.appendChild(child);
    }
  barElements = Array.from(document.querySelectorAll('.bar'));
  barHeights = barElements.map(bar => bar.style.height);
  generateButton = document.getElementById('generate');
}

const DELAY_MS = 30;
// const generateButton = document.getElementById('generate');
let indexes;

async function partition(left, right) {
  const pivotIndex = Math.floor((left + right) / 2);
  let pivot = barHeights[pivotIndex];
  colorBars(pivotIndex, 'blue');
  let i = left;
  let j = right;

  while (i <= j) {
    while (parseFloat(barHeights[i]) < parseFloat(pivot)) {
      i++;
    }
    while (parseFloat(barHeights[j]) > parseFloat(pivot)) {
      j--;
    }
    if(i <= j) {
      swapHeights(i, j);
      i++;
      j--;
      displayBars();
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
  }
  colorBars(pivotIndex, '#ced4da');
  displayBars();
  indexes = [i, j];
  
}



async function sort(left = 0, right = barHeights.length - 1) {
  if (left === 0 && right === barHeights.length-1) {
    generateButton.disabled = true;
  }
  console.log(barHeights);
  await partition(left, right);
  
  if (left < indexes[1]) {
    await sort(left, indexes[1]);
  }
  if (indexes[0] < right) {
    await sort(indexes[0], right);
  }
  if (left === 0 && right === barHeights.length-1) {
    // console.log(barHeights);
    // displayBars();
    generateButton.disabled = false;
  } 
}


function swapHeights(index1, index2) {
  let tempHeight = barHeights[index1];
  barHeights[index1] = barHeights[index2];
  barHeights[index2] = tempHeight;
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

function colorBars(index, color) {
  barElements[index].style.backgroundColor = color;
}

