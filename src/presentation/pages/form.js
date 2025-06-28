import components from "../components.js";
import { renderPage } from "../pages.js";

/**
 *
 * @param {object?} props
 */
export default async function form(props) {
  if (!props) {
    props = {};
  }

  props.id = form.name;
  props.form_data = await components.formData(props);

  if (props.data_only) {
    return props.form_data;
  }

  const page = await renderPage("form", props);
  const layout = await components.layout({
    title: form.name,
    description: "A simple form with basic validation",
    body: page,
  });

  return layout;
}
