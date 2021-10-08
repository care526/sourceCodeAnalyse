function createTextElement(text: string) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

function createElement(type: string, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) =>
        typeof child === "object" ? child : createTextElement(child)
      ),
    },
  };
}

function render(element, container: Element) {
  const elementProps = element.props;
  const dom =
    element.type === "TEXT_ELEMENT"
      ? document.createTextNode(elementProps.nodeValue)
      : document.createElement(element.type);

  const isProperty = (key: string) => key !== "children";
  Object.keys(elementProps)
    .filter(isProperty)
    .forEach((name: string) => (dom[name] = elementProps[name]));

  elementProps.children.forEach((child) => render(child, dom));

  container.appendChild(dom);
}

const MyReact = {
  createElement,
  render,
};

export default MyReact;
