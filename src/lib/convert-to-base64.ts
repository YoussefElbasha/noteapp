'use server'

import { readFileSync } from 'fs'

const testing = async (file: File) => {
  const fileInfo = readFileSync(URL.createObjectURL(file), {
    encoding: 'base64',
  })

  console.log(fileInfo)
}

export default testing
