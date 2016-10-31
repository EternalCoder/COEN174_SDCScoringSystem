function initialization() {

  //get project code
    var code = null;
    
    while (code == null) {
      code = prompt("Please enter the project code", "");
    }

  //get data from server
  localStorage.setItem('form_project_code',code);
  $.get('http://students.engr.scu.edu/~yli/index.php?job=get&code='+code).done(function(result) {
    var project = result;
    if(project != false) {
      appendInfo(project);
    }
    else
    {
      alert("Error: Invalid Code");
    }
  });
    $.get('http://students.engr.scu.edu/~yli/index.php?job=getJudges&code='+code).done(function(result) {
    var judges = result;
    if(judges != false) {
      console.log(judges);
      appendJudge(judges);
    }
    else
    {
      alert("Error: No evaluation form submitted for this project yet");
    }
  });
}

function appendJudge(judges) {
  var dest = document.getElementById('judge');
  var option
  option = document.createElement("option");
  option.text= 'All Judges (average)';
  option.value='all';
  dest.add(option);
  for(var i=0; i<judges.length; i++) {
    option = document.createElement("option");
    option.text=judges[i].judge;
    option.value=judges[i].judge;
    dest.add(option);
  }

  changeInfo();
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

function add(a, b) {
  return a + b;
}

function changeInfo() {
  var code = localStorage.getItem('form_project_code');
  var judge = $('#judge').val();
  if(judge != 'all'){
      $.get('http://students.engr.scu.edu/~yli/index.php?job=getJudge&code='+code+'&judge='+judge).done(function(result) {
      var eva = result;
      if(eva != false) {
        console.log('changeInfo');
        console.log(eva);
        updateInfo(eva);
      }
      else
      {
        alert("Unexpected Error");
      }
    });
  }
  else
  {
      $.get('http://students.engr.scu.edu/~yli/index.php?job=getJudges&code='+code).done(function(result) {
      var judges = result;
      if(judges != false) {
        var da=0;
        var db=0;
        var dc=0;
        var dd=0;
        var de=0;
        var df=0;
        var dg=0;
        var dh=0;
        var pa=0;
        var pb=0;
        var pc=0;
        var pd=0;
        var total=0;
        var economic = 0;
        var environmental = 0;
        var sustainability = 0;
        var manufacturability = 0;
        var ethical = 0;
        var healthandsafety = 0;
        var social = 0;
        var political = 0;
        var comments = '';
        for(var i=0; i<judges.length; i++) {
            if(Number.isInteger(parseInt(judges[i].da))) {
              da += parseInt(judges[i].da);
            }
            if(Number.isInteger(parseInt(judges[i].db))) {
              db += parseInt(judges[i].db);
            }
            if(Number.isInteger(parseInt(judges[i].dc))) {
              dc += parseInt(judges[i].dc);
            }
            if(Number.isInteger(parseInt(judges[i].dd))) {
              dd += parseInt(judges[i].dd);
            }
            if(Number.isInteger(parseInt(judges[i].de))) {
              de += parseInt(judges[i].de);
            }
            if(Number.isInteger(parseInt(judges[i].df))) {
              df += parseInt(judges[i].df);
            }
            if(Number.isInteger(parseInt(judges[i].dg))) {
              dg += parseInt(judges[i].dg);
            }
            if(Number.isInteger(parseInt(judges[i].dh))) {
              dh += parseInt(judges[i].dh);
            }
            if(Number.isInteger(parseInt(judges[i].pa))) {
              pa += parseInt(judges[i].pa);
            }
            if(Number.isInteger(parseInt(judges[i].pb))) {
              pb += parseInt(judges[i].pb);
            }
            if(Number.isInteger(parseInt(judges[i].pc))) {
              pc += parseInt(judges[i].pc);
            }
            if(Number.isInteger(parseInt(judges[i].pd))) {
              pd += parseInt(judges[i].pd);
            }
            if(Number.isInteger(parseInt(judges[i].total))) {
              total += parseInt(judges[i].total);
            }
            if(judges[i].economic === "true")
            {
              economic+=1;
            }
            else
            {
              economic-=1;
            }
                        if(judges[i].environmental === "true")
            {
              environmental+=1;
            }
            else
            {
              environmental-=1;
            }
                        if(judges[i].sustainability === "true")
            {
              sustainability+=1;
            }
            else
            {
              sustainability-=1;
            }
                        if(judges[i].manufacturability === "true")
            {
              manufacturability+=1;
            }
            else
            {
              manufacturability-=1;
            }
                        if(judges[i].ethical === "true")
            {
              ethical+=1;
            }
            else
            {
              ethical-=1;
            }
                        if(judges[i].healthandsafety === "true")
            {
              healthandsafety+=1;
            }
            else
            {
              healthandsafety-=1;
            }
                        if(judges[i].social === "true")
            {
              social+=1;
            }
            else
            {
              social-=1;
            }
                        if(judges[i].political === "true")
            {
              political+=1;
            }
            else
            {
              political-=1;
            }
            if(judges[i].comments!=''){
              comments = comments + judges[i].comments +'\n';
            }
            
        }
        $('#DA').val(Math.round(da/judges.length * 100) / 100);
        $('#DB').val(Math.round(db/judges.length * 100) / 100);
        $('#DC').val(Math.round(dc/judges.length * 100) / 100);
        $('#DD').val(Math.round(dd/judges.length * 100) / 100);
        $('#DE').val(Math.round(de/judges.length * 100) / 100);
        $('#DF').val(Math.round(df/judges.length * 100) / 100);
        $('#DG').val(Math.round(dg/judges.length * 100) / 100);
        $('#DH').val(Math.round(dh/judges.length * 100) / 100);
        $('#PA').val(Math.round(pa/judges.length * 100) / 100);
        $('#PB').val(Math.round(pb/judges.length * 100) / 100);
        $('#PC').val(Math.round(pc/judges.length * 100) / 100);
        $('#PD').val(Math.round(pd/judges.length * 100) / 100);
        $('#GrandTotal').val(Math.round(total/judges.length * 100) / 100);
        $( "#economic" ).prop( "checked", economic>0);
        $( "#environmental" ).prop( "checked", environmental> 0);
        $( "#sustainability" ).prop( "checked", sustainability>0);
        $( "#manufacturability" ).prop( "checked", manufacturability>0);
        $( "#ethical" ).prop( "checked", ethical>0);
        $( "#healthandsafety" ).prop( "checked", healthandsafety>0);
        $( "#social" ).prop( "checked", social>0);
        $( "#political" ).prop( "checked", political>0);
        $('#comments').val(comments);
        console.log(total);
      }
      else
      {
        alert("Error: No evaluation form submitted for this project yet");
      }
    });
  }
}

function updateInfo(eva) {
  //ocument.getElementById('#DA').value = eva.da;
  console.log(eva);
  $('#DA').val(eva.da);
  $('#DB').val(eva.db);
  $('#DC').val(eva.dc);
  $('#DD').val(eva.dd);
  $('#DE').val(eva.de);
  $('#DF').val(eva.df);
  $('#DG').val(eva.dg);
  $('#DH').val(eva.dh);
  $('#PA').val(eva.pa);
  $('#PB').val(eva.pb);
  $('#PC').val(eva.pc);
  $('#PD').val(eva.pd);
  $( "#economic" ).prop( "checked", eva.economic=== "true");
  $( "#environmental" ).prop( "checked", eva.environmental=== "true");
  $( "#sustainability" ).prop( "checked", eva.sustainability=== "true");
  $( "#manufacturability" ).prop( "checked", eva.manufacturability=== "true");
  $( "#ethical" ).prop( "checked", eva.ethical=== "true");
  $( "#healthandsafety" ).prop( "checked", eva.healthandsafety=== "true");
  $( "#social" ).prop( "checked", eva.social=== "true");
  $( "#political" ).prop( "checked", eva.political=== "true");
  $('#comments').val(eva.comments);
  changeGrandTotal();
  console.log('changeTotal');
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