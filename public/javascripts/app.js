(function($) {
    $(function() {
        var $button = $('button');
        var $code = $('#code');

        $button.bind('click', function() {
            var data = {
                code: $code.val()
            };

            $.post('/compile', data, function(data) {
                if (data && data.compiledCode) {
                    $('#response').val(data.compiledCode);
                }
            });
        });
    });
})(jQuery);
