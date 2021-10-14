/* env jest */
const babel = require("@babel/core");
const path = require('path')

describe('JSX plugin', () => {

  const transpile = input =>
    babel.transformSync(input, {
      "plugins": [
        "@babel/plugin-syntax-jsx",
        path.join(__dirname, '../src/plugin')
      ]
    }).code

  test('transpiles empty JSX element', () => {
    const code = `<div/>`
    const expected = `React.createElement("div", {});`
    expect(transpile(code)).toEqual(expected)
  })

  test('transpiles props', () => {
    const code = `<div key="foo" />`
    const expected = 
`React.createElement("div", {
  key: "foo"
});`
    expect(transpile(code)).toEqual(expected)
  })

  test('transpiles child text nodes', () => {
    const code = `<div>Hello world</div>`
    const expected = `React.createElement("div", {}, "Hello world");`
    expect(transpile(code)).toEqual(expected)
  })

  test('transpiles child elements', () => {
    const code = `<div><span>Hello world</span></div>`
    const expected = `React.createElement("div", {}, React.createElement("span", {}, "Hello world"));`
    expect(transpile(code)).toEqual(expected)
  })
})