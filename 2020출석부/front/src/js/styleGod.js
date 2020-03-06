import styleHelper from './styleHelper';
import styleRemover from './styleRemover';
import default_style from '../css/default';
import index_style from '../css/index';
import main_style from '../css/main';
import management_style from '../css/management';
import select_page_style from '../css/select-page';
import absent_style from '../css/absent';
import attendance_page_style from '../css/attendance-page-2';
import attendance_select_style from '../css/attendance-select-page';
import stats_style from '../css/stats';
import calendar_style from '../css/calendar';

export const DEFAULT = 'default';
export const INDEX = 'index';
export const MAIN = 'main';
export const MANAGEMENT = 'management';
export const SELECT_PAGE = 'select_page';
export const ABSENT = 'absent';
export const ATTENDANCE_PAGE = 'attendance_page';
export const ATTENDANCE_SELECT = 'attendance_select';
export const STATS = 'stats';
export const CALENDAR = 'calendar';

export default (document, ...styles) => {
  styleRemover(document);
  let styleList = [];
  styles.forEach(style => {
    const st = document.createElement('style');
    if (style === DEFAULT) {
      st.innerText = default_style;
      st.id = 'default_style';
    } else if (style === INDEX) {
      st.innerText = index_style;
      st.id = 'index_style';
    } else if (style === MAIN) {
      st.innerText = main_style;
      st.id = 'main_style';
    } else if (style === MANAGEMENT) {
      st.innerText = management_style;
      st.id = 'management_style';
    } else if (style === SELECT_PAGE) {
      st.innerText = select_page_style;
      st.id = 'select_page_style';
    } else if (style === ABSENT) {
      st.innerText = absent_style;
      st.id = 'absent_style';
    } else if (style === ATTENDANCE_PAGE) {
      st.innerText = attendance_page_style;
      st.id = 'attendance_page_style';
    } else if (style === ATTENDANCE_SELECT) {
      st.innerText = attendance_select_style;
      st.id = 'attendance_select_style';
    } else if (style === STATS) {
      st.innerText = stats_style;
      st.id = 'stats_style';
    } else if (style === CALENDAR) {
      st.innerText = calendar_style;
      st.id = 'calendar_style';
    }
    styleList.push(st);
  });
  styleHelper(document, ...styleList);
}