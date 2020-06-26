function make_calendar_data(year, month) {
    function FindYoilOfOneMonthOneDay(year) {
        var yun = 0;
        var yoil = year - 1;
        for (var i = 1; i <= year; i++)
            if ((i % 4 == 0 && i % 100 != 0) || (i % 400 == 0))
                yun++;
        yoil += yun;

        if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0))
            yoil -= 1;

        var temp = yoil % 7;
        if (temp == 6) temp = 0;
        else temp++;
        //console.log("OneMonthOneDay : " + temp);
        return temp;
    }

    function ThisMonthFirstDay(year, month) {
        var day = FindYoilOfOneMonthOneDay(year);
        var yun = 0;
        if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0))
            yun = 1;
        var arr = [31, 28 + yun, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        for (var i = 0; i < month - 1; i++)
            day += arr[i];
        //console.log("FirstDay : " + day%7);
        return day % 7;
    }

    function LastDay(year, month) {
        if (month < 1) {
            year -= 1;
            month = 12;
        }
        var yun = 0;
        if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0))
            yun = 1;
        var arr = [31, 28 + yun, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        //console.log("LastDay : " + arr[month-1]);
        return arr[month - 1];
    }

    function DayData(month, day, color, special) {
        this.month = month;
        this.day = day;
        this.color = color;
        this.special = special;
    }

    function CreateAMonthlyCalendar(year, month) {
        var calendar = [[], [], [], [], [], []];

        var firstDay = ThisMonthFirstDay(year, month);
        var lastDay = LastDay(year, month);
        var beforeLastDay = LastDay(year, month - 1) - firstDay + 1;
        var date = 0;
        var nextDate = 0;

        for (var i = 0; i < 6; i++) {
            for (var j = 0; j < 7; j++) {
                if (i == 0 && j < firstDay)
                    calendar[i][j] = new DayData(month - 1, beforeLastDay + j, "GRAY", "");
                else if (date >= lastDay)
                    calendar[i][j] = new DayData(month + 1, ++nextDate, "GRAY", "");
                else {
                    if (j == 0)
                        calendar[i][j] = new DayData(month, ++date, "RED", "");
                    else if (j == 6)
                        calendar[i][j] = new DayData(month, ++date, "BLUE", "");
                    else
                        calendar[i][j] = new DayData(month, ++date, "BLACK", "");
                }
            }
        }

        return calendar;
    }

    return CreateAMonthlyCalendar(year, month);
}














