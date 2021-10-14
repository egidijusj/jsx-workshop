const types = require('@babel/types')

module.exports = function () {
  return {
    visitor: {
      JSXElement(path) {
        path.replaceWith(
          types.callExpression(
            types.memberExpression(
              types.identifier('React'),
              types.identifier('createElement')
            ),
            [
              types.stringLiteral(path.node.openingElement.name.name),
              types.objectExpression([])
            ]
          )
        )
      }
    }
  }
}