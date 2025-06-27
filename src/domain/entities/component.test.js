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
    ])("throws on invalid name", (name) => {
      test(JSON.stringify(name), async () => {
        expect(() => {
          new component.Component(name);
        }).toThrow(Error);
      });
    });
  });
});
