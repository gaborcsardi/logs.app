var couchapp = require("couchapp");

ddoc = {
    _id: "_design/app"
    , views: {}
    , lists: {}
    , shows: {}
    , rewrites:
    [ { from: "/-/email/:email", to: "_view/email",
	query: { "start_key": [":email",{}],
		 "end_key": [":email"],
		 "descending": 'true' } },
      { from: "/-/package/:email/:package", to: "_view/emailpackage",
	query: { "start_key": [":email",":package",{}],
		 "end_key": [":email",":package"],
		 "descending": "true" } }
    ]
};

module.exports = ddoc;

ddoc.views.email = {
    map: function(doc) {
	emit([doc.email, doc.submitted], doc)
    }
}

ddoc.views.emailpackage = {
    map: function(doc) {
	emit([doc.email, doc.package, doc.submitted], doc)
    }
}

ddoc.validate_doc_update = function(newDoc, oldDoc, userCtx) {
    if ((userCtx.roles.indexOf("_admin") === -1)) { 
	throw({unauthorized: "Only admins may create/edit documents."}); 
    }
}
