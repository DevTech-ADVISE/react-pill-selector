var React = require('react');
var ReactDOM = require('react-dom');
var PillSelector = require("./src/react-pill-selector.js");

function reportChanged(id, data) {
    ReactDOM.render(<p>{data}</p>, description);
}

ReactDOM.render(
  <PillSelector onItemClicked={reportChanged}>
    <li data="Prunus armeniaca">Apricot</li>
    <li data="Vaccinium corymbosum">Blueberry</li>
    <li data="Vaccinium oxycoccos">Cranberry</li>
  </PillSelector>,
  document.getElementById('content')
);
