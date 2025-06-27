import component from "./component.js";

describe(component.Component.name, () => {
  const test_component = new component.Component();

  describe(test_component.render, () => {
    test("returns string", () => {
      const html = test_component.render();
      expect(typeof html).toEqual("string");
    });
  });
});
