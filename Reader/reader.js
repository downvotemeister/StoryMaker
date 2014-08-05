var story = null;

function jumpto(level, column)
{
	if(story != null && story)
	{
		$('#options').text('End of story.');
		var cleared = false;
		$('#file_output').text(story.levels[level][column].text);
		for(var i = 0; i < story.levels[level][column].options.length; i++)
		{
			if(!cleared)
			{
				$('#options').html('');
				cleared = true;
			}
			var option = story.levels[level][column].options[i];
			$('#options').append('<button onclick="jumpto(' + option.goto.level + ', ' + option.goto.section + ')"> ' + option.text + ' </button>');
		}
	}
}

if (window.File && window.FileReader)
{
	$('#file_chooser').on('change', function(e)
	{
		var file = e.target.files[0];
		var reader = new FileReader();
		reader.onload = function(e)
		{
			$('#file_chooser').css('display', 'none');
			var readString = e.target.result;
            console.log(e.target.result);
			story = JSON.parse(readString);
			jumpto(0,0);
        };
		reader.readAsText(file);
	});
}
else
{
	$('#file_chooser').css('display', 'none');
	$('#file_output').text('This browser is unsupported. Please use a modern browser to view this page, such as Google Chrome.');
}