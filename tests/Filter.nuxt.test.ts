import { describe, it, expect, vi, beforeEach } from "vitest";
import { shallowMount } from "@vue/test-utils";
import Filter from "@/components/Filter.vue";

const mockLocations = [
  { id: 1, name: "Earth" },
  { id: 2, name: "Earth (C-137)" },
  { id: 3, name: "Earth (Replacement Dimension)" },
  { id: 4, name: "unknown" },
];

describe("Filter Component", () => {
  let wrapper: any;
  let applyFiltersMock: any;
  let findLocationMock: any;

  beforeEach(() => {
    applyFiltersMock = vi.fn();
    findLocationMock = vi.fn();

    wrapper = shallowMount(Filter, {
      props: {
        locations: mockLocations,
      },
      methods: {
        applyFilters: applyFiltersMock,
        findLocation: findLocationMock,
      },
    });
  });

  it("renders correctly with given props", () => {
    expect(wrapper.element).toMatchSnapshot();
    const locationOptions = wrapper.findAll("#location option");
    expect(locationOptions.length).toBe(mockLocations.length + 1);
  });

  it("does not call findLocation when no location is selected", async () => {
    const locationSelect = wrapper.find("#location");
    await locationSelect.setValue("");
    expect(findLocationMock).not.toHaveBeenCalled();
  });
});
