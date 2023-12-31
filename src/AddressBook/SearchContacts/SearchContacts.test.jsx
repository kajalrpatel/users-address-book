import React from "react";
import { Provider } from "react-redux";
import Downshift from "downshift";

import { mount } from "enzyme";
import configureStore from "redux-mock-store";

import SearchContacts from "./SearchContacts";
import SearchFailure from "./SearchFailure";

const mockStore = configureStore();

const renderSearchContacts = (reduxStateOverrides) => {
  const store = mockStore({
    addressBook: {
      search: {
        phrase: "",
        matchingContacts: [],
        searchFailure: false,
        ...reduxStateOverrides,
      },
    },
  });
  return mount(
    <Provider store={store}>
      <SearchContacts />
    </Provider>,
  );
};

describe("<SearchContacts>", () => {

  it("render <Downshift> external autocomplete component by default", async () => {
    // given
    const tree = renderSearchContacts({
      phrase: "",
      matchingContacts: [],
      searchFailure: false,
    });

    // then
    expect(tree.find(Downshift)).toExist();
  });

  it("render <Downshift> external autocomplete component even if search failed", async () => {
    // given
    const tree = renderSearchContacts({
      searchFailure: true,
    });

    // then
    expect(tree.find(Downshift)).toExist();
  });

  it("render <SearchFailure> if search failed", async () => {
    // given
    const tree = renderSearchContacts({
      searchFailure: true,
    });

    // then
    expect(tree.find(SearchFailure)).toExist();
  });

});
