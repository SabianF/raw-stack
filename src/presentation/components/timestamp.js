import { renderComponent } from "./components.js";

export default async function timestamp() {
  return renderComponent("timestamp", {
    id: "timestamp",
  });
}
