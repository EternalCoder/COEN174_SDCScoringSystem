function initialization() {

  //get project code
  //localStorage.setItem('project_code',59);
  var code = localStorage.getItem('project_code');

  localStorage.setItem('project_temp_code',code);
  if(code == null){
    window.location.href = 'login.html';
  }
  else
  {
    localStorage.removeItem('project_code');
    //get data from server
  $.get('http://students.engr.scu.edu/~yli/COEN174/index.php?job=get&code='+code).done(function(result) {
    var project = result;
    if(project != false) {
      appendInfo(project);
    }
    else
    {
      alert("Error: Invalid Code");
      window.location.href = 'login.html';
    }
  });
  }

  
}

function appendInfo(project) {
  document.getElementById('session').value = project.Session;
  document.getElementById('room#').value = project.Location;
  document.getElementById('projectTitle').value = project.Title;
  var names = "";
  for (var i=1; i<7; i++) {
    if(project['First '+i] != '') {
      names = names + project['First '+i] + ' ' + project['Last '+i] + ", ";
    }
    else
    {
      break;
    }
  }
  document.getElementById('groupMembers').value = names;

  names = "";
  for (var i=1; i<5; i++) {
    if(project['Faculty '+i] != '') {
      names = names + project['Faculty '+i] + ", "
    }
    else
    {
      break;
    }
  }
  document.getElementById('advisors').value = names;
}

function submit() {
  if(document.getElementById('judge').value == 'NIL') {
    alert('Please select your name from the judge list');
  }
  else {
    var list = document.getElementsByClassName('score');
    var flag = false;
    for (var i=0, len=list.length; i<len; i++) {
        if(list[i].value == 'NIL') {
            flag = true;
            break;
        }
    }
    if(flag) {
      alert('You have not complete the score sheet');
    }
    else
      {
      var r = confirm('Is your name \''+ document.getElementById('judge').value +'\'?');
      if(r) {
        r = confirm('Are you sure you want to submit the form?')
        if (r) {
          console.log('submit');
            var code = localStorage.getItem('project_temp_code');
            //fetch data from page and create a new object
            var newEva= {code:code,session:$('#session').val(),judge: $('#judge').val(),da: $('#DA').val(),db: $('#DB').val(),dc: $('#DC').val(),dd: $('#DD').val(),de: $('#DE').val(),df: $('#DF').val(),dg: $('#DG').val(),dh: $('#DH').val(),pa: $('#PA').val(),pb: $('#PB').val(),pc: $('#PC').val(),pd: $('#PD').val(),total: $('#GrandTotal').val(),economic:$('#economic').is(':checked'),environmental:$('#environmental').is(':checked'),sustainability:$('#sustainability').is(':checked'),manufacturability:$('#manufacturability').is(':checked'),ethical:$('#ethical').is(':checked'),healthandsafety:$('#healthandsafety').is(':checked'),social:$('#social').is(':checked'),political:$('#political').is(':checked'),comments:$('#comments').val()};
            var url = 'http://students.engr.scu.edu/~yli/COEN174/index.php?job=post&code='+newEva.code+'&session='+newEva.session+'&judge='+newEva.judge+'&da='+newEva.da+'&db='+newEva.db+'&dc='+newEva.dc+'&dd='+newEva.dd+'&de='+newEva.de+'&df='+newEva.df+'&dg='+newEva.dg+'&dh='+newEva.dg+'&pa='+newEva.pa+'&pb='+newEva.pb+'&pc='+newEva.pc+'&pd='+newEva.pd+'&total='+newEva.total+'&economic='+newEva.economic+'&environmental='+newEva.environmental+'&sustainability='+newEva.sustainability+'&manufacturability='+newEva.manufacturability+'&ethical='+newEva.ethical+'&healthandsafety='+newEva.healthandsafety+'&social='+newEva.social+'&political='+newEva.political+'&comments='+newEva.comments;
            console.log(url);
              $.get(url).done(function(result) {
                alert(result);
                console.log(result);
                if(result != 'Evaluation Submitted Failed: Record already exist'){
                  localStorage.removeItem('project_temp_code');
                    window.location.href = 'login.html';
                }
              });
        }
      }
    }
  }
}

function add(a, b) {
  return a + b;
}

function changeGrandTotal() {
    var list = document.getElementsByClassName('score');
    var sum = 0;
    for (var i=0, len=list.length; i<len; i++) {
        if(Number.isInteger(parseInt(list[i].value))) {
            sum += parseInt(list[i].value);
        }
            
    }
    document.getElementById('GrandTotal').value = sum;
}