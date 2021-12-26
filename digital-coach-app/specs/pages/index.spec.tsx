import { mount } from "enzyme";

import { AuthContextProvider } from "@App/lib/auth/AuthContextProvider";
import "@App/lib/firebase/firebase.config";
import Home from "@App/pages";

jest.mock("firebase/app", () => {
  return {
    auth: jest.fn(),
    initializeApp: jest.fn(),
    getApps: [jest.fn()],
    getApp: jest.fn(),
  };
});

describe("HomePage", () => {
  const mountComponent = () =>
    mount(
      <AuthContextProvider>
        <Home />
      </AuthContextProvider>
    );

  it("outputs", () => {
    const wrapper = mountComponent();

    expect(wrapper).not.toBeNull();
  });
});
