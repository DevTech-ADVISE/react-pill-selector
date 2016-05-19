var React = require('react');
var classNames = require('classnames');
require("./react-pill-selector.scss");

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
    callClickOnLoad: React.PropTypes.bool,
    isManaged: React.PropTypes.bool,
  },

  componentDidMount: function() {
    if(!this.props.callClickOnLoad || this.state.selected === null) {
      return;
    }

    var id = this.state.selected;
    var child = this.props.children[id];

    this.props.onItemClicked(id, child.props.data);
  },

  componentWillReceiveProps: function(newProps) {
    if(this.props.selectedIndex !== newProps.selectedIndex) {
      this.changeSelected(newProps.selectedIndex);
    }
  },

  getDefaultProps: function() {
    return {
      selectionMode: 1,
      selectedIndex: 0,
      onItemClicked: function () {},
      callClickOnLoad: true,
      isManaged: false,
    };
  },

  getInitialState: function() {
    if(this.props.isManaged) {
      return {};
    }

    return { selected: this.props.selectedIndex };
  },

  changeSelected: function(id) {
    if(this.props.isManaged) {
      return;
    }

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
  },

  isSelectedIndex: function(id) {
    if(this.props.isManaged) {
      return id === this.props.selectedIndex;
    }

    return id === this.state.selected;
  },

  render: function() {
    var children = this.props.children;

    var listItems = children.map(function (child, id) {
      var data = child.props.data;
      var isSelected = this.isSelectedIndex(id);
      var onMouseDown = this.itemClickHandler.bind(this, id, data);

      // if(child.props.isDisabled) {
      //   onMouseDown = function(){};
      // }

      var className = classNames(
        {"ps-selected": isSelected}, //, "ps-disabled": child.props.isDisabled},
        child.props.className
      );

      return (
        <li key={id}>
          <button
            id={child.props.id}
            ref={child.ref}
            role="button"
            aria-pressed={isSelected}
            className={className}
            onClick={onMouseDown}>
            {child.props.children}
          </button>
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