function cat_nilai(){
	$('#modal_click').click();
	$('#title_modal').html("Select Kriteria");
	$('.modalDialog').css('width','500');
	var html ='';
	html +='<center><input type="text" id="smstr_nilai" class="form-control" placeholder="Smstr" style="width:70px"></center>\
	<div class="center">Jurusan<br><select id="nilai_jur">\
	</select><br></div>\
	<div class="center">Matakuliah<br><select id="nilai_makul">\
	</select></div><br>\
	<center><button type="button" class="btn btn-danger" onclick="det_nilai()">Detail Nilai</button></center>'
	$('#modal_content').html(html);
	makul_();
}

function makul_(){
	var data_req ={'access_token':App.access_token,'sort':'_id'}
	var mhs = new majax('matakuliah',data_req,'');
	mhs.error(function(data){
		alert(data.responseText)
	}),
	mhs.success(function(data){
		var list='';
		var list1='';
		var det='';
		var sub='';
        n=1;
		data.forEach(function(item) {
			var kode = item.kode;
			var prodi = item.nama;
            sama=kode;
			var k= n-1;
			list +='<option value="'+k+'">'+prodi+'</option>';
		     n++
        })
        $('#nilai_jur').html(list);
        makul = data;
        makul[0].makul.forEach(function(item){
			var kode = item.kode;
			var nama = item.nama;
			list1 +='<option value="'+kode+'">('+kode+') '+nama+'</option>';
		});
		$('#nilai_makul').html(list1);
	})
	check_makul_nilai();
}

function check_makul_nilai(){
	var list='';
	$('#nilai_jur').change(function(){
		var k =$('#nilai_jur').val();
		if(makul[k]){
			makul[k].makul.forEach(function(item){
				var kode = item.kode;
				var nama = item.nama;
				list +='<option value="'+kode+'">('+kode+') '+nama+'</option>';
			});
		}else{
			list +='';
		}
		
		$('#nilai_makul').html(list);
	})
}

var n_kd_makul,n_smstr;

function det_nilai(){
	var jur=$('#nilai_jur').val();
	var makul=$('#nilai_makul').val();
	var smstr=$('#smstr_nilai').val();
	n_kd_makul=makul;
	n_smstr=smstr;
	if(smstr==""){
		alert('Field Semester harus di isi')
	}else{
		$('#close_pass').click();
		window.location.href="#/main/det/nilai/"+makul;
		var data_req ={'access_token':App.access_token,'smstr':smstr}
		var mhs = new majax('nilai/'+makul,data_req,'');
		mhs.error(function(data){
			alert(data.responseText)
		}),
		mhs.success(function(data){
			var list='';
			n=1
			data.forEach(function(item) {
				var nim = item.nim;
				var nama = item.nama;
				list +='<tr>\
	                <td class="center">'+n+'</td>\
	                <td class="center">'+nim+'</td>\
	                <td>'+nama+'</td>';

                list+='<td><center><select onChange="add_nilai(\''+nim+'\')" id="add_nilai'+nim+'">\
                <option value=""></option>\
                <option value="'+nim+'_A">A</option>\
                <option value="'+nim+'_B">B</option>\
                <option value="'+nim+'_C">C</option>\
                <option value="'+nim+'_D">D</option>\
                <option value="'+nim+'_E">E</option>\
                </select></center></td></tr>';
	                n++;
			})
			list +='<tr><td></td><td></td><td></td><td style="text-align:right">Total Result = '+(n-1)+'</td></tr>';
			$('#tbl_nilai').html(list);
			add_nilai(n);
		})
	}
}

function add_nilai(nim){
	var a = $('#add_nilai'+nim).val();
	console.log(a);
	if(a){
		var b = a.split('_');
		var nim = b[0];
		var nilai = b[1];
		console.log(nim)
		var data_req ={'access_token':App.access_token,'smstr':n_smstr,'nilai':nilai,'kode':n_kd_makul};
		console.log(data_req)
		var mhs = new majax_put('nilai/'+nim,data_req,'');
		mhs.error(function(data){
			alert(data.responseText);
		}),
		mhs.success(function(data){
			//console.log(data);
			// $('#dosen').click();
		});
	}
}

