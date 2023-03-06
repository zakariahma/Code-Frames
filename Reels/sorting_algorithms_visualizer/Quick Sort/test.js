let barHeights = [10, 3, 4, 2, 9, 4, 7, 6, 100, 30, 22, 33, 12, 90, 14];

function partition(left, right) {
  let pivot = barHeights[Math.floor((left + right) / 2)];
  let i = left;
  let j = right;

  while (i <= j) {
    while (barHeights[i] < pivot) {
      i++;
    }
    while (barHeights[j] > pivot) {
      j--;
    }
    if(i <= j) {
      swapHeights(i, j);
      i++;
      j--;
    }
    
  }
  return [i,j];
}


function sort(left = 0, right = barHeights.length - 1) {
//   if (left === 0 && right === barHeights.length-1) {
//     generateButton.disabled = true;
//   }
//   console.log(barHeights);
  const indexes = partition(left, right);
  if (left < indexes[1]) {
    sort(left, indexes[1]);
  }
  if (indexes[0] < right) {
    sort(indexes[0], right);
  }

  if (left === 0 && right === barHeights.length-1) {
    console.log(barHeights);
  }
  
  
  // if (left === 0 && right === barHeights.length-1) {
  //   generateButton.disabled = false;
  // }
  
}


function swapHeights(index1, index2) {
  let tempHeight = barHeights[index1];
  barHeights[index1] = barHeights[index2];
  barHeights[index2] = tempHeight;
}

sort();
