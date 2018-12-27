document.addEventListener("DOMContentLoaded", function(){
    // active sidenav
    var elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
    loadNav();
    // Load Page Content
    var page = window.location.hash.substr(1);
    if (page == "") page = "home";
    loadPage(page);

    function loadNav(){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if(this.readyState == 4)
            {
                if(this.status != 200) return;
                // Muat Daftar Tautan Menu
                document.querySelectorAll(".topnav, .sidenav").forEach(function(elm){
                    elm.innerHTML = xhttp.responseText;
                });
                // Daftarkan event listener untuk setiap tautan baru
                document.querySelectorAll(".sidenav a, .topnav a").forEach(function(elm){
                    elm.addEventListener("click", function (event){
                        //Tutup Sidenav
                        var sidenav = document.querySelector(".sidenav");
                        M.Sidenav.getInstance(sidenav).close();
                        // Muat konten halaman yang di panggil
                        page = event.target.getAttribute("href").substr(1);
                        loadPage(page);
                    });
                });
            }
        };
        xhttp.open("GET", "nav.html", true);
        xhttp.send();
    }

    function loadPage()
    {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function (){
            if(this.readyState == 4)
            {
                var content = document.querySelector("#body-content");
                if(this.status == 200)
                {
                    content.innerHTML = xhttp.responseText;
                }else if(this.status == 404)
                {
                    content.innerHTML = "<p>Halaman Tidak Ditemukan</p>"
                }else{
                    content.innerHTML = "<p>Uppss... Halaman Tidak Dapat di akses</p>"
                }
            }
        };
        xhttp.open("GET", "pages/"+page+".html",true);
        xhttp.send();
    }
});