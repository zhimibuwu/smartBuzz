/**
 * calendarDemoApp - 0.9.0
 */
 

 
var Titles = [];
var StartTimes = [];
var EndTimes = [];
var Locations = [];
var IDs = [];
var eventCount;
 
 function find_events()
{
    var startDate = new Date();
    var endDate = new Date()
    endDate.setHours(startDate.getHours()+24);
    var title = "";
    var location = "";
    var notes = "";
    var replacor = "";
    var success = function(message)
    {

      var i=0;
      var calendarData = JSON.stringify(message ,replacor, "\t");
      alert("Event found successfully "+ JSON.stringify(message ,replacor, "\t"));
      
      //var count = 0;
      //for (var key in message) {
      //  count++;
      //}

        var count = message.length;
		eventCount = count;
		
      var CalendarId;
      var CalendarTitle;
      var CalendarTime;
      
      while(i<count)
        {

          //strip CalendarId
          CalendarId = message[i].id;

          //Strip CalendarTitle
          _title = message[i].title;
          _location = message[i].location;
          _id = message[i].id;

          //Strip CalendarTime
          _startTime = Date.parse(message[i].startDate);
          _endTime = Date.parse(message[i].endDate);
          alert(CalendarTime);
			 calendarValue = CalendarTime-(4*60*60); 	
          addNotifications(CalendarId, _title, _startTime);
          
          Titles.push(_title);
          StartTimes.push(_startTime);
          EndTimes.push(_endTime);
          Locations.push(_location);
          IDs.push(_id);
          i++;
			
        }

		
      //postToServer(calendarData);    //Post data to Server
      
      
    };

    var error = function(message) {alert("Event not found" + message); };
    window.plugins.calendar.findEvent(title,location,notes,startDate,endDate,success,error);
}
document.addEventListener("deviceready", find_events, false);


function addNotifications(CalendarId, calendarTitle, calendarTime)
{
    cordova.plugins.notification.local.schedule({
        id: CalendarId,
        title: calendarTitle,
        text: "Run, Forrest, Run!!",
        at: calendarTime,
        data: { meetingId:"#123FG8" }
    });
}


 
//Angular part

 
angular.module('calendarDemoApp', ['ui.calendar', 'ui.bootstrap']);		//main module called CalendarDemoApp having ui.calendar and ui.bootstrap dependencies

function CalendarCtrl($scope,$compile, $timeout, uiCalendarConfig) {		//$scope is Object to be used only inside Controller
//Controller binds the Model and View
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    var eventName;
   

    $scope.eventSource={};
    
    
    /* event source that contains custom events on the scope */
    $scope.events = [
      {title: 'All Day Event',start: new Date()},
    ];
    
    
    /* event source that calls a function on every view switch */
    $scope.eventsF = function (start, end, timezone, callback) {
      var s = new Date(start).getTime() / 1000;
      var e = new Date(end).getTime() / 1000;
      var m = new Date(start).getMonth();
      var events = [{title: 'Feed Me ' + m,start: s + (50000),end: s + (100000),allDay: false, className: ['customFeed']}];
      callback(events);
    };
    
    /* alert on eventClick */
    $scope.alertOnEventClick = function( date, jsEvent, view){
        $scope.alertMessage = (date.title + ' was clicked ');
    };
    
   
    /* alert on Drop */
     $scope.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view){
       $scope.alertMessage = ('Event Droped to make dayDelta ' + delta);
    };
    
    /* alert on Resize */
    $scope.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view ){
       $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
    };
    
    
    
    
    
    /* add and removes an event source of choice */
    $scope.addRemoveEventSource = function(sources,source) {
      var canAdd = 0;
      angular.forEach(sources,function(value, key){
        if(sources[key] === source){
          sources.splice(key,1);
          canAdd = 1;
        }
      });
      if(canAdd === 0){
        sources.push(source);
      }
    };
    
    
    /* add custom event*/
    $scope.addEvent = function() {
      $scope.events.push({
        title: 'Open Sesame',
        start: new Date(),		          
        end: new Date(),
        className: ['openSesame']
      });
    };
    
    
    /* remove event */
    $scope.remove = function(index) {
      $scope.events.splice(index,1);
    };
    /* Change View */
    $scope.changeView = function(view,calendar) {
      uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
    };
    /* Change View */
    $scope.renderCalender = function(calendar) {
      if(uiCalendarConfig.calendars[calendar]){
        uiCalendarConfig.calendars[calendar].fullCalendar('render');
      }
    };
     /* Render Tooltip */
    $scope.eventRender = function( event, element, view ) { 
        element.attr({'tooltip': event.title,
                      'tooltip-append-to-body': true});
        $compile(element)($scope);
    };
    
    
    /* config object */
    $scope.uiConfig = {
      calendar:{
        height: 450,
        editable: true,
        header:{
          left: 'title',
          center: '',
          right: 'today prev,next'
        },
        eventClick: $scope.alertOnEventClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize,
        eventRender: $scope.eventRender
      }
    };
    
    
    
      // Clear events via empty array and then push into events source.
  $scope.getEventsEmptySplice = function () {
  
    var replacor = ""
    $scope.events.splice(0);
    
    // Simulating an AJAX request with $timeout.
    $timeout(function () {
      // Create temp events array.
      
  // var eventDate = new Date(globalTime)
 //  var x = eventDate.toISOString()  
	

    for (var j=0; j<eventCount; j++){
        var _temp = StartTimes[i].split(" ");
        var _start = _temp[0]+"T"+_temp[1];
        _temp = EndTimes[i].split(" ");
        var _end = _temp[0]+"T"+_temp[1];
        $scope.events.push({
            title:Titles[j],
            start: _start,
            end: _end,
            location: Locations[i],
            id: IDs[i]
        });
    }


    //var j=0;
    //var newEvents = [];
    //
    //for(j=0; j<eventCount; j++)
    //{
    //	newEvents.push({title: Titles[j], start: StartTimes[j],end:EndTimes[i]});
    //}


     // alert("NewEvents: "+JSON.stringify(newEvents,replacor, "\t"));
      //alert("NewEvents: "+JSON.stringify(newEvents,replacor, "\t"));
      // Push newEvents into events, one by one.
  //  angular.forEach(newEvents, function (event) {
  //      $scope.events.push(event);
  //   });
  //console.log('New Events pushed');

    }, 100);
  };
   

    /* event sources array*/
    $scope.eventSources = [$scope.events, $scope.eventSource, $scope.eventsF];
    $scope.eventSources2 = [$scope.calEventsExt, $scope.eventsF, $scope.events];
}
/* EOF */
