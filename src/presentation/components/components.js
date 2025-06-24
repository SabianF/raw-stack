import layout from "./layout.js";
import { getAndRenderCss, getAndRenderHtml, getAndRenderJs } from "../../domain/repositories/utilities.js";

const BASE_PATH = "src/presentation/components";

/**
 *
 * @param {string} component_name
 * @param {object} props
 * @param {string} props.id
 */
export async function renderComponent(component_name, props) {
  const rendered_css = await getAndRenderCss(BASE_PATH + `/${component_name}.css`, props);
  const rendered_js = await getAndRenderJs(BASE_PATH + `/${component_name}_client.js`, props);
  const rendered_component = await getAndRenderHtml(BASE_PATH + `/${component_name}.html`, props);

  return rendered_css + rendered_component + rendered_js;
}

export default {
  layout,
};
