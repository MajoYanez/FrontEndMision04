//Busca tu pokemon con la barra espaciadora.
//Solo nombres en ingles o numeros.
// Hecho con: https://pokeapi.co
$(document).ready(function(){
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  var trueInput= $(".trueInput");
  trueInput.keyup(function(e){    
        if(e.keyCode == 13){ 
           research();
           trueInput.val("");
        };
  });
  function research(){
    var input= trueInput.val();
    var description= $('.descriptionText');
    var image=$(".pokeImage");
    var types=$('.typeText');
    input=input.toLowerCase();
    var api= "https://pokeapi.co/api/v2/pokemon/"+input+"/";
    
    $.ajax({
      type:"GET",
      url:api,
      async:false,
      dataType:"json",
      success:function(data){
                var name= data.forms[0].name;
                name=capitalizeFirstLetter(name);
                var api2="https://pokeapi.co/api/v2/characteristic/"+data.id
                $.getJSON(api2, function(data2){ 
                  description.html(data2.descriptions[1].description);
                });
                image.attr("src", data.sprites.front_default);
                var shiny= 0;
                function backview(){
                  if(shiny==0){image.attr("src", data.sprites.back_default)}
                  else{image.attr("src", data.sprites.back_shiny)};
                };
                function frontview(){
                  if(shiny==0){image.attr("src",data.sprites.front_default)}
                  else{image.attr("src", data.sprites.front_shiny)};
                };
                $('.select').click(backview);
                $('.start').click(frontview);
                $('.name').html("#"+data.id+" "+name);
                $('.heightText').html(data.height/10+" m");
                $('.weightText').html(data.weight/10+" kg");
                var type1=data.types[1].type.name;
                var type2=data.types[0].type.name;
                type1=capitalizeFirstLetter(type1);
                type2=capitalizeFirstLetter(type2);
                types.html(type1).append(" "+type2);
                $('.blueButton').click(shinyness);
                function shinyness(){
                  if(shiny==0){shiny=1}else{shiny=0};
                  frontview();
                };
              },
      error: function(errorMessage){
              setTimeout(function(){ 
               $('.screen').toggle();
              }, 10);
              setTimeout(function(){
               $('.screen').toggle();
              }, 2000);
             }
      });
  };
});