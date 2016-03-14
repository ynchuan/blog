 $(function() {
 	if (location.pathname != "/") {
 		$('.trigger a[href^="/' + location.pathname.split("/")[1] + '"]').addClass('active');
 	} else {
 		$('.none a:eq(0)').addClass('active');
 	}
 	$('.tooltip-right').tooltipster({
 		contentAsHTML: true,
 		position: 'right',
 	});
 	$('.tooltip-left').tooltipster({
 		contentAsHTML: true,
 		position: 'left',
 	});

 	$(".menu-icon").click(function() {
 		$(".trigger").toggle()
 	});
 	$(document).pjax("#route", "body", {
 		fragment: "body",
 		timeout: 1e5,
 		scrollTo: 0,
 		push: !0,
 		maxCacheLength: 20,
 		replace: !1
 	});
 	$(document).on("pjax:error", function(e, n, t, o, c) {
 		return c.success(n.responseText, t, n), !1
 	});
 	var options = {
 		url: "/gblk.json",
 		getValue: "title",
 		list: {
 			match: {
 				enabled: !0,
 				maxNumberOfElements: 5
 			}
 		},
 		template: {
 			type: "links",
 			fields: {
 				link: "url"
 			}
 		},
 		theme: "square"
 	};
 	$("#countries").easyAutocomplete(options), Pace.on("start", function() {
 		$(".pacel").show()
 	}), Pace.on("done", function() {
 		$(".pacel").hide()
 	}), $(function() {
 		$("img").lazyload({})
 	});
 	var waterfall = new Waterfall({
 		containerSelector: ".wf-container",
 		boxSelector: ".wf-box",
 		minBoxWidth: 180
 	});
 	$(".menu-icon").click(function() {
 		$(".trigger").toggle()
 	})
 });