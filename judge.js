function initialization() {
    localStorage.removeItem('project_code')
}

$(document).ready(function(){
    $("#password").keypress(function(event){
        if(event.keyCode == 13){
            $("#login").click();
        }
    });
});

function login() {
    $.get('http://students.engr.scu.edu/~yli/COEN174/login.php?job=judge&&code='+$("#password").val()).done(function(result) {
        if(result == 'Judge In') {
            localStorage.setItem('project_code',$('#password').val());
            window.location.href = 'projectEvaluationForm.html';
        }
        else
        {
        alert('Invalid PIN');
        }
    })

}