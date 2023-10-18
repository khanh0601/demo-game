
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
        '<div class="col-lg-3 col-md-4 col-sm-6 col-12 __box-step">' +
        '<div class ="__wrap-step h-100">' +
        '<div class="__box-step1 w-100 h-100 step-active"><div class="step1">' + numbers[i] + '</div></div>' +
        '<div class="step2 step">' + question + '<div class="d-flex justify-content-around __box-anwser w-100"> <div class="anwser anwser-yes">Yes</div> <div class="anwser anwser-no">No</div> </div>' + '</div>' +
        '<div class="step3 step">' + anwser + '</div>' +

        '</div>' +
        '</div>'
      )
    }
    $('.__box-step1').click(function () {
      // Remove step-active class from all step1 elements
      $(this).removeClass('step-active');
      // Add step-active class to the clicked step1 element
      // Hide all step2 elements
      // Show the corresponding step2 element based on the clicked step1 element
      $(this).next('.step2').show();
    });

    // Add click event handler to anwser elements
    $('.anwser').click(function () {
      var text_anwser = $(this).text().toLowerCase().trim();
      var result = $(this).closest('.__wrap-step').find('.step3').text().toLowerCase().trim();
      // Hide the current step2 element
      $(this).closest('.step2').hide();
      // Show the corresponding step3 element
      $(this).closest('.__wrap-step').find('.step3').show();
      if (text_anwser === result) {
        $(this).closest('.__wrap-step').css("background-color", "#00ff08");
      }
      else {
        $(this).closest('.__wrap-step').css("background-color", "red");
      }
    })
  });
});
