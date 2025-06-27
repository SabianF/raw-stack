import components, { renderComponent } from "../components/components.js";
import { renderPage } from "./pages.js";

/**
 *
 * @param {object} props
 */
export default async function home(props) {
  if (props === undefined) {
    props = {};
  }

  props.id = home.name;

  const body = await renderPage("home", props);
  const footer = await components.timestamp();

  const layout = await components.layout({
    title: "Home",
    description: "The home page",
    body: body,
    custom_footer: footer,
  });

  return layout;
}
