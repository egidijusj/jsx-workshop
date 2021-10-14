const types = require('@babel/types')

module.exports = function () {
  return {
    visitor: {
      JSXElement(path) {

        const jsxOpeningTag = path.node.openingElement

        const elementType = types.stringLiteral(
          jsxOpeningTag.name.name
        )

        const props = types.objectExpression(
          jsxOpeningTag.attributes.map(attr => {
            return types.objectProperty(
              types.identifier(attr.name.name),
              attr.value
            )
          })
        )

        const callExpressionArgs = [
          elementType,
          props
        ]

        if (path.node.children.length > 0) {
          const child = path.node.children[0]
          if (types.isJSXText(child)) {
            callExpressionArgs.push(
              types.stringLiteral(child.value)
            )
          } else if (types.isJSXElement(child)) {
            callExpressionArgs.push(
              child
            )
          }
        }

        path.replaceWith(
          types.callExpression(
            types.memberExpression(
              types.identifier('React'),
              types.identifier('createElement')
            ),
            callExpressionArgs
          )
        )
      }
    }
  }
}