import { renderComponent } from "./components.js";

export default async function copyright() {
  const year = new Date().getFullYear();

  const component = await renderComponent(copyright.name, {
    id: copyright.name,
    year: year,
  });

  return component;
}
