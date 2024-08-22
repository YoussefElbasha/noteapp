import { db } from '@/database/db.model'
import { NodeViewContent, NodeViewWrapper } from '@tiptap/react'
import { useEffect, useState } from 'react'

const TestComponent = (props) => {
  // console.log(props.deleteNode)
  // console.log(props.node.attrs)

  // console.log(props.node)

  // console.log(props.node.attrs.title)

  // useEffect(() => {
  //   console.log('node deleted')
  // }, [props.deleteNode])

  const [url, setUrl] = useState<string>('')

  useEffect(() => {
    dummyFunction()
    // console.log('marco')
  }, [])

  const dummyFunction = async () => {
    const image = await db.images
      .get(parseInt(props.node.attrs.title))
      .then((image) => {
        // console.log(image)
        // return image?.blob

        if (!image) return

        // console.log(URL.createObjectURL(image?.blob))

        setUrl(URL.createObjectURL(image?.blob))
      })

    // console.log(image)
  }

  // console.log('polo')

  return (
    <NodeViewWrapper data-drag-handle>
      <NodeViewContent
        as={'img'}
        src={url}
        className='my-2 min-h-[100px] max-h-[500px] ml-[50%] translate-x-[-50%] '
      />
      {/* <p>{props.node.attrs.title}</p> */}
      {/* <img src={URL.createObjectURL(image)} alt='image' /> */}
    </NodeViewWrapper>
  )
}

export default TestComponent
