const fs = require('fs')
const axios = require('axios')
const FormData = require('form-data')

// main
;(async () => {
  const data = new FormData()
  data.append('file', fs.createReadStream('photo1.jpg'))

  await axios
    .post('http://localhost:4001/api/v1/media/user-1/photo1.jpg', data, {
      headers: {
        accept: 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
      },
    })
    .then((response) => {
      //handle success
      console.log('success')
      console.log(response.data)
    })
    .catch((error) => {
      //handle error
      console.log(error.message)
    })
})()
