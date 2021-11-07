const button = document.querySelector('button');
const paragraph = document.querySelector('p');

button.addEventListener('click', async () => {
  const text = paragraph.textContent;

  // navigator.clipboard
  //   .writeText(text)
  //   .then(result => console.log(result))
  //   .catch(error => console.log(error));
  if (navigator.clipboard) {
    try {
      const result = await navigator.clipboard.writeText(text);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  } else {
    alert('Sorry, this feature is not yet supported by your browser. Please copy manually!');
  }
});