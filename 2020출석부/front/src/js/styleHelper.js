export default (document, ...styles) => {
  styles.forEach(style => document.head.appendChild(style));
}