// getMinValueV1 has a Linear Time Complexity ===> O(n)
// BEST CASE: [5] ==> O(1)
// WORST CASE: [10, 5, 85, -4, 64] ==> O(n)
const getMinValueV1 = (numbers) => {
  if (!numbers.length) {
    throw new Error('Sorry, cannot get minimum value if array is empty');
  }

  if (numbers.length === 1) {
    return numbers[0];
  }

  let currentMinValue = numbers[0];

  for (const number of numbers) {
    if (number < currentMinValue) {
      currentMinValue = number;
    }
  }

  return currentMinValue;
}

// getMinValueV2 has a Quadratic Time Complexity T = n * n ===> O(n^2)
// BEST CASE: [1, 2, 3] ==> O(n^2)
// WORST CASE: [3, 2, 1] ==> O(n^2)
// AVERAGE CASE: [?, ?, ?] ==> O(n^2)
const getMinValueV2 = (numbers) => {
  if (!numbers.length) {
    return 'Sorry, cannot get minimum value if array is empty';
  }

  if (numbers.length === 1) {
    return numbers[0];
  }

  let sortedArray = [ ...numbers ];

  for (let i = 0; i < sortedArray.length; i++) {
    let outerElem = numbers[i];

    for (let j = i + 1; j < sortedArray.length; j++) {
      let innerElem = sortedArray[j];

      if (outerElem > innerElem) {
        // Swapping element position if outerElem is greater than innerElem
        sortedArray[i] = innerElem;
        sortedArray[j] = outerElem;

        // Resetting the correct values of outerElem and innerElem after the swap
        outerElem = sortedArray[i];
        innerElem = sortedArray[j];
      }
    }
  }

  return sortedArray[0];
}

const testArray = [10, 5, 85, -4, 64];

try {
  const resultV1 = getMinValueV1(testArray);
  console.log('Minimum value V1 is: ', resultV1);
} catch (error) {
  console.error(error);
}

try {
  const resultV2 = getMinValueV2(testArray);
  console.log('Minimum value V2 is: ', resultV2);
} catch (error) {
  console.error(error);
}
