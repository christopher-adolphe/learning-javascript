const storeBtn = document.getElementById('store-btn');
const retrieveBtn = document.getElementById('retrieve-btn');

storeBtn.addEventListener('click', () => {
  const userId = 'u56435085';
  const user = {
    name: 'Samantha',
    age: 30,
    hobbies: ['Sports', 'Mountain Biking']
  };

  document.cookie = `uid=${userId}`;
  document.cookie = `userData=${JSON.stringify(user)}`;
});

retrieveBtn.addEventListener('click', () => {
  const cookieData = document.cookie.split(';');
  const { data } = cookieData
    .map(cookie => cookie.trim())
    .map(trimmedData => {
      let [ key, value ] = trimmedData.split('=');

      if (value.charAt(0) === '{' && value.charAt(value.length - 1) === "}") {
        value = JSON.parse(value);
      }

      return { [key]: value };
    });
  console.log('Data: ', data);
});
