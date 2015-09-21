Events = new Mongo.Collection("Events")

var thumbStore = new FS.Store.GridFS("pictures", {
   transformWrite: function(fileObj, readStream, writeStream) {
    gm(readStream, fileObj.name()).autoOrient().resize('600', '600^').stream().pipe(writeStream);
   }
});

Images = new FS.Collection("images", {
 stores: [thumbStore]
});
