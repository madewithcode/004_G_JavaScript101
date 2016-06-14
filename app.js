// create a greeter object
// gets a new object (the arhictecture allows us to not have to use the 'new' keyword here)
var g = G$('John', 'Doe');

// use our chainable methods
g.greet().setLang('es').greet(true).log();

// let's use our object on the click of the login button
$('#login').click(function() {
   
    // create a 'new' greetr object 
    // let's pretend we know the name from the login
    var loginGrtr = G$('John', 'Doe');
    
    $('#logindiv').hide();
    
    loginGrtr.setLang($('#lang').val())
        .HTMLGreeting('#greeting', true)
        .log();
    
});