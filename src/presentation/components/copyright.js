import { Component } from "../../domain/entities/component.js";

export default async function copyright() {
  const props = {
    id: copyright.name,
    year: new Date().getFullYear(),
  };

  const component = new Component("copyright", props);

  return component.render();
}
