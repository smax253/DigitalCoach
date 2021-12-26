import { shallow } from "enzyme";
import Button from "../../components/Button";

describe("Button", () => {
  const mountComponent = () => shallow(<Button />);

  it("outputs", () => {
    const wrapper = mountComponent();

    expect(wrapper).not.toBeNull();
  });
});
