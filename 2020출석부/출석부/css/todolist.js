const form = document.getElementById("form");

form.onsubmit = function(e) {
    e.preventDefault();
    const list = document.getElementById("list");  


    const li = document.createElement("li");
    
    const span = document.createElement('span');
    span.innerText = form.text.value;
    
    const delBtn = document.createElement("button");
    delBtn.onclick = function(){
        li.remove();
    }
    delBtn.innerText="삭제";
    
    const editBtn = document.createElement("button");
    editBtn.onclick = function(){
        span.innerText = prompt("수정내용");
    }
    editBtn.innerText="수정";

    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(delBtn);

    list.appendChild(li);
    e.target.text.value = "";    
}