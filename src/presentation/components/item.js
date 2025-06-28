import { renderComponent } from "../components.js";

/**
 *
 * @param {object} props
 * @param {object} props.name
 * @param {object} props.description
 * @param {object} props.img_url
 */
export default async function item(props) {
  return renderComponent("item", {
    id: item.name
  });
}
