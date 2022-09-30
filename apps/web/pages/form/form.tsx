import type { FormEvent, SyntheticEvent } from "react";

export default function Form() {
  const handleSubmit = async (event: SyntheticEvent) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();

    const target = event.target as typeof event.target & {
      first: { value: string };
      last: { value: string };
    };

    // Get data from the form.
    const data = {
      first: target.first.value,
      last: target.last.value,
    };

    // Send data to the server in JSON format.
    const JSONData = JSON.stringify(data);

    // API endpoint where we send form data
    const endpoint = "/api/form";

    // From the request for sending data to the server
    const options = {
      // The method is POST because we are sending data
      method: "POST",
      // Tell the server we're sending JSON
      headers: {
        "Content-TYpe": "application/json",
      },
      // Body of the request is the JSON data
      body: JSONData,
    };

    // Send the form data to our forms API
    const response = await fetch(endpoint, options);

    // Get the response from server as JSON
    const result = await response.json();
    alert(`Is this your full name: ${result.data}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="first">First name:</label>
      <input type="text" id="first" name="first" required />

      <label htmlFor="last">Last name:</label>
      <input type="text" id="last" name="last" required />

      <button type="submit">Submit</button>
    </form>
  );
}
