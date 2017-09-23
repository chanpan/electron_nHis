var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: getFolders()+"/ezforms/ezform.db"  
  },
  useNullAsDefault: true
});//knex connection sqlite3
function getFolders(){
   return process.env.USERPROFILE+'\\Documents';
}
/************ Observable rxjs *****************/
var Observable = require('rxjs/Observable').Observable;
require('rxjs/add/observable/of');
require('rxjs/add/operator/map');


exports.knexCreateTableIfNotExists = (tables,columns,primary=[]) => {
  return knex.schema.createTableIfNotExists(tables, function (table) {
    if(primary == '' || primary.length == 0){
        primary='id';  
        table.increments(primary);    
    }else{
       table.primary(primary);
    }
     
    for(let i of columns){
        table.text(i,'longtext').collate('utf8_unicode_ci').comment(i).nullable();
    }
    
  });
}//CreateTable

exports.knexAlterAddColumn = (tables,columns,types='longtext')=>{ 
  return knex.schema.alterTable(tables, function(table) {
    table.text(columns,types);
  });
}//AlterTableAdd
exports.knexAlterRenameColumn = (tables,columns, to)=>{
   return knex.schema.alterTable(tables, function(table){
      table.renameColumn(columns, to)
   });
}
exports.knexAlterDropColumn = (tables,fields)=>{
  return knex.schema.alterTable(tables, function(table) {
    table.dropColumn(fields);
  });
}//Alter Drop Column

exports.knexDropTable = (tables)=>{
  return knex.schema.dropTable(tables);
}//DropTable

exports.knexDropTableIfExists = (tables)=>{
  return knex.schema.dropTableIfExists(tables)
}//DropTableIfExists

exports.knexGetColumnSqlite3 = (tables)=>{
   return knex.raw("PRAGMA table_info("+tables+")");
}//GetColumnSqlite3


exports.KnexAlterUnique = (tables, fields) =>{
 // t.string('email').unique().collate('utf8_unicode_ci');
  return knex.schema.alterTable(tables, function(table) {
    table.unique(fields);
  });
}
exports.KnexAlterPrimaryKey = (tables, fields) =>{
  // t.string('email').unique().collate('utf8_unicode_ci');
   return knex.schema.alterTable(tables, function(f) {
     f.primary(fields);
   });
 }

//////////////////////////////////////////////////// Insrt table =///////////////////////////////////////////////////////
exports.knexInsertColumToLocal = (table,data) => {
  return knex.insert(data).into(table);
}

//////////////////////////////////////////////////// update table =///////////////////////////////////////////////////////
exports.knexUpdateColumToLocal = (table,data,primary) => {
  return knex(table).where(primary).update(data);
}

//////////////////////////////////////////////////// delete table =///////////////////////////////////////////////////////
exports.knexDeleteColumToLocal = (table,wheres) => {
  return knex(table).where(wheres).del();
}

exports.knexfindAll = (table,limit="")=>{
  if(limit == ""){
    limit = 100;
  }
  return new Observable(ob => {
    knex.select('*').from(table).limit(limit).map(row=>ob.next(row)).catch(err=>ob.error(err));
  });
}

exports.knexfindById = (table,params)=>{
  return new Observable(ob => {
    knex.select('*').from(table).where(params).map(row=>ob.next(row)).catch(err=>ob.error(err));
  });
}
exports.getHospital = (hcodes)=>{
  return new Observable(ob =>{
    knex('all_hospital_thai').where('hcode', 'like', '%'+hcodes+'%').map(row=>ob.next(row)).catch(err=>ob.error(err));
  });
}


exports.knexfindById2 = async (table,params)=>{
  
    return await knex.select('*')
    .from(table)
    .where(params)
    .map(row=>row =row).catch(err=>console.log(err));
  
   
}








// knex.schema.createTableIfNotExists('users', function (table) {
//   table.increments('user_id');
//   table.string('firstname');
//   table.string('lastname');
//   table.string('tel');
//   table.timestamps();
// }).then(function(){
//     return knex.insert([
//       {firstname: 'nuttaphon',lastname:'sss',tel:"0862229416"},
//       {firstname: 'chanpan',lastname:'xxx',tel:"0892229416"}
//     ]).into('users');
// });
 
 
