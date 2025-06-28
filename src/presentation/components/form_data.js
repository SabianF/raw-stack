import { Component } from "../../domain/entities/component.js";

export default async function formData(props) {
  if (!props) {
    props = {};
  }

  const component = new Component("form_data", props);

  return component.render();
}
