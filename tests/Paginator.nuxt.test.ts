import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Paginator from "~/components/Paginator.vue";

describe("Paginator Component", () => {
  it("Renders the pages", () => {
    const wrapper = mount(Paginator, {
      props: {
        currentPage: 1,
        pages: 10,
      },
    });
    const pages = wrapper.findAll("button");
    expect(pages).toHaveLength(6);
  });

  it("change Page on button click", async () => {
    const wrapper = mount(Paginator, {
      props: {
        currentPage: 1,
        pages: 10,
      },
    });
    const secondButton = wrapper.find("button:nth-child(2)");

    await secondButton.trigger("click");
    expect(wrapper.emitted("updatePage")[0]).toStrictEqual([2]);
  });

  it("emit page change", async () => {
    const wrapper = mount(Paginator, {
      props: {
        currentPage: 1,
        pages: 10,
      },
    });

    const next = wrapper.find(".btn.btn-primary:last-child");
    await next.trigger("click");
    expect(wrapper.emitted("updatePage")[0]).toEqual([2]);
  });

  it("checks for props types", async () => {
    const wrapper = mount(Paginator, {
      props: {
        currentPage: 1,
        pages: 10,
      },
    });

    expect(wrapper.props().currentPage).toBeTypeOf("number");
    expect(wrapper.props().pages).toBeTypeOf("number");
  });

  it("updates visible pages dynamically", async () => {
    const wrapper = mount(Paginator, {
      props: {
        currentPage: 2,
        pages: 10,
      },
    });
    await wrapper.setProps({ currentPage: 5 });
    const pageButtons = wrapper.findAll(".btn:not(.btn-primary)");
    const visiblePages = pageButtons.map((button) => button.text());
    expect(visiblePages).toEqual(["3", "4", "5", "6", "7"]);
  });

  it("renders correct number of visible buttons", () => {
    const wrapper = mount(Paginator, {
      props: {
        currentPage: 50,
        pages: 100,
      },
    });
    const pageButtons = wrapper.findAll(".btn:not(.btn-primary)");
    expect(pageButtons).toHaveLength(5);
  });
});
