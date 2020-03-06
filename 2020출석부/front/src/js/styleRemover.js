export default (document) => {
  let style = document.getElementById('default_style');
  if (style) {
    document.head.removeChild(style);
  }
  style = document.getElementById('index_style');
  if (style) {
    document.head.removeChild(style);
  }
  style = document.getElementById('main_style');
  if (style) {
    document.head.removeChild(style);
  }
  style = document.getElementById('management_style');
  if (style) {
    document.head.removeChild(style);
  }
  style = document.getElementById('select_page_style');
  if (style) {
    document.head.removeChild(style);
  }
  style = document.getElementById('absent_style');
  if (style) {
    document.head.removeChild(style);
  }
  style = document.getElementById('attendance_page_style');
  if (style) {
    document.head.removeChild(style);
  }
  style = document.getElementById('attendance_select_style');
  if (style) {
    document.head.removeChild(style);
  }
  style = document.getElementById('stats_style');
  if (style) {
    document.head.removeChild(style);
  }
  style = document.getElementById('calendar_style');
  if (style) {
    document.head.removeChild(style);
  }
}