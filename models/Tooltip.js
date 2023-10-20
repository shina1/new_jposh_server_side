// React is loaded and is available as React and ReactDOM
// imports should NOT be used

class Tooltip extends React.Component {
    render() {
      return null;
    }
  }
  
  class App extends React.Component {
    state = {
      text: "",
    };
  
    onDocumentClick = (event) => {
      if (event.target.tagName === "BUTTON") {
        this.setState({ text: event.target.textContent });
      }
    };
  
    componentDidMount() {
      document.addEventListener("click", this.onDocumentClick);
    }
  
    componentWillUnmount() {
      document.removeEventListener("click", this.onDocumentClick);
    }
  
    render() {
      return (
        <div>
          {this.props.children}
          {ReactDOM.createPortal(
            <div id={this.props.tooltipId} style={{ display: "none" }}>
              {this.state.text}
            </div>,
            document.getElementById("tooltip-root")
          )}
        </div>
      );
    }
  }
  
  document.body.innerHTML = "<div id='root'></div><div id='tooltip-root'></div>";
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <App tooltipId={"tooltip"}>
      <button id="button1">First button</button>
      <button id="button2">Second button</button>
    </App>
  );
  
  setTimeout(() => {
    document.getElementById("button2").click();
  
    setTimeout(() => {
      console.log(document.body.innerHTML);
    }, 300);
  }, 300);
  