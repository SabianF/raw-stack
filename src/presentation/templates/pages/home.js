import components from "../components.js";
import { renderPage } from "../pages.js";

/**
 *
 * @param {object} props
 */
export default async function home(props) {
  props.id = home.name;

  const body = await renderPage("home", props);

  const layout = await components.layout({
    title: "Home",
    description: "The home page",
    body: body,
  });

  return layout;
}
