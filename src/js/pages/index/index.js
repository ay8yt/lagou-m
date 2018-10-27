
let Header = require("../common/header/header.js");
let Footer = require("../common/footer/footer.js");
let Index = require("./index.template.html");

let Jobs = require("../jobs/jobs.js");
let Search = require("../search/search.js");
let Mine = require("../mine/mine.js");

module.exports = {
    render(){
        let pages = [Jobs, Search, Mine];

        let Container = document.querySelector(".container");
        Container.innerHTML = Header + Index + Footer;

        $(".footer>div").on("click",function(){
            $(this).addClass("active").siblings().removeClass("active"); //更换点击样式
            $(".main").html( pages[$(this).index()] , function(){
                console.log(`${$(this).attr("link")}加载成功`);
            })
        })
    }  
}; 