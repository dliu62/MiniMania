angular.module('starter.controllers', [])
  .controller('HomePageCtrl', function($scope,$state, $stateParams) {
    $scope.playBtnClick = function(){
     $state.go("playlist",{},{reload:true})
   };
   $scope.highScoresBtnClick = function(){
      $state.go("highScores",{},{reload:true})
   };
    $scope.creditBtnClick = function(){
      $state.go("Credits",{},{reload:true});

    }

  })

  .controller('playlistCtrl', function($scope,$state, $stateParams) {
    $scope.starClick = function(){
     $state.go("play",{'songPick': 1},{reload:true})
   };
   $scope.canonClick = function(){
      $state.go("play",{'songPick': 2},{reload:true})
   };
    $scope.lostClick = function(){
			$state.go("play",{'songPick': 3},{reload:true})
    }

  })
  .controller('CreditsCtrl', function($scope,$state, $stateParams) {
    $scope.restart = function(){
      $state.go("home",{},{reload:true})
    };

  })


  .controller('PlayCtrl', function($rootScope,$scope,$state, $stateParams, $window) {
    $(document).ready(function(){
      $("ion-content").css("top",0);
    });

    $scope.offset = 0;
    $scope.score = 0;
    $scope.num_miss = 0;
    $scope.num_50 = 0;
    $scope.num_100 = 0;
    $scope.num_300 = 0;
		$scope.spinScore = 0;

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

      var display1 = 0;
      var display2 = 0;
      var display3 = 0;
      var display4 = 0;
      var display5 = 0;
      var display6 = 0;
      var display7 = 0;

      var dropindex = 0;
      var judgementindex = 0;
      var saved = false;


      var canvas1 = $("#canvas");  //store canvas outside event loop
      var x__1, y__1;

      var animateframe;

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

        //check user hits back button
        //myContext.drawImage(menu_back, width - width11*1.75, 0, width11*1.75, width11*1.75);
        if (width-width11*1.75 < x__1 && x__1 < width && 0 < y__1 && y__1 < width11*1.75)
        {
          selectedMusic.pause();
          selectedMusic.currentTime = 0;
          window.cancelAnimationFrame(animateframe);
         $state.go("home",{},{reload:true});
        }


        //check user changes offset
        if (width-width11*1.75 < x__1 && x__1 < width && width11 * 2 < y__1 && y__1 < width11*4) {
          $scope.offset += 10;
					song_end_time += $scope.offset;
          $("#offset_value").html("Offset: " + $scope.offset);
          $('#offset_value').show();
          $('#offset_value').delay(500).fadeOut('slow');
        }
        else if (width-width11*1.75 < x__1 && x__1 < width && width11 * 4 < y__1 && y__1 < width11 * 6) {
          $scope.offset -= 10;
          $("#offset_value").html("Offset: " + $scope.offset);
          $('#offset_value').show();
          $('#offset_value').delay(500).fadeOut('slow');
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

      //new: Accelerometer
      var accel_state = 0;
      var last_accel = 0;
      //var flip_begin_time = 62910 + $scope.offset;
      //var flip_end_time = 78510 + $scope.offset;
			var flip_begin_time;
			var flip_end_time;
			var song_end_time;

      var spin_hint_played = 0;
      var lasthitsound = 2;

      function onSuccess(acceleration) {
        if (flip_begin_time < Date.now() - begin_time  && Date.now() - begin_time < flip_end_time) {
          if (accel_state == 0) { // need two flips to get point
            if (last_accel == 0) { //first time
              if (acceleration.x >= 4 || acceleration.x <= -4) {
                accel_state++;
                last_accel = acceleration.x;
              }
            }
            else if (last_accel >= 4) {
              if (acceleration.x <= -4) {
                accel_state++;
                last_accel = acceleration.x;
              }
            }
            else {
              if (acceleration.x >= 4) {
                accel_state++;
                last_accel = acceleration.x;
              }
            }
          }
          else if (accel_state == 1) { // need one flip to get point
            if (last_accel >= 4) {
              if (acceleration.x <= -4) {
                accel_state = 0;
                $scope.score += 300;
                $scope.spinScore += 300;
								spin_sound.currentTime = 0;
                spin_sound.play();
              }
            }
            else {
              if (acceleration.x >= 4) {
                accel_state = 0;
                $scope.score += 300;
								$scope.spinScore += 300;
								spin_sound.currentTime = 0;
                spin_sound.play();
              }
            }
          }
        }
      }

      function onError() {
        alert('onError!');
      }

      var options = { frequency: 10 };  // Update every 10 milliseconds
      //TODO: install plugin
      var watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);




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
      var plus = document.createElement('img');
      plus.src = 'plus.png';
      var minus = document.createElement('img');
      minus.src = 'minus.png';

      var spin = document.createElement('img');
      spin.src = 'spin.png';
      var hit_sound = document.createElement("AUDIO");
      hit_sound.src = 'hitsound.wav';
      var hit_sound2 = document.createElement("AUDIO");
      hit_sound2.src = 'hitsound.wav';
      var spin_sound = document.createElement("AUDIO");
      spin_sound.src = 'spinnerbonus.wav';
			var spin_sound2 = document.createElement("AUDIO");
      spin_sound2.src = 'spinnerbonus2.wav';
			var spin_sound3 = document.createElement("AUDIO");
      spin_sound3.src = 'spinnerbonus3.wav';
      var spin_hint = document.createElement("AUDIO");
      spin_hint.src = 'sectionpass.mp3';

      var note1 = document.createElement('img');
      note1.src = 'mania-note1.png';
      var note2 = document.createElement('img');
      note2.src = 'mania-note2.png';


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

      var selectedMusic = document.createElement("AUDIO");


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


      var time_elapsed = 0;
      var reaction_time = 2000;

      var hit_display_time = 400;

			var notes = [];

			function getNotes(numOfNotes, diff, pattern, startTime) {
						var newNote = [];
						for(var i=0; i<numOfNotes; i++) {
							var xt = startTime+850+i*diff;
							newNote.push([xt,pattern[i%pattern.length],0]);
						}
						return newNote;
					}

			function pickSong () {
				switch($stateParams.songPick) {
					case 1:
					notes = genStar();
					selectedMusic.src = 'music/Star.mp3';
					flip_begin_time = null;
					flip_end_time = null;
					song_end_time = 105000+$scope.offset;
					selectedMusic.volume = 1.0;
					break;
					case 2:
					notes = genCanon();
					selectedMusic.src = 'music/Canon.mp3';
					flip_begin_time = 62000+1000+$scope.offset;
					flip_end_time = 77000+1000+$scope.offset;
					song_end_time = 152000+$scope.offset;
					selectedMusic.volume = 0.8;
					break;
					case 3:
					notes = genLost();
					selectedMusic.src = 'music/Lost.mp3';
					selectedMusic.volume = 0.3;
					flip_begin_time = 46000+$scope.offset;
					flip_end_time = 59000+$scope.offset;
					song_end_time = 210000+$scope.offset;
					break;
				}
			}

			function genStar() {
				var rand = [];
				for (var i = 0; i < 4*12; i++) {
					rand.push(Math.floor(Math.random() * 6) + 1);
				}
				var star1 = getNotes(8*12, 967, rand, 6550 );

				return star1;
			}

			function genCanon() {
				var rand = [];
				for (var i = 0; i < 16; i++) {
					rand.push(Math.floor(Math.random() * 6) + 1);
				}
				var notesLV1 = getNotes(8*7, 976.5, [4,3,2,1,7,6,7,1], 6520);
				var notesLV1_2 = getNotes(8*9, 976.5, [4,3,2,1,7,6,7,1], 6520+8*9*976.5);
				notesLV1 = notesLV1.concat(notesLV1_2);
				var notesLV2_1 = getNotes(8*4, 976.5, [1,2,3,4,5,6,7,1], 22632.25);
				var notesLV2_2 = getNotes(8*1, 976.5, [2,2,3,3,5,5,7,7], 53880.25);

				var notesLV2_3 = getNotes(8*5, 976.5, [3,2,3,4,4,6,1,1], 85128.25-976.5*8);
				var notesLV2_4 = getNotes(8*4, 976.5, [1,2,1,6,5,6,7,3], 116376.25);
				var notesLV2 = notesLV2_1.concat(notesLV2_2);
      	notesLV2 = notesLV2.concat(notesLV2_3);
      	notesLV2 = notesLV2.concat(notesLV2_4);
				return notesLV1.concat(notesLV2);
			}

			function genLost() {
				var rand = [];
				for (var i = 0; i < 8*32; i++) {
					rand.push(Math.floor(Math.random() * 6) + 1);
				}
				var lost1 = getNotes(8*7, 706, rand, 150+3910 );
				var lost2 = getNotes(8*9+4, 706, rand, 150+3910+8*10*706);
				var lost3 = getNotes(8*32, 353, rand, 150+3910+8*10*706+(8*9+4)*706);
				return lost1.concat(lost2.concat(lost3));
			}

      function compareFunction(note1, note2) {
        if (note1[0] < note2[0])
          return -1;
        else
          return 1;
      }

			pickSong();
      notes.sort(compareFunction);

      var lightings = [-1,-1,-1,-1,-1,-1,-1];

      function drop() {
        var i;
        for (i = dropindex; i < notes.length; i++) {
          var drop_at_elapsed_time = notes[i][0] + $scope.offset;
          var which_lane = notes[i][1];

          if (time_elapsed < drop_at_elapsed_time) {
            break;
          }

          if (time_elapsed >= drop_at_elapsed_time && time_elapsed <= drop_at_elapsed_time + reaction_time) {
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
        for (i = judgementindex; i < notes.length; i++) {
          if (notes[i][2] == 0) {
            var desired_hit_time = notes[i][0] + reaction_time + $scope.offset;
            var which_lane = notes[i][1];

            if (time_elapsed < desired_hit_time - miss_judgement) {
              break;
            }

            if (time_elapsed >= desired_hit_time + bad_judgement) {
              //counts as a miss
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
                    y = (2 * height - height16 / 2) / 2;
                    if (which_lane == 1 && isOnLane1) {
                      last_result = 300;
                      last_result_displayed_time = time_elapsed;
                      notes[i][2] = 1;
                      lightings[0] = 0;
                      $scope.score = $scope.score + 300;
                      $scope.num_300 = $scope.num_300 + 1;
                      if (lasthitsound == 2) {

                        hit_sound.play();
                        lasthitsound = 1;
                      }
                      else
                      {

                        hit_sound2.play();
                        lasthitsound = 2;
                      }

                    }
                    if (which_lane == 2 && isOnLane2) {
                      last_result = 300;
                      last_result_displayed_time = time_elapsed;
                      notes[i][2] = 1;
                      lightings[1] = 0;
                      $scope.score = $scope.score + 300;
                      $scope.num_300 = $scope.num_300 + 1;
                      if (lasthitsound == 2) {

                        hit_sound.play();
                        lasthitsound = 1;
                      }
                      else
                      {

                        hit_sound2.play();
                        lasthitsound = 2;
                      }
                    }
                    if (which_lane == 3 && isOnLane3) {
                      last_result = 300;
                      last_result_displayed_time = time_elapsed;
                      notes[i][2] = 1;
                      lightings[2] = 0;
                      $scope.score = $scope.score + 300;
                      $scope.num_300 = $scope.num_300 + 1;
                      if (lasthitsound == 2) {

                        hit_sound.play();
                        lasthitsound = 1;
                      }
                      else
                      {

                        hit_sound2.play();
                        lasthitsound = 2;
                      }
                    }
                    if (which_lane == 4 && isOnLane4) {
                      last_result = 300;
                      last_result_displayed_time = time_elapsed;
                      notes[i][2] = 1;
                      lightings[3] = 0;
                      $scope.score = $scope.score + 300;
                      $scope.num_300 = $scope.num_300 + 1;
                      if (lasthitsound == 2) {

                        hit_sound.play();
                        lasthitsound = 1;
                      }
                      else
                      {

                        hit_sound2.play();
                        lasthitsound = 2;
                      }
                    }
                    if (which_lane == 5 && isOnLane5) {
                      last_result = 300;
                      last_result_displayed_time = time_elapsed;
                      notes[i][2] = 1;
                      lightings[4] = 0;
                      $scope.score = $scope.score + 300;
                      $scope.num_300 = $scope.num_300 + 1;
                      if (lasthitsound == 2) {

                        hit_sound.play();
                        lasthitsound = 1;
                      }
                      else
                      {

                        hit_sound2.play();
                        lasthitsound = 2;
                      }
                    }
                    if (which_lane == 6 && isOnLane6) {
                      last_result = 300;
                      last_result_displayed_time = time_elapsed;
                      notes[i][2] = 1;
                      lightings[5] = 0;
                      $scope.score = $scope.score + 300;
                      $scope.num_300 = $scope.num_300 + 1;
                      if (lasthitsound == 2) {

                        hit_sound.play();
                        lasthitsound = 1;
                      }
                      else
                      {

                        hit_sound2.play();
                        lasthitsound = 2;
                      }
                    }
                    if (which_lane == 7 && isOnLane7) {
                      last_result = 300;
                      last_result_displayed_time = time_elapsed;
                      notes[i][2] = 1;
                      lightings[6] = 0;
                      $scope.score = $scope.score + 300;
                      $scope.num_300 = $scope.num_300 + 1;
                      if (lasthitsound == 2) {

                        hit_sound.play();
                        lasthitsound = 1;
                      }
                      else
                      {

                        hit_sound2.play();
                        lasthitsound = 2;
                      }
                    }
                    continue;
                  }

                  y = (2 * height - height16 / 2) / 2;
                  if (which_lane == 1 && isOnLane1) {
                    last_result = 100;
                    last_result_displayed_time = time_elapsed;
                    notes[i][2] = 1;
                    lightings[0] = 0;
                    $scope.score = $scope.score + 100;
                    $scope.num_100 = $scope.num_100 + 1;
                    if (lasthitsound == 2) {

                        hit_sound.play();
                        lasthitsound = 1;
                      }
                      else
                      {

                        hit_sound2.play();
                        lasthitsound = 2;
                      }
                  }
                  if (which_lane == 2 && isOnLane2) {
                    last_result = 100;
                    last_result_displayed_time = time_elapsed;
                    notes[i][2] = 1;
                    lightings[1] = 0;
                    $scope.score = $scope.score + 100;
                    $scope.num_100 = $scope.num_100 + 1;
                    if (lasthitsound == 2) {

                        hit_sound.play();
                        lasthitsound = 1;
                      }
                      else
                      {

                        hit_sound2.play();
                        lasthitsound = 2;
                      }
                  }
                  if (which_lane == 3 && isOnLane3) {
                    last_result = 100;
                    last_result_displayed_time = time_elapsed;
                    notes[i][2] = 1;
                    lightings[2] = 0;
                    $scope.score = $scope.score + 100;
                    $scope.num_100 = $scope.num_100 + 1;
                    if (lasthitsound == 2) {

                        hit_sound.play();
                        lasthitsound = 1;
                      }
                      else
                      {

                        hit_sound2.play();
                        lasthitsound = 2;
                      }
                  }
                  if (which_lane == 4 && isOnLane4) {
                    last_result = 100;
                    last_result_displayed_time = time_elapsed;
                    notes[i][2] = 1;
                    lightings[3] = 0;
                    $scope.score = $scope.score + 100;
                    $scope.num_100 = $scope.num_100 + 1;
                    if (lasthitsound == 2) {

                        hit_sound.play();
                        lasthitsound = 1;
                      }
                      else
                      {

                        hit_sound2.play();
                        lasthitsound = 2;
                      }
                  }
                  if (which_lane == 5 && isOnLane5) {
                    last_result = 100;
                    last_result_displayed_time = time_elapsed;
                    notes[i][2] = 1;
                    lightings[4] = 0;
                    $scope.score = $scope.score + 100;
                    $scope.num_100 = $scope.num_100 + 1;
                    if (lasthitsound == 2) {

                        hit_sound.play();
                        lasthitsound = 1;
                      }
                      else
                      {

                        hit_sound2.play();
                        lasthitsound = 2;
                      }
                  }
                  if (which_lane == 6 && isOnLane6) {
                    last_result = 100;
                    last_result_displayed_time = time_elapsed;
                    notes[i][2] = 1;
                    lightings[5] = 0;
                    $scope.score = $scope.score + 100;
                    $scope.num_100 = $scope.num_100 + 1;
                    if (lasthitsound == 2) {

                        hit_sound.play();
                        lasthitsound = 1;
                      }
                      else
                      {

                        hit_sound2.play();
                        lasthitsound = 2;
                      }
                  }
                  if (which_lane == 7 && isOnLane7) {
                    last_result = 100;
                    last_result_displayed_time = time_elapsed;
                    notes[i][2] = 1;
                    lightings[6] = 0;
                    $scope.score = $scope.score + 100;
                    $scope.num_100 = $scope.num_100 + 1;
                    if (lasthitsound == 2) {

                        hit_sound.play();
                        lasthitsound = 1;
                      }
                      else
                      {

                        hit_sound2.play();
                        lasthitsound = 2;
                      }
                  }
                  continue;
                }
                y = (2 * height - height16 / 2) / 2;
                if (which_lane == 1 && isOnLane1) {
                  last_result = 50;
                  last_result_displayed_time = time_elapsed;
                  notes[i][2] = 1;
                  lightings[0] = 0;
                  judgementindex++;
                  $scope.score = $scope.score + 50;
                  $scope.num_50 = $scope.num_50 + 1;
                  if (lasthitsound == 2) {

                        hit_sound.play();
                        lasthitsound = 1;
                      }
                      else
                      {

                        hit_sound2.play();
                        lasthitsound = 2;
                      }
                }
                if (which_lane == 2 && isOnLane2) {
                  last_result = 50;
                  last_result_displayed_time = time_elapsed;
                  notes[i][2] = 1;
                  lightings[1] = 0;
                  judgementindex++;
                  $scope.score = $scope.score + 50;
                  $scope.num_50 = $scope.num_50 + 1;
                  if (lasthitsound == 2) {

                        hit_sound.play();
                        lasthitsound = 1;
                      }
                      else
                      {

                        hit_sound2.play();
                        lasthitsound = 2;
                      }
                }
                if (which_lane == 3 && isOnLane3) {
                  last_result = 50;
                  last_result_displayed_time = time_elapsed;
                  notes[i][2] = 1;
                  lightings[2] = 0;
                  judgementindex++;
                  $scope.score = $scope.score + 50;
                  $scope.num_50 = $scope.num_50 + 1;
                  if (lasthitsound == 2) {

                        hit_sound.play();
                        lasthitsound = 1;
                      }
                      else
                      {

                        hit_sound2.play();
                        lasthitsound = 2;
                      }
                }
                if (which_lane == 4 && isOnLane4) {
                  last_result = 50;
                  last_result_displayed_time = time_elapsed;
                  notes[i][2] = 1;
                  lightings[3] = 0;
                  judgementindex++;
                  $scope.score = $scope.score + 50;
                  $scope.num_50 = $scope.num_50 + 1;
                  if (lasthitsound == 2) {

                        hit_sound.play();
                        lasthitsound = 1;
                      }
                      else
                      {

                        hit_sound2.play();
                        lasthitsound = 2;
                      }
                }
                if (which_lane == 5 && isOnLane5) {
                  last_result = 50;
                  last_result_displayed_time = time_elapsed;
                  notes[i][2] = 1;
                  lightings[4] = 0;
                  judgementindex++;
                  $scope.score = $scope.score + 50;
                  $scope.num_50 = $scope.num_50 + 1;
                  if (lasthitsound == 2) {

                        hit_sound.play();
                        lasthitsound = 1;
                      }
                      else
                      {

                        hit_sound2.play();
                        lasthitsound = 2;
                      }
                }
                if (which_lane == 6 && isOnLane6) {
                  last_result = 50;
                  last_result_displayed_time = time_elapsed;
                  notes[i][2] = 1;
                  lightings[5] = 0;
                  judgementindex++;
                  $scope.score = $scope.score + 50;
                  $scope.num_50 = $scope.num_50 + 1;
                  if (lasthitsound == 2) {

                        hit_sound.play();
                        lasthitsound = 1;
                      }
                      else
                      {

                        hit_sound2.play();
                        lasthitsound = 2;
                      }
                }
                if (which_lane == 7 && isOnLane7) {
                  last_result = 50;
                  last_result_displayed_time = time_elapsed;
                  notes[i][2] = 1;
                  lightings[6] = 0;
                  judgementindex++;
                  $scope.score = $scope.score + 50;
                  $scope.num_50 = $scope.num_50 + 1;
                  if (lasthitsound == 2) {

                        hit_sound.play();
                        lasthitsound = 1;
                      }
                      else
                      {

                        hit_sound2.play();
                        lasthitsound = 2;
                      }
                }
              }
              else {
                if (isOnLane1||isOnLane2||isOnLane3||isOnLane4||isOnLane5||isOnLane6||isOnLane7) {
                  last_result = 0;
                  last_result_displayed_time = time_elapsed;
                  notes[i][2] = 1;
                  judgementindex++;
                  $scope.num_miss = $scope.num_miss + 1;
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

        //update these since offset might have changed

        function spin_hint_handle() {

          if (flip_begin_time < Date.now() - begin_time && Date.now() - begin_time < flip_end_time) {
	          myContext.drawImage(spin, width/2 - width9*2, height/2 - width9, width9 * 4, width9 * 4/2);
					}
					if (flip_begin_time - (Date.now() - begin_time) < 0 && flip_begin_time - (Date.now() - begin_time) > -500 ) {
						spin_hint.play();
					}
					else if (flip_end_time - (Date.now() - begin_time) < 500 && flip_end_time - (Date.now() - begin_time) > 0) {
						spin_hint.play();
					}

        }

        function draw_ui() {

          myContext.drawImage(stage_left, width/11*3-width11-width11/2, 0, width11/2, height);
          myContext.drawImage(stage_right, width/11*9, 0, width11/2, height);

          myContext.drawImage(stage_hint, width11*2, height-height5-14*82*width11/256, width11*7, 15*82*width11/256);

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

          myContext.drawImage(menu_back, width - width11*1.75, 0, width11*1.75, width11*1.75);
          myContext.drawImage(plus, width - width11*1.75, width11 * 2, width11*1.75*0.9, width11*1.75*0.9);
          myContext.drawImage(minus, width - width11*1.75, width11 * 4, width11*1.75*0.9, width11*1.75*0.9);

          myContext.restore();
        }

        function input_handling() {
          var key1d = document.createElement('img');
          key1d.src = 'mania-key1D.png';
          var key2d = document.createElement('img');
          key2d.src = 'mania-keySD.png';
          var stage_light = document.createElement('img');
          stage_light.src = 'mania-stage-light.png';

          if (isOnLane1 || display1 != 0) {
            myContext.drawImage(stage_light, width/11*3-width11, height-height5-height*3/4, width11, height*3/4);
            myContext.drawImage(key1D, width/11*3-width11, height-height5, width11, height5);
            isOnLane1 = false;
            if(display1 < 4) {
              display1 += 1;
            }
            else {
              display1 = 0;
            }
          }
          if (isOnLane2 || display2 != 0) {
            myContext.drawImage(stage_light, width/11*4-width11, height-height5-height*3/4, width11, height*3/4);
            myContext.drawImage(key2D, width/11*4-width11, height-height5, width11, height5);
            isOnLane2 = false;
            if(display2 < 4) {
              display2 += 1;
            }
            else {
              display2 = 0;
            }
          }
          if (isOnLane3 || display3 != 0) {
            myContext.drawImage(stage_light, width/11*5-width11, height-height5-height*3/4, width11, height*3/4);
            myContext.drawImage(key1D, width/11*5-width11, height-height5, width11, height5);
            isOnLane3= false;
            if(display3 < 4) {
              display3 += 1;
            }
            else {
              display3 = 0;
            }
          }
          if (isOnLane4 || display4 != 0) {
            myContext.drawImage(stage_light, width/11*6-width11, height-height5-height*3/4, width11, height*3/4);
            myContext.drawImage(key2D, width/11*6-width11, height-height5, width11, height5);
            isOnLane4 = false;
            if(display4 < 4) {
              display4 += 1;
            }
            else {
              display4 = 0;
            }
          }
          if (isOnLane5 || display5 != 0) {
            myContext.drawImage(stage_light, width/11*7-width11, height-height5-height*3/4, width11, height*3/4);
            myContext.drawImage(key1D, width/11*7-width11, height-height5, width11, height5);
            isOnLane5 = false;
            if(display5 < 4) {
              display5 += 1;
            }
            else {
              display5 = 0;
            }
          }
          if (isOnLane6 || display6 != 0) {
            myContext.drawImage(stage_light, width/11*8-width11, height-height5-height*3/4, width11, height*3/4);
            myContext.drawImage(key2D, width/11*8-width11, height-height5, width11, height5);
            isOnLane6 = false;
            if(display6 < 4) {
              display6 += 1;
            }
            else {
              display6 = 0;
            }
          }
          if (isOnLane7 || display7 != 0) {
            myContext.drawImage(stage_light, width/11*9-width11, height-height5-height*3/4, width11, height*3/4);
            myContext.drawImage(key1D, width/11*9-width11, height-height5, width11, height5);
            isOnLane7 = false;
            if(display7 < 4) {
              display7 += 1;
            }
            else {
              display7 = 0;
            }
          }
        }

        draw_ui();
        drop();
        check_hits();
        draw_hit_result();
        input_handling();
        lighting_handling();
        spin_hint_handle();
        myContext.restore();

        // if(Date.now()-begin_time > 3000 && !music) {
        //   selectedMusic.play();
        //   music = true;
        //   console.log('play!');
        // }
				//console.log(Date.now() - begin_time);
        if (Date.now() - begin_time > 1000 + song_end_time && Date.now() - begin_time < 1000 + song_end_time + 300) {
          if (!selectedMusic.paused) {
						selectedMusic.pause();
					}
          selectedMusic.currentTime = 0;

					var previousScore;
					if(!saved) {
						switch ($stateParams.songPick) {
							case 1:
							previousScore = $window.localStorage.getItem('easyScore');
							if ( previousScore == null || previousScore < $scope.score) {
								$window.localStorage.setItem('easyScore', $scope.score);
							}
							break;

							case 2:
							previousScore = $window.localStorage.getItem('easyScore');
							if ( previousScore == null || previousScore < $scope.score) {
								$window.localStorage.setItem('normalScore', $scope.score);
							}
							break;

							case 3:
							previousScore = $window.localStorage.getItem('easyScore');
							if ( previousScore == null || previousScore < $scope.score) {
								$window.localStorage.setItem('hardScore', $scope.score);
							}
							break;
						}
						saved = true;
					}

          window.cancelAnimationFrame(animateframe);
          $state.go('results', {
            'score' : $scope.score,
            'num_miss' : $scope.num_miss,
            'num_300' : $scope.num_300,
            'num_100' : $scope.num_100,
            'num_50' : $scope.num_50,
            'spinScore' : $scope.spinScore
          },{reload:true});}


        animateframe = window.requestAnimationFrame(function () {
          draw();
        });
      }

      // set up the elements
      theCanvas = document.getElementById('canvas');
      myContext = theCanvas.getContext('2d');

      var begin_time = Date.now();
      while (Date.now() - begin_time < 1000) {
        //do nothing
      }

      selectedMusic.play();
      draw();
    }

  })

	.controller('highScoresCtrl', function($scope,$state, $window) {

		$scope.easyScore = null;
		$scope.normalScore = null
		$scope.hardScore = null;

		$scope.backClick = function(){
			$state.go("home",{},{reload:true})
		};

		$scope.resetClick = function(){
			$window.localStorage.clear();
			$state.go("highScores",{},{reload:true})
		};

		$scope.easyScore = $window.localStorage.getItem('easyScore');
		$scope.normalScore = $window.localStorage.getItem('normalScore');
		$scope.hardScore = $window.localStorage.getItem('hardScore');

		if(!$scope.easyScore) {
			$scope.easyScore = 'No record!';
		}
	  if(!$scope.normalScore) {
			$scope.normalScore = 'No record!';
		}
		if(!$scope.hardScore) {
			$scope.hardScore = 'No record!';
		}
	})

	.controller('ResultsCtrl', function($rootScope,$scope,$state, $stateParams) {
			// $state.applause = document.createElement("AUDIO");
			// $state.applause.src = 'applause.wav';
			// applause.play();
			$scope.score = 0;
			$scope.num_300 = 0;
			$scope.num_50 = 0;
			$scope.num_100 = 0;
			$scope.num_miss = 0;
			$scope.spinScore = 0;
			if($stateParams.score != null){
				$scope.score = $stateParams.score;
			}

			if($stateParams.num_300 != null){
				$scope.num_300 = $stateParams.num_300;
			}

			if($stateParams.num_50 != null){
				$scope.num_50 = $stateParams.num_50;
			}

			if($stateParams.num_100 != null){
				$scope.num_100 = $stateParams.num_100;
			}

		if($stateParams.num_miss != null){
			$scope.num_miss = $stateParams.num_miss;
		}
		if($stateParams.spinScore != null){
			$scope.spinScore = $stateParams.spinScore;
		}

		$scope.restart = function(){
			$state.go("home",{},{reload:true})
		};
	});
