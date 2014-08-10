function create_khs(){
	var item = _krs;
	var nim = item.nim;
	var nama = item.nama;
	var sms = item.smstr;
	var krs = item.krs;

	delete_khs(nim);

	var data_req ={'access_token':App.access_token,'nim':nim,sms:krs,'nama':nama}
	var a = JSON.stringify(data_req);
	var b = a.replace('\"sms\"','"'+sms+'"');
	var c = jQuery.parseJSON(b);
	var mhs = new majax_post('khs',c,'');
	mhs.error(function(data){
		alert(data.responseText);
	}),
	mhs.success(function(data){
		//console.log(data);
		push_khs(nim,sms);
	});
}

function push_khs(nim,smstr){
	var data_req ={'access_token':App.access_token,'khs':smstr}
	var mhs = new majax_put('khs/'+nim,data_req,'');
	mhs.error(function(data){
		alert(data.responseText);
	}),
	mhs.success(function(data){
		
	});
}

function delete_khs(nim){
	var data_req ={}
	var mhs = new majax_delete('khs/'+nim+'?access_token='+App.access_token,data_req,'');
	mhs.error(function(data){
		//alert(data.responseText);
	}),
	mhs.success(function(data){
		//console.log(data);
	});
}
var khs_all;
function list_khs(){
	$('#title').html('Daftar Kartu Hasil Study');
	var data_req ={'access_token':App.access_token}
	var mhs = new majax('khs',data_req,'');
	mhs.error(function(data){
		alert(data.responseText)
	}),
	mhs.success(function(data){
		var list='';
		n=1
		khs_all = data;
		data.forEach(function(item) {
			var nim = item.nim;
			var nama = item.nama;
			var khs = item.khs;

			list +='<tr>\
                <td class="center">'+n+'</td>\
                <td class="cursor" onclick="det_khs(\''+nim+'\')">'+nim+'</td>\
                <td>'+nama+'</td>\
                <td><select id="smstr">';
            khs.forEach(function(thn){
            	list +='<option value="'+thn+'">'+thn+'</option>';
            })
            list += "</select></td><td><center><span class='fa fa-minus-circle red cursor' style='padding:5px;' onclick=del_mhs('"+nim+"')></span><span class='fa fa-edit orange cursor' style='padding:5px;'' onclick=edit_mhs('"+nim+"')></span><span class='fa fa-print green cursor' style='padding:5px;'' onclick=edit_mhs('"+nim+"')></span></center></td></tr>";
                n++
		})
		list +='<tr><td></td><td></td><td></td><td></td><td style="text-align:right">Total Result = '+(n-1)+'</td></tr>';
		$('#khs_tabel').html(list)
	})
}

function det_khs(id){
	window.location.href="#/main/det/detkhs/"+id+"/";
	var html1='';
	var html2='';
	setTimeout(function(){
		if(khs_all){
			var jum_sks=0;
			var jum_bobot=0;
			khs_all.forEach(function(data, ki){
				if(data.nim==id){
					console.log(ki)
					var khs = data.khs;
					var nim = data.nim;
					var nama = data.nama;
					var makul = data.khs;
					var length = makul.length;
					$('#nim').html(nim);
					$('#nama').html(nama);
					khs.forEach(function(item){
						html1+='<option value=\''+item+'\'>'+item+'</option>';
					})
					var satu = makul[0];
					var object = get_property_from_target(data, satu)
					n=1
					object.forEach(function(item){
						var makul = item.nama;
						var kode = item.kode;
						var sks = item.sks;
						var nilai = item.nilai;
						var ip;
						if (nilai == "A" | nilai =="a"){
							ip = 4;
						}else if (nilai == "B" | nilai =="b"){
							ip = 3;
						}else if (nilai == "C" | nilai =="c"){
							ip = 2;
						}else if (nilai == "D" | nilai =="d"){
							ip = 1;
						}else{
							ip = 0;
						}
						if(nilai){
							angka =nilai;
							if(nilai)
							bobot = sks*ip
						}else{
							angka ="E";
							bobot =0;
						}
						html2 +='<tr>\
			                <td class="center">'+n+'</td>\
			                <td>'+kode+'</td>\
			                <td>'+makul+'</td>\
			                <td class="center">'+sks+'</td>\
			                <td class="center">'+angka+'</td>\
			                <td class="center">'+bobot+'</td></tr>';
			            n++;
			            jum_sks=jum_sks+parseInt(sks);
			            jum_bobot=jum_bobot+parseInt(bobot);
					})
					html2+='<tr>\
				            <td class="center" colspan="3">Total</td>\
				            <td class="center">'+jum_sks+'</td>\
				            <td></td>\
				            <td class="center">'+jum_bobot+'</td>\
				            </tr>';
				    html2+='<tr>\
				            <td class="center" colspan="3">IPK</td>\
				            <td class="center"></td>\
				            <td></td>\
				            <td class="center">'+jum_bobot/jum_sks+'</td>\
				            </tr>';
					html2 +='<tr><td></td><td></td><td></td><td></td><td></td><td style="text-align:right">Total Result = '+(n-1)+'</td></tr>';
					$('#khs_tbl').html(html2)
				}
			});
			$('#smstr_').append(html1);
		}
	},100)
}

function get_property_from_target(obj, target){
    var arr = target.split('.');
    for(var i = 0; i < arr.length; i++){
        if(obj)
            obj = obj[arr[i]];
    }
    return obj;
}