var app = angular.module("myPen", ['ngMaterial', 'ngSanitize']);
app.controller("myCtrl", function($scope) {
    $scope.yourName = "Dương Tiễn";
    $scope.position = "Software Developer";
    $scope.address = "Hồ Chí Minh"
    $scope.birth = "14/07/1995"
    $scope.hobbies = "Lập trình, game";
    $scope.phone = "0963225917";
    $scope.mail = "dtien147@gmail.com";    
    $scope.avatarUrl = "image/avatar.png";
    $scope.webs = [
      {
        webUrl: 'https://www.facebook.com/duong.tien.315',
        imgUrl: 'image/facebook.png'        
      },
      {
        webUrl: 'https://github.com/dtien147',
        imgUrl: 'image/github.png'        
      },
      // {
      //   webUrl: 'http://twitter.com',
      //   imgUrl: 'image/twitter.png'        
      // }
    ];
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
});

app.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('blue-grey')
}); 