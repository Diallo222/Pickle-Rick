import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import MultiSelector from "~/components/MultiSelector.vue";

describe("MultiSelector", () => {
  it("renders the dropdown with options", () => {
    const options = {
      label: "Status",
      values: ["Alive", "Dead", "Unknown"],
    };

    const wrapper = mount(MultiSelector, {
      props: {
        modelValue: "",
        options,
      },
    });

    // Check the label
    expect(wrapper.find("label").text()).toBe("Status");

    // Check the options
    const selectOptions = wrapper.findAll("option");
    expect(selectOptions).toHaveLength(4); // Includes default option
    expect(selectOptions[1].text()).toBe("Alive");
    expect(selectOptions[2].text()).toBe("Dead");
    expect(selectOptions[3].text()).toBe("Unknown");
  });

  it("emits the correct value on blur", async () => {
    const options = {
      label: "Status",
      values: ["Alive", "Dead", "Unknown"],
    };

    const emitSpy = vi.fn();
    const wrapper = mount(MultiSelector, {
      props: {
        modelValue: "",
        options,
      },
      global: {
        mocks: {
          $emit: emitSpy,
        },
      },
    });

    const select = wrapper.find("select");

    // Simulate selecting an option
    await select.setValue("Alive");

    // Simulate blur event
    await select.trigger("blur");

    // Check that the event is emitted
    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    expect(wrapper.emitted("update:modelValue")[0]).toEqual([
      { Status: "Alive" },
    ]);
  });

  it("handles empty selection correctly", async () => {
    const options = {
      label: "Status",
      values: ["Alive", "Dead", "Unknown"],
    };

    const wrapper = mount(MultiSelector, {
      props: {
        modelValue: "",
        options,
      },
    });

    const select = wrapper.find("select");

    // Simulate selecting an empty value
    await select.setValue("");

    // Simulate blur event
    await select.trigger("blur");

    // Check emitted value
    expect(wrapper.emitted("update:modelValue")[0]).toEqual([{ Status: "" }]);
  });
});
