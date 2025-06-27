import component from "./component.js";

describe(component.Component.name, async () => {

  const test_component = new component.Component();

  describe(test_component.render, async () => {

    test("returns string", async () => {
      const html = await test_component.render();
      expect(typeof html).toEqual("string");
    });
  });
});
