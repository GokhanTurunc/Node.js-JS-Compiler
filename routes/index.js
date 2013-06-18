var queryString = require('querystring'),
    http = require('http');

exports.index = function(req, res){
    var items = {
        description: 'Lütfen compile etmek istediğiniz js kodlarını yapıştırınız.',
        button_text: 'Gönder'
    };

    res.render('index', items);
};

exports.compile = function(req, res) {
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });

    var code = req.body.code;

    // create querystring from object
    var postData = queryString.stringify({
        'compilation_level': 'SIMPLE_OPTIMIZATIONS',
        'output_format': 'JSON',
        'output_info': 'compiled_code',
        'warning_level': 'QUIET',
        'js_code': code
    });

    var postOptions = {
        host: 'closure-compiler.appspot.com',
        port: 80,
        path: '/compile',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': postData.length
        }
    };

    var postRequest = http.request(postOptions, function(response) {

        response.setEncoding('UTF8');
        response.on('data', function(chunk) {
            res.write(chunk);
            res.end();
        });
    });

    postRequest.write(postData);
    postRequest.end();

};

