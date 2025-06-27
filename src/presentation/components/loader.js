import { renderComponent } from "./components.js";

/**
 *
 * @param {object} props
 * @param {object} props.url
 */
export default function loader(props) {
  return renderComponent("loader", props);
}
