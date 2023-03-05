const container = document.querySelector('.container');
const numBars = 30;
const middleColor = [204.4,42.4,27.3]
const lightnessRange = 10;

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
}

const DELAY_MS = 10;

async function sort() {
  const barElements = document.querySelectorAll('.bar');
  const generateButton = document.getElementById('generate');
  generateButton.disabled = true;
  

  for (let i = 0; i < numBars; i++) {
    
    barElements[i].style.backgroundColor = '#1985A1';
    let indexMin = i;
    for (let j = i + 1; j < numBars; j++) {
      barElements[j].style.backgroundColor = '#ffffff';

      if (parseFloat(barElements[j].style.height) < parseFloat(barElements[indexMin].style.height)) {
        if (indexMin !== i) {
          barElements[indexMin].style.backgroundColor = '#ced4da';
        }
        
        indexMin = j;
        barElements[indexMin].style.backgroundColor = '#fca311';
      }
      
      
      await new Promise(resolve => setTimeout(resolve, DELAY_MS));
      if (j !== indexMin) {
        barElements[j].style.backgroundColor = '#ced4da';
      }
      // barElements[j].style.backgroundColor = '#ced4da';
    }
    if (indexMin !== i) {
      // barElements[indexMin].style.backgroundColor = '#ced4da';
      // barElements[i].style.backgroundColor = '#ced4da';
      swapBars(barElements[i], barElements[indexMin])
      barElements[indexMin].style.backgroundColor = '#ced4da';
      barElements[i].style.backgroundColor = '#ced4da';
    }
    
    barElements[i].style.backgroundColor = '#ced4da'
  }

  generateButton.disabled = false;
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
