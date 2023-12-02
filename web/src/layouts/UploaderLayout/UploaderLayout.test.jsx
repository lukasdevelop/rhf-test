import { render } from '@redwoodjs/testing/web'

import UploaderLayout from './UploaderLayout'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('UploaderLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UploaderLayout />)
    }).not.toThrow()
  })
})
