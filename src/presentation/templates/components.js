import { getAndRenderCss, getAndRenderHtml, getAndRenderJs } from "./utilities.js";

const BASE_PATH = "src/presentation/templates/components";

/**
 *
 * @param {object} props
 * @param {string} props.title of page
 * @param {string} props.description SEO meta
 * @param {string} props.critical_css
 * @param {string} props.critical_scripts SEO meta
 * @param {string} props.custom_header
 * @param {object[]} props.nav_menu_links
 * @param {string} props.nav_menu_links.href
 * @param {string} props.nav_menu_links.name
 * @param {string} props.body
 * @param {string} props.custom_footer
 */
async function layout(props) {
  const layout_name = layout.name;

  props.id = layout_name;

  const rendered_layout_css = await getAndRenderCss(BASE_PATH + `/${layout_name}.css`, props);
  if (!props.critical_css) {
    props.critical_css = rendered_layout_css;
  } else {
    props.critical_css = rendered_layout_css + props.critical_css;
  }

  const rendered_layout_scripts = await getAndRenderJs(BASE_PATH + `/${layout_name}_client.js`, props);
  if (!props.critical_scripts) {
    props.critical_scripts = rendered_layout_scripts;
  } else {
    props.critical_scripts = rendered_layout_scripts + props.critical_scripts;
  }

  const rendered_layout = await renderComponent("layout", props);

  return rendered_layout;
}

/**
 *
 * @param {string} component_name
 * @param {object} props
 * @param {string} props.id
 */
async function renderComponent(component_name, props) {
  const rendered_css = await getAndRenderCss(BASE_PATH + `/${component_name}.css`, props);
  const rendered_js = await getAndRenderJs(BASE_PATH + `/${component_name}_client.js`, props);
  const rendered_component = await getAndRenderHtml(BASE_PATH + `/${component_name}.html`, props);

  return rendered_css + rendered_component + rendered_js;
}

export default {
  layout,
};
