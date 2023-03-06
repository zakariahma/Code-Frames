
const arr = [2, 4, 1, 3, 10, 7, 8, -1, -4, 5, 6];


function sort(left = 0, right = arr.length - 1) {
    if (left >= right) {
      return;
    }
    const mid = Math.floor((left + right) / 2);
    sort(left, mid);
    sort(mid+1, right);
    merge(left, mid, right);
  }
  
function merge(left, mid, right) {
    const leftLength = mid - left + 1;
    const rightLength = right - mid;
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    let i = 0, j = 0, k = left;
    while(i < leftLength && j < rightLength) {
      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i];
        k++;
        i++;
      }else {
        arr[k] = rightArr[j];
        k++;
        j++;
      }
    }
  
    while(i < leftLength) {
      arr[k] = leftArr[i];
      k++;
      i++;
    }
    while(j < rightLength) {
      arr[k] = rightArr[j];
      k++;
      j++;
    }
  }

  sort();
  console.log(arr);
  