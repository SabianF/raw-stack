import { renderComponent } from "./components.js";

/**
 *
 * @param {object} props
 * @param {string} props.loader_url
 */
export default function loader(props) {
  props.id = "loader";

  return renderComponent("loader", props);
}
