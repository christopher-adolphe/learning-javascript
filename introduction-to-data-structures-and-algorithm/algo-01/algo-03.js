// Linear Time Complexity ==> O(n)
const getArraySum = (numbers) => {
  if (!numbers.length) {
    throw new Error('Sorry, cannot get sum if array is empty');
  }

  if (numbers.length === 1) {
    return numbers[0];
  }

  let sum = 0;

  for (const number of numbers) {
    sum += number;
  }

  return sum;
};

const testArray = [2, 5, 6];

try {
  const result = getArraySum(testArray);
  console.log('Sum is: ', result);
} catch (error) {
  console.error(error);
}
