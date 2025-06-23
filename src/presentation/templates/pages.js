import home from "./pages/home.js";
import { getAndRenderCss, getAndRenderHtml, getAndRenderJs } from "./utilities.js";

export const BASE_PATH = "src/presentation/templates/pages";

/**
 *
 * @param {string} page_name
 * @param {object} props
 * @param {string} props.id
 */
export async function renderPage(page_name, props) {
  const rendered_css = await getAndRenderCss(BASE_PATH + `/${page_name}.css`, props);
  const rendered_js = await getAndRenderJs(BASE_PATH + `/${page_name}_client.js`, props);
  const rendered_page = await getAndRenderHtml(BASE_PATH + `/${page_name}.html`, props);

  return rendered_css + rendered_page + rendered_js;
}

export default {
  home,
};
