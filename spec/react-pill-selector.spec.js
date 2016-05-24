var React = require('react');
var PillSelector = require('../src/react-pill-selector');
var TestUtils = require('react-addons-test-utils');

describe('PillSelector', function() {

  it('defaults to the first item selected', function() {
    var pills = TestUtils.renderIntoDocument(
      <PillSelector>
        <li className='a'>Apricot</li>
        <li className='b'>Blueberry</li>
        <li className='c'>Cranberry</li>
      </PillSelector>
    );

    var selected = TestUtils.findRenderedDOMComponentWithClass(pills, 'ps-selected');
    expect(selected.textContent).toEqual('Apricot');
  });

  it('changes the text after click and can\'t be unselected', function() {
    var pills = TestUtils.renderIntoDocument(
      <PillSelector>
        <li className='a'>Apricot</li>
        <li className='b'>Blueberry</li>
        <li className='c'>Cranberry</li>
      </PillSelector>
    );

    var targetNode = TestUtils.findRenderedDOMComponentWithClass(pills, 'b');
    expect(targetNode.textContent).toEqual('Blueberry');

    TestUtils.Simulate.click(targetNode);

    var selected = TestUtils.findRenderedDOMComponentWithClass(pills, 'ps-selected');
    expect(selected.textContent).toEqual('Blueberry');

    //reclick and attempt to turn it off
    TestUtils.Simulate.click(targetNode);

    selected = TestUtils.findRenderedDOMComponentWithClass(pills, 'ps-selected');
    expect(selected.textContent).toEqual('Blueberry');
  });

  it('does change the data after a click', function() {
    var data = null;

    var onClickFunc = function(id, itemData) {
      data = itemData;
    };

    var pills = TestUtils.renderIntoDocument(
      <PillSelector onItemClicked={onClickFunc}>
        <li className='a' data='a'>Apricot</li>
        <li className='b' data='b'>Blueberry</li>
        <li className='c' data='c'>Cranberry</li>
      </PillSelector>
    );

    expect(data).toBe('a');

    var targetNode =TestUtils.findRenderedDOMComponentWithClass(pills, 'b');
    TestUtils.Simulate.click(targetNode);

    expect(data).toBe('b');
  });

  it('does not call click on load when told not to', function() {
    var data = null;

    var onClickFunc = function(id, itemData) {
      data = itemData;
    };

    var pills = TestUtils.renderIntoDocument(
      <PillSelector callClickOnLoad={false} onItemClicked={onClickFunc}>
        <li className='a' data='a'>Apricot</li>
        <li className='b' data='b'>Blueberry</li>
        <li className='c' data='c'>Cranberry</li>
      </PillSelector>
    );

    expect(data).toBeNull();
  });

  it('can be unselected with differect selection mode', function() {
    var pills = TestUtils.renderIntoDocument(
      <PillSelector selectionMode={PillSelector.ONE_OR_NONE}>
        <li className='a'>Apricot</li>
        <li className='b'>Blueberry</li>
        <li className='c'>Cranberry</li>
      </PillSelector>
    );

    var selected = TestUtils.findRenderedDOMComponentWithClass(pills, 'ps-selected');
    expect(selected.textContent).toEqual('Apricot');

    var targetNode = TestUtils.findRenderedDOMComponentWithClass(pills, 'b');
    expect(targetNode.textContent).toEqual('Blueberry');

    TestUtils.Simulate.click(targetNode);

    selected = TestUtils.findRenderedDOMComponentWithClass(pills, 'ps-selected');
    expect(selected.textContent).toEqual('Blueberry');

    //reclick and attempt to turn it off
    TestUtils.Simulate.click(targetNode);

    selected = TestUtils.scryRenderedDOMComponentsWithClass(pills, 'ps-selected');
    expect(selected.length).toBe(0);
  });

  it('selected the indicated index', function() {
    var pills = TestUtils.renderIntoDocument(
      <PillSelector selectedIndex={1}>
        <li className='a'>Apricot</li>
        <li className='b'>Blueberry</li>
        <li className='c'>Cranberry</li>
      </PillSelector>
    );

    var selected = TestUtils.findRenderedDOMComponentWithClass(pills, 'ps-selected');
    expect(selected.textContent).toEqual('Blueberry');
  });
});
