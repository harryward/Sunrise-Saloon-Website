Events = new Mongo.Collection("Events")

var thumbStore = new FS.Store.GridFS("pictures", {
   transformWrite: function(fileObj, readStream, writeStream) {
    this.gm(readStream, fileObj.name).resize('600', '250^').stream().pipe(writeStream);
   }

});

Images = new FS.Collection("images", {
stores: [thumbStore]
});
