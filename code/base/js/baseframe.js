$(function() {
	footerFix();	
});
/**
 * 实现页面的footer在内容无法填充满屏的情况下，放在浏览器的底部；能够填充满屏高度的情况下这放在dom的底部
 * 所以dom在ajax的时候加载的情况下如果产生页面的高度的变化得到时候要调用一下该函数
 * @return {[type]} [description]
 */
function footerFix() {
	if ($(window).height() > $("body").height()) {
		$(".grp_footer").addClass("footerfix"); //固定底部
	} else {
		$(".grp_footer").removeClass("footerfix");
	}
}