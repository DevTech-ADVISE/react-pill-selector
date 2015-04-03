jest.dontMock('../pill-selector.jsx');

describe('PillSelector', function() {
  it('changes the text after click', function() {
    var React = require('react/addons');
    var PillSelector = require('../pill-selector.jsx');
    var TestUtils = React.addons.TestUtils;

    var pills = TestUtils.renderIntoDocument(
      <PillSelector>
        <li>Apricot</li>
        <li>Blueberry</li>
        <li>Cranberry</li>
      </PillSelector>
    );

    var selected = TestUtils.findRenderedDOMComponentWithClass(pills, "ps-selected");
    expect(selected.getDOMNode().textContent).toEqual("Apricot");
  });
});