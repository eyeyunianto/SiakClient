function list_krs(){
	$('#insert').attr('onclick','insert_mhs()');
	$('#title').html('Daftar Mahasiswa');
	var data_req ={'access_token':App.access_token}
	var mhs = new majax('mahasiswa',data_req,'');
	mhs.error(function(data){
		alert(data.responseText)
	}),
	mhs.success(function(data){
		var list='';
		n=1
		data.forEach(function(item) {
			//console.log(item)
			var nim = item.nim;
			var nama = item.nama;
			var jk = item.jk;
			var angkatan = item.angkatan;
			var jurusan = item.jurusan;
			
            list +='<tr><td class="center">'+n+'</td>';
            if(item.krs==true){	
				list+='<td  id=act_'+nim+' onclick="det_krs('+nim+',\''+jurusan+'\')" class="cursor" >'+nim+'</td>';
			}else{
				list+='<td  id=act_'+nim+'>'+nim+'</td>';
			}
            
            list+='<td>'+nama+'</td>';
            if(item.krs==true){		
            	list+='<td class="green">Unlocked</td><td><center><span class="cursor" onclick="lock('+nim+')"> <i class="fa fa-lock"></i> LOCK </span></center></td>';
            }else{
            	list+='<td class="red">Locked</td><td><center><input type="text" value="" id="smstr" class="form-control" placeholder="semester"><span class="cursor" onclick="unlock('+nim+',\''+nama+'\')"> <i class="fa fa-unlock"></i> UNLOCK </span></center></td>';
            }

            n++
		})
		list +='<tr><td></td><td></td><td></td><td></td><td style="text-align:right">Total Result = '+(n-1)+'</td></tr>';
		$('#mhs_tabel').html(list)
	})
}

function unlock(nim,nama){
	if($('#smstr').val()==""){
		alert('You must fill the semester field to continue')
	}else{
		var data_req ={'access_token':App.access_token}
		var mhs = new majax_put('mahasiswa/open/'+nim,data_req,'');
		mhs.error(function(data){
			alert(data.responseText);
		}),
		mhs.success(function(data){
			//console.log(data);
			//$('#mhs').click();
			create_krs(nim,$('#smstr').val(),nama);
			list_krs();
		});
	}
}

function create_krs(nim,smstr,nama){
	var data_req ={'access_token':App.access_token,'nim':nim,'smstr':smstr,'nama':nama}
	var mhs = new majax_post('krs',data_req,'');
	mhs.error(function(data){
		alert(data.responseText);
	}),
	mhs.success(function(data){
		//console.log(data);
	});
}

function lock(nim){
	var data_req ={'access_token':App.access_token}
	var mhs = new majax_put('mahasiswa/close/'+nim,data_req,'');
	mhs.error(function(data){
		alert(data.responseText);
	}),
	mhs.success(function(data){
		//console.log(data);
		//$('#mhs').click();
		remove_krs(nim);
		list_krs();
	});
}

function remove_krs(nim){
	var data_req ={}
	var mhs = new majax_delete('krs/'+nim+'?access_token='+App.access_token,data_req,'');
	mhs.error(function(data){
		alert(data.responseText);
	}),
	mhs.success(function(data){
		//console.log(data);
	});
}

var makul_tawar;
function det_krs(nim,jurusan){
	$('#krs_back').attr('onclick','det_krs("'+nim+'","'+jurusan+'")');
	
	window.location.href="#/main/det/detkrs/"+nim+"/";
	$('#title').html('Detail Kartu Rencana Study');
	var data_req ={'access_token':App.access_token}
	var mhs = new majax('krs/'+nim,data_req,'');
	setTimeout(function(){
		$('#btn_krs').attr('onclick','add_krs(\''+nim+'\')');
	},500)
	
	mhs.error(function(data){
		alert(data.responseText)
	}),
	mhs.success(function(data){
		var list='';
		var nim = data.nim;
		var nama = data.nama;
		var smstr = data.smstr;
		var krs=data.krs;

		list_makul_krs(jurusan,parseInt(smstr)%2)


		$('#nim').html(nim);
		$('#nama').html(nama);
		$('#smstr').html(smstr);
		var jum_sks=0;
		n=1
		if(krs){
			krs.forEach(function(item) {
				console.log(item)
				var id= item.id;
				var kode = item.kode;
				var nama = item.nama;
				var sks = item.sks;
				var smstr = item.smstr;
				list +='<tr>\
	                <td class="center">'+n+'</td>\
	                <td>'+kode+'</td>\
	                <td>'+nama+'</td>\
	                <td><center>'+sks+'</center></td>';

	            list +="<td><center><span class='fa fa-minus-circle red cursor' style='padding:5px;' onclick=del_krs('"+nim+"','"+kode+"')></span></center></td></tr>";
	                n++;
	                jum_sks=jum_sks+parseInt(sks);
			})
		}
		list+='<tr>\
		            <td class="center" colspan="3">Total</td>\
		            <td class="center">'+jum_sks+'</td>\
		            <td></td>\
		            </tr>';
		list +='<tr><td></td><td></td><td></td><td></td><td style="text-align:right">Total Result = '+(n-1)+'</td></tr>';
    			$('#krs_tbl').html(list)
	});
}

function list_makul_krs(kd,smstr){
	var list="";
	var data_req ={'access_token':App.access_token,'where':'{\"kode\": \"'+kd+'\"}'}
	var mhs = new majax('matakuliah',data_req,'');
	mhs.error(function(data){
		alert(data.responseText)
	}),
	mhs.success(function(data){
		var i= data[0].makul.length;
		var makul = data[0].makul;
		if(i>0){
			makul_tawar=makul;
			makul.forEach(function(item){
				var kode = item.kode;
				var nama = item.nama;
				var sks = item.sks;
				console.log(kode)
				list+='<option value="'+kode+'_'+nama+'_'+sks+'">'+kode+'_'+nama+'</option>'
			})
			$('#makul').html(list)
		}else{

		}
	})
}
function add_krs(nim){
	var e = document.getElementById("makul");
	var data = e.options[e.selectedIndex].value.split('_');
	var kode = data[0];
	var nama = data[1];
	var sks = data[2];
	var data_req ={'access_token':App.access_token,'nama':nama,'kode':kode,'sks':sks }
	var mhs = new majax_put('krs/'+nim,data_req,'');
	console.log(mhs)
	mhs.error(function(data){
		alert(data.responseText);
	}),
	mhs.success(function(data){
		$('#krs_back').click();
	});
}

function del_krs(nim,kode){
	var data_req ={'access_token':App.access_token,'action':'edit','kode':kode}
	var mhs = new majax_put('krs/'+nim,data_req,'');
	console.log(mhs)
	mhs.error(function(data){
		alert(data.responseText);
	}),
	mhs.success(function(data){
		$('#krs_back').click();
	});
}