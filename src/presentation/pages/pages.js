import home from "./home.js";
import tester from "./tester.js";
import { getAndRenderCss, getAndRenderHtml, getAndRenderJs } from "../../domain/repositories/utilities.js";

const BASE_PATH = "src/presentation/pages";

/**
 *
 * @param {string} page_name
 * @param {object} props
 * @param {string} props.id
 */
export async function renderPage(page_name, props) {
  const prefixed_page_name = `${BASE_PATH}/${page_name}`;

  const rendered_css = await getAndRenderCss(prefixed_page_name + ".css", props);
  const rendered_js = await getAndRenderJs(prefixed_page_name + "_client.js", props);
  const rendered_page = await getAndRenderHtml(prefixed_page_name + ".html", props);

  return rendered_css + rendered_page + rendered_js;
}

export default {
  home,
  tester,
};
