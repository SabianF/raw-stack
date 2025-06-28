import components from "../../presentation/components.js";
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

    describe.each(invalid_inputs)("throws error on invalid input", (invalid_input) => {
      test(JSON.stringify(invalid_input.name), async () => {
        expect(() => {
          new component.Component(invalid_input.name);
        }).toThrow(Error);
      });
    });

    describe.each(valid_inputs)("on valid input", (valid_input) => {

      describe("returns Component", () => {
        test(JSON.stringify(valid_input), async () => {
          const comp = new component.Component(valid_input.name);
          expect(comp.constructor.name).toBe(component.Component.name);
        });
      });

      describe("assigns name to Component.name", () => {
        test(JSON.stringify(valid_input), async () => {
          const comp = new component.Component(valid_input.name);
          expect(comp.name).toEqual(valid_input.name);
        });
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

    describe.each(invalid_components)("throws on invalid component", (invalid_component) => {
      test(JSON.stringify(invalid_component), async () => {
        return expect(async () => {
          await invalid_component.render();
        });
      });
    });

    describe.each(valid_components)("returns a Promise<string> on valid component", (valid_component) => {
      test(JSON.stringify(valid_component), async () => {
        const rendered = await valid_component.render();
        expect(typeof rendered).toEqual("string");
      });
    });
  });
});
