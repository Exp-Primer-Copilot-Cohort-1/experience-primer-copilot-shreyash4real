function skillsMember() {
    var skill = document.getElementById("skill").value;
    var skillList = document.getElementById("skillList");
    var skillItem = document.createElement("li");
    skillItem.appendChild(document.createTextNode(skill));
    skillList.appendChild(skillItem);
}