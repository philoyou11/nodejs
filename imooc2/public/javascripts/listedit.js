$(function(){

	var deleteBtns = $('.btn-danger.del');
	deleteBtns.on('click', function(evt){
		var res = confirm("你确定么？");
		var $target = $(evt.target),
			 $dataRow = $target.parents("tr"),
			 id = $(this).data('id');
		if (res) {
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
		};

		
	});
	

});