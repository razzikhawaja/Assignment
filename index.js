$(document).ready(function () {
  var featureButtons = $(".item button");
  var filterList = [];

  // Function to filter job listings
  function filter() {
    filterList.forEach(function (item) {
      $(".filter-buttons").each(function () {
        var cnt = 0;
        $(this).children().each(function () {
          if ($(this).text() + " X" === item) cnt++;
        });
        if (cnt === 0) $(this).parent().css("display", "none");
      });
    });
  }

  // Function to show filter options for a specific category
  function showFilter(featureName) {
    $(".filters button").each(function () {
      if ($(this).text() === featureName + " X") {
        $(this).css("display", "inline-block");
      }
    });
  }

  // Click event for job listing filter buttons
  $(".item button").on("click", function () {
    var featureName = $(this).text();
    var featureRole = $(this).attr("name");
    if (!filterList.includes(featureName + " X"))
      filterList.push(featureName + " X");
    $(".filters").css("display", "block");
    showFilter(featureName);
    filter();
  });

  // Click event for removing a selected filter
  $(".X").on("click", function () {
    var feature = $(this).parent().text();
    var pos = filterList.indexOf(feature);
    filterList.splice(pos, 1);
    if (filterList.length === 0) $(".filters").css("display", "none");
    console.log(filterList);
    $(".item").each(function () {
      $(this).css("display", "block");
    });
    filter();
    $(".filters button").each(function () {
      if ($(this).text() === feature) {
        $(this).css("display", "none");
      }
    });
  });

  // Event listener to open the popup
  $(".item").on("click", function () {
    if ($(this).hasClass("item")) {
      var jobTitle = $(this).find(".item-name").text();
      var companyName = $(this).find(".item-name").text().split("\n")[0];
      var jobPosition = $(this).find(".item-post").text();
      var jobDetails = $(this).find(".item-details").text();

      $("#popup-job-title").text(jobTitle);
      $("#popup-job-company").text(companyName);
      $("#popup-job-post").text(jobPosition);
      $("#popup-job-details").text(jobDetails);

      $("#job-popup").css("display", "block");
    }
  });

  $(".filter-buttons button").on("click", function (e) {
    e.stopPropagation(); 
  });

  // Closing the popup
  $("#close-popup").on("click", function () {
    $("#job-popup").css("display", "none");
  });

  // Closing
  $(".popup").on("click", function (e) {
    if (e.target === this) {
      $(this).css("display", "none");
    }
  });

  $("#add-job-button").on("click", function () {
    $("#add-job-popup").css("display", "block");
  });
  $("#close-add-job-popup").on("click", function () {
    $("#add-job-popup").css("display", "none");
  });
  $("#job-form").on("submit", function (e) {
    e.preventDefault();
    var newJobTitle = $("#job-title").val();
    if (newJobTitle) {
      var newJobListing =
        '<div class="item">' +
        "</div>";
      $("#job-listing").append(newJobListing);
      $("#add-job-popup").css("display", "none");
    }
  });

  // Deletion
  $(".delete-button").on("click", function () {
    var jobItem = $(this).closest(".item");

    if (confirm("Are you sure you want to delete this job?")) {
      jobItem.remove();
    }
  });
});
