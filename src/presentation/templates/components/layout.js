import { BASE_PATH, renderComponent } from "../components.js";
import { getAndRenderCss, getAndRenderJs } from "../utilities.js";

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
export default async function layout(props) {
  const layout_name = layout.name;

  props.id = layout_name;

  const default_css = [
    `<link rel="stylesheet" href="css/pico.classless.min.css">`,
    await getAndRenderCss("src/presentation/templates/components/layout_critical.css", props),
  ].join("");


  const rendered_layout_css = await getAndRenderCss(BASE_PATH + `/${layout_name}.css`, props);
  if (!props.critical_css) {
    props.critical_css = default_css + rendered_layout_css;
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
