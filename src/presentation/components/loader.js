import { Component } from "../../domain/entities/component.js";

/**
 *
 * @param {object} props
 * @param {string} props.loader_url
 */
export default function loader(props) {
  props.id = "loader";

  const loader_component = new Component("loader", props);

  return loader_component.render();
}
