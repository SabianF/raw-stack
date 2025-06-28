import components from "../components.js";
import { renderPage } from "../pages.js";

/**
 *
 * @param {object} props
 * @param {string} props.loader_url
 * @param {boolean} props.body_only
 */
export default async function tester(props) {
  if (props === undefined) {
    props = {};
  }

  if (props.body_only) {
    return await renderPage("tester", props);
  }

  const body = await components.loader({
    loader_url: props.loader_url,
  });

  const layout = await components.layout({
    title: "HTML5 Test Page",
    description: "A page to test HTML5 elements",
    body: body,
  });

  return layout;
}
