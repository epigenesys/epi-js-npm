# EpiJS (NPM)

## **Please note: Version 1.0+ of epiJS only works with Bootstrap 5.0+, and does not support Internet Explorer. If you need IE supports please use 0.x and Bootstrap 4.x.**

Some scripts utilising Twitter Bootstrap components, including:

* A simple Remote lightbox using Twitter Bootstrap modal
* A simple Growl-like using Twitter Bootstrap alert
* A simple table filter
* A script to hide / show HTML elements based on user input
* A script / CSS utility classes to reflow tables based on screen size

## Installation

Run the following line in your projects root folder

    yarn add @epigenesys/epi-js@^1.0

## Usage

### Ajax Modal
Add to your `app/javascript/packs/application.js`

    import { AjaxModal } from '@epigenesys/epi-js';
    AjaxModal.start();

#### Via class
Add `ajax-modal` class to your link

#### Via data attribute
Add `data-toggle=ajax-modal` to your link

#### Via JavaScript
    new AjaxModal(url).openAjaxModal();

#### **Breaking changes compare to 0.x**
In vesion 1.0+ of epiJS `AjaxModal` no longer fires custom events when modal is shown / hidden. Please update your event handlers to listen to Bootstrap events instead. E.g.

    document.addEventListener('shown.bs.modal', (e) => {
      if(e.target.id === '#modalWindow') {
          ...
      }
    })

### Flash Message
Add to your `app/javascript/packs/application.js`

    import { FlashMessage } from '@epigenesys/epi-js';

#### For Rails flash fessage
Wrap your flash message in a div with `.flash_messages` class, e.g.

    .flash-messages
      - unless flash.blank?
        - flash.each do |name, msg|
          .alert.fade{ class: "alert-#{ name == :notice ? 'success' : 'error' }" }
            %a.close{ data: { dismiss: :alert } } &times;
            = msg

#### Via JavaScript
    FlashMessage.addMessage(message, { type: alertClass });

`alertClass` is `alert-notice` etc.

#### Customisation
You can pass in the following options to `addMessage` function:
* `type`: CSS class for the message
* `timeout`: Time in ms before the message dismisses itself
* `container`: CSS selector for the container where the message will be add to

You can change the markup of the template by setting the following variable. It needs to contain an element with the class `flash-message-content`:

    FlashMessage.template

### Visibility Map
Add to your `app/javascript/packs/application.js`

    import { VisibilityMap } from '@epigenesys/epi-js';
    VisibilityMap.start();

#### Via data attributes
Set `data-visibility-map` of a select box, radio button group or check boxes to a JSON string, e.g.

    data-visibility-map='{"foo":"#foo","bar":"#bar"}'
Or for SimpleForm, use:

    f.input :some_select, input_html: {data: {visibility_map: {foo: '#foo', bar: '#bar'}}}

When the value of the input element is `foo`, the element `#foo` will be visible and `#bar` will be hidden, and vice versa. The value of the JSON key value pair can be any CSS selectors.

#### Other options
1. You can limit the scope of elements to hide / show by providing a CSS selector as the `data-visibility-map-scope` attribute. Then only elements within the closest element of input matching the given selector will be affected, e.g.

        .nested-fields
          = f.input :some_select, input_html: {data: {visibility_map_scope: '.nested-fields', visibility_map: {foo: '.foo', bar: '.bar'}}}
          .foo
          .bar

        .nested-fields
          = f.input :some_select, input_html: {data: {visibility_map_scope: '.nested-fields', visibility_map: {foo: '.foo', bar: '.bar'}}}
          .foo
          .bar

    When the value of the first select is set to `foo`, only the `.foo` in the first `.nested-fields` will be displayed

2. By setting the `data-visibility-map-action` attribute to `hide`, elements will be shown by default and only hidden when the given value is selected.

### Table filter
This allows you to filter out rows in a table based on an input field.

Add to your `app/javascript/packs/application.js`

    import { TableFilter } from '@epigenesys/epi-js';
    TableFilter.start();

#### Via data attributes
Set `data-table-filter-target` on the input field you wish to filter by. This should be a selecter for the `table` tag you want to filter. This needs to have a `thead` and `tbody`.


You can overwrite the default 'No record found' message by setting `data-no-record-message` on the table.

### Table reflow
This allows you to reflow a table into vertical format on smaller screens.

Add to your `app/javascript/packs/application.js`

    import { TableReflow } from '@epigenesys/epi-js';
    import '~@epigenesys/epi-js/dist/epi-js.css';

Then add `.table-xs-reflow` or `.table-sm-reflow` etc. to tables.
You can override the label for each table cell by adding `data-label` to the `th` element in `thead`.