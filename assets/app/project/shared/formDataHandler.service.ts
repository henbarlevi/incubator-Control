// service that save files with name to key value pairs dictionary and only 
//append all files to formdata when calling the saveToFormData function
// in order to prevent unessecary files appended to formdata (if the user changed decided to change the file to upload)
//INFO:
    /**saves files into the FormData (formdata- key value pair https://developer.mozilla.org/en-US/docs/Web/API/FormData/append) */
    //NOTICE   If you call data.append('file', file) multiple times your request will contain an array of your files.
    // Myself using node.js and multipart handler middleware multer get the data as follows:
    //http://stackoverflow.com/questions/12989442/uploading-multiple-files-using-formdata
    
import { Injectable } from '@angular/core';

@Injectable() //in order to inject services - no need to do this when using @Component because @Component already implement the injection
export class FormDataHandlerService {

    formData: FormData = new FormData(); //key value pairs for the uploaded files of the project https://developer.mozilla.org/en-US/docs/Web/API/FormData
    filesDic = {};// dictionary that contain files (key = fieldname value  - if its single file input - object{ file :file , filename: filename}
                  //                                                         if its multipile file input - array [] - [{file:file,filename:filename},{file:file,filename:filename}]   )

    constructor() {
        console.log('got into the FormDataHandlerService ctor');//DEBUG
    }
    //adding the file to the filesDic (fieldname=key)
    saveFile(fieldname, file, filename) {
        console.log('saving single');
        this.filesDic[fieldname] = { file: file, filename: filename };
    }
    //in case we hanling with multipile file input we will save those file into an array {key:fieldname value [{file:file,filename:filename},{file:file,filename:filename}]}
    //adding the file to the filesDic 
    //save multi doesnt overrwrite a file if the fieldname already exist, it pushing it to the array
    saveMulti(fieldname, file, filename) {
        console.log('saving multi');        
        //if its the first file
        if (this.filesDic[fieldname] === undefined ) {
            this.filesDic[fieldname] = [];
        }
        this.filesDic[fieldname].push({ file: file, filename: filename });
    }
    deleteFile(fieldname) {
        delete this.filesDic[fieldname];
    }
    //saving all current saved files to form formdata
    //NOTE - difference between foreach vs for in vs for of : http://qnimate.com/foreach-vs-for-of-vs-for-in-in-javascript/
    saveToFormData() {
        console.log('saving the filesDic files into formData');
        //iterate props in filesDic
        for (var fieldname in this.filesDic) { //http://stackoverflow.com/questions/85992/how-do-i-enumerate-the-properties-of-a-javascript-object         
            if (this.filesDic.hasOwnProperty(fieldname)) {
                //if its multipile files related to a signle fieldname
                if (this.filesDic[fieldname].constructor === Array) {
                    for (var value of this.filesDic[fieldname]) {
                        this.formData.append(fieldname,value.file,value.filename);
                        console.log('the' + fieldname + 'file' + value.file + 'file name : ' + value.filename + 'appended to formdata');//DEBUG
                    }
                }
                //if its a single file
                else { //if its

                    this.formData.append(fieldname, this.filesDic[fieldname].file, this.filesDic[fieldname].filename);
                    console.log('the' + fieldname + 'file' + this.filesDic[fieldname].file + 'file name : ' + this.filesDic[fieldname].filename + 'appended to formdata');//DEBUG
                }
            }
        }
    }
    refresh() {
        this.formData = new FormData();
    }

}
