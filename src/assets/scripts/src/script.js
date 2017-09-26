var CoverLetterCreator = {
	"status": {},
	"init": function() {

		CoverLetterCreator.getTemplate();

		if( typeof localStorage.CoverLetterCreator !== 'undefined' ){
			// Populate inputs from localStorage
			var inputs = JSON.parse(localStorage.CoverLetterCreator);
			for( var name in inputs ){
				$('#form input[name="'+name+'"]').val(inputs[name]);
			}
		}

		$('#change-template').on('change', function() {
			CoverLetterCreator.getTemplate($(this).val());
		})

		$('#form input').on('change', function() {
			CoverLetterCreator.replaceVariables($(this).attr('name'), $(this).val());
			// Store in local storage?

			CoverLetterCreator.status[$(this).attr('name')] = $(this).val();
			localStorage.CoverLetterCreator = JSON.stringify(CoverLetterCreator.status);
		})

	},
	"getTemplate": function(templateName) {
		// Get a letter
		var template = 'default';
		if (templateName) {
			template = templateName;
		}

		$.get('../../../templates/' + template + '.html', function(data) {
			var letterContent = data,
				reg = new RegExp('\\\$\\\{([A-Za-z0-9-]+)\\\}', 'g');
			// Parse template
			letterContent = letterContent.replace(reg, '<span class="replace-me" data-variable="$1"></span>');
			// Append to DOM
			$('#letter-content').html(letterContent);
			CoverLetterCreator.replaceVariables();
		})
	},
	"replaceVariables": function(variable, value) {
		if (variable) {
			var $replacables = $('#letter-content .replace-me[data-variable="' + variable + '"]');

			$replacables.text(value);
			if (value && value.length > 0) {
				$replacables.addClass('replaced');
			} else {
				$replacables.removeClass('replaced');
			}
		} else {
			var $inputs = $('#form input');
			$inputs.each(function() {
				var variable = $(this).attr('name'),
					value = $(this).val();
				CoverLetterCreator.replaceVariables(variable, value);
			})
		}
	}
}

CoverLetterCreator.init();