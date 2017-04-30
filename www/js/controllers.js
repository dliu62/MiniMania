angular.module('starter.controllers', [])
  .controller('HomePageCtrl', function($scope,$state, $stateParams) {
   $scope.playBtnClick = function(){
     $state.go("play")
   };
   $scope.tutorialBtnClick = function(){
      $state.go("tutorial")
   };
    $scope.quitBtnClick = function(){
      if(window.confirm("Would you like to quit the game?")){
        window.open(location, '_self','').close()
      }
    }
  })
  .controller('PlayCtrl', function($scope,$state, $stateParams, $window) {
    $(document).ready(function(){
      //$("#canvas").width($(window).innerWidth())
      //$("#canvas").height($(window).innerHeight())
      $("ion-content").css("top",0);
    })


    $scope.score = 0;
    $scope.num_miss = 0;
    $scope.num_50 = 0;
    $scope.num_100 = 0;
    $scope.num_300 = 0;

    $window.onload = myApp();
    function myApp() {
      document.getElementById("canvas").style.background = 'black';
      var canvas = document.getElementById("canvas");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      var width = document.getElementById("canvas").width;
      var height = document.getElementById("canvas").height;
      var width9 = width / 9;
      var height16 = height / 16;
      var width11 = width/11;
      var height5 = height/5;
      var isOnLane1 = false;
      var isOnLane2 = false;
      var isOnLane3 = false;
      var isOnLane4 = false;
      var isOnLane5 = false;
      var isOnLane6 = false;
      var isOnLane7 = false;

      var dropindex = 0;
      var judgementindex = 0;
      var music = false;


      var canvas1 = $("#canvas");  //store canvas outside event loop
      var x__1, y__1;

      $(canvas1).on("click", function(e){
        //$(canvas1).on("mousedown", function(e){
          var pos = getMousePos(canvas1, e);
          x__1 = pos.x;
          y__1 = pos.y;

          if(width11*2 < x__1 && x__1 < width11*3){
            isOnLane1 = true;
          }

        if(width11*3 < x__1 && x__1  < width11*4){
          isOnLane2 = true;
        }

        if(width11*4 < x__1 && x__1  < width11*5){
          isOnLane3 = true;
        }

        if(width11*5 < x__1 && x__1  < width11*6){
          isOnLane4 = true;
        }

        if(width11*6 < x__1 && x__1  < width11*7){
          isOnLane5 = true;
        }

        if(width11*7 < x__1 && x__1  < width11*8){
          isOnLane6 = true;
        }

        if(width11*8 < x__1 && x__1  < width11*9){
          isOnLane7 = true;
        }

        if (width-width11*0.75 < x__1 && x__1 < width && 0 < y__1 && y__1 < height5/2)
        {
          // Martin please fix this !!!!!!!!!!!!!!
          // alert(USER IS RESTARTING. GO BACK TO MAIN MENU);
          // $state.go(startstate);
        }

      });

      function getMousePos(canvas, evt) {
        return {
          x: evt.clientX,
          y: evt.clientY
        };
      }

      var keysdown = {};
      document.body.onkeydown = function (e) {
        var event = window.event ? window.event : e;
        keysdown[event.keyCode] = true;
        e.stopPropagation();
      };
      document.body.onkeyup = function (e) {
        var event = window.event ? window.event : e;
        delete keysdown[event.keyCode];
        e.stopPropagation();
      };

      var img_300 = document.createElement('img');
      img_300.src = 'mania-300.png';
      var img_100 = document.createElement('img');
      img_100.src = 'mania-100.png';
      var img_50 = document.createElement('img');
      img_50.src = 'mania-50.png';
      var img_0 = document.createElement('img');
      img_0.src = 'mania-0.png';

      var key1 = document.createElement('img');
      key1.src = 'mania-key1.png';
      var key2 = document.createElement('img');
      key2.src = 'mania-key2D.png';
      var key1D = document.createElement('img');
      key1D.src = 'mania-key1D.png';
      var key2D = document.createElement('img');
      key2D.src = 'mania-keySD.png';
      var stage_left = document.createElement('img');
      stage_left.src = 'mania-stage-left.png';
      var stage_right = document.createElement('img');
      stage_right.src = 'mania-stage-right.png';
      var stage_hint = document.createElement('img');
      stage_hint.src = 'bailan.png';
      var lane_separator = document.createElement('img');
      lane_separator.src = 'baiguang.png';
      var judgement_line = document.createElement('img');
      judgement_line.src = 'TouMingBai80p.png';
      var drop_line = document.createElement('img');
      drop_line.src = 'huixian.png';
      var judgement_line_effect = document.createElement('img');
      judgement_line_effect.src = 'lantiao.png';
      var menu_back = document.createElement('img');
      menu_back.src = 'menu-back.png';



      var note1 = document.createElement('img');
      note1.src = 'mania-note1.png';
      var note2 = document.createElement('img');
      note2.src = 'mania-note2.png';

      // var light0 = document.createElement('img');
      // light0.src = 'light__0.png';
      // var light1 = document.createElement('img');
      // light1.src = 'light__1.png';
      // var light2 = document.createElement('img');
      // light2.src = 'light__2.png';
      // var light3 = document.createElement('img');
      // light3.src = 'light__3.png';
      // var light4 = document.createElement('img');
      // light4.src = 'light__4.png';
      // var light5 = document.createElement('img');
      // light5.src = 'light__5.png';
      // var light6 = document.createElement('img');
      // light6.src = 'light__6.png';
      // var light7 = document.createElement('img');
      // light7.src = 'light__7.png';
      // var light8 = document.createElement('img');
      // light8.src = 'light__8.png';
      // var light9 = document.createElement('img');
      // light9.src = 'light__9.png';
      // var light10 = document.createElement('img');
      // light10.src = 'light__10.png';

      var light0 = document.createElement('img');
      light0.src = 'light___10.png';
      var light1 = document.createElement('img');
      light1.src = 'light___9.png';
      var light2 = document.createElement('img');
      light2.src = 'light___8.png';
      var light3 = document.createElement('img');
      light3.src = 'light___7.png';
      var light4 = document.createElement('img');
      light4.src = 'light___6.png';
      var light5 = document.createElement('img');
      light5.src = 'light___5.png';
      var light6 = document.createElement('img');
      light6.src = 'light___4.png';
      var light7 = document.createElement('img');
      light7.src = 'light___3.png';
      var light8 = document.createElement('img');
      light8.src = 'light___2.png';
      var light9 = document.createElement('img');
      light9.src = 'light___1.png';
      // var light10 = document.createElement('img');
      // light10.src = 'light__10.png';


      var lemon_tree = document.createElement("AUDIO");
      lemon_tree.src = 'music/LemonTree.mp3';
      var bpm = 143;
      var mspb = (1/143) * 60  * 1000;

      var last_result;
      var last_result_displayed_time;

      //hit judgement time for perfect, good, bad and miss
      //perfect: iidx:20  Jubeat:42  RB:25
      var perfect_judgement = 40;
      var good_judgement = 60;
      var bad_judgement = 80;
      var miss_judgement = 200;

      var theCanvas;
      var myContext;

      var begin_time = Date.now();
      var time_elapsed = 0;
      var reaction_time = 2000;

      var hit_display_time = 400;

function getNotes(numOfNotes, diff, pattern, startTime) {
      	var newNote = [];
      	for(var i=0; i<numOfNotes; i++) {
      		var xt = startTime+2850+i*diff;
      		var min = Math.ceil(1);
      		var max = Math.floor(7);
      		var rand = Math.floor(Math.random() * (max - min)) + min;
      		newNote.push([xt,rand,0]);
      		//newNote.push([xt,pattern[i%pattern.length],0]);
      	}
      	return newNote;
      }

      var notesLV1 = getNotes(18*8, 976.5, [4,3,2,1,7,6,7,1], 6520);
      var notesLV2_1 = getNotes(16*2, 976.5, [1,2,3,4,5,6,7,1], 22632.25);
      var notesLV2_2 = getNotes(16*2, 976.5, [2,2,3,3,5,5,7,7], 53880.25);
      var notesLV2_3 = getNotes(16*2, 976.5, [3,2,3,4,4,6,1,1], 85128.25);
      var notesLV2_4 = getNotes(16*2, 976.5, [1,2,1,6,5,6,7,3], 116376.25);



      var notesLV2;

      if (true) {

      	notesLV2 = notesLV2_1.concat(notesLV2_2);
      	notesLV2 = notesLV2.concat(notesLV2_3);
      	notesLV2 = notesLV2.concat(notesLV2_4);
      }

      var notes = notesLV1.concat(notesLV2);



      //var notes = [[3000,1,0],[4000,2,0],[5000,3,0],[6000,4,0],[7000,5,0],[8000,6,0],[9000,7,0],[10000,1,0],[11000,2,0],[12000,3,0]];
      //var notes = [[3000,1,0],[3500,2,0],[4000,3,0],[4500,4,0],[5000,5,0],[5500,6,0],[6000,7,0],[6500,1,0],[7000,2,0],[7500,3,0]];
      function compareFunction(note1, note2) {
        if (note1[0] < note2[0])
          return -1;
        else
          return 1;
      }

      notes.sort(compareFunction);


      //var i;
      //for (i = 0; i < 10000; i++)
      //notes.push([i*10,1,0]);
      //var notes = [[1000, 1], [1000, 7], [2000, 3], [2500, 4], [4000, 1], [4000, 3], [4300, 2], [4400, 4], [4800, 5], [5000, 7], [5000, 3], [5200, 4], [5500, 6]];

      var lightings = [-1,-1,-1,-1,-1,-1,-1];

      function draw_box(x, y, color) {
        myContext.save();
        myContext.beginPath();
        myContext.moveTo(x - (width9 - 10) / 2, y - height16 / 4);
        myContext.lineTo(x + (width9 - 10) / 2, y - height16 / 4);
        myContext.lineTo(x + (width9 - 10) / 2, y + height16 / 4);
        myContext.lineTo(x - (width9 - 10) / 2, y + height16 / 4);
        myContext.lineTo(x - (width9 - 10) / 2, y - height16 / 4);
        myContext.closePath();
        if (color == undefined)
          myContext.fillStyle = "#FF00FF";
        else
          myContext.fillStyle = color;
        myContext.fill();
        myContext.restore();
      }

      function drop() {
        //console.log("start at: " + dropindex);
        //console.log("Time_elapsed: ", time_elapsed);
        var i;
        for (i = dropindex; i < notes.length; i++) {
          var drop_at_elapsed_time = notes[i][0];
          var which_lane = notes[i][1];

          if (time_elapsed < drop_at_elapsed_time) {
            //console.log("break at: " + i);
            break;
          }

          if (time_elapsed >= drop_at_elapsed_time && time_elapsed <= drop_at_elapsed_time + reaction_time) {
            //var y = (((time_elapsed - drop_at_elapsed_time) * (height-height5)) / reaction_time); //theoratically this is right
            //var y = (((time_elapsed - drop_at_elapsed_time) * (height-height5-82*width11/256/2)) / reaction_time); //but if you count in keyboard trigger time, this is perhaps better
            var y = (((time_elapsed - drop_at_elapsed_time) * (height-height5 - 82*width11/256)) / reaction_time); //newest

            var x;
            if (which_lane == 1)
              x = width/11*3-width11;
            else if (which_lane == 2)
              x = width/11*4-width11;
            else if (which_lane == 3)
              x = width/11*5-width11;
            else if (which_lane == 4)
              x = width/11*6-width11;
            else if (which_lane == 5)
              x = width/11*7-width11;
            else if (which_lane == 6)
              x = width/11*8-width11;
            else if (which_lane == 7)
              x = width/11*9-width11;

            if (which_lane == 1 || which_lane == 3 || which_lane == 5 || which_lane == 7)
              myContext.drawImage(note1, x+0.05*width11, y, 0.9*width11, 82*width11/256);
            else
              myContext.drawImage(note2, x+0.05*width11, y, 0.9*width11, 82*width11/256);
          }

          if (time_elapsed > drop_at_elapsed_time + reaction_time) {
            dropindex++;
          }

        }
      }

      function draw_hit_result(){
        if (time_elapsed <= last_result_displayed_time + hit_display_time) {
          if (last_result == 0) {
            myContext.drawImage(img_0, width / 2 - 181 / 2, height / 2);
          }
          else if (last_result == 50) {
            myContext.drawImage(img_50, width / 2 - 142 / 2, height / 2);
          }
          else if (last_result == 100) {
            myContext.drawImage(img_100, width / 2 - 182 / 2, height / 2);
          }
          else if (last_result == 300) {
            myContext.drawImage(img_300, width / 2 - 188 / 2, height / 2);
          }
        }
      }

      function check_hits() {
        var i;
        var y;
        //console.log("start: " + judgementindex);
        for (i = judgementindex; i < notes.length; i++) {
          if (notes[i][2] == 0) {
            var desired_hit_time = notes[i][0] + reaction_time;
            var which_lane = notes[i][1];

            if (time_elapsed < desired_hit_time - miss_judgement) {
              //console.log("end: " + i);
              break;
            }

            if (time_elapsed >= desired_hit_time + bad_judgement) {
              //counts as a miss
              //myContext.drawImage(img_0, width / 2, height / 2);
              last_result = 0;
              last_result_displayed_time = time_elapsed;
              notes[i][2] = 1;
              judgementindex++;
              $scope.num_miss = $scope.num_miss + 1;
              continue;
            }

            if (desired_hit_time - miss_judgement <= time_elapsed && time_elapsed <= desired_hit_time + miss_judgement) {
              if (desired_hit_time - bad_judgement <= time_elapsed && time_elapsed <= desired_hit_time + bad_judgement) {
                if (desired_hit_time - good_judgement <= time_elapsed && time_elapsed <= desired_hit_time + good_judgement) {
                  if (desired_hit_time - perfect_judgement <= time_elapsed && time_elapsed <= desired_hit_time + perfect_judgement) {
                    //console.log("perfect implementation");
                    y = (2 * height - height16 / 2) / 2;
                    //if (which_lane == 1 && keysdown[90]) {
                    if (which_lane == 1 && isOnLane1) {
                      //myContext.drawImage(img_300, width/2, height/2);
                      last_result = 300;
                      last_result_displayed_time = time_elapsed;
                      //console.log("300");
                      notes[i][2] = 1;
                      lightings[0] = 0;
                      isOnLane1 = false;
                      $scope.score = $scope.score + 300;
                      $scope.num_300 = $scope.num_300 + 1;
                    }
                    //if (which_lane == 2 && keysdown[88]) {
                    if (which_lane == 2 && isOnLane2) {
                      //myContext.drawImage(img_300, width/2, height/2);
                      last_result = 300;
                      last_result_displayed_time = time_elapsed;
                      //console.log("300");
                      notes[i][2] = 1;
                      lightings[1] = 0;
                      isOnLane2 = false;
                      $scope.score = $scope.score + 300;
                      $scope.num_300 = $scope.num_300 + 1;
                    }
                    //if (which_lane == 3 && keysdown[67]) {
                    if (which_lane == 3 && isOnLane3) {
                      //myContext.drawImage(img_300, width/2, height/2);
                      last_result = 300;
                      last_result_displayed_time = time_elapsed;
                      //console.log("300");
                      notes[i][2] = 1;
                      lightings[2] = 0;
                      isOnLane3 = false;
                      $scope.score = $scope.score + 300;
                      $scope.num_300 = $scope.num_300 + 1;
                    }
                    //if (which_lane == 4 && keysdown[86]) {
                    if (which_lane == 4 && isOnLane4) {
                      //myContext.drawImage(img_300, width/2, height/2);
                      last_result = 300;
                      last_result_displayed_time = time_elapsed;
                      //console.log("300");
                      notes[i][2] = 1;
                      lightings[3] = 0;
                      isOnLane4 = false;
                      $scope.score = $scope.score + 300;
                      $scope.num_300 = $scope.num_300 + 1;
                    }
                    //if (which_lane == 5 && keysdown[66]) {
                    if (which_lane == 5 && isOnLane5) {
                      //myContext.drawImage(img_300, width/2, height/2);
                      last_result = 300;
                      last_result_displayed_time = time_elapsed;
                      //console.log("300");
                      notes[i][2] = 1;
                      lightings[4] = 0;
                      isOnLane5 = false;
                      $scope.score = $scope.score + 300;
                      $scope.num_300 = $scope.num_300 + 1;
                    }
                    //if (which_lane == 6 && keysdown[78]) {
                    if (which_lane == 6 && isOnLane6) {
                      //myContext.drawImage(img_300, width/2, height/2);
                      last_result = 300;
                      last_result_displayed_time = time_elapsed;
                      //console.log("300");
                      notes[i][2] = 1;
                      lightings[5] = 0;
                      isOnLane6 = false;
                      $scope.score = $scope.score + 300;
                      $scope.num_300 = $scope.num_300 + 1;
                    }
                    //if (which_lane == 7 && keysdown[77]) {
                    if (which_lane == 7 && isOnLane7) {
                      //myContext.drawImage(img_300, width/2, height/2);
                      last_result = 300;
                      last_result_displayed_time = time_elapsed;
                      //console.log("300");
                      notes[i][2] = 1;
                      lightings[6] = 0;
                      isOnLane7 = false;
                      $scope.score = $scope.score + 300;
                      $scope.num_300 = $scope.num_300 + 1;
                    }
                    continue;
                  }

                  //console.log("good implementation");
                  y = (2 * height - height16 / 2) / 2;
                  //if (which_lane == 1 && keysdown[90]) {
                  if (which_lane == 1 && isOnLane1) {
                    //myContext.drawImage(img_100, width/2, height/2);
                    last_result = 100;
                    last_result_displayed_time = time_elapsed;
                    //console.log("100");
                    notes[i][2] = 1;
                    lightings[0] = 0;
                    isOnLane1= false;
                    $scope.score = $scope.score + 100;
                    $scope.num_100 = $scope.num_100 + 1;
                  }
                  //if (which_lane == 2 && keysdown[88]) {
                  if (which_lane == 2 && isOnLane2) {
                    //myContext.drawImage(img_100, width/2, height/2);
                    last_result = 100;
                    last_result_displayed_time = time_elapsed;
                    //console.log("100");
                    notes[i][2] = 1;
                    lightings[1] = 0;
                    isOnLane2=false;
                    $scope.score = $scope.score + 100;
                    $scope.num_100 = $scope.num_100 + 1;
                  }
                  //if (which_lane == 3 && keysdown[67]) {
                  if (which_lane == 3 && isOnLane3) {
                    //myContext.drawImage(img_100, width/2, height/2);
                    last_result = 100;
                    last_result_displayed_time = time_elapsed;
                    //console.log("100");
                    notes[i][2] = 1;
                    lightings[2] = 0;
                    isOnLane3=false;
                    $scope.score = $scope.score + 100;
                    $scope.num_100 = $scope.num_100 + 1;
                  }
                  //if (which_lane == 4 && keysdown[86]) {
                  if (which_lane == 4 && isOnLane4) {
                    //myContext.drawImage(img_100, width/2, height/2);
                    last_result = 100;
                    last_result_displayed_time = time_elapsed;
                    //console.log("100");
                    notes[i][2] = 1;
                    lightings[3] = 0;
                    isOnLane4=false;
                    $scope.score = $scope.score + 100;
                    $scope.num_100 = $scope.num_100 + 1;
                  }
                  //if (which_lane == 5 && keysdown[66]) {
                  if (which_lane == 5 && isOnLane5) {
                    //myContext.drawImage(img_100, width/2, height/2);
                    last_result = 100;
                    last_result_displayed_time = time_elapsed;
                    //console.log("100");
                    notes[i][2] = 1;
                    lightings[4] = 0;
                    isOnLane5=false;
                    $scope.score = $scope.score + 100;
                    $scope.num_100 = $scope.num_100 + 1;
                  }
                  //if (which_lane == 6 && keysdown[78]) {
                  if (which_lane == 6 && isOnLane6) {
                    //myContext.drawImage(img_100, width/2, height/2);
                    last_result = 100;
                    last_result_displayed_time = time_elapsed;
                    //console.log("100");
                    notes[i][2] = 1;
                    lightings[5] = 0;
                    isOnLane6=false;
                    $scope.score = $scope.score + 100;
                    $scope.num_100 = $scope.num_100 + 1;
                  }
                  //if (which_lane == 7 && keysdown[77]) {
                  if (which_lane == 7 && isOnLane7) {
                    //myContext.drawImage(img_100, width/2, height/2);
                    last_result = 100;
                    last_result_displayed_time = time_elapsed;
                    //console.log("100");
                    notes[i][2] = 1;
                    lightings[6] = 0;
                    isOnLane7=false;
                    $scope.score = $scope.score + 100;
                    $scope.num_100 = $scope.num_100 + 1;
                  }
                  continue;
                }
                //console.log("bad implementation");

                y = (2 * height - height16 / 2) / 2;
                //if (which_lane == 1 && keysdown[90]) {
                if (which_lane == 1 && isOnLane1) {
                  //myContext.drawImage(img_50, width/2, height/2);
                  last_result = 50;
                  last_result_displayed_time = time_elapsed;
                  //console.log("50");
                  notes[i][2] = 1;
                  lightings[0] = 0;
                  isOnLane1=false;
                  judgementindex++;
                  $scope.score = $scope.score + 50;
                  $scope.num_50 = $scope.num_50 + 1;
                }
                //if (which_lane == 2 && keysdown[88]) {
                if (which_lane == 2 && isOnLane2) {
                  //myContext.drawImage(img_50, width/2, height/2);
                  last_result = 50;
                  last_result_displayed_time = time_elapsed;
                  //console.log("50");
                  notes[i][2] = 1;
                  lightings[1] = 0;
                  isOnLane2=false;
                  judgementindex++;
                  $scope.score = $scope.score + 50;
                  $scope.num_50 = $scope.num_50 + 1;
                }
                //if (which_lane == 3 && keysdown[67]) {
                if (which_lane == 3 && isOnLane3) {
                  //myContext.drawImage(img_50, width/2, height/2);
                  last_result = 50;
                  last_result_displayed_time = time_elapsed;
                  //console.log("50");
                  notes[i][2] = 1;
                  lightings[2] = 0;
                  isOnLane3=false;
                  judgementindex++;
                  $scope.score = $scope.score + 50;
                  $scope.num_50 = $scope.num_50 + 1;
                }
                //if (which_lane == 4 && keysdown[86]) {
                if (which_lane == 4 && isOnLane4) {
                  //myContext.drawImage(img_50, width/2, height/2);
                  last_result = 50;
                  last_result_displayed_time = time_elapsed;
                  //console.log("50");
                  notes[i][2] = 1;
                  lightings[3] = 0;
                  isOnLane4=false;
                  judgementindex++;
                  $scope.score = $scope.score + 50;
                  $scope.num_50 = $scope.num_50 + 1;
                }
                //if (which_lane == 5 && keysdown[66]) {
                if (which_lane == 5 && isOnLane5) {
                  //myContext.drawImage(img_50, width/2, height/2);
                  last_result = 50;
                  last_result_displayed_time = time_elapsed;
                  //console.log("50");
                  notes[i][2] = 1;
                  lightings[4] = 0;
                  isOnLane5=false;
                  judgementindex++;
                  $scope.score = $scope.score + 50;
                  $scope.num_50 = $scope.num_50 + 1;
                }
                //if (which_lane == 6 && keysdown[78]) {
                if (which_lane == 6 && isOnLane6) {
                  //myContext.drawImage(img_50, width/2, height/2);
                  last_result = 50;
                  last_result_displayed_time = time_elapsed;
                  //console.log("50");
                  notes[i][2] = 1;
                  lightings[5] = 0;
                  isOnLane6=false;
                  judgementindex++;
                  $scope.score = $scope.score + 50;
                  $scope.num_50 = $scope.num_50 + 1;
                }
                //if (which_lane == 7 && keysdown[77]) {
                if (which_lane == 7 && isOnLane7) {
                  //myContext.drawImage(img_50, width/2, height/2);
                  last_result = 50;
                  last_result_displayed_time = time_elapsed;
                  //console.log("50");
                  notes[i][2] = 1;
                  lightings[6] = 0;
                  isOnLane7=false;
                  judgementindex++;
                  $scope.score = $scope.score + 50;
                  $scope.num_50 = $scope.num_50 + 1;
                }
              }
              else {
                //if (keysdown[90]||keysdown[88]||keysdown[67]||keysdown[86]||keysdown[66]||keysdown[78]||keysdown[77]) {
                if (isOnLane1||isOnLane2||isOnLane3||isOnLane4||isOnLane5||isOnLane6||isOnLane7) {
                  //myContext.drawImage(img_0, width / 2, height / 2);
                  last_result = 0;
                  last_result_displayed_time = time_elapsed;
                  notes[i][2] = 1;
                  judgementindex++;
                  $scope.num_miss = $scope.num_miss + 1;
                  // isOnLane1 = false;
                  // isOnLane2 = false;
                  // isOnLane3 = false;
                  // isOnLane4 = false;
                  // isOnLane5 = false;
                  // isOnLane6 = false;
                  // isOnLane7 = false;
                }
              } //end of else
            }//miss judgement
          }// if notes have no hit registration yet
        } //for each note
      }//end of function

      function lighting_handling(){
        myContext.save();
        myContext.globalAlpha = 1.0;
        var i;
        for(i = 0; i < 7; i++){
          // if (lightings[i] == 10) {
          //   myContext.drawImage(light10, width / 11 * (3 + i) - width11, height - height5 - 82*width11/256/2 - width11/2, width11, width11);
          //   lightings[i]++;
          // }
          if (lightings[i] == 9) {
            myContext.drawImage(light9, width / 11 * (3 + i) - width11/2 - width11 * 3 / 2, height - height5 - 82*width11/256/2 - 3*width11/2, width11*3, width11*3);
            lightings[i]++;
          }
          if (lightings[i] == 8) {
            myContext.drawImage(light8, width / 11 * (3 + i) - width11/2 - width11 * 3 / 2, height - height5 - 82*width11/256/2 - 3*width11/2, width11*3, width11*3);
            lightings[i]++;
          }
          if (lightings[i] == 7) {
            myContext.drawImage(light7, width / 11 * (3 + i) - width11/2 - width11 * 3 / 2, height - height5 - 82*width11/256/2 - 3*width11/2, width11*3, width11*3);
            lightings[i]++;
          }
          if (lightings[i] == 6) {
            myContext.drawImage(light6, width / 11 * (3 + i) - width11/2 - width11 * 3 / 2, height - height5 - 82*width11/256/2 - 3*width11/2, width11*3, width11*3);
            lightings[i]++;
          }
          if (lightings[i] == 5) {
            myContext.drawImage(light5, width / 11 * (3 + i) - width11/2 - width11 * 3 / 2, height - height5 - 82*width11/256/2 - 3*width11/2, width11*3, width11*3);
            lightings[i]++;
          }
          if (lightings[i] == 4) {
            myContext.drawImage(light4, width / 11 * (3 + i) - width11/2 - width11 * 3 / 2, height - height5 - 82*width11/256/2 - 3*width11/2, width11*3, width11*3);
            lightings[i]++;
          }
          if (lightings[i] == 3) {
            myContext.drawImage(light3, width / 11 * (3 + i) - width11/2 - width11 * 3 / 2, height - height5 - 82*width11/256/2 - 3*width11/2, width11*3, width11*3);
            lightings[i]++;
          }
          if (lightings[i] == 2) {
            myContext.drawImage(light2, width / 11 * (3 + i) - width11/2 - width11 * 3 / 2, height - height5 - 82*width11/256/2 - 3*width11/2, width11*3, width11*3);
            lightings[i]++;
          }
          if (lightings[i] == 1) {
            myContext.drawImage(light1, width / 11 * (3 + i) - width11/2 - width11 * 3 / 2, height - height5 - 82*width11/256/2 - 3*width11/2, width11*3, width11*3);
            lightings[i]++;
          }
          if (lightings[i] == 0) {
            myContext.drawImage(light0, width / 11 * (3 + i) - width11/2 - width11 * 3 / 2, height - height5 - 82*width11/256/2 - 3*width11/2, width11*3, width11*3);
            lightings[i]++;
          }
        }
        myContext.restore();
      }

      // animation loop - clear, update, draw, schedule the next iteration
      function draw() {

        time_elapsed = Date.now() - begin_time;

        myContext.clearRect(0, 0, canvas.width, canvas.height);
        myContext.save();

        //myContext.drawImage(note2,width/13,height-height5-82*width11/256,width11,82*width11/256);


        function draw_ui() {



          myContext.drawImage(stage_left, width/11*3-width11-width11/2, 0, width11/2, height);
          myContext.drawImage(stage_right, width/11*9, 0, width11/2, height);

          //myContext.drawImage(stage_hint, width11*2, height-height5-105, width11*7, 200);


          // myContext.drawImage(judgement_line, width11*2, height-height5-82*width11/256, width11*7, 82*width11/256);
          // myContext.drawImage(judgement_line_effect, width11*2, height-height5-82*width11/256-4*82*width11/256, width11*7, 4*82*width11/256);

          myContext.drawImage(stage_hint, width11*2, height-height5-14*82*width11/256, width11*7, 15*82*width11/256);

          // myContext.drawImage(lane_separator, width/11*4-width11-2, 0, 4, height-height5);
          // myContext.drawImage(lane_separator, width/11*5-width11-2, 0, 4, height-height5);
          // myContext.drawImage(lane_separator, width/11*6-width11-2, 0, 4, height-height5);
          // myContext.drawImage(lane_separator, width/11*7-width11-2, 0, 4, height-height5);
          // myContext.drawImage(lane_separator, width/11*8-width11-2, 0, 4, height-height5);
          // myContext.drawImage(lane_separator, width/11*9-width11-2, 0, 4, height-height5);

          myContext.drawImage(lane_separator, width/11*4-width11-2, 0, 4, height);
          myContext.drawImage(lane_separator, width/11*5-width11-2, 0, 4, height);
          myContext.drawImage(lane_separator, width/11*6-width11-2, 0, 4, height);
          myContext.drawImage(lane_separator, width/11*7-width11-2, 0, 4, height);
          myContext.drawImage(lane_separator, width/11*8-width11-2, 0, 4, height);
          myContext.drawImage(lane_separator, width/11*9-width11-2, 0, 4, height);

          myContext.drawImage(key1, width/11*3-width11, height-height5, width11, height5);
          myContext.drawImage(key2, width/11*4-width11, height-height5, width11, height5);
          myContext.drawImage(key1, width/11*5-width11, height-height5, width11, height5);
          myContext.drawImage(key2, width/11*6-width11, height-height5, width11, height5);
          myContext.drawImage(key1, width/11*7-width11, height-height5, width11, height5);
          myContext.drawImage(key2, width/11*8-width11, height-height5, width11, height5);
          myContext.drawImage(key1, width/11*9-width11, height-height5, width11, height5);

          myContext.drawImage(menu_back, width - width11*1.75, 0, width11*1.75, height5/2);

          myContext.restore();
        }

        function input_handling() {
          var key1d = document.createElement('img');
          key1d.src = 'mania-key1D.png';
          var key2d = document.createElement('img');
          key2d.src = 'mania-keySD.png';
          var stage_light = document.createElement('img');
          stage_light.src = 'mania-stage-light.png';

          if (isOnLane1) {

            //height-height5

            myContext.drawImage(stage_light, width/11*3-width11, height-height5-height*3/4, width11, height*3/4);
            myContext.drawImage(key1D, width/11*3-width11, height-height5, width11, height5);
            isOnLane1 = false;
            //draw_lighting(3);
            /*
             myContext.beginPath();
             myContext.moveTo(1 * width9 + 5, height);
             myContext.lineTo(1 * width9 + 5, height - height16 / 2);
             myContext.lineTo(2 * width9 - 5, height - height16 / 2);
             myContext.lineTo(2 * width9 - 5, height);
             myContext.lineTo(1 * width9 + 5, height);
             myContext.closePath();
             myContext.fillStyle = "#CC0000";
             myContext.fill();
             */
          }
          if (isOnLane2) {
            myContext.drawImage(stage_light, width/11*4-width11, height-height5-height*3/4, width11, height*3/4);
            myContext.drawImage(key2D, width/11*4-width11, height-height5, width11, height5);
            isOnLane2 = false;
            //draw_lighting(4);
            /*
             myContext.beginPath();
             myContext.moveTo(2 * width9 + 5, height);
             myContext.lineTo(2 * width9 + 5, height - height16 / 2);
             myContext.lineTo(3 * width9 - 5, height - height16 / 2);
             myContext.lineTo(3 * width9 - 5, height);
             myContext.lineTo(2 * width9 + 5, height);
             myContext.closePath();
             myContext.fillStyle = "#CC0000";
             myContext.fill();
             */
          }
          if (isOnLane3) {
            myContext.drawImage(stage_light, width/11*5-width11, height-height5-height*3/4, width11, height*3/4);
            myContext.drawImage(key1D, width/11*5-width11, height-height5, width11, height5);
            isOnLane3= false;
            //draw_lighting(5);
            /*
             myContext.beginPath();
             myContext.moveTo(3 * width9 + 5, height);
             myContext.lineTo(3 * width9 + 5, height - height16 / 2);
             myContext.lineTo(4 * width9 - 5, height - height16 / 2);
             myContext.lineTo(4 * width9 - 5, height);
             myContext.lineTo(3 * width9 + 5, height);
             myContext.closePath();
             myContext.fillStyle = "#CC0000";
             myContext.fill();
             */
          }
          if (isOnLane4) {
            myContext.drawImage(stage_light, width/11*6-width11, height-height5-height*3/4, width11, height*3/4);
            myContext.drawImage(key2D, width/11*6-width11, height-height5, width11, height5);
            isOnLane4 = false;
            //draw_lighting(6);
            /*
             myContext.beginPath();
             myContext.moveTo(4 * width9 + 5, height);
             myContext.lineTo(4 * width9 + 5, height - height16 / 2);
             myContext.lineTo(5 * width9 - 5, height - height16 / 2);
             myContext.lineTo(5 * width9 - 5, height);
             myContext.lineTo(4 * width9 + 5, height);
             myContext.closePath();
             myContext.fillStyle = "#CC0000";
             myContext.fill();
             */
          }
          if (isOnLane5) {
            myContext.drawImage(stage_light, width/11*7-width11, height-height5-height*3/4, width11, height*3/4);
            myContext.drawImage(key1D, width/11*7-width11, height-height5, width11, height5);
            isOnLane5 = false;
            //draw_lighting(7);
            /*
             myContext.beginPath();
             myContext.moveTo(5 * width9 + 5, height);
             myContext.lineTo(5 * width9 + 5, height - height16 / 2);
             myContext.lineTo(6 * width9 - 5, height - height16 / 2);
             myContext.lineTo(6 * width9 - 5, height);
             myContext.lineTo(5 * width9 + 5, height);
             myContext.closePath();
             myContext.fillStyle = "#CC0000";
             myContext.fill();
             */
          }
          if (isOnLane6) {
            myContext.drawImage(stage_light, width/11*8-width11, height-height5-height*3/4, width11, height*3/4);
            myContext.drawImage(key2D, width/11*8-width11, height-height5, width11, height5);
            isOnLane6 = false;
            //draw_lighting(8);
            /*
             myContext.beginPath();
             myContext.moveTo(6 * width9 + 5, height);
             myContext.lineTo(6 * width9 + 5, height - height16 / 2);
             myContext.lineTo(7 * width9 - 5, height - height16 / 2);
             myContext.lineTo(7 * width9 - 5, height);
             myContext.lineTo(6 * width9 + 5, height);
             myContext.closePath();
             myContext.fillStyle = "#CC0000";
             myContext.fill();
             */
          }
          if (isOnLane7) {
            myContext.drawImage(stage_light, width/11*9-width11, height-height5-height*3/4, width11, height*3/4);
            myContext.drawImage(key1D, width/11*9-width11, height-height5, width11, height5);
            isOnLane7 = false;
            //draw_lighting(9);
            /*
             myContext.beginPath();
             myContext.moveTo(7 * width9 + 5, height);
             myContext.lineTo(7 * width9 + 5, height - height16 / 2);
             myContext.lineTo(8 * width9 - 5, height - height16 / 2);
             myContext.lineTo(8 * width9 - 5, height);
             myContext.lineTo(7 * width9 + 5, height);
             myContext.closePath();
             myContext.fillStyle = "#CC0000";
             myContext.fill();
             */
          }
        }

        draw_ui();
        drop();
        check_hits();
        draw_hit_result();
        input_handling();
        lighting_handling();

        myContext.restore();

        if(Date.now()-begin_time > 3000 && !music) {
          lemon_tree.play();
          music = true;
          console.log('play!');
        }



        window.requestAnimationFrame(function () {
          draw();
        });
      }

      // function sleep(milliseconds) {
      //   var start = new Date().getTime();
      //   for (var i = 0; i < 1e7; i++) {
      //     if ((new Date().getTime() - start) > milliseconds){
      //       break;
      //     }
      //   }
      // }

      // set up the elements
      theCanvas = document.getElementById('canvas');
      myContext = theCanvas.getContext('2d');

      //lemon_tree.play();
      //sleep(3000);
      draw();
    }

  }).controller('TutorialCtrl', function($scope,$state, $stateParams) {

});
