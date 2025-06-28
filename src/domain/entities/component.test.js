import component from "./component.js";

describe(component.Component.name, () => {

  describe("constructor", () => {

    const invalid_inputs = [
      {
        name: undefined,
      },
      {
        name: null,
      },
      {
        name: "",
      },
      {
        name: "name with spaces",
      },
      {
        name: "name-with-hyphens",
      },
    ];

    const valid_inputs = [
      {
        name: "button",
      },
      {
        name: "layout",
      },
      {
        name: "hubba_bubba",
      },
    ];

    describe.each(invalid_inputs)("on invalid input", (invalid_input) => {
      test(`[${JSON.stringify(invalid_input.name)}] throws Error`, async () => {
        expect(() => {
          new component.Component(invalid_input.name);
        }).toThrow(Error);
      });
    });

    describe.each(valid_inputs)("on valid input", (valid_input) => {

      test(`[${JSON.stringify(valid_input)}] returns Component`, async () => {
        const comp = new component.Component(valid_input.name);
        expect(comp.constructor.name).toBe(component.Component.name);
      });

      test("assigns name to Component.name", () => {
        const comp = new component.Component(valid_input.name);
        expect(comp.name).toEqual(valid_input.name);
      });
    });

  });

  describe(component.Component.prototype.render.name, () => {
    const invalid_components = [
      new component.Component(`definitely_does_not_exist_${crypto.randomUUID().replaceAll("-", "_")}`),
    ];

    const valid_components = [
      new component.Component("layout"),
    ];

    describe("throws on invalid component", (invalid_component) => {
      test.each(invalid_components)(JSON.stringify(invalid_component), async () => {
        expect(() => {
          invalid_component.render();
        }).toThrow();
      });
    });
  });
});
