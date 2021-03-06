/* ��ü ���� */
export default `html, body{
    height: 100%;
    margin: 0;
}
.calendar {
    width: 1100px;
    height: 1200px;
    margin-left: 50px;
}
#Calendar_Container{
    display: flex;
    flex-direction: column;
    height: 100%;
    font-size: 22px;
    margin-top: 150px;
}

/* ��ܺ� ��¥ */
#Calendar_Header{
    position: relative;
}
.Today_Text {
    font-weight: bold;
    font-size: 54px;
}
.Today_Text > * {
    display: inline-block;   
}

/* ��ܺ� ��� */
.Content_Changer{
    font-size: 0.6em;
    margin-bottom: 0;
    position: absolute;
    bottom: 0;
    right: 0;
    font-size: 32px;
}
.Content_Changer > .Toggle_way{
    display: inline-block;
    border: 2px solid black;
    border-radius: 20px;
    width: 80px;
    height: 40px;
}
.Toggle_way > .Toggle_BTN {
    display: none;
}

.Toggle_way > .Toggle {
    display: inline-block;
    position: relative;
    background-color: black;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    top: 50%;
    left: -1px;
    transform: translate(0%, -50%);
}
.Toggle_way > .Toggle_BTN:active + .Toggle,
.Toggle_way > .Toggle_BTN:checked + .Toggle {
    left: 40px;
}


/* �޷� */
#Calendar_Main {
    flex: 1;
    font-size: 0.6818em;
    margin-top: 10px;
}
.con_for_size {
    height: 100%;
    display: grid;
    grid-template-rows: auto 1fr;
}

/* �޷� ��� */
.Names_Five_Days{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    margin-left: 1.5px;
    margin-right: 1.5px;  
}
.Names_Five_Days > .Name_Day {
    background-color: #87CEFA;
    margin-left: 1.5px;
    margin-right: 1.5px;
    text-align: center;
    color: white;
    padding: 3px;
}

/* �޷� �� ���� */
.Calendar_Content{
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: calc(100% - 5px);
    padding: 0;
    border: 1.5px solid #87CEFA;
    margin-top: 5px;
}

.Day {
    flex-grow: 1;
    flex-basis: 0;
    vertical-align: top;
    border: 1.5px solid #87CEFA;
    padding: 5px;
    font-weight: bold;
}
.Day.Today {
    border: 5px solid #FFD700 !important;
}

.Day > .Day_Number {
    margin-top: 0;
    text-align: right;
}
.Day.Ordinary > .Day_Number{
    color: #6495ED;
}
.Day.Special > .Day_Number{
    color: red;
}
.Day.GrayDay {
    color: #BFBFBF;
}

.Day > .Content {
    margin: 5px;
    font-size: 0.4545em;
}

.teachers{
    display: none;
}



.Week {
    display: flex;
    flex-grow: 1;
}

.schedule, .teacher1, .teacher2, .teacher3 {
    font-size: 30px;
}

.Day_Number {
    font-size: 32px;
}`