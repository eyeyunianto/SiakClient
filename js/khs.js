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