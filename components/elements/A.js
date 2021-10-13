function A(props) {
  return (
    <a
      rel="noopener"
      target="_blank"
      className={
        props.className +
        " " +
        `text-gray-600 underline font-semibold hover:text-gray-800 cursor-pointer`
      }
      {...props}
    >
      {props.children}
    </a>
  );
}

export default A;
