const electron = require("electron");
const {app, BrowserWindow,ipcMain} = electron;

let mainWin="";
let child="";

app.on("ready", ()=>{
	mainWin = new BrowserWindow({ 
    width:1200, height:600,
    minWidth:800,
    minHeight: 600
  });
	mainWin.loadURL(`file://${__dirname}/index.html`);
	app.on('closed', function () { mainWin = null; app.exit() });
  mainWin.toggleDevTools();
});
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }

});
exports.childWindow = function(ezf_id){
 child = new BrowserWindow({ 
  width:1024, height:600,
  minWidth:1024,
  minHeight: 600,
  parent: mainWin, 
  modal: true,
  show: true
});
 child.loadURL(`file://${__dirname}/index2.html?ezf_id=${ezf_id}`);
 child.toggleDevTools();

 app.on('closed', function () { child = null; app.exit() });
}