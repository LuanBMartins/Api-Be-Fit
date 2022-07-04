import formidable from 'formidable'
const AWS = require('aws-sdk')
const fs = require('fs')
const dotenv = require('dotenv')
dotenv.config()

async function uploadFile (fileName: any, filePath: any, mimeType: any) {
  const s3 = new AWS.S3({ apiVersion: '2006-03-01', region: process.env.AWS_REGION })
  const fileContent = fs.readFileSync(filePath)

  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: fileName,
    Body: fileContent
    // ContentType: mimeType//geralmente se acha sozinho
  }

  const data = await s3.upload(params).promise()
  return data.Location
}

function formParse (req: any) {
  const form = new formidable.IncomingForm()

  return new Promise(function (resolve, reject) {
    form.parse(req, async (err: any, fields: any, files: any) => {
      if (err) {
        return false
      }
      console.log(files)
      const url = await uploadFile(files.filetoupload.originalFilename, files.filetoupload.filepath, '')
      if (url) {
        resolve(url)
      } else {
        reject(Error('Deu errado'))
      }

      return url
    })
  })
}

export default formParse
