const request = (url, method, value) => new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      const response = JSON.parse(xhr.responseText);
      if (xhr.status === 200) {
        if (response.error) {
          reject(response.error);
        } else {
          resolve(response.result);
        }
      } else {
        reject(response.error);
      }
    }
  };
  xhr.open(method, url);
  xhr.send(value);
});
