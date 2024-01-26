import { renderHook, act } from "@testing-library/react-hooks";
import useObjectArray, { ObjectType, useObjectArrayReturn } from "../src/useObjectArray";

describe("useObjectArray", () => {
  it("should initialize with the provided initial array", () => {
    const initialArray: ObjectType[] = [
      { id: "1", name: "Object 1" },
      { id: "2", name: "Object 2" },
      { id: "3", name: "Object 3" },
    ];

    const { result } = renderHook<[], useObjectArrayReturn<ObjectType>>(() =>
      useObjectArray(initialArray)
    );

    expect(result.current[0]).toEqual(initialArray);
  });

  it("should add an item to the array", () => {
    const { result } = renderHook<[], useObjectArrayReturn<ObjectType>>(() =>
      useObjectArray<ObjectType>([])
    );

    act(() => {
      result.current[2]({ id: "1", name: "Object 1" });
    });

    expect(result.current[0]).toHaveLength(1);
    expect(result.current[0][0].id).toBe("1");
    expect(result.current[0][0].name).toBe("Object 1");
  });

  it("should remove an item from the array", () => {
    const initialArray: ObjectType[] = [
      { id: "1", name: "Object 1" },
      { id: "2", name: "Object 2" },
      { id: "3", name: "Object 3" },
    ];

    const { result } = renderHook<[], useObjectArrayReturn<ObjectType>>(() =>
      useObjectArray(initialArray)
    );

    act(() => {
      result.current[3](1);
    });

    expect(result.current[0]).toHaveLength(2);
    expect(result.current[0][0].id).toBe("1");
    expect(result.current[0][0].name).toBe("Object 1");
    expect(result.current[0][1].id).toBe("3");
    expect(result.current[0][1].name).toBe("Object 3");
  });

  it("should update a property value in the array", () => {
    const initialArray: ObjectType[] = [
      { id: "1", name: "Object 1" },
      { id: "2", name: "Object 2" },
      { id: "3", name: "Object 3" },
    ];

    const { result } = renderHook<[], useObjectArrayReturn<ObjectType>>(() =>
      useObjectArray(initialArray)
    );

    act(() => {
      result.current[4](1, "name", "Updated Object Name");
    });

    expect(result.current[0][1].name).toBe("Updated Object Name");
  });

  it("should clear the array", () => {
    const initialArray: ObjectType[] = [
      { id: "1", name: "Object 1" },
      { id: "2", name: "Object 2" },
      { id: "3", name: "Object 3" },
    ];

    const { result } = renderHook<[], useObjectArrayReturn<ObjectType>>(() =>
      useObjectArray(initialArray)
    );

    act(() => {
      result.current[5]();
    });

    expect(result.current[0]).toHaveLength(0);
  });

  it("should set a new array", () => {
    const { result } = renderHook<[], useObjectArrayReturn<ObjectType>>(() =>
      useObjectArray<ObjectType>([])
    );

    const newArray: ObjectType[] = [
      { id: "1", name: "Object 1" },
      { id: "2", name: "Object 2" },
    ];

    act(() => {
      result.current[1](newArray);
    });

    expect(result.current[0]).toEqual(newArray);
  });
});
