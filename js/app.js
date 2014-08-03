App = Ember.Application.create();

App.Router.map(function() {
  // put your routes here
  this.resource('signin');
});

App.base_url="http://127.0.0.1:1337/";
App.client_id="EA9QB1Q6MY";
App.client_secret="cHOKDymJMUkmen7JQRffllf2whFtgX";
App.refresh_token;
App.access_token='SG21dUzE3uw45Fj9eWvbsIDxtH0mnp8kw5dhE0hMHyL7Xm8TponkrOYM2qoBHarhGobFH4tzCEoTQabjIIZoaMX66rC5TZ0cePxna8K1hXkPdfJAiM1YaHRm7mOG0dFRbaeqUNRk5X1VZZKSULq6RyvxlQH0hi1bQULOFjU3kM3o9FIojkg5fnUSdMCgufkrqsdtlq5rHXajrApCU5i3CkuejmLjMqSQdEDRZfikmRWUXw5Tm4PU8MD8M28dQy4M';
//App.access_token='5lYyfrXgkjSffIA6GsnzmS8pIzX06t0rdgdRzNZwt3E7I1TeS0Ma5ZGCtGTbKAeRzuW4SzBF1ic6tMKR5SzbUQaBYu94PLRDuk4X6R8LiTVPzAGxoEwshrc2ZDRddaUIxws15aD2r7D5azm3G1oFp2B92Zxe1d7nC2W9EjmU5xhVimurpiCPOVYYliIfTI7PHrY6xuIaFtEuK1Tzts7T5PV6IfZYhrKAHSjVCGu5EN78Zyy406q0GFIZLhjSdcR7';
App.Router.map(function(){
	this.resource('signin');
	this.resource('main',function(){
		this.resource('mhs');
		this.resource('dosen');
		this.resource('jurusan');
		this.resource('matakuliah');
		this.resource('krs');
		this.resource('khs');
		this.resource('nilai');
		this.resource('profile');
        this.resource('det',function(){
            this.resource('detkrs', { path: '/detkrs/:nim' });
            this.resource('detkhs', { path: '/detkhs/:nim' });
        });
	})
})
var aku;
var makul=[];
App.ApplicationRoute = Ember.Route.extend({
	actions: {
		login:function(){
			var data = JSON.parse(sys.cliOut('curl -XPOST "http://localhost:1337/oauth/token" -d "grant_type=password&client_id=L84D9CNTS2&client_secret=uXjTEOxAnYojwYS29cRZhVSVplhxlk&username='+$('#username').val()+'&password='+$('#password').val()+'"'));
			console.log(data);
			if(data.error){
				alert(data.error_description)
			}else{
				window.localStorage.setItem('access_token',data.access_token);
				window.localStorage.setItem('refresh_token',data.refresh_token);
				App.access_token = data.access_token;
				App.refresh_token = data.refresh_token;
				window.location.href="index.html#/main"
				if($('#username').val()=="me@gmail.com"){
					load_admin();
				}else{
					load_user();
				}
			}
			// $.ajax({
			//     url: App.base_url+'oauth/token',
			//     type: 'POST',
			//     dataType: 'json',
			// 	data: 'grant_type=password&client_id='+App.client_id+'&client_secret='+App.client_secret+'&username='+$('#username').val()+'&password='+$('#password').val(),
			//     success: function(res) {
			//         console.log(res);
			//     }
			// });
    	},
    	mhs:function(){
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
    				list +='<tr>\
		                <td class="center">'+n+'</td>\
		                <td>'+nim+'</td>\
		                <td>'+nama+'</td>\
		                <td>'+jk+'</td>\
		                <td>'+jurusan+'</td>\
		                <td class="center">'+angkatan+'</td>';

		            list += "<td><center><span class='fa fa-edit orange cursor' style='padding:5px;'' onclick=edit_mhs('"+nim+"')></span><span class='fa fa-minus-circle red cursor' style='padding:5px;' onclick=del_mhs('"+nim+"')></span></center></td></tr>";
		                n++
    			})
    			list +='<tr><td></td><td></td><td></td><td></td><td></td><td></td><td style="text-align:right">Total Result = '+(n-1)+'</td></tr>';
    			$('#mhs_tabel').html(list)
    		})
    	},
    	dosen:function(){
            $('#insert').attr('onclick','insert_dosen()');
    		$('#title').html('Daftar Dosen');
    		var data_req ={'access_token':App.access_token}
    		var mhs = new majax('dosen',data_req,'');
    		mhs.error(function(data){
    			alert(data.responseText)
    		}),
    		mhs.success(function(data){
    			var list='';
    			n=1
    			data.forEach(function(item) {
    				//console.log(item)
    				var nik = item.nik;
    				var nama = item.nama;
    				var alamat = item.alamat;
                    var jk = item.jk;
    				list +='<tr>\
		                <td class="center">'+n+'</td>\
		                <td>'+nik+'</td>\
		                <td>'+nama+'</td>\
                        <td>'+jk+'</td>\
		                <td>'+alamat+'</td>';

		            list +="<td><center><span class='fa fa-edit orange cursor' style='padding:5px;' onclick=edit_dosen('"+nik+"')></span><span class='fa fa-minus-circle red cursor' style='padding:5px;' onclick=del_dosen('"+nik+"')></span></center></td></tr>";
		                n++
    			})
    			list +='<tr><td></td><td></td><td></td><td></td><td></td><td style="text-align:right">Total Result = '+(n-1)+'</td></tr>';
    			$('#dosen_tabel').html(list)
    		})
    	},
    	jurusan:function(){
            $('#insert').attr('onclick','insert_jurusan()');
    		$('#title').html('Daftar Jurusan');
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
    				list +='<tr>\
		                <td class="center">'+n+'</td>\
		                <td class="center">'+kode+'</td>\
		                <td>'+nama+'</td>';

                    list+="<td><center><span class='fa fa-edit orange cursor' style='padding:5px;'' onclick=edit_jurusan('"+kode+"')></span><span class='fa fa-minus-circle red cursor' style='padding:5px;' onclick=del_jurusan('"+kode+"')></span></center></td></tr>";
		                n++;
    			})
    			list +='<tr><td></td><td></td><td></td><td style="text-align:right">Total Result = '+(n-1)+'</td></tr>';
    			$('#jurusan_tabel').html(list)
    		})
    	},
    	matakuliah:function(){
            var kd_;
    		$('#title').html('Daftar Matakuliah');
            $('#insert').attr('onclick','insert_matakuliah()')
    		var data_req ={'access_token':App.access_token,'sort':'_id'}
    		var mhs = new majax('matakuliah',data_req,'');
    		mhs.error(function(data){
    			alert(data.responseText)
    		}),
    		mhs.success(function(data){
    			var list='';
    			var det='';
    			var sub='';
                n=1;
    			data.forEach(function(item) {
    				//console.log(item)

    				var kode = item.kode;
    				var prodi = item.nama;
                    sama=kode;
    				var k= n-1;
    				list += "<li id='prodi"+n+"' class='tab_jur' onclick=load_makul('"+kode+"','"+k+"',0)><a>"+prodi+"</a></li>";
    			     n++
                })
    			makul = data;
    			$('#matkul_nav').html(list)
    		});
    		setTimeout(function(){
                if(jur){
                    $('#prodi'+jur).addClass('active');
                    load_makul(kd_jur,jur,0);
                }else{
        			$('#prodi1').addClass('active');
        			load_makul(sama,0,0)
                }
    		},100)
    	},
        krs:function(){
            if(App.user){
                det_krs();
            }else{
                list_krs();
            }
        },
        cleared:function(action){
            clear(action);
        },
        openModal: function(modalName, model) {
            //alert(model);
            //this.controllerFor(modalName).set('model', model);
            return this.render(modalName, {
                into: 'application',
                outlet: 'modal'
            });
        },
        closeModal: function() {
          return this.disconnectOutlet({
            outlet: 'modal',
            parentView: 'application'
          });
        }
	}
});

App.DetkhsRoute = Ember.Route.extend({
  model: function(params, transition) {
    return { nim: params.nim }; 
  },
  
  serialize: function(model) {
    return { nim: model.get('nim') }; 
  }
});
App.DetkrsRoute = Ember.Route.extend({
  model: function(params, transition) {
    return { nim: params.nim }; 
  },
  
  serialize: function(model) {
    return { nim: model.get('nim') }; 
  }
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return true;
  }
});

App.ModalController = Ember.ObjectController.extend({
  actions: {
    close: function() {
      return this.send('closeModal');
    }
  }
});

App.ModalDialogComponent = Ember.Component.extend({
  actions: {
    close: function() {
      return this.sendAction();
    }
  }
});

