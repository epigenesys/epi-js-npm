export default (function($) {
  $(document).on('set-label', 'table.table-responsive-xs, .table-responsive-sm', function() {
    return $('thead th', $(this)).each(function(index) {
      var label;
      label = $(this).data('label') != null ? $(this).data('label') : $(this).text();
      return $("tr td:nth-child(" + (index + 1) + ")", $(this).closest('thead').next('tbody')).attr('data-label', label);
    });
  });
  return $('table.table-responsive-xs, table.table-responsive-sm').each(function() {
    return $(this).trigger('set-label');
  });
})(jQuery);