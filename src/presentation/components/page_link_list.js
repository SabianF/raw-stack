import { Component } from "../../domain/entities/component.js";
import Link from "../../domain/entities/link.js";

/**
 *
 * @param {object} props
 * @param {Link[]} props.links
 */
export default async function page_link_list(props) {
  props.id = page_link_list.name;

  const page_link_list_component = new Component("page_link_list", props);

  return page_link_list_component.render();
}
