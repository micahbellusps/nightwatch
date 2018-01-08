var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Staticpen774@"
});
var obj = {i:null};


var data = function(err) {
                if (err) throw err;
                console.log("Connected!");
                var sql  = "select * \n" +
                    "from grove.sample sample\n" +
                    "inner join grove.patient patient on (patient.id=sample.patient_id)\n" +
                    "inner join grove.tracking on (sample.id=tracking.sample_id)\n" +
                    "left join grove.billing on (sample.id=billing.sample_id) LIMIT 3;\n";
                con.query(sql,test );
                this.end();
};

var closure = function (callback) {
    return function (err, result) {
        if (err) throw err;
        //console.log("Result: " + result);
        // console.log(result[0].Tables_in_grove);
        callback(result)
    };

}

var test = closure(function(result){
    result.forEach(function(obj){
        console.log(obj);

    })

});

con.connect(data);

