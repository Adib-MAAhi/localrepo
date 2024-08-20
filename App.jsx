import { useFormStatus } from "react-dom";
function App() {
  return (
    <form className="form">
      <div>
        <h1>This is our Form</h1>
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
<p>This is our company</p>;

<header>This is our header</header>;

export default App;
