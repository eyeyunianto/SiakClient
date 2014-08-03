function insert_jurusan(){
	$('#modal_click').click();
	$('#title_modal').html("Tambah Data Jurusan");
	var html ='';
	html +='<input type="text" id="kode" class="form-control" placeholder="kode">\
	<input type="text" id="nama" class="form-control" placeholder="Nama">\
	<input type="text" id="jenjang" class="form-control" placeholder="Jenjang">\
	<center><button type="button" class="btn btn-danger" onclick="add_jurusan()">Simpan</button></center>'
	$('#modal_content').html(html);
}

function add_jurusan(){
	var data_req ={'access_token':App.access_token,'nama':$('#nama').val(),'kode':$('#kode').val(),'jenjang':$('#jenjang').val()}
	var mhs = new majax_post('jurusan',data_req,'');
	mhs.error(function(data){
		alert(data.responseText);
	}),
	mhs.success(function(data){
		//console.log(data);
		$('#jurusan').click();
	});
}

function del_jurusan(kode){
	var data_req ={}
	var mhs = new majax_delete('jurusan/'+kode+'?access_token='+App.access_token,data_req,'');
	mhs.error(function(data){
		alert(data.responseText);
	}),
	mhs.success(function(data){
		//console.log(data);
		$('#jurusan').click();
	});
}

function edit_jurusan(id){
	var data_req ={'access_token':App.access_token}
	var mhs = new majax('jurusan/'+id,data_req,'');
	mhs.error(function(data){
		alert(data.responseText)
	}),
	mhs.success(function(item){
		$('#modal_click').click();
		$('#title_modal').html("Edit Data Jurusan");
		var html ='';
		var nama = item.nama;
		var kode = item.kode;
		var jenjang = item.jenjang;
		html='';
		html +='<input type="text" id="kode" value="'+kode+'" class="form-control" placeholder="kode" disabled="disabled">\
		<input type="text" id="nama" value="'+nama+'" class="form-control" placeholder="nama">\
		<input type="text" id="jenjang" value="'+jenjang+'" class="form-control" placeholder="jenjang">';

		html+="<center><button type='button' class='btn btn-danger' onclick=update_jurusan('"+kode+"')>Edit</button></center>";
		$('#modal_content').html(html);

	})
}

function update_jurusan(kode){
	var data_req ={'access_token':App.access_token,'nama':$('#nama').val(),'jenjang':$('#jenjang').val()}
	var mhs = new majax_put('jurusan/'+kode,data_req,'');
	mhs.error(function(data){
		alert(data.responseText);
	}),
	mhs.success(function(data){
		//console.log(data);
		$('#jurusan').click();
	});
}
