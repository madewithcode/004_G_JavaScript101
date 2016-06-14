// create new execution context
(function(global, $) {
    
        // 'new' an object
        var greetr = function(firstName, lastName, language) {            
            return new greetr.init(firstName, lastName, language);
        }
        
        // private - hidden within the scope of the IIFE and never directly accessible
        var supportedLangs = ['en', 'es'];
        
        // private - informal greetings 
        var greetings = {
            en: 'Hello',
            es: 'Hola'
        };
        
        // private - formal greetings 
        var formalGreetings = {
            en: 'Greetings',
            es: 'Saludos'
        };
        
        // logger messages
        var logMessages = {
            en: 'Logged in',
            es: 'Inicio sesion'
        };
        
        // prototype holds methods (to save memory space)
        greetr.prototype = {
            
            // 'this' refers to the calling object at execution time
            fullName: function() {
                return this.firstName + ' ' + this.lastName;
            },
                    
            validate: function() {
                // check that is a valid language
                // references the externally inacessible 'supportedLangs'
                // within the closure
                if (supportedLangs.indexOf(this.language) === -1) {
                    throw 'Invalid language';
                }
            },
            
            // retrieve messages from object by referring to properties using [] syntax
            greeting: function() {
                return greetings[this.language] + ' ' + 
                    this.firstName + '!';
            },
            
            formalGreeting: function() {
                return formalGreetings[this.language] + ' ' +
                    this.fullName();
            },
            
            // chainable methods return their own containing ojbect 
            greet: function(formal) {
                var msg;
                
                // if undefined or null it will be coerced to 'false'
                if (formal) {
                    msg = this.formalGreeting();
    
                } else {
                    msg = this.greeting();
                
                }
                
                if (console) {
                    console.log(msg);
                }
                
                // 'this' refers to the calling object at execution time
                // makes the method chainable
                return this;        
            },
            
            log: function() {
                if (console) {
                    console.log(logMessages[this.language] + ': ' + 
                        this.fullName());
                }
                
                // make chainable
                return this;
            },
            
            setLang: function(lang) {
                
                // set the language
                this.language = lang;
                
                // validate
                this.validate();
                
                // make chainable 
                return this;
            },
            
            HTMLGreeting: function(selector, formal) {
                if (!$) {
                    throw 'jQuery not loaded';   
                }
                
                if (!selector) {
                    throw 'Missing jQuery selector';
                }
                
                // determine the message
                var msg;
                if (formal) {
                    msg = this.formalGreeting();
                } else {
                    msg = this.greeting();
                }
                
                // inject the message in the chosen place in the DOM
                $(selector).html(msg);
                
                // make chainable
                return this;
            }
            
            
        };
        
        // function constructor
        // the actual object is created here, allowing us to 'new' an object
        // without calling 'new'
        greetr.init = function(firstName, lastName, language) {
            
            var self = this;
            self.firstName = firstName || '';
            self.lastName = lastName || '';
            self.language = language || 'en';

            self.validate();
        }
        
        // trick borrowed from jQuery so we don't have to use the 'new' keyword
        greetr.init.prototype = greetr.prototype;
        
        // expose greetr to the outside world
        // by attaching our greetr to the global object, and provide a 
        // shorthand '$G' for easy use
        global.greetr = global.G$ = greetr;
    
    }(window, jQuery)
);