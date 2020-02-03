$(document).ready(function() {
  console.log("jquery here");
  $("#updateButton").on('click', async function(e) {
    e.preventDefault();
    $.ajax({
      type: 'PATCH',
      url: `${window.location.pathname}/update`,
      data: $('#updateForm').serialize(),
      success: function(res) {
        console.log(res);
        window.location.reload();
      }
    });
  });

  $("#deleteButton").on('click', async function(e) {
    e.preventDefault();
    
    $.ajax({
      type: 'POST',
      url: `${window.location.pathname}/delete`,
      success: function(res) {
        console.log(res);
        window.location.href = `/home`
      }
    });
  });
});
