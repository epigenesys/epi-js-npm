export default (function($) {
  var TableFilter;
  TableFilter = (function() {
    function TableFilter(element) {
      var colspan, message;
      this.element = element;
      this.target = $(this.element.data('table-filter-target'));
      this.allRows = $('tbody tr:not(.tr-no-record)', this.target);
      colspan = this.target.data('no-record-span') != null ? this.target.data('no-record-span') : $('thead th', this.target).length;
      message = this.target.data('no-record') != null ? this.target.data('no-record') : 'No records found';
      this.noRecordRow = $("<tr class='tr-no-record'><td colspan=" + colspan + ">" + message + "</td></tr>");
    }

    TableFilter.prototype.filter = function() {
      var $toShow, keyword;
      $('.tr-no-record', this.target).remove();
      keyword = this.element.val().toLowerCase();
      $toShow = keyword === '' ? this.allRows : this.allRows.filter(function() {
        var trText;
        trText = $(this).clone().find('.btn').remove().end().text().toLowerCase();
        return trText.indexOf(keyword) > -1;
      });
      $toShow.show();
      this.allRows.not($toShow).hide();
      if ($toShow.length === 0) {
        return $('tbody', this.target).append(this.noRecordRow);
      }
    };

    return TableFilter;

  })();
  $.fn.tableFilter = function() {
    return this.each(function() {
      var data;
      data = $(this).data('table-filter');
      if (data == null) {
        $(this).data('table-filter', data = new TableFilter($(this)));
      }
      return data.filter();
    });
  };
  return $(function() {
    return $(document).on('keyup', '[data-table-filter-target]', function(e) {
      return $(this).tableFilter();
    });
  });
})(jQuery);