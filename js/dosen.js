function insert_dosen(){
	$('#modal_click').click();
	$('#title_modal').html("Tambah Data Dosen");
	var html ='';
	html +='<input type="" id="nik" onkeypress="" class="form-control" placeholder="NIK">\
	<input type="text" id="nama" class="form-control" placeholder="Nama">\
	<div>Jenis Kelamin : <select id="jk">\
	  <option value="Laki-laki">Laki-laki</option>\
	  <option value="Perempuan">Perempuan</option>\
	</select></div>\
	<input type="text" id="alamat" class="form-control" placeholder="Alamat">\
	<input type="text" id="email" class="form-control" placeholder="Email">\
	<input type="text" id="tmp_lahir" class="form-control" placeholder="Tempat lahir">\
	<input type="text" id="tgl_lahir" class="form-control" placeholder="Tanggal lahir">\
	<center><button type="button" class="btn btn-danger" onclick="add_dosen()">Simpan</button></center>'
	$('#modal_content').html(html);
}

function add_dosen(){
	var data_req ={'access_token':App.access_token,'nik':$('#nik').val(),'jk':$('#jk select').val(),'nama':$('#nama').val(),'alamat':$('#alamat').val(),'tmp_lahir':$('#tmp_lahir').val(),'tgl_lahir':$('#tgl_lahir').val(),'email':$('#email').val()}
	var mhs = new majax_post('dosen',data_req,'');
	mhs.error(function(data){
		alert(data.responseText);
	}),
	mhs.success(function(data){
		//console.log(data);
		$('#dosen').click();
	});
}

function del_dosen(nik){
	var data_req ={}
	var mhs = new majax_delete('dosen/'+nik+'?access_token='+App.access_token,data_req,'');
	mhs.error(function(data){
		alert(data.responseText);
	}),
	mhs.success(function(data){
		//console.log(data);
		$('#dosen').click();
	});
}

function edit_dosen(nik){
	var data_req ={'access_token':App.access_token}
	var mhs = new majax('dosen/'+nik,data_req,'');
	mhs.error(function(data){
		alert(data.responseText)
	}),
	mhs.success(function(item){
		$('#modal_click').click();
		$('#title_modal').html("Edit Data Dosen");
		var html ='';
		var nik = item.nik;
		var nama = item.nama;
		var jk = item.jk;
		var alamat = item.alamat;
		var email = item.email;
		var tmp_lahir = item.tmp_lahir;
		var tgl_lahir = item.tgl_lahir;
		html +='<input type="text" value="'+nik+'" id="nim" onkeypress="" class="form-control" placeholder="NIK" disabled="disabled">\
		<input type="text" id="nama" value="'+nama+'" class="form-control" placeholder="Nama">\
		<div>Jenis Kelamin : <span id="jk"><select>\
		  <option value="Laki-laki">Laki-laki</option>\
		  <option value="Perempuan">Perempuan</option>\
		</select></span></div>\
		<input type="text" id="jur" value="'+alamat+'" class="form-control" placeholder="Alamat">\
		<input type="text" value="'+email+'" id="email" class="form-control" placeholder="Email">\
		<input type="text" value="'+tmp_lahir+'" id="tmp_lahir" class="form-control" placeholder="Tempat lahir">\
		<input type="text" value="'+tgl_lahir+'" id="tgl_lahir" class="form-control" placeholder="Tanggal lahir">\
		<center><button type="button" class="btn btn-danger" onclick="update_dosen('+nik+')">Edit</button></center>'
		$('#modal_content').html(html);
		$('#jk select').val(jk)

	})
}

function update_dosen(nik){
	var data_req ={'access_token':App.access_token,'nama':$('#nama').val(),'jk':$('#jk select').val(),'alamat':$('#alamat').val(),'tmp_lahir':$('#tmp_lahir').val(),'tgl_lahir':$('#tgl_lahir').val(),'email':$('#email').val()}
	var mhs = new majax_put('dosen/'+nik,data_req,'');
	mhs.error(function(data){
		alert(data.responseText);
	}),
	mhs.success(function(data){
		//console.log(data);
		$('#dosen').click();
	});
}
