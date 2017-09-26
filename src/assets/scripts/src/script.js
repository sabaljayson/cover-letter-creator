var CoverLetterCreator = {
	"init": function() {

		// Get a letter
		$.get('../../../templates/tech.html', function(data){
			var letterContent = data,
				reg = new RegExp('\\\$\\\{([A-Za-z0-9-]+)\\\}', 'g');
			letterContent = letterContent.replace(reg, '<span class="replace-me" data-variable="$1"></span>');
			$('#letter-content').html(letterContent);
		})

		$('form input').on('change', function(){
			CoverLetterCreator.replaceVariables( $(this).attr('name'), $(this).val() );
		})

	},
	"replaceVariables": function(variable, value){
		if(variable){
			$('#letter-content .replace-me[data-variable="'+variable+'"]').text(value).addClass('replaced');
		}
	}
}

CoverLetterCreator.init();