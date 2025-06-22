import components from "./components.js";

async function home() {
  const layout = await components.layout({
    title: "Home",
    description: "The home page",
    body: undefined,
  });

  return layout;
}

export default {
  home,
};
