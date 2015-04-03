var React = require('react');

/************* Helper Functions **************/
function isElementType(element, expectedType) {
  return getElementType(element) == expectedType;
}

function getElementType(element) {
  return element.type.displayName || element.type;
}

var PillSelector = React.createClass({
  statics: {
    ONE_OR_NONE: 0,
    ALWAYS_ONE: 1
  },
  componentWillMount: function() {
    var errors = "";
    var children = this.props.children;
    
    children.forEach(function(child) {
      if(!isElementType(child, "li")) {
        errors += "\r\nFound " + getElementType(child) + " element in PillSelector. All elements should be 'li'";
      }
    });

    if(errors !== "") {
      throw new Error(errors);
    }
  },
  propTypes: {
    children: React.PropTypes.arrayOf(React.PropTypes.element),
    selectionMode: React.PropTypes.number,
    selectedIndex: React.PropTypes.number,
    onItemClicked: React.PropTypes.func,
    callClickOnLoad: React.PropTypes.bool
  },
  componentDidMount: function() {
    if(!this.props.callClickOnLoad || this.state.selected === null) {
      return;
    }

    var id = this.state.selected;
    var child = this.props.children[id];

    this.props.onItemClicked(id, child.props.data);
  },
  getDefaultProps: function() {
    return {
      selectionMode: 1,
      selectedIndex: 0,
      onItemClicked: function () {},
      callClickOnLoad: true
    };
  },
  getInitialState: function() {
    return { selected: this.props.selectedIndex};
  },
  changeSelected: function(id) {
    if(this.props.selectionMode === PillSelector.ALWAYS_ONE) {
      this.setState({ selected: id });
      return;
    }

    var selected = this.state.selected === id ? null : id;
    this.setState({ selected: selected });
  },
  itemClickHandler: function(id, data, event) {
    this.changeSelected(id);
    this.props.onItemClicked(id, data);

    event.stopPropagation();
    event.preventDefault();
    return false;
  },
  render: function() {
    var children = this.props.children;

    var listItems = children.map(function (child, id) {
      var data = child.props.data;
      var isSelected = id === this.state.selected;
      var className = isSelected ? "ps-list-item ps-selected" : "ps-list-item";

      return (
        <li
          key={id}
          role="button"
          aria-pressed={isSelected}
          className={className}
          onMouseDown={this.itemClickHandler.bind(this, id, data)}>
          {child.props.children}
        </li>
      );
    }, this);

    return (
      <ul className="ps-list">
        {listItems}
      </ul>
    )
  }
});

module.exports = PillSelector;