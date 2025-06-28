import component from "./component.js";

describe(component.Component.name, () => {

  describe("constructor", () => {

    describe.each([
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
    ])("throws on invalid name", (invalid_input) => {
      test(JSON.stringify(invalid_input.name), async () => {
        expect(() => {
          new component.Component(invalid_input.name);
        }).toThrow(Error);
      });
    });

    describe.each([
      {
        name: "button",
      },
      {
        name: "layout",
      },
      {
        name: "hubba_bubba",
      },
    ])("returns string on valid name", (valid_input) => {
      test(JSON.stringify(valid_input.name), async () => {
        const comp = new component.Component(valid_input.name);
        expect(comp.constructor.name).toBe(component.Component.name);
        expect(comp.name).toBe(valid_input.name);
      });
    });
  });
});
