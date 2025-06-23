import mustache from "mustache";
import { promises as fs } from "node:fs";

/**
 *
 * @param {string} path
 * @param {object} props placeholders to replace with data
 */
export async function getAndRenderHtml(path, props) {
  const html_string = await getFileAsString(path);
  const rendered_html = renderHtml(html_string, props);
  return rendered_html;
}

/**
 *
 * @param {string} path
 * @param {object} props placeholders to replace with data
 * @param {string} props.id snake_case identifier for the style tag
 */
export async function getAndRenderCss(path, props) {
  const css_string = await getFileAsString(path);
  const rendered_css = await renderCss(css_string, props);
  return rendered_css;
}

export async function getAndRenderJs(path, props) {
  const js_string = await getFileAsString(path);
  const rendered_js = await renderJs(js_string, props);
  return rendered_js;
}

export async function getFileAsString(path) {
  try {
    const file_data = await fs.readFile(path);
    const file_as_string = file_data.toString();
    return file_as_string;

  } catch (error) {
    if (
      error.message.includes("no such file or directory") &&
      (
        error.message.includes(".css") ||
        error.message.includes(".js")
      )
    ) {
      return "";
    }

    console.error(error);
    return "";
  }
}

/**
 *
 * @param {string} html_string
 * @param {object} props placeholders to replace with data
 */
export function renderHtml(html_string, props) {
  if (!html_string) {
    return "";
  }

  const rendered_html = mustache.render(html_string, props);
  return rendered_html;
}

/**
 *
 * @param {string} css_string
 * @param {object} props placeholders to replace with data
 * @param {string} props.id snake_case identifier for the style tag
 */
export async function renderCss(css_string, props) {
  if (!css_string) {
    return "";
  }

  if (
    !props.id ||
    props.id.length === 0 ||
    props.id.includes(" ") ||
    props.id.includes("-") ||
    props.id.includes(".") ||
    props.id.match(/[A-Z]/)
  ) {
    throw new Error("valid snake_case id not provided");
  }

  const css_tag_data = await getFileAsString("src/presentation/templates/components/style.html");
  const css_tag_string = css_tag_data.toString();
  const rendered_css = mustache.render(css_tag_string, {
    id: props.id,
    css: css_string,
  });

  return rendered_css;
}

/**
 *
 * @param {string} js_string
 * @param {object} props placeholders to replace with data
 * @param {string} props.id snake_case identifier for the script tag
 */
export async function renderJs(js_string, props) {
  if (!js_string) {
    return "";
  }

  if (
    !props.id ||
    props.id.length === 0 ||
    props.id.includes(" ") ||
    props.id.includes("-") ||
    props.id.includes(".") ||
    props.id.match(/[A-Z]/)
  ) {
    throw new Error("valid snake_case id not provided");
  }

  const js_tag_data = await getFileAsString("src/presentation/templates/components/script.html");
  const js_tag_string = js_tag_data.toString();
  const rendered_js = mustache.render(js_tag_string, {
    id: props.id,
    js: js_string,
  });

  return rendered_js;
}
