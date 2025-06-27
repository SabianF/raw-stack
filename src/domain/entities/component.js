const BASE_PATH = "src/presentation/components";

class ComponentProps {
  /**
   * @type {object?} Placeholders to replace in the CSS
   */
  css;

  /**
   * @type {object?} Placeholders to replace in the HTML
   */
  html;

  /**
   * @type {object?} Placeholders to replace in the JavaScript
   */
  js;

  /**
   *
   * @param {object} props
   */
  addCss(props) {
    console.log("Logging placeholder variable names to replace in CSS (keys):");

    for (const key in props) {
      console.log(key);
    }
  }
}

class Component {
  /**
   * @type {string}
   */
  name;

  /**
   * @type {object} Names of placeholder variables to replace
   */
  props;

  async render() {
    return "";
  }
}

export default {
  ComponentProps,
  Component,
};
