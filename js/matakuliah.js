var kd_jur,smstr;
function load_makul(x,a,b,c){
	console.log(x,a,b,c)

	kd_jur = x;
	smstr = b;
	var d ='';
	// if(a==0 || a==1){
	// 	d='';
	// 	for(i=0;i<8;i++){
	// 		var k = i+1;
	// 		d +='<li class="cursor" onclick="load_makul('+a+','+i+')"><a>Semester '+k+'</a></li>';
	// 	}
	// 	$('#makul_semester').html(d);

	// }else{
	// 	d='';
	// 	for(i=0;i<6;i++){
	// 		var k = i+1;
	// 		d +='<li class="cursor" onclick="load_makul('+a+','+i+')"><a>Semester '+k+'</a></li>';
	// 	}
	// 	$('#makul_semester').html(d);

	// }
	var c = parseInt(a)+1;
	
	$('.tab_jur').removeClass('active');
	$('#prodi'+c).addClass('active');
	jur = parseInt(a);
	var html='';
    n=1;
    var jum_sks=0;
    //console.log(makul[a].makul.length)
    if(makul[a]){
    	var max = makul[a].makul.length;
	    //console.log(max)
	    if(b<max){
		    makul[a].makul.forEach(function(item){
				//console.log(item)
				//console.log(c);
				var id= item.id;
				var kode = item.kode;
				var nama = item.nama;
				var sks = item.sks;
				var smstr = item.smstr;
				var prasyarat = item.prasyarat;
				html +='<tr>\
		            <td>'+n+'</td>\
		            <td>'+kode+'</td>\
		            <td>'+nama+'</td>\
		            <td class="center">'+sks+'</td>\
		            <td class="center">'+smstr+'</td>\
		            <td>'+prasyarat+'</td>\
		            <td>';
		        html +="<center><span class='fa fa-edit orange cursor' style='padding:5px;' onclick=edit_matakuliah('"+kd_jur+"','"+kode+"')></span><span class='fa fa-minus-circle red cursor' style='padding:5px;' onclick=del_matakuliah('"+kd_jur+"','"+kode+"','"+c+"')></span></center></td></tr>";
		            n++;
		            jum_sks=jum_sks+parseInt(sks);
			})
		}
			html +='<tr>\
		            <td class="center" colspan="3">Total</td>\
		            <td class="center">'+jum_sks+'</td>\
		            <td></td>\
		            <td class="center">-</td>\
		            <td></td></tr>';
		            n++;
			//console.log(html)
		    $('#list_makul').html(html);
    }
    
}

function insert_matakuliah(){
	$('#modal_click').click();
	$('#title_modal').html("Tambah Data Matakuliah");
	var html ='';
	html +='<input type="text" id="kode" class="form-control" placeholder="kode">\
	<input type="text" id="nama" class="form-control" placeholder="Nama">\
	<input type="text" id="sks" class="form-control" placeholder="SKS">\
	<input type="text" id="smstr" class="form-control" placeholder="Semester">\
	<input type="text" id="prasyarat" class="form-control" placeholder="Prasyarat">\
	<center><button type="button" class="btn btn-danger" onclick="add_matakuliah()">Simpan</button></center>'
	$('#modal_content').html(html);
}

function add_matakuliah(){
	//var jur = parseInt(kd_jur)+1;
	//var sms = parseInt(smstr)+1;
	var data_req ={'access_token':App.access_token,'id':kd_jur,'nama':$('#nama').val(),'kode':$('#kode').val(),'prasyarat':$('#prasyarat').val(),'sks':$('#sks').val(),'smstr':$('#smstr').val()}
	var mhs = new majax_post('matakuliah',data_req,'');
	mhs.error(function(data){
		alert(data.responseText);
	}),
	mhs.success(function(data){
		//console.log(data);
		$('#re_makul').click();
		// setTimeout(function(){
		// 	$('#prodi'+jur).click();
		// 	$('.tab_jur').removeClass('active');
		// 	$('#prodi'+jur).addClass('active');
		// },200)
		
	});
}
function del_matakuliah(id,kode,c){
	var data_req ={}
	var mhs = new majax_delete('matakuliah/'+id+'?access_token='+App.access_token+'&kode='+kode,'');
	mhs.error(function(data){
		alert(data.responseText);
	}),
	mhs.success(function(data){
		//console.log(data);
		$('#re_makul').click();
		console.log(id)
		setTimeout(function(){
			$('#prodi'+c).click();
			$('.tab_jur').removeClass('active');
			$('#prodi'+c).addClass('active');
		},500)
	});
}
var kode_makul;
var kode_jur;
//db.jurusan.aggregate({$unwind:'$makul'},{$match:{'makul.sks':'1'}})
function edit_matakuliah(id,kode){
	kode_makul=kode;
	kode_jur=id;
	var data_req ={'access_token':App.access_token}
	var mhs = new majax('jurusan/'+id,data_req,'');
	mhs.error(function(data){
		alert(data.responseText)
	}),
	mhs.success(function(item){
		$('#modal_click').click();
		$('#title_modal').html("Edit Data Matakuliah");
		item.makul.forEach(function(data){
			if(data.kode==kode_makul){
				var html ='';
				var nama = data.nama;
				var kode = data.kode;
				var sks = data.sks;
				var smstr = data.smstr;
				var prasyarat = data.prasyarat;
				html +='<input type="text" value="'+kode+'" id="kode" class="form-control" placeholder="NIK" disabled="disabled">\
				<input type="text" id="nama" value="'+nama+'" class="form-control" placeholder="kode">\
				<input type="text" id="sks" value="'+sks+'" class="form-control" placeholder="nama">\
				<input type="text" id="smstr" value="'+smstr+'" class="form-control" placeholder="jenjang">\
				<input type="text" id="prasyarat" value="'+prasyarat+'" class="form-control" placeholder="jenjang">';
				html+="<center><button type='button' class='btn btn-danger' onclick=update_matakuliah('"+kode_jur+"')>Edit</button></center>";
				$('#modal_content').html(html);
			}
		})
	})
}
function update_matakuliah(kode_jur){
	var jur = parseInt(kd_jur)+1;
	var sms = parseInt(smstr)+1;
	var data_req ={'access_token':App.access_token,'nama':$('#nama').val(),'kode':$('#kode').val(),'prasyarat':$('#prasyarat').val(),'sks':$('#sks').val(),'smstr':$('#smstr').val()}
	
	var mhs = new majax_put('matakuliah/'+kode_jur,data_req,'');
	console.log(mhs)
	mhs.error(function(data){
		alert(data.responseText);
	}),
	mhs.success(function(data){
		//console.log(data);
		$('#re_makul').click();
		// setTimeout(function(){
		// 	$('#prodi'+jur).click();
		// 	$('.tab_jur').removeClass('active');
		// 	$('#prodi'+jur).addClass('active');
		// },500)
		
	});
}
