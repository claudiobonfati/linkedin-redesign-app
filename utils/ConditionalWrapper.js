// Conditional render a wrapper element around a HTML block

function ConditionalWrapper({ condition, wrapper, children }) {
  return (condition ? wrapper(children) : children);
}

export default ConditionalWrapper;
