var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

export default (function($) {
  'use strict';
  var CheckboxVisibilityChecker, GenericVisibilityChecker;
  GenericVisibilityChecker = (function() {
    function GenericVisibilityChecker(element) {
      var ref, ref1;
      this.element = element;
      this.scope = this.element.closest((ref = this.element.data('visibility-map-scope')) != null ? ref : document);
      this.action = (ref1 = this.element.data('visibility-map-action')) != null ? ref1 : 'show';
      this.map = this.element.data('visibility-map');
      this.allFields = $($.unique($.map(this.map, (function(_this) {
        return function(val) {
          return $(val, _this.scope).get();
        };
      })(this))));
    }

    GenericVisibilityChecker.prototype.check = function() {
      var fieldsForValue, toHide, toShow;
      fieldsForValue = $($.unique($.map(this.getValue(), (function(_this) {
        return function(value) {
          return $(_this.map[value], _this.scope).get();
        };
      })(this))));
      if (this.action === 'show') {
        toShow = fieldsForValue;
        toHide = this.allFields.not(fieldsForValue);
      } else {
        toHide = fieldsForValue;
        toShow = this.allFields.not(fieldsForValue);
      }
      toShow.show();
      toShow.trigger('visibility.show');
      toHide.hide();
      return toHide.trigger('visibility.hide');
    };

    GenericVisibilityChecker.prototype.hideAll = function() {
      this.allFields.hide();
      return this.allFields.trigger('visibility.hide');
    };

    GenericVisibilityChecker.prototype.showAll = function() {
      this.allFields.show();
      return this.allFields.trigger('visibility.show');
    };

    GenericVisibilityChecker.prototype.getValue = function() {
      return $.makeArray(this.element.val());
    };

    return GenericVisibilityChecker;

  })();
  CheckboxVisibilityChecker = (function(superClass) {
    extend(CheckboxVisibilityChecker, superClass);

    function CheckboxVisibilityChecker() {
      return CheckboxVisibilityChecker.__super__.constructor.apply(this, arguments);
    }

    CheckboxVisibilityChecker.prototype.getValue = function() {
      return $.map($("input[type='checkbox'][name='" + (this.element.attr('name')) + "']:checked"), function(inputElement) {
        return $(inputElement).val();
      });
    };

    return CheckboxVisibilityChecker;

  })(GenericVisibilityChecker);
  $.fn.setVisibility = function(action) {
    return this.each(function() {
      var checkerClass, data;
      data = $(this).data('visibility-checker');
      if (data == null) {
        checkerClass = $(this).is("input[type='checkbox']") ? CheckboxVisibilityChecker : GenericVisibilityChecker;
        $(this).data('visibility-checker', data = new checkerClass($(this)));
      }
      if (action == null) {
        action = 'check';
      }
      return data[action]();
    });
  };
  return $(function() {
    $('input[data-visibility-map]:checked, select[data-visibility-map]').setVisibility();
    $(document.body).on('visibility.show', function(e) {
      return $(':input:not([data-visibility-map-no-auto-enable])', $(e.target)).prop('disabled', false);
    }).on('visibility.hide', function(e) {
      return $(':input', $(e.target)).prop('disabled', true);
    });
    return $(document.body).on('change', '[data-visibility-map]', function(e) {
      return $(this).setVisibility();
    });
  });
})(jQuery);