
jQuery(document).ready(function($) {
    var generate_content = function() {
		var add_entry = function(node, entry) {
			var tmpl = $.templates("#templ_timeline_block"); // Get compiled template
			var icon = "img/cd-icon-picture.svg"
			if (entry.gsx$icon.$t) {
				icon = entry.gsx$icon.$t;
			}
			var data = {
				title: entry.gsx$title.$t,
				content: entry.gsx$content.$t,
				"date" : entry.gsx$date.$t,
				"icon" : icon
			};
			var html = tmpl.render(data);
			node.append(html);
		}
        var spreadsheetID = "1Ng6g9BgYO35wSnNM49jpjOuiRnrhqFY-lj8nqrRyU1Y";
        var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json";
        var timeline_block = $("#cd-timeline");

        $.getJSON(url, function(data) {
            var entry = data.feed.entry;

            $(entry).each(function() {
                add_entry(timeline_block, this)
            });

			if (on_blocks_loaded) {
				on_blocks_loaded();
			}
        });

    };

	var on_blocks_loaded = function() { 
		var timelineBlocks = $('.cd-timeline-block'),
			offset = 0.8;

		//hide timeline blocks which are outside the viewport
		hideBlocks(timelineBlocks, offset);

		//on scolling, show/animate timeline blocks when enter the viewport
		$(window).on('scroll', function(){
		
			(!window.requestAnimationFrame) 
				? setTimeout(function(){ showBlocks(timelineBlocks, offset); }, 100)
				: window.requestAnimationFrame(function(){ showBlocks(timelineBlocks, offset); });
		});

		function hideBlocks(blocks, offset) {
			blocks.each(function(){
				( $(this).offset().top > $(window).scrollTop()+$(window).height()*offset ) && $(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
			});
		}

		function showBlocks(blocks, offset) {
			blocks.each(function(){
				( $(this).offset().top <= $(window).scrollTop()+$(window).height()*offset && $(this).find('.cd-timeline-img').hasClass('is-hidden') ) && $(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
			});
		}
	}

    generate_content();

});
