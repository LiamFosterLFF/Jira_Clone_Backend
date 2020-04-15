describe('See that testing software works', () => {
  test('A test can pass', () => {
    expect(1===1).toBe(true)
  })
  test.skip('A test can fail', () => {
    expect(1===1).toBe(false)
  })
})
