<a name="top"></a>
# API v1.0.0

API

# Table of contents

- [Media](#Media)
  - [Download file](#Download-file)
  - [Upload file](#Upload-file)

___


# <a name='Media'></a> Media

## <a name='Download-file'></a> Download file
[Back to top](#top)

```
GET /api/media/:area/:file
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| area | `String` | <p>Area when will the file to download</p> |
| file | `String` | <p>File name with extension to download</p> |
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| file | `File` | <p>Return file data</p> |

## <a name='Upload-file'></a> Upload file
[Back to top](#top)

```
POST /api/media/:area/:file
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| area | `String` | <p>Area when will the file to upload</p> |
| file | `String` | <p>File name with extension to download</p> |
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| area | `String` | <p>Area the file to uploaded</p> |
| fileName | `String` | <p>File name uploaded</p> |

