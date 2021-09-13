'use strict';

const baseUrl = `https://mate-academy.github.io/phone-catalogue-static
/api/phones.json`;
const detailUrl = `https://mate-academy.github.io/
phone-catalogue-static/api/phones/`;

function getPhones() {
  const resolve = () => {
    return fetch(baseUrl)
      .then(response => {
        return response.json();
      })
      .catch(message => {
        setTimeout(reject, 5000);
      });
  };

  const reject = () => {
    const errorMessage = document.createElement('span');

    errorMessage.innerHTML = `Rejected`;
    document.body.append(errorMessage);
  };

  return resolve();
};

function getPhoneDetails(param) {
  const tempArray = [...param];
  const result = Promise.all(tempArray.map(
    (item) => fetch(`${detailUrl}${item.id}.json`)
  ));

  if (result) {
    const ul = document.createElement('ul');

    document.body.appendChild(ul);

    tempArray.map((item) => {
      const listItem = document.createElement('li');

      ul.appendChild(listItem);
      listItem.innerHTML = `${item.id}`;
    });
  }

  return result;
};

getPhones()
  .then(result => getPhoneDetails(result));
