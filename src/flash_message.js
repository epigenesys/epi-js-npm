export default (function($) {
  var $alerts = [];
  var alertTimeout = [];

  $.flashAlert = function(message, type, timeout, dismissLink) {
    if (timeout == null) {
      timeout = 6000;
    }
    if (dismissLink == null) {
      dismissLink = $.flashAlert.defaults.dismissLink;
    }

    var $alert = $('<div>').addClass("alert alert-dismissible fade in show " + type).append(message).append(dismissLink);

    if(type == 'alert-success') {
      $('.flash-messages .alert').alert('close');
    }

    $('.flash-messages').prepend($alert);

    $alerts.push($alert);
    alertTimeout.push(setTimeout(function() {
      return $alerts.shift().alert('close');
    }, timeout));

    return true;
  };
  $.flashAlert.defaults = {
    dismissLink: '<button type="button" class="close" data-dismiss="alert" aria-label="Dismiss"><span aria-hidden="true">&times;</span></button>',
    affix: false
  };
})(jQuery);
