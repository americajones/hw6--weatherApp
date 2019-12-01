$(document).ready(function () {

    function firstRenderButtons() {

        $("#buttons-view").empty();
        for (var i = 0; i < localStorage.length; i++) {
            console.log("localStorage key is: " + localStorage.key(i));
            var b = $("<button>");
            b.addClass("city cityButt");
            b.attr("id", localStorage.key(i));
            b.text(localStorage.key(i));
            $("#cityList").append(b);
        }

    }
    firstRenderButtons();

    // if (localStorage.getItem("cities") === null) {
    //     var cities = [];
    // } else {var cities = localStorage.getItem("cities")}

    // cities.push(JSON.parse(localStorage.getItem('session')));
    // localStorage.setItem('cityList', JSON.stringify(cities));

    // console.log("cities are:" + cities);

    $("#searchButt").on("click", function (event) {
        event.preventDefault();
        var apiKey = "9c338cb2b817b874cb2c32afd42f6cbb";
        var userInput = $("input").val();
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&appid=" + apiKey;
        //var queryURL= "https://api.openweathermap.org/data/2.5/weather?q=Seattle&appid=" +apiKey;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            console.log(response.name);

            // var cities = [];
            // function SaveDataToLocalStorage(data)
            // {
            //     var cities = [];
            //     // Parse the serialized data back into an aray of objects
            //     cities = JSON.parse(localStorage.getItem('cityList'));
            //     // Push the new data (whether it be an object or anything else) onto the array
            //     cities.push(data);
            //     // Re-serialize the array back into a string and store it in localStorage
            //     localStorage.setItem('cityList', JSON.stringify(cities));
            // }

            // var city = response.name;
            // SaveDataToLocalStorage(city);
            // cities.push(city);
            //on click you get info, 
            //clear info
            $("#weathInfo").text("");
            $("#fiveDayBox").text("");
            //post called info to text feilds,
            $("#weathInfo").html("<h1>" + response.name + " (" + moment().format('l') + ")<img src='http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png'></h1>");
            console.log(response.weather[0].icon);
            console.log(queryURL);
            var tempK = response.main.temp;
            var tempF = (1.8 * tempK) - 459.67;
            $("#weathInfo").append("<ul id='list'></ul>");
            $("#list").append("<li>Tempertature: " + tempF.toFixed(1) + "°F</li>");
            $("#list").append("<li>Humidity: " + response.main.humidity + "</li>");
            $("#list").append("<li>Wind Speed: " + response.wind.speed + "</li>");

            var lat = response.coord.lat;
            var long = response.coord.lon;
            uviGet();
            fiveDayGet();

            function renderButtons() {
                $("#buttons-view").empty();
                var b = $("<button>");
                b.addClass("city cityButt");
                b.attr("id", response.name);
                b.text(response.name);
                $("#cityList").prepend(b);


            }

            renderButtons();

            function uviGet() {
                var queryURL2 = "http://api.openweathermap.org/data/2.5/uvi/forecast?appid=9c338cb2b817b874cb2c32afd42f6cbb&lat=" + lat + "&lon=" + long + "";
                $.ajax({
                    url: queryURL2,
                    method: "GET"
                }).then(function (response2) {
                    // console.log("inner ajax response=" + response2);
                    console.log("made it to uvi get");
                    // console.log("inner ajax lat=" + lat);
                    // console.log("inner ajax lon=" + long);
                    // console.log("inner uvi URL=" + queryURL2);
                    $("#list").append("<li>UV Index: <span>" + response2[0].value + "</span></li>");
                    $("span").css({ "background-color": "lightblue", "border-radius": "3px", "padding": "6px" })
                })
            }
            function fiveDayGet() {
                var queryURL3 = "http://api.openweathermap.org/data/2.5/forecast?appid=9c338cb2b817b874cb2c32afd42f6cbb&q=" + response.name + "&units=imperial";
                $.ajax({
                    url: queryURL3,
                    method: "GET"
                }).then(function (response3) {
                    console.log("inner 5day URL=" + queryURL3);
                    console.log("inner ajax 5dayresponse=" + response3);
                    for (var i = 1; i < 6; i++) {
                        var a = $("<div>");
                        a.addClass("small blueBox");
                        a.html("<strong>(" + moment().add(i, "days").format('l') + ")</strong>")
                        console.log("made it to fivedayget");
                        $("#fiveDayBox").append(a);
                    };
                    //i could not figure out how to do this in a loop
                    $(".blueBox").eq(0).append("<br><img src='http://openweathermap.org/img/wn/" + response3.list[4].weather[0].icon + ".png'>");
                    $(".blueBox").eq(0).append("<br>Temp: " + response3.list[4].main.temp);
                    $(".blueBox").eq(0).append("<br>Humidity: " + response3.list[4].main.humidity);
                    $(".blueBox").eq(1).append("<br><img src='http://openweathermap.org/img/wn/" + response3.list[12].weather[0].icon + ".png'>");
                    $(".blueBox").eq(1).append("<br>Temp: " + response3.list[12].main.temp);
                    $(".blueBox").eq(1).append("<br>Humidity: " + response3.list[12].main.humidity);
                    $(".blueBox").eq(2).append("<br><img src='http://openweathermap.org/img/wn/" + response3.list[20].weather[0].icon + ".png'>");
                    $(".blueBox").eq(2).append("<br>Temp: " + response3.list[20].main.temp);
                    $(".blueBox").eq(2).append("<br>Humidity: " + response3.list[20].main.humidity);
                    $(".blueBox").eq(3).append("<br><img src='http://openweathermap.org/img/wn/" + response3.list[28].weather[0].icon + ".png'>");
                    $(".blueBox").eq(3).append("<br>Temp: " + response3.list[28].main.temp);
                    $(".blueBox").eq(3).append("<br>Humidity: " + response3.list[28].main.humidity);
                    $(".blueBox").eq(4).append("<br><img src='http://openweathermap.org/img/wn/" + response3.list[36].weather[0].icon + ".png'>");
                    $(".blueBox").eq(4).append("<br>Temp: " + response3.list[36].main.temp);
                    $(".blueBox").eq(4).append("<br>Humidity: " + response3.list[36].main.humidity);
                    // but i tried- 4 12 20 28 36
                    // for (var j = 4; j < 36; j+8) {
                    //     console.log("made it to j loop!")
                    //     var b=$(".small");
                    //     b.append("\nTemp: "+ response3.list[j].main.temp);
                    //     b.append("\nHumidity: "+ response3.list[j].main.humidity);
                    // }

                    // console.log($("#wholeThing").html());
                    localStorage.setItem(response.name, JSON.stringify($("#wholeThing").html()))

                })
            }
        })
    

        //buttons on push display localstorage info


        // (1.8 * K) -459.67
        //append everything, 
        //add side button div,
        //save it in its own localStorage slot

    })

    $(".cityButt").on("click", displayInfo);
    
    
    function displayInfo($event) {
        $event.preventDefault();
        $("#wholeThing").empty();
        var buttId = $(this).attr('id');
        var oldStuff = JSON.parse(localStorage.getItem(buttId));
        $("#wholeThing").html(oldStuff);
        console.log(oldStuff);
        // for (let i = 0; i < localStorage.length; i++) {
        //     key = localStorage.key(i);
        //     if (key.slice(0, 4) === "city") {
        //         pastSearch.push(JSON.parse(localStorage.getItem(key)));
        //         console.log($(this));
        //         console.log("made it to past search! It is " + pastSearch);
        //     }

        // }

    }

    $(document).on("click", ".cityButt", displayInfo)

})

        //localstorage get on div click
