import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import MultiSelector from "~/components/MultiSelector.vue";

describe("MultiSelector", () => {
  it("render the options", () => {
    const options = {
      label: "status",
      values: ["alive", "dead", "unknown"],
    };

    const wrapper = mount(MultiSelector, {
      props: {
        modelValue: "",
        options,
      },
    });

    // Check the label
    const label = wrapper.find("label");
    expect(label.text()).toContain(options.label);

    const optionsElements = wrapper.findAll("option");
    expect(optionsElements).toHaveLength(options.values.length + 1);
    expect(optionsElements[0].text()).toBe("-- Select status --");

    // options.values.forEach((value) => {
    //   const option = optionsElements.find((el) => el.text() === value);
    //   expect(option.exists()).toBe(true);
    // });
  });

  it("check if it emits on blur", async () => {
    const options = {
      label: "status",
      values: ["alive", "dead", "unknown"],
    };

    const emitSpy = vi.fn();
    const wrapper = mount(MultiSelector, {
      props: {
        modelValue: "",
        options,
      },
      global: {
        mocks: {
          updateFilter: emitSpy,
        },
      },
    });

    const select = wrapper.find("select");

    // Simulate selecting an option
    await select.setValue("alive");
    await select.trigger("blur");

    await wrapper.vm.$nextTick();

    expect(emitSpy).toHaveBeenCalled();
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
    await select.trigger("blur");

    // Check emitted value
    expect(select.exists()).toBe(true);
    expect(wrapper.emitted("update:modelValue")[0]).toEqual([{ Status: "" }]);
  });
});
