function insert_mhs(){
	$('#modal_click').click();
	$('#title_modal').html("Tambah Data Mahasiswa");
	var html ='';
	html +='<input type="text" id="nim" onkeypress="" class="form-control" placeholder="NIM">\
	<input type="text" id="nama" class="form-control" placeholder="Nama">\
	<div>Jenis Kelamin : <select id="jk">\
	  <option value="Laki-laki">Laki-laki</option>\
	  <option value="Perempuan">Perempuan</option>\
	</select></div>\
	<div>Jurusan : <span id="jur"><select>\
		</select></span></div>\
	<input type="text" id="angkatan" class="form-control" placeholder="Angkatan">\
	<input type="text" id="email" class="form-control" placeholder="Email">\
	<input type="text" id="tmp_lahir" class="form-control" placeholder="Tempat lahir">\
	<input type="text" id="tgl_lahir" class="form-control" placeholder="Tanggal lahir">\
	<input type="text" id="alamat" class="form-control" placeholder="Alamat">\
	<center><button type="button" class="btn btn-danger" onclick="add_mhs()">Simpan</button></center>'
	$('#modal_content').html(html);
	load_jur()
}

function add_mhs(){
	var data_req ={'access_token':App.access_token,'nim':$('#nim').val(),'nama':$('#nama').val(),'jk':$('#jk select').val(),'angkatan':$('#angkatan').val(),'jurusan':$('#jur select').val(),'tmp_lahir':$('#tmp_lahir').val(),'tgl_lahir':$('#tgl_lahir').val(),'email':$('#email').val(),'alamat':$('#alamat').val()}
	var mhs = new majax_post('mahasiswa',data_req,'');
	mhs.error(function(data){
		alert(data.responseText);
	}),
	mhs.success(function(data){
		//console.log(data);
		$('#mhs').click();
	});
}

function del_mhs(nim){
	var data_req ={}
	var mhs = new majax_delete('mahasiswa/'+nim+'?access_token='+App.access_token,data_req,'');
	mhs.error(function(data){
		alert(data.responseText);
	}),
	mhs.success(function(data){
		//console.log(data);
		$('#mhs').click();
	});
}

function edit_mhs(nim){
	var data_req ={'access_token':App.access_token}
	var mhs = new majax('mahasiswa/'+nim,data_req,'');
	mhs.error(function(data){
		alert(data.responseText)
	}),
	mhs.success(function(item){
		$('#modal_click').click();
		$('#title_modal').html("Edit Data Mahasiswa");
		var html ='';
		var nim = item.nim;
		var nama = item.nama;
		var jk = item.jk;
		
		var angkatan = item.angkatan;
		var jurusan = item.jurusan;
		var email = item.email;
		var tmp_lahir = item.tmp_lahir;
		var tgl_lahir = item.tgl_lahir;
		var alamat = item.alamat;
		html +='<input type="text" value="'+nim+'" id="nim" onkeypress="" class="form-control" placeholder="NIM" disabled="disabled">\
		<input type="text" id="nama" value="'+nama+'" class="form-control" placeholder="Nama">\
		<div>Jenis Kelamin : <span id="jk"><select>\
		  <option value="Laki-laki">Laki-laki</option>\
		  <option value="Perempuan">Perempuan</option>\
		</select></span></div>\
		<div>Jurusan : <span id="jur"><select>\
		</select></span></div>\
		<input type="text" value="'+angkatan+'" id="angkatan" class="form-control" placeholder="Angkatan">\
		<input type="text" value="'+email+'" id="email" class="form-control" placeholder="Email">\
		<input type="text" value="'+tmp_lahir+'" id="tmp_lahir" class="form-control" placeholder="Tempat lahir">\
		<input type="text" value="'+tgl_lahir+'" id="tgl_lahir" class="form-control" placeholder="Tanggal lahir">\
		<input type="text" value="'+alamat+'" id="alamat" class="form-control" placeholder="Alamat">\
		<center><button type="button" class="btn btn-danger" onclick="update_mhs('+nim+')">Edit</button></center>'
		$('#modal_content').html(html);
		load_jur(jurusan);
		$('#jk select').val(jk)
		//$('#jur select').val(jurusan)

	})
}

function update_mhs(nim){
	var data_req ={'access_token':App.access_token,'nama':$('#nama').val(),'jk':$('#jk select').val(),'angkatan':$('#angkatan').val(),'jurusan':$('#jur select').val(),'tmp_lahir':$('#tmp_lahir').val(),'tgl_lahir':$('#tgl_lahir').val(),'email':$('#email').val(),'alamat':$('#alamat').val()}
	var mhs = new majax_put('mahasiswa/'+nim,data_req,'');
	mhs.error(function(data){
		alert(data.responseText);
	}),
	mhs.success(function(data){
		//console.log(data);
		$('#mhs').click();
	});
}

function load_jur(_data){
	var data_req ={'access_token':App.access_token}
	var mhs = new majax('jurusan',data_req,'');
	mhs.error(function(data){
		alert(data.responseText)
	}),
	mhs.success(function(data){
		var list='';
		n=1
		data.forEach(function(item) {
			//console.log(item)
			var kode = item.kode;
			var nama = item.nama;
			list +='<option value='+kode+'>'+nama+'</option>';
                n++;
		})
		$('#jur select').html(list);
	})
	if(_data){
		console.log(_data)
		setTimeout(function(){
			$('#jur select').val(_data);
		},200)
		
	}
}