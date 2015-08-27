Events = new Mongo.Collection("Events")



// var thumbStore = new FS.Store.GridFS("thumb");
var thumbStore = new FS.Store.FileSystem("thumb", {
   transformWrite: function(fileObj, readStream, writeStream) {
       gm(readStream, fileObj.name()).autoOrient().resize('600', '250^').stream().pipe(writeStream);
   }
});

Images = new FS.Collection("images", {
stores: [thumbStore]
});
