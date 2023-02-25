let btn = document.querySelector("#toggle");
let details = document.querySelector(".container");

btn.addEventListener("click, function (event)", {
    let target="event.currentTarget", let icon= "event.currentTarget.querySelector"("#icon");

    if("target.getAttribute" ("aria-expanded") === "true"); {
    target.setAttribute("aria-expanded", "false");
    details.classList.toggle("hidden");
    icon.innerHTML = "-";
}
}
