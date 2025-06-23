import components from "../components.js";
import { renderPage } from "../pages.js";

/**
 *
 * @param {object} props
 */
export default async function tester(props) {
  const body = await renderPage("tester", props);
  const layout = await components.layout({
    title: "HTML5 Test Page",
    description: "A page to test HTML5 elements",
    body: body,
  });

  return layout;
}
