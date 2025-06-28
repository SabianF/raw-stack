import components from "../components.js";
import { getAndRenderCss, getAndRenderJs } from "../../domain/repositories/utilities.js";
import Link from "../../domain/entities/link.js";
import { Component } from "../../domain/entities/component.js";

/**
 *
 * @param {object} props
 * @param {string} props.title of page
 * @param {string} props.description SEO meta
 * @param {string} props.critical_css
 * @param {string} props.critical_scripts SEO meta
 * @param {string} props.custom_header
 * @param {string} props.custom_nav
 * @param {string} props.body
 * @param {string} props.custom_footer
 */
export default async function layout(props) {
  const layout_name = layout.name;

  props.id = layout_name;

  const default_nav = await components.page_link_list({
    links: [
      new Link("/", "Home"),
      new Link("/tester", "Test page"),
    ],
  });
  if (!props.custom_nav) {
    props.custom_nav = default_nav;
  }

  const default_css = [
    `<link rel="stylesheet" href="css/pico.classless.min.css">`,
    await getAndRenderCss("src/presentation/templates/components/layout_critical.css", props),
  ].join("");


  const rendered_layout_css = await getAndRenderCss(`./${layout_name}.css`, props);
  if (!props.critical_css) {
    props.critical_css = default_css + rendered_layout_css;
  } else {
    props.critical_css = rendered_layout_css + props.critical_css;
  }

  const default_scripts = [
    await getAndRenderJs(`./${layout_name}_client.js`, props),
  ].join("");

  if (!props.critical_scripts) {
    props.critical_scripts = default_scripts;
  } else {
    props.critical_scripts = default_scripts + props.critical_scripts;
  }

  const default_footer = await components.copyright();

  if (!props.custom_footer) {
    props.custom_footer = default_footer;
  }

  const layout_component = new Component("layout", props);

  return layout_component.render();
}
