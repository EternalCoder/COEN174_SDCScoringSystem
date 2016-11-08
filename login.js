function initialization() {
    localStorage.removeItem('project_code')
}

$(document).ready(function(){
    $("#name").keypress(function(event){
        if(event.keyCode == 13){
            $("#login").click();
        }
    });

    $("#password").keypress(function(event){
        if(event.keyCode == 13){
            $("#login").click();
        }
    });
});

function login() {
    var flag =0;
    if($('#name').val() == 'judge') {
        
        for(var i=1; i<82; i++) {
            if($('#password').val() == i) {
                flag =1;
                break;
            }
        }
        if(flag == 1){
            localStorage.setItem('project_code',$('#password').val());
            window.location.href = 'projectEvaluationForm.html';
        }
        else
        {
            alert('invalid combination of name and password');
        }
    }
    else if($('#name').val() == 'admin' && $('#password').val() == 'admin'){
        localStorage.setItem('project_code',$('#password').val());
        window.location.href = 'menu.html';
    }
    else
    {
        alert('invalid combination of name and password');
    }
}