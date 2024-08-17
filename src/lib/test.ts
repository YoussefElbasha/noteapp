import imageToBase64 from 'image-to-base64'

const test = async (file: File) => {
  const base64 = await imageToBase64(URL.createObjectURL(file))
  console.log(base64)
}

export default test
