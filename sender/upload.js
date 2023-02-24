const fs = require('fs')
const axios = require('axios')
const FormData = require('form-data')

// main
;(async () => {
  const data = new FormData()
  data.append('fileName', 'image.jpg')
  data.append('file', fs.createReadStream('image.jpg'))

  await axios
    .post('http://localhost:4010/api/media/user-1', data, {
      headers: {
        accept: 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
      },
    })
    .then((response) => {
      //handle success
      console.log('success')
    })
    .catch((error) => {
      console.log(error)
      //handle error
    })
})()
