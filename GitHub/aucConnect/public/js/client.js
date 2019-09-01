$('#register').on('click', function(e) {
    var userEmail = $('#user-email');
    var nodemailer = require('nodemailer'); 
    var transporter = nodemailer.createTransport({ 
	    service: 'gmail'; 
	    auth: {
	      user: 'grantflash@gmail.com', 
	      pass: 'MoTu&2e4'
            }
    )}; 
    
    var mailOptions = { 
	    from: 'grantflash@gmail.com', 
	    to: userEmail, 
	    subject: 'Welcome to AUC Connect!', 
	    text: 'Click on the link to confirm your registration'; 
    }; 


    e.preventDefault(); // prevent the button from refreshing the page
    var accceptable = ["morehouse.edu", "spelman.edu", "cau.edu];  
    if (userEmail.val().split('@')[1] === acceptable[0])  { // Morehouse validation
	alert("Morehouse Email");
	transporter.sendMail (mailOptions, function(error, info) {
            if(error) {
                    console.log("Error Sending Email");
            }else{ 
                    console.log("Email sent: " + info.response);
            }
    });

    } else if (userEmail.val().split('@')[1] === acceptable[1]) { // Spelman validation
	alert("Spelman Email");
	transporter.sendMail (mailOptions, function(error, info) {
            if(error) {
                    console.log("Error Sending Email");
            }else{ 
                    console.log("Email sent: " + info.response);
            }
    });

    } else if (userEmail.val().split('@')[1] === acceptable[2]) { // CAU validation
	alert("CAU Email"); 
	transporter.sendMail (mailOptions, function(error, info) {
            if(error) {
                    console.log("Error Sending Email");
            }else{ 
                    console.log("Email sent: " + info.response);
            }
    });
    
    } else { 
        alert("Sorry, this platform is for AUC students only. You must sign up with your school email. Please try again.");
    }        

}     


