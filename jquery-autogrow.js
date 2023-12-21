/* global jQuery */

(function ($) {
    /**
     * Auto-growing textareas
     *
     * Based on: http://github.com/jaz303/jquery-grab-bag/tree/master/javascripts/jquery.autogrow-textarea.js
     */
    $.fn.autogrow = function (options) {
        return this.filter('textarea').each(function () {
            const self = this;
            const $self = $(self);
            const minHeight = $self.height();
            const noFlickerPad = $self.hasClass('autogrow-short') ? 0 : parseInt($self.css('lineHeight')) || 0;
            const settings = $.extend({
                preGrowCallback: null,
                postGrowCallback: null
            }, options);

            const shadow = $('<div></div>').css({
                position: 'absolute',
                top: -10000,
                left: -10000,
                width: $self.width(),
                fontSize: $self.css('fontSize'),
                fontFamily: $self.css('fontFamily'),
                fontWeight: $self.css('fontWeight'),
                lineHeight: $self.css('lineHeight'),
                resize: 'none',
                'word-wrap': 'break-word'
            }).appendTo(document.body);

            const update = function (event) {
                if ($self.is(':hidden')) {
                    return;
                }

                const times = function (string, number) {
                    let r = '';

                    for (let i = 0; i < number; i++) {
                        r += string;
                    }

                    return r;
                };

                let val = self.value.replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                    .replace(/&/g, '&amp;')
                    .replace(/\n$/, '<br/>&nbsp;')
                    .replace(/\n/g, '<br/>')
                    .replace(/ {2,}/g, function (space) { return times('&nbsp;', space.length - 1) + ' '; });

                // Did enter get pressed?  Resize in this keydown event so that the flicker doesn't occur.
                if (event && event.data && event.data.event === 'keydown' && event.key === 'Enter') {
                    val += '<br />';
                }

                shadow.css('width', $self.width());
                shadow.html(val + (noFlickerPad === 0 ? '...' : '')); // Append '...' to resize pre-emptively.

                let newHeight = Math.max(shadow.height() + noFlickerPad, minHeight);

                if (settings.preGrowCallback !== null) {
                    newHeight = settings.preGrowCallback($self, shadow, newHeight, minHeight);
                }

                $self.height(newHeight);

                if (settings.postGrowCallback !== null) {
                    settings.postGrowCallback($self);
                }
            };

            $self.on('change', update).on('keyup', update).on('keydown', { event: 'keydown' }, update);
            $(window).on('resize', update);

            update();
        });
    };
})(jQuery);
