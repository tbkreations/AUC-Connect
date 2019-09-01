$('#form-submit').on('click', function(e) {
    e.preventDefault(); // prevent the button from refreshing the page
    var userEmail = $('#user-email');

    if (userEmail.val().indexOf('morehouse.edu') !== -1) { // validation

    } else if (userEmail.val().indexOf('spelman.edu') !== -1) { // validation

    } else if (userEmail.val().indexOf('cau.edu') !== -1) {

    } else {
        $('#submission-info').text('Sorry, this platform is for AUC students only. You must sign up with your school email. Please try again.');
    }
    // this doesn't mean .com or .org is at the end
    // you may want to check that by using a regular expression if necessary        

    alert("Validation Works"); 


    var formData = $('#contact-form').serialize(); // This gets the <form id="contact-form"> element's values and serializes it into a string.

 $.ajax({
        url: 'mail.php', // make sure this file is either in the same directory or the path is changed
        type: 'POST',
        data: formData
    }).done(function(response) {
        // do stuff to to show the user that the form was submitted
        $('#submission-info').text('Success! Please validate your email and you can begin connecting with the AUC!');
    }).fail(function(response, error) {
        // tell the user what happened that caused the form submission to fail
        $('#submission-info').text('Oh no, something has happened! Please try again.');
    });

