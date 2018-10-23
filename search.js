var program = require('commander');
var fs = require('fs');
var path = require('path');
 
program
  .version('0.1.0')
  .arguments('[ext] [txt]')
  .action(function (ext, txt) {
     extValue = ext;
     txtValue = txt;
  });
 
program.parse(process.argv);
 
if (typeof extValue === 'undefined') {
   console.error('USAGE:node search [ext] [text]');
   process.exit(1);
}
if(typeof txtValue === 'undefined'){
    console.error('USAGE:node search [ext] [text]');
    process.exit(1);
}
var searchFiles = function(dir, pattern) {
    // This is where we store pattern matches of all files inside the directory
    var results = [];
  
    // Read contents of directory
    fs.readdirSync(dir).forEach(function (dirInner) {
      // Obtain absolute path
      dirInner = path.resolve(dir, dirInner);
  
      // Get stats to determine if path is a directory or a file
      var stat = fs.statSync(dirInner);
  
      // If path is a directory, scan it and combine results
      if (stat.isDirectory()) {
        results = results.concat(searchFiles(dirInner, pattern));
      }
  
      // If path is a file and ends with pattern then push it onto results
      if (stat.isFile() && dirInner.endsWith(pattern)) {
        results.push(dirInner);
      }
    });
  
    return results;
  };
  var files = searchFiles('./','.'+ extValue); 
  if(files===[]||files.length===0){
  console.log('No file was found');}
   else{
       var flag=0;
    files.forEach(file => {
        const fileContent = fs.readFileSync(file);

        // We want full words, so we use full word boundary in regex.
        const regex = new RegExp('\\b' + txtValue + '\\b');
        if (regex.test(fileContent)) {
            flag=1;
            console.log(file);
        } });
        //if no file was found
        if(flag===0)
        {
            console.log(`No File was found with extntion ${extValue} with search text ${txtValue}`);
        } 
}

