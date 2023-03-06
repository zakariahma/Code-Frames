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

const DELAY_MS = 30;

async function sort() {
  const generateButton = document.getElementById('generate');
  generateButton.disabled = true;
  const barElements = document.querySelectorAll('.bar');

  for (let i = 1; i < barElements.length; i++) {
    // barElements[i].style.backgroundColor = "#1985A1";
    const key = parseFloat(barElements[i].style.height);
    let j = i - 1;
    barElements[i].style.backgroundColor = "#1985A1";
    while(j >= 0 && parseFloat(barElements[j].style.height) > parseFloat(barElements[j+1].style.height)) {
      // barElements[j+1].style.backgroundColor = "#ced4da";
      
      // barElements[j].style.backgroundColor = "#ced4da";
      swapBars(barElements[j], barElements[j+1]);
      
      barElements[j+1].style.backgroundColor = "#ced4da";
      j--;

      await new Promise(resolve => setTimeout(resolve, DELAY_MS));
    }
    barElements[j+1].style.backgroundColor = "#ced4da";
    barElements[i].style.backgroundColor = "#ced4da";
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
