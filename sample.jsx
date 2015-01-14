var PillSelector = require("./pill-selector.jsx");
require("./pill-selector.css");

function reportChanged(id, data) {
    React.render(<p>{data}</p>, description);
}

React.render(
  <PillSelector onItemClicked={reportChanged}>
    <li data="Prunus armeniaca">Apricot</li>
    <li data="Vaccinium corymbosum">Blueberry</li>
    <li data="Vaccinium oxycoccos">Cranberry</li>
  </PillSelector>,
  document.getElementById('content')
);