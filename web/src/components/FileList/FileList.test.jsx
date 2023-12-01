import { render } from '@redwoodjs/testing/web'

import FileList from './FileList'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('FileList', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<FileList />)
    }).not.toThrow()
  })
})
