$(function(){
	var deleteBtns = $('.btn-danger.del');
	deleteBtns.on('click', function(evt){
		var $target = $(evt.target),
			 $dataRow = $target.parents("tr"),
			 id = $(this).data('id');

		$.post(
			'/admin/movie/delete',
			{ 
				id : id 
			},	
			function(data, status){
				if(data.success === 1){
					$dataRow.remove();
				}
			}	
		);	 

	});


});