import Link from "../../domain/entities/link.js";
import { renderComponent } from "./components.js";

/**
 *
 * @param {object} props
 * @param {Link[]} props.links
 */
export default async function page_link_list(props) {
  props.id = page_link_list.name;

  return renderComponent(page_link_list.name, props);
}
