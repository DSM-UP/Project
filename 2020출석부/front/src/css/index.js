const path = require('path');

export default `header {
    width: 45%;
    margin: auto;
    padding-top: 25%;
}

header > p {
    color: #87cefa;
    display:inline-block;
    font-weight: bolder;
}

header > p:nth-child(1) {
    font-size: 220px;
    
}

header > p:nth-child(2) {
    font-size: 120px;
}

header > p:nth-child(4) {
    margin-left: 100px;
}

header > p:nth-child(1n + 3) {
    font-size: 100px;
    display: block;
}


section {
    width: 45%;
    margin: auto;
    padding-top: 5%;
}

section > form > input:nth-child(1), section > form > input:nth-child(2) {
    height: 100px;
    width: 100%;
    margin-bottom: 15px;
    font-size: 30px;
    padding-left: 15px;
    border: 1px solid #87cefa;
}

section > form > input::placeholder {
    color: #c0cdef;
}

section > form > input[type="checkbox"] {
    display: none;
}

section > form > input[type="checkbox"] + label span {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 1px solid #87cefa;
    cursor: pointer;
}

section > form > label {
    display: inline-block;
    margin-bottom: 30px;
}

section > form > input[type="checkbox"]:checked + label span{
    background-image: url(${path.join(__dirname, '../image/check-icon.jpg')}');
    background-size: 20px 20px;
}

section > form > input[type="checkbox"] + label {
    font-size: 24px;
    font-weight: bold;
    color: #6b6b6b;
}

section > form > input[type="submit"] {
    width: 100%;
    height: 100px;
    background: #87cefa;
    border: none;
    color: white;
    font-size: 38px;
    font-weight: bold;
}

section > form > input[type="submit"]:hover {
    cursor: pointer;
}`