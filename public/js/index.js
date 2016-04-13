var app = angular.module("myPen", ['ngMaterial', 'ngSanitize', 'ngMdIcons']);


app.service('anchorSmoothScroll', function(){
    
    this.scrollTo = function(eID) {

        // This scrolling function 
        // is from http://www.itnewb.com/tutorial/Creating-the-Smooth-Scroll-Effect-with-JavaScript
        
        var startY = currentYPosition();
        var stopY = elmYPosition(eID);
        var distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY); return;
        }
        var speed = Math.round(distance / 100);
        if (speed >= 20) speed = 20;
        var step = Math.round(distance / 25);
        var leapY = stopY > startY ? startY + step : startY - step;
        var timer = 0;
        if (stopY > startY) {
            for ( var i=startY; i<stopY; i+=step ) {
                setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
                leapY += step; if (leapY > stopY) leapY = stopY; timer++;
            } return;
        }
        for ( var i=startY; i>stopY; i-=step ) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
        }
        
        function currentYPosition() {
            // Firefox, Chrome, Opera, Safari
            if (self.pageYOffset) return self.pageYOffset;
            // Internet Explorer 6 - standards mode
            if (document.documentElement && document.documentElement.scrollTop)
                return document.documentElement.scrollTop;
            // Internet Explorer 6, 7 and 8
            if (document.body.scrollTop) return document.body.scrollTop;
            return 0;
        }
        
        function elmYPosition(eID) {
            var elm = document.getElementById(eID);
            var y = elm.offsetTop;
            var node = elm;
            while (node.offsetParent && node.offsetParent != document.body) {
                node = node.offsetParent;
                y += node.offsetTop;
            } return y;
        }

    };
    
});

app.controller("myCtrl", function($scope, $mdDialog, $mdMedia, $location, $anchorScroll, $timeout, anchorSmoothScroll) {
  $scope.yourName = "Dương Tiễn";
  $scope.position = "Software Developer";
  $scope.address = "Hồ Chí Minh"
  $scope.birth = "14/07/1995"
  $scope.hobbies = "Lập trình, game";
  $scope.phone = "0963225917";
  $scope.mail = "dtien147@gmail.com";    
  $scope.avatarUrl = "image/avatar.jpg";
  $scope.faceURL = "https://www.facebook.com/duong.tien.315";
  $scope.gitURL = "https://github.com/dtien147";
  $scope.intro = 'Hiện đang là sinh viên năm 3 của trường Đại học Khoa học Tự nhiên Tp. Hồ Chí Minh.'
  + ' Khi còn là học sinh cấp 3 đã từng đạt giải nhất Tin học trong cuộc thi học sinh giỏi của tỉnh và'
  + ' giải khuyến khích Tin học trong cuộc thi học sinh giỏi quốc gia.'
  $scope.skills = [
  {
    imgUrl: 'image/cpp.png'
  },
  {
    imgUrl: 'image/csharp.png'
  },
  {
    imgUrl: 'image/java.png'
  },
  {
    imgUrl: 'image/pts.png'
  }
  ]    
  $scope.exps = [
  {
    main: 'Phát triển phần mềm',
    time: '2013 - 2016',
    expContents: [
    {
      content: 'Ứng dụng windows: MyPaint (Phần mềm vẽ),'
      + ' GAD (Phần mềm mô phỏng các thuật toán của lý thuyết đồ thị),'
      + ' Minesweeper (Game), FileTransfer (Phần mềm trao đổi file giữa máy chủ và nhiều máy con).'
    },     
    {
      content: 'Ứng dụng windows phone: Sea Churn (Game)'
    },
    {
      content: 'Ứng dụng di động Android: Student’s Calendar (Phần mềm lịch tự động lấy' 
      + ' và hiển thị các assginment của moodle dành cho sinh viên ĐH KHTN)'
    }
    ]
  }
  ]  
  $scope.edus = [
  {
    main: 'Đại học Khoa học Tự nhiên Tp. Hồ Chí Minh',
    time: '2013 - 2016',
    content: 'Đang là sinh viên năm 3 của trường Đại học Khoa học Tự nhiên Tp. Hồ Chí Minh'
  }
  ]
  $scope.showContact = function(ev) {
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'html/showContact.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: useFullScreen
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
    $scope.$watch(function() {
      return $mdMedia('xs') || $mdMedia('sm');
    }, function(wantsFullScreen) {
      $scope.customFullscreen = (wantsFullScreen === true);
    });
  };  

  $scope.nav = [ {isOpen: false }];
  $scope.hover = false;
  $scope.obj = {navHeight: 90};
  $scope.tooltipVisible = false;

  $scope.$watch('nav.isOpen', function(isOpen) {
    if (isOpen && $scope.disableAutoTooltip === false) {
      $timeout(function() {
        $scope.tooltipVisible = $scope.nav.isOpen;
      }, 600);
    } else {
      $scope.tooltipVisible = $scope.nav.isOpen;
    }
  });

  $scope.activeMenu = 'HOME';

  $scope.gotoElement = function (eID){
      // set the location.hash to the id of
      // the element you wish to scroll to.
      $location.hash('bottom');
 
      // call $anchorScroll()
      anchorSmoothScroll.scrollTo(eID);          
    };

  $scope.navDirection = "down";
  $scope.itemDirection = "left";

  $scope.disableAutoTooltip = false;
});

app.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
  .primaryPalette('blue-grey') 
  .accentPalette('indigo');  
}); 

function DialogController($scope, $mdDialog) {
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
}

app.directive('automargin', function ($window) {
    return function (scope, element, attr) {
        var w = angular.element($window);
        scope.$watch(function(){
           return window.innerWidth;
        }, function(value) {            
           if(value <= 600) {
              scope.y = '20px';
              scope.obj.navHeight = 0;
            }
            else {
              scope.y = '90px';
              scope.obj.navHeight = 90;
            }    
        }); 
    }
});

app.directive('orient', function ($window) {
    return function (scope, element, attr) {
        var w = angular.element($window);
        scope.$watch(function(){
           return window.innerWidth;
        }, function(value) {                    
            if(value < 500) {
              scope.navDirection = 'down';
              scope.itemDirection = 'left';
              scope.disableAutoTooltip = false;
            }
            else {
              scope.navDirection = 'left';
              scope.itemDirection = 'bottom';
              scope.disableAutoTooltip = true;
              scope.tooltipVisible = false;
            }
        }); 
    }
});