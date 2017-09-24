var Observable = require('rxjs/Observable').Observable;
require('rxjs/add/observable/of');
require('rxjs/add/operator/map');
let syncKnex = require('./sql/knex-sqlite3.js');


/* check field length  */
exports.GetFielServer = function(table){

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": GetUrl()+"/ezforms/ezform-service/get-ezf-table?format=json&tbdata="+table, 
        "method": "GET",
        "headers": {
          "x-token": "549968af6006a2fe6c016bf9070b4899",
 
        }
      }
   return new Observable(ob=>{
        $.ajax(settings).done(function (response) {
            let table1 =[];
            let table2 =[];
            let out = {};
            for(let i of response){
                table1.push(i.Field);
            }
            syncKnex.knexGetColumnSqlite3(table)
            .then((resopnse2)=>{
                for(let i of resopnse2){
                    table2.push(i.name);
                }
                out["localField"]=table2;
                out["serverField"]=table1;
                
                ob.next(out);
                //CheckFieldInTable(table2,table1)
            })
            .catch(err=>console.log(err));
        
    });
   });   
    
}
function GetUrl(){
    return "https://www.thaicarecloud.org/";
}
 
/* check field local and server */
exports.CheckFieldInTable = (localField, serverField) => {
    var arr1 = [];
    var arr2 = [];
    var out = [];
    for (let i of localField) {
        arr1.push(i); //sqlite local
    }
    for (let i of serverField) {
        arr2.push(i); //ezform server
    }
    for (let i of arr2) {
        var a = arr1.indexOf(i);
        if (a == -1) {
            out.push(i);
        }
    }
    return new Observable(ob=>{
        ob.next(out);
    });
     
};


/* alter field */
exports.AlterNewField =(tables, fields)=>{
    for(let i of fields){
        return new Observable(ob=>{
            syncKnex.knexAlterAddColumn(tables,i).then(res=>ob.next("1")).catch(err=>ob.next("2"));
        });
    }
   
}
/* save data to field */
let main3_url="https://www.thaicarecloud.org/";
var settings = {
 "async": true,
 "crossDomain": true,
 "url": main3_url,
 "method": "GET",
 "headers": {
   "x-token": "549968af6006a2fe6c016bf9070b4899",
 }
}
exports.GetEzformFieldType = (ezf_id) => {
  settings.url =
    main3_url + "ezforms/ezform-service/get-field?ezf_id="+ezf_id;
  $.ajax(settings).done(function(response) {
    let res = JSON.parse(response);
    //console.log(res)
    for (let i in res.ezfields) {
      //console.log();
      let data = {
        ezf_id: res.ezfields[i].ezf_id,
        ezf_field_id: res.ezfields[i].ezf_field_id,
        ezf_field_name: res.ezfields[i].ezf_field_name,
        ezf_field_type: res.ezfields[i].ezf_field_type,
        ezf_table: res.ezform_table,
        ezf_field_label: res.ezfields[i].ezf_field_label,
        ezf_field_sub_id: res.ezfields[i].ezf_field_sub_id,
        ezf_field_lenght: res.ezfields[i].ezf_field_lenght
      };
      saveFieldsToLocalTableEzformSearch("ezform_fields", data);
       
    }
  });
};

  function saveFieldsToLocalTableEzformSearch(table, data){
    syncKnex.knexInsertColumToLocal(table,data)
    .then(res=>console.log("Save "+table+" success"))
    .catch(err=>console.log());
  }

/* save and update form */
exports.SaveEzform = (ezf_id="",data,target="",sitecode="",user_id="",submit=false, data_id="")=>{
    //"{\"var3\":\"ณัฐพล\",\"sys_lat\":11,\"sys_lng\":12}"
    data['sys_lat']='11';
    data['sys_lng']='12';
    //console.log(data);
    var form = new FormData();
    form.append("ezf_id", ezf_id);
    form.append("data", JSON.stringify(data));
    form.append("target", target);
    form.append("sitecode", sitecode);
    form.append("user_id", user_id);
    form.append("submit", submit);
    form.append("data_id", data_id); //update
    
    var settings2 = {
      "async": true,
      "crossDomain": true,
      "url": "https://www.thaicarecloud.org/api/v1/desktop-api/create-form",
      "method": "POST",
      "headers": {
        "x-token": "549968af6006a2fe6c016bf9070b4899",
      },
      "processData": false,
      "contentType": false,
      "mimeType": "multipart/form-data",
      "data": form
    }
    return new Observable(ob=>{
        $.ajax(settings2).done(function (response) {
            console.log(response);
            ob.next(response);
        });
    });
    
}

exports.LoadTbDataAll=(table)=>{
    var settings2 = {
        "async": true,
        "crossDomain": true,
        "url": "https://www.thaicarecloud.org/api/v1/desktop-api/tb-data?ezf_id=1505970320082452600",
        "method": "GET",
        "headers": {
          "x-token": "549968af6006a2fe6c016bf9070b4899",
          "cache-control": "no-cache",
          "postman-token": "2a4e2773-b834-41bf-ff68-73d834b634e3"
        }
      }
      return new Observable(ob=>{
        $.ajax(settings2).done(function (response) {
            ob.next(response);
          });
      });
      
}
