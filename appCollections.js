Events = new Mongo.Collection("Events")

var thumbStore = new FS.Store.GridFS("pictures", {
   transformWrite: function(fileObj, readStream, writeStream) {
    gm(readStream, fileObj.name).stream().pipe(writeStream);
   }

});

Images = new FS.Collection("images", {
stores: [thumbStore]
});
