jest.dontMock('../src/pill-selector.js');

describe('PillSelector', function() {
  var React = require('react/addons');
  var PillSelector = require('../src/pill-selector.js');
  var TestUtils = React.addons.TestUtils;

  it('defaults to the first item selected', function() {
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

  it("changes the text after click and can't be unselected", function() {
    var pills = TestUtils.renderIntoDocument(
      <PillSelector>
        <li>Apricot</li>
        <li ref="click">Blueberry</li>
        <li>Cranberry</li>
      </PillSelector>
    );
    
    var targetNode = pills.refs.click.getDOMNode();
    expect(targetNode.textContent).toEqual("Blueberry");

    TestUtils.Simulate.mouseDown(targetNode);

    var selected = TestUtils.findRenderedDOMComponentWithClass(pills, "ps-selected");
    expect(selected.getDOMNode().textContent).toEqual("Blueberry");

    //reclick and attempt to turn it off
    TestUtils.Simulate.mouseDown(targetNode);

    selected = TestUtils.findRenderedDOMComponentWithClass(pills, "ps-selected");
    expect(selected.getDOMNode().textContent).toEqual("Blueberry");
  });

  it('does change the data after a click', function() {
    var data = null;

    var onClickFunc = function(id, itemData) {
      data = itemData;
    };

    var pills = TestUtils.renderIntoDocument(
      <PillSelector onItemClicked={onClickFunc}>
        <li data="a">Apricot</li>
        <li data="b" ref="click">Blueberry</li>
        <li data="c">Cranberry</li>
      </PillSelector>
    );
    
    expect(data).toBe("a");

    var targetNode = pills.refs.click.getDOMNode();
    TestUtils.Simulate.mouseDown(targetNode);

    expect(data).toBe("b");
  });

  it('does not call click on load when told not to', function() {
    var data = null;

    var onClickFunc = function(id, itemData) {
      data = itemData;
    };

    var pills = TestUtils.renderIntoDocument(
      <PillSelector callClickOnLoad={false} onItemClicked={onClickFunc}>
        <li data="a">Apricot</li>
        <li data="b" ref="click">Blueberry</li>
        <li data="c">Cranberry</li>
      </PillSelector>
    );
    
    expect(data).toBeNull();
  });

  it('can be unselected with differect selection mode', function() {
    var pills = TestUtils.renderIntoDocument(
      <PillSelector selectionMode={PillSelector.ONE_OR_NONE}>
        <li>Apricot</li>
        <li ref="click">Blueberry</li>
        <li>Cranberry</li>
      </PillSelector>
    );
    
    var selected = TestUtils.findRenderedDOMComponentWithClass(pills, "ps-selected");
    expect(selected.getDOMNode().textContent).toEqual("Apricot");

    var targetNode = pills.refs.click.getDOMNode();
    expect(targetNode.textContent).toEqual("Blueberry");

    TestUtils.Simulate.mouseDown(targetNode);

    selected = TestUtils.findRenderedDOMComponentWithClass(pills, "ps-selected");
    expect(selected.getDOMNode().textContent).toEqual("Blueberry");

    //reclick and attempt to turn it off
    TestUtils.Simulate.mouseDown(targetNode);

    selected = TestUtils.scryRenderedDOMComponentsWithClass(pills, "ps-selected");
    expect(selected.length).toBe(0);
  });

  it('selected the indicated index', function() {
    var pills = TestUtils.renderIntoDocument(
      <PillSelector selectedIndex={1}>
        <li>Apricot</li>
        <li>Blueberry</li>
        <li>Cranberry</li>
      </PillSelector>
    );

    var selected = TestUtils.findRenderedDOMComponentWithClass(pills, "ps-selected");
    expect(selected.getDOMNode().textContent).toEqual("Blueberry");
  });
});