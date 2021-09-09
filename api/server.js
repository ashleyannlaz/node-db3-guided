window.onload = function(){ 

    // Get the modal
    
    var modal = document.getElementById('myModal');
    
    // Get the button that opens the modal
    var foilBtn = document.getElementById("myBtn");
    
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    var headermodaltext = document.getElementById("headerforfabric");  
    // When the user clicks the button, open the modal 
     if (typeof(foilBtn) != 'undefined' && foilBtn != null){
    foilBtn.onclick = function() {
      modal.style.display = "block";
      console.log('hello')
    }
      }
    
    // When the user clicks on <span> (x), close the modal
     if (typeof(span) != 'undefined' && span != null){
    span.onclick = function() {
      modal.style.display = "none";
    }
    }
    
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        
      
      if (event.target == modal) {
        if (typeof(modal) != 'undefined' && modal != null){
        modal.style.display = "none";
      }
      }
      
    }}