function CalendarWrapper(day_callback) {
    let calendar_date = new Date();
    const callback = day_callback;
    //날짜 객체
    function DayObj(m_day) {
        var day = m_day;
        var day_number = day.childNodes[1].firstChild;

        var schedule = day.childNodes[3].childNodes[1].firstChild;
        var teachers = day.childNodes[3].childNodes[3];
        var teacher1 = teachers.childNodes[1].firstChild;
        var teacher2 = teachers.childNodes[3].firstChild;
        var teacher3 = teachers.childNodes[5].firstChild;


        function removeClass(class_name) {
            day.classList.remove(class_name);
        }

        function addClass(class_name) {
            day.classList.add(class_name);
        }
        this.get_day_number = function () {
            return day_number.nodeValue;
        }
        this.set_day_number = function (value) {
            value = value.toString();
            value = value.length == 2 ? value : new Array(2 - value.length + 1).join('0') + value;
            day_number.nodeValue = value;
        }

        this.set_color = function (color) {
            if (color === "GRAY") {
                addClass("GrayDay");
            } else if (color === "BLACK") {
                const date = new Date();
                addClass("Ordinary");
                if (date.getDate() == this.get_day_number()) {
                    if (date.getMonth() == calendar_date.getMonth()) {
                        if (date.getFullYear() == calendar_date.getFullYear()) {
                            addClass("Today");
                        }
                    }
                }
            }
            else {
                addClass("Special");
            }
        }

        this.get_month_offset = function (class_name) {
            if (day.classList.contains('GrayDay') == false) {
                return 0;
            }

            return this.get_day_number() < 15 ? 1 : -1;
        }

        this.set_teacher = function (t1, t2, t3) {
            teacher1.nodeValue = t1;
            teacher2.nodeValue = t2;
            teacher3.nodeValue = t3;
        }

        this.set_schedule = function (sc) {
            schedule.nodeValue = sc;
        }
        this.clone = function () {
            return new DayObj(day.cloneNode(true));
        }

        this.get_node = function () {
            return day;
        }

        this.setupClass = function () {
            removeClass("GrayDay");
            removeClass("Special");
            removeClass("Ordinary");
            removeClass("Today");
        }
    }










    const days = [[], [], [], [], [], []];


    //날짜 객체 만들기
    function make_days_arr(Day) {
        for (var i = 0; i < 6; i++) {
            for (var j = 0; j < 5; j++) {
                if (i != 0 || j != 0) {
                    days[i][j] = Day.clone();
                }
                else {
                    days[i][j] = Day;
                }
            }
        }
    }

    function set_year_month_text() {
        const prev_btns = document.getElementsByClassName('Go_Prev_Btn');
        const year_text = prev_btns[0].nextSibling.nextSibling.firstChild;
        const month_text = prev_btns[1].nextSibling.nextSibling.firstChild;

        year_text.nodeValue = calendar_date.getFullYear();
        month_text.nodeValue = calendar_date.getMonth() + 1;
    }

    function set_days() {
        const year = calendar_date.getFullYear();
        const month = calendar_date.getMonth() + 1;

        let calendar_data = make_calendar_data(year, month);

        for (var i = 0; i < 6; i++) {
            for (var j = 0; j < 5; j++) {
                days[i][j].setupClass();
                days[i][j].set_day_number(calendar_data[i][j + 1].day);
                days[i][j].set_color(calendar_data[i][j + 1].color);

                let days_month = month + days[i][j].get_month_offset();
                if (callback != null) {
                    callback(days[i][j], new Date(year, days_month, days[i][j].get_day_number()));
                }
            }
        }
        set_year_month_text();
    }



    function set_today_text(today_date) {
        let week = ['일', '월', '화', '수', '목', '금', '토'];
        document.querySelector('.Year_Text').innerHTML = today_date.getFullYear();
        document.querySelector('.Month_Text').innerHTML = today_date.getMonth() + 1;
        document.querySelector('.Day_Text').innerHTML = today_date.getDate();
        document.querySelector('.Day_Of_The_WeeK').innerHTML = week[today_date.getDay()];
    }


    this.set_calendar = function () { //이 함수는 여기서 가장 먼저 불려야 한다
        const today_date = calendar_date;
        const Day = new DayObj(document.querySelector(".Day"));
        const Weeks = document.querySelectorAll(".Week");

        make_days_arr(Day);
        set_days();
        for (var i = 0; i < 6; i++) {
            for (var j = 0; j < 5; j++) {
                if (i != 0 || j != 0) {
                    Weeks[i].appendChild(days[i][j].get_node());
                }
            }
        }
        set_today_text(today_date);
    }

    this.set_event = function () {
        //토글 스위치
        const toggle_btn = document.getElementsByClassName("Toggle_BTN");
        toggle_btn[0].addEventListener('click', function (event) {
            if (event.target.checked) {
                document.querySelectorAll('.schedule').forEach(function (schedule) {
                    schedule.style.display = "none";
                });
                document.querySelectorAll('.teachers').forEach(function (schedule) {
                    schedule.style.display = "block";
                });
            }
            else {
                document.querySelectorAll('.schedule').forEach(function (schedule) {
                    schedule.style.display = "block";
                });
                document.querySelectorAll('.teachers').forEach(function (schedule) {
                    schedule.style.display = "none";
                });
            }
        });

        //달력 월 선택기
        const prevBTNs = document.getElementsByClassName("Go_Prev_Btn");
        const nextBTNs = document.getElementsByClassName("Go_Next_Btn");
        //이전 년
        prevBTNs[0].addEventListener('click', (event) => {
            calendar_date = new Date(parseInt(calendar_date.getFullYear()) - 1, calendar_date.getMonth(), calendar_date.getDate());
            set_days();
        });
        //다음 년
        nextBTNs[0].addEventListener("click",(event)=>{
            calendar_date = new Date(parseInt(calendar_date.getFullYear()) + 1, calendar_date.getMonth(), calendar_date.getDate());
            set_days();
        });
        //이전 달
        prevBTNs[1].addEventListener('click', (event) => {
            calendar_date = new Date(calendar_date.getFullYear(), parseInt(calendar_date.getMonth())-1, calendar_date.getDate());
            set_days();
        });
        //다음 달
        nextBTNs[1].addEventListener('click', (event) => {
            calendar_date = new Date(calendar_date.getFullYear(), parseInt(calendar_date.getMonth())+1, calendar_date.getDate());
            set_days();
        });
    }
}

function makeCalendar(c_obj, day_callback) {
    const inner_html_text = `<!DOCTYPE html>
    <link rel="stylesheet" href="calendar.css">
    <div id="Calendar_Container">
        <div id="Calendar_Header">
        <div class="Today_Text">
                <div class="Year_Text">2020</div>년
                <div class="Month_Text">01</div>월
                <div class="Day_Text">15</div>일
                (<div class="Day_Of_The_WeeK">수</div>)
            </div>
            <div  class="Calendar_Selector">
                <div class="Year_Changer">
                <button class = "Go_Prev_Btn"></button>
                <span>2020</span>
                    <button class = "Go_Next_Btn">  </button>
                    </div>
                    <div class="Month_Changer">
                    <button class = "Go_Prev_Btn"></button>
                    <span>02</span>
                    <button class = "Go_Next_Btn"> </button>
                </div>
                
                </div>
            
                
                <div class="Content_Changer">
                일정
                <label class="Toggle_way">
                    <input type="checkbox" class="Toggle_BTN" name="" value="" />
                    <span class="Toggle"></span>
                    </label>
                    담당자
            </div>
            </div>

            
            <div id="Calendar_Main"> 
            <div class="con_for_size">
                <div class="Names_Five_Days">
                <div class="Name_Day Monday">월</div>
                <div class="Name_Day Tuesday">화</div>
                    <div class="Name_Day Wednesday">수</div>
                    <div class="Name_Day Thursday">목</div>
                    <div class="Name_Day Friday">금</div>
                </div>
               
                <div class="Calendar_Content" >
                    
                    <div class="Week">
                        <div class="Day Ordinary">
                            <div class="Day_Number">30</div>
                            <div class="Content">
                                <div class="schedule ">화요일 방과후</div>
                                <div class="teachers">
                                    <div class="teacher1">손정우</div>
                                    <div class="teacher2">유시온</div>
                                    <div class="teacher3">이진혁</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="Week">
                    </div>
                    <div class="Week">
                    </div>
                    <div class="Week">
                    </div>
                    <div class="Week">
                    </div>
                    <div class="Week">
                    </div>
                </div>
            </div>
        </div>
    </div>
`;
    c_obj.innerHTML = inner_html_text;

    const calendar = new CalendarWrapper(day_callback);
    calendar.set_calendar();
    calendar.set_event();

}

makeCalendar(document.querySelector(".calendar"));