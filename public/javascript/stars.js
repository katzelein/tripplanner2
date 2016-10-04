
        $(function() {          
            $('input[type=submit]').click(function() {
                $('p').html('<span class="stars">'+parseFloat($('input[name=amount]').val())+'</span>');
                $('span.stars').stars();
            });         
            $('input[type=submit]').click();
        });

        $.fn.stars = function() {
            return $(this).each(function() {
                $(this).html($('<span />').width(Math.max(0, (Math.min(5, parseFloat($(this).html())))) * 16));
            });
        }
