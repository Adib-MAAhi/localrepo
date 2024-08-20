import { useFormStatus } from "react-dom";
function App() {
  return (
    <form className="form">
      <header>This is our pizza company</header>
      <div>
        <h2>Inter you name </h2>
        <input type="text" placeholder="..name" />
        <p>this is our paragraph</p>
        <Button />
      </div>
    </form>
  );
}

function Button() {
  const { pending } = useFormStatus();
  return <button>{pending ? "Adding" : "Add"}</button>;
}

<header>This is our header</header>;

export default App;
