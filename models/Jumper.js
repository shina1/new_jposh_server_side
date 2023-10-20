const List = (props) => {
    const [items, setItems] = React.useState(props.items);
  
    const handleClick = (index) => {
      const clickedItem = items[index];
      const newItems = [
        clickedItem,
        ...items.slice(0, index),
        ...items.slice(index + 1),
      ];
      setItems(newItems);
    };
  
    return (
      <ul>
        {items.map((item, index) => (
          <li key={item} onClick={() => handleClick(index)}>
            {item}
          </li>
        ))}
      </ul>
    );
  };
  
  document.body.innerHTML = "<div id='root'></div>";
  
  const rootElement = document.getElementById("root");
  ReactDOM.render(<List items={["A", "B", "C"]} />, rootElement);
  
  let listItem = document.querySelectorAll("li")[2];
  if (listItem) {
    listItem.click();
  }
  
  setTimeout(() => console.log(document.getElementById("root").innerHTML));
  