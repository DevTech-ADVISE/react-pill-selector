react-pill-selector
===================

Pill Selector is a type of control that allows you to select one item at a time.

Usage
-----

Pill Selector works similarly to an unordered list (in fact, it becomes one). As an unordered list, every element will need to be list items

    <PillSelector>
        <li>Apricot</li>
        <li>Blueberry</li>
        <li>Cranberry</li>
    </PillSelector>


Properties
----------

### selectionMode ###

**Type:** Enum (number)  
**Default:** PillSelector.ALWAYS_ONE  
**Example:** `<PillSelector initialSize={PillSelector.ALWAYS_ONE}>`  
**Required:** no

* Detemines the section mode of the pills.
* Values:
    * PillSelector.ALWAYS_ONE -- One Pill will always be selected
    * PillSelector.ONE_OR_NONE -- One Pill will start selected, but can be deselected.

### selectedIndex ###

**Type:** number  
**Default:** 0  
**Example:** `<PillSelector selectedIndex={0}>`  
**Required:** no

* Sets the initially selected index to the number specified.

### onItemClicked ###

**Type:** function  
**Default:** `function(id, data) {}`  
**Example:** `<PillSelector clickHandler={function(){}}>`  
**Required:** no

* Allows you to specify a callback function that gets called when an item is changed.
* The function is called two parameters, `id` and `data`.
    * `id` is the index of the item
    * `data` is any data added to a list item (see below).

### List Item -> data ###

**Type:** any  
**Default:** undefined  
**Example:** `<li data={null}>`  
**Required:** no

* With the callback function specified (see above), you can use this to associate data with a list item.
* Data can be of any type, and will get passed into the callback function exactly as-is.

### callClickOnLoad ###

**Type:** boolean  
**Default:** true  
**Example:** `<PillSelector callClickOnLoad={true}>`  
**Required:** no

* This determines if `onItemClicked` is called when the main component is loaded.
* If set to false, manually clicking on a Pill will still change the selection.

CSS Information
---------------

* **PillSelector**: Becomes a `<ul>` with CSS class `ps-list`.
* **List Items**: Stays `<li>`, gains CSS class `ps-list-item`. The selected item will also get the `ps-selected` class.