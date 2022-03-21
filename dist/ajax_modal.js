"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function ($) {
  $.ajaxModal = function (url, params) {
    return $.get(url, params, function (data) {
      var $modal, alreadyShown;
      $modal = $('#modalWindow').length > 0 ? $('#modalWindow') : $('<div id="modalWindow" class="modal fade" tabindex="-1" role="dialog"></div>');
      alreadyShown = $modal.hasClass('show') || $modal.hasClass('in');
      $modal.html(data);
      $('.modal-title', $modal).attr('id', 'modalWindowTitle');
      $modal.attr('aria-labelledby', 'modalWindowTitle');
      $('.modal-dialog', $modal).attr('role', 'document');
      $('body').append($modal);
      $modal.modal('show');
      $(document).trigger('ajax-modal-show');

      if (alreadyShown) {
        $(document).trigger('ajax-modal-shown');
      }

      return $modal.on('hidden.bs.modal hidden', function (e) {
        if (e.target === this) {
          return $(this).remove();
        }
      }).on('shown.bs.modal shown', function (e) {
        setTimeout(function () {
          $('#modalWindow [autofocus]').first().focus();
        }, 0);
        return $(document).trigger('ajax-modal-shown');
      });
    });
  };

  return $(function () {
    return $(document.body).on('click', 'a.ajax-modal, a[data-toggle="ajax-modal"]', function (e) {
      e.preventDefault();
      return $.ajaxModal($(this).attr('href'), $(this).data('params'));
    });
  });
}(jQuery);

exports["default"] = _default;