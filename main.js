
$(document).ready(function () {
  var jsonData;
  $.getJSON('data.json', function (data) {
    jsonData = data;
    console.log(jsonData);

    // Tạo một mảng chứa các số từ 1 đến 28
    var numbers = $.map(Array(28), function (value, index) {
      return index + 1;
    });

    // Trộn ngẫu nhiên mảng
    numbers.sort(function () {
      return 0.5 - Math.random();
    });

    // In ra mảng đã trộn ngẫu nhiên
    console.log(numbers);
    var question;
    var anwser;
    for (var i = 0; i < numbers.length; i++) {
      question = jsonData[i].Course;
      anwser = jsonData[i].Result;

      $('.__box_option').append(
        '<div class="col-lg-3 col-xl-2 col-md-4 col-sm-6 col-12 __box-step">' +
        '<div class ="__wrap-step h-100">' +
        '<div class="__box-step1 w-100 h-100 step-active"><div class="step1">' + numbers[i] + '</div></div>' +
        '<div class="step2 step">' + question + '<div class="d-flex justify-content-around __box-anwser w-100"> <div class="anwser anwser-yes">Yes</div> <div class="anwser anwser-no">No</div> </div>' + '</div>' +
        '<div class="step3 step">' + anwser + '</div>' +

        '</div>' +
        '</div>'
      )
    }
    $('.__box-step1').click(function () {
      $("#video-bg").get(0).play();
      $(this).removeClass('step-active');
      $(this).next('.step2').show();
      $(this).closest('.__wrap-step').addClass('animation');
    });

    // Add click event handler to anwser elements
    $('.anwser').click(function () {
      $(this).closest('.__wrap-step').removeClass('animation');
      var text_anwser = $(this).text().toLowerCase().trim();
      var result = $(this).closest('.__wrap-step').find('.step3').text().toLowerCase().trim();
      // Hide the current step2 element
      $(this).closest('.step2').hide();
      // Show the corresponding step3 element
      $(this).closest('.__wrap-step').find('.step3').show();
      if (text_anwser === result) {
        $("#video-dung").get(0).play();
        $(this).closest('.__wrap-step').css("background-color", "#00ff08");
      }
      else {
        $("#video-sai").get(0).play();
        $(this).closest('.__wrap-step').css("background-color", "red");
      }
      $(this).closest('.__wrap-step').addClass('animation');

    })
    // Kiểm tra xem trình duyệt có phải là Safari không
    var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    if (isSafari) {
      // Thêm sự kiện click để bắt đầu phát âm thanh
      $('.__box-step1').click(function () {
        $("#video-bg").get(0).play();
        $(this).removeClass('step-active');
        $(this).next('.step2').show();
        $(this).closest('.__wrap-step').addClass('animation');
      });

      // Thêm sự kiện click cho phần tử answer
      $('.answer').click(function () {
        $(this).closest('.__wrap-step').removeClass('animation');
        var textAnswer = $(this).text().toLowerCase().trim();
        var result = $(this).closest('.__wrap-step').find('.step3').text().toLowerCase().trim();
        // Ẩn phần tử step2 hiện tại
        $(this).closest('.step2').hide();
        // Hiển thị phần tử step3 tương ứng
        $(this).closest('.__wrap-step').find('.step3').show();
        if (textAnswer === result) {
          // Phát âm thanh khi người dùng tương tác
          document.getElementById("video-dung").play();
          $(this).closest('.__wrap-step').css("background-color", "#00ff08");
        } else {
          // Phát âm thanh khi người dùng tương tác
          document.getElementById("video-sai").play();
          $(this).closest('.__wrap-step').css("background-color", "red");
        }
        $(this).closest('.__wrap-step').addClass('animation');
      });
    }
  });
});
