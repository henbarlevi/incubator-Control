//---------------------------------------------------------------------------
//-------------------------------comboboxes options Functions---------------------
//---------------------------------------------------------------------------
/*Combobox GET,POST,DELETE Request Handlers*/

var SourcesOptionsRep = require('../models/repositories/project-enums/source-options-rep');//repository of schema that contain the options in the source 'מקור' comboboxe
var StatusOptionsRep = require('../models/repositories/project-enums/status-options-rep');//repository of schema that contain the options in the status 'סטטוס' comboboxe
var DomainOptionsRep = require('../models/repositories/project-enums/domain-options-rep');//repository of schema that contain the options in the domain 'תחום' comboboxe

/*Handle with GET comboboxes-options request- client want to load the comboboxes options in the project form*/
function comboOptionsGetHandler(req, res, next) {
    SourcesOptionsRep.findAll(function (err, srcOptions) {
        console.log(typeof srcOptions);
        if (err) {
            res.status(502).send('couldnt find options of combobox source')
        }
        else {
            StatusOptionsRep.findAll(function (err, stsOptions) {
                console.log(typeof stsOptions);
                if (err) {
                    res.status(502).send('couldnt find options of combobox status')
                }
                else {
                    DomainOptionsRep.findAll(function (err, dmnOptions) {
                        console.log(typeof srcOptions);
                        if (err) {
                            res.status(502).send('couldnt find options of combobox domain')
                        }
                        else {
                            res.status(200).json({ SourcesOptions: srcOptions, StatusOptions: stsOptions, DomainOptions: dmnOptions });
                        }
                    })
                }
            })
        }
    })
}

/*Handle with POST new combobox-option request - changing form structure requests - the admin can change the new project form structure
by changing the comboboxes options (combo boxes options are saved in the DB in the 'project-enums.js schemas) */
function comboOptionsPostHandler(req, res, next) {
    console.log(req.params);
    var comboboxName = req.params.comboboxname;//getting the comboboxname paramter from url
    var newOption = req.body.option;// getting the option property from the request body json obj
    if (comboboxName) {
        if (comboboxName === 'status') {
            //add new option to the StatusOptions schema
            StatusOptionsRep.add(newOption, function (err) {
                if (err) {//didnt add the new option to DB
                    res.status(502).send('error in DB! ,couldnt save new option'); //gateway error response
                }
                else {//no errors with DB
                    res.status(201).json({ message: 'new option added' }); //OK option added
                }
            })
        }
        else if (comboboxName === 'domain') {
            //add new option to the DomainOptions schema
            DomainOptionsRep.add(newOption, function (err) {
                if (err) {//didnt add the new option to DB
                    res.status(502).send('error in DB! ,couldnt save new option'); //gateway error response
                }
                else {//no errors with DB
                    res.status(201).json({ message: 'new option added' }); //OK option added
                }
            })
        }
        else if (comboboxName === 'source') {
            //add new option to the SourcesOptions schema           
            SourcesOptionsRep.add(newOption, function (err) {
                if (err) {//didnt add the new option to DB
                    res.status(502).send('error in DB! ,couldnt save new option'); //gateway error response
                }
                else {//no errors with DB
                    res.status(201).json({ message: 'new option added' }); //OK option added
                }
            })
        }
        else {
            res.status(400).send('client didnt send a proper comboboxname as parameter in the url');

        }

    } else {
        //response 400 Bad Request
        res.status(400).send('client didnt send comboboxname as parameter in the url');
    }
}

/*Handle with DELETE comboboxes-options request*/
function comboOptionsDeleteHandler(req, res, next) {
    var comboboxName = req.params.comboboxname;//getting the comboboxname paramter from url
    var queryString = req.query; //contain the query stirng values
    if (comboboxName && queryString.option) {
        if (comboboxName === 'status') {
            StatusOptionsRep.deleteOption(queryString.option, function (err) {
                if (err) {
                    res.status(502).send('couldnt delte the option')
                }
                else {
                    res.status(200).send('option deleted succesfully')
                }
            })
        }
        else if (comboboxName === 'domain') {
            DomainOptionsRep.deleteOption(queryString.option, function (err) {
                if (err) {
                    res.status(502).send('couldnt delte the option')
                }
                else {
                    res.status(200).send('option deleted succesfully')
                }
            })
        }
        else if (comboboxName === 'source') {
            SourcesOptionsRep.deleteOption(queryString.option, function (err) {
                if (err) {
                    res.status(502).send('couldnt delte the option')
                }
                else {
                    res.status(200).send('option deleted succesfully')
                }
            })
        }
        else {
            res.status(400).send('bad request : comboboxname doesnt contain valid value')

        }
    } else {
        res.status(400).send('bad request : request doesnt contain the option in or the comboboxname')
    }
}
//-----------------------------------EXPORT---------------------------------
module.exports = {
  /**combobox options Functions */
    comboOptionsGetHandler: comboOptionsGetHandler, /*Handle with GET comboboxes-options request- client want to load the comboboxes options in the project form*/
    comboOptionsPostHandler: comboOptionsPostHandler, /*Handle with POST new combobox-option request*/
    comboOptionsDeleteHandler: comboOptionsDeleteHandler, /*Handle with DELETE comboboxes-options request*/

}