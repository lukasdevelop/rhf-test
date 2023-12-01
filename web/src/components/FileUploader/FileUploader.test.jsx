import { render } from '@redwoodjs/testing/web'

import FileUploader from './FileUploader'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('FileUploader', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<FileUploader />)
    }).not.toThrow()
  })
})
