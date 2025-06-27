import layout from "./layout.js";
import { getAndRenderCss, getAndRenderHtml, getAndRenderJs } from "../../domain/repositories/utilities.js";
import timestamp from "./timestamp.js";
import page_link_list from "./page_link_list.js";
import loader from "./loader.js";
import copyright from "./copyright.js";

const BASE_PATH = "src/presentation/components";

/**
 *
 * @param {string} component_name
 * @param {object} props
 * @param {string} props.id
 */
export async function renderComponent(component_name, props) {
  const prefixed_component_name = `${BASE_PATH}/${component_name}`;

  const rendered_css = await getAndRenderCss(prefixed_component_name + ".css", props);
  const rendered_js = await getAndRenderJs(prefixed_component_name + "_client.js", props);
  const rendered_component = await getAndRenderHtml(prefixed_component_name + ".html", props);

  return rendered_css + rendered_component + rendered_js;
}

export default {
  copyright,
  layout,
  loader,
  page_link_list,
  timestamp,
};
