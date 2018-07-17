'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function ($) {
  var OptionFilter;
  OptionFilter = function () {
    function OptionFilter(element) {
      this.element = element;
      this.filterTarget = $(this.element.data('option-filter-target'));
      this.disableEmpty = this.element.data('option-filter-disable-empty') != null;
      this.filterTarget.each(function () {
        if ($(this).data('option-filter-all-options') == null) {
          return $(this).data('option-filter-all-options', $('option', $(this)));
        }
      });
    }

    OptionFilter.prototype.filter = function () {
      var disableEmpty, valueSelected;
      valueSelected = this.element.val().toString();
      disableEmpty = this.disableEmpty;
      return this.filterTarget.each(function () {
        var $selected, $toShow;
        $selected = $(':selected', $(this));
        $toShow = $(this).data('option-filter-all-options').filter("[data-option-filter-value='" + valueSelected + "'], :not([data-option-filter-value])");
        if (!($toShow.filter($selected).length > 0)) {
          $(this).val('');
        }
        $(this).html($toShow).trigger('change.option-filter');
        return $(this).prop('disabled', disableEmpty && $toShow.length === 0);
      });
    };

    return OptionFilter;
  }();
  $.fn.optionFilter = function () {
    return this.each(function () {
      var data;
      data = $(this).data('option-filter');
      if (data == null) {
        $(this).data('option-filter', data = new OptionFilter($(this)));
      }
      return data.filter();
    });
  };
  return $(function () {
    $('[data-option-filter-target]').optionFilter();
    return $(document.body).on('change', '[data-option-filter-target]', function (e) {
      return $(this).optionFilter();
    });
  });
}(jQuery);