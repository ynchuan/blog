/**
 $(".grp_tab_1").tab();
 * tab页界面创建:只是进行事件的封装，并未进行界面dom的创建
 */
;
(function($) {
	$.fn.tab = function(options) {
		var ops = $.extend({

		}, options);
		var $this = $(this);
		var tab = new Tab($this, ops);
		tab.init();
		tab.addTabItemListener();
	}

	function Tab($this, opts) {
		this.target = $this;
		this.opts = opts;
	}
	Tab.prototype = {
		addTabItemListener: function() {
			this.target.on("click", ".yc_tab_li", function(event) {
				$this=$(this);
				var index=$this.parent().children().index($this);
				$this.siblings('.yc_tab_li').removeClass('active');
				var relateTabs = $this.addClass('active').parents(".yc_tab_h").siblings('.yc_tab_container');
				relateTabs.addClass('yc_tab_hide');
				relateTabs.eq(index).removeClass('yc_tab_hide');
				relateTabs = null;
				event.preventDefault();
			});
		},
		init: function() {

		},
		createDom: function() {
			var domStr = "";
			return domStr;
		}
	};
})(jQuery